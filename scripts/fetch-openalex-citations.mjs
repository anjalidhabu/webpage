#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const contentPath = path.join(repoRoot, "src/app/publications/content.tsx");
const outputPath = path.join(repoRoot, "src/app/publications/openalex-citations.generated.json");
const openAlexApiKey = process.env.OPENALEX_API_KEY;
const openAlexEmail = process.env.OPENALEX_EMAIL;
const sourceSelectFields =
  "id,display_name,cited_by_count,cited_by_api_url,doi,publication_year,authorships,primary_location";
const citingSelectFields = "id,display_name,publication_year,doi,authorships,primary_location";
const combiningMarksPattern = /\p{Mark}/gu;

function normalizeText(value) {
  return value
    .normalize("NFKD")
    .replace(combiningMarksPattern, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function compactOpenAlexId(value) {
  return value?.replace("https://openalex.org/", "") ?? null;
}

function cleanDisplayName(value) {
  return (value ?? "Untitled work")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractField(block, fieldName) {
  const match = block.match(new RegExp(`${fieldName}:\\s*(?:"([^"]*)"|\`([\\s\\S]*?)\`)`));
  return match?.[1] ?? match?.[2] ?? null;
}

function getDoi(publication) {
  if (publication.doi) {
    return publication.doi;
  }

  const doiPrefix = "https://doi.org/";
  if (publication.href?.startsWith(doiPrefix)) {
    return publication.href.slice(doiPrefix.length);
  }

  return null;
}

function extractPublications(content) {
  const itemBlocks = content.match(/^ {8}\{[\s\S]*?^ {8}\},/gm) ?? [];

  return itemBlocks
    .map((block) => {
      const id = extractField(block, "id");
      const title = extractField(block, "title");
      const year = extractField(block, "year");

      if (!id || !title || !year) {
        return null;
      }

      const publication = {
        id,
        title: title.replace(/\.$/, ""),
        doi: extractField(block, "doi"),
        arxivId: extractField(block, "arxivId"),
        openAlexId: extractField(block, "openAlexId"),
        href: extractField(block, "href"),
        year,
      };

      return {
        ...publication,
        doi: getDoi(publication),
      };
    })
    .filter(Boolean);
}

function isCitationCandidate(publication) {
  const numericYear = Number.parseInt(publication.year, 10);
  return Boolean(publication.openAlexId || publication.doi || publication.arxivId || numericYear);
}

function addAuthParams(url) {
  if (openAlexApiKey) {
    url.searchParams.set("api_key", openAlexApiKey);
  }

  if (openAlexEmail) {
    url.searchParams.set("mailto", openAlexEmail);
  }
}

async function fetchJson(url) {
  addAuthParams(url);

  const response = await fetch(url, {
    headers: {
      "User-Agent": "Anjali_Website OpenAlex citation cache (metadata enrichment)",
    },
  });

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      data: null,
    };
  }

  return {
    ok: true,
    status: response.status,
    data: await response.json(),
  };
}

function workUrl(work) {
  return work.doi ?? work.primary_location?.landing_page_url ?? work.id ?? "#";
}

function authorList(authorships) {
  const authors = authorships
    ?.map((authorship) => authorship.author?.display_name)
    .filter((author) => Boolean(author));

  if (!authors?.length) {
    return "Author metadata unavailable";
  }

  const visibleAuthors = authors.slice(0, 3).join(", ");
  return authors.length > 3 ? `${visibleAuthors} +${authors.length - 3}` : visibleAuthors;
}

function normalizeCitingWork(work) {
  return {
    id: work.id ?? work.display_name ?? "openalex-work",
    title: cleanDisplayName(work.display_name ?? "Untitled citing work"),
    year: work.publication_year?.toString() ?? "n.d.",
    authors: authorList(work.authorships),
    venue: work.primary_location?.source?.display_name ?? "Venue unavailable",
    url: workUrl(work),
  };
}

function isReasonableTitleMatch(publication, work) {
  const localTitle = normalizeText(publication.title);
  const openAlexTitle = normalizeText(work.display_name ?? "");

  if (!localTitle || !openAlexTitle) {
    return false;
  }

  return (
    localTitle === openAlexTitle ||
    localTitle.includes(openAlexTitle) ||
    openAlexTitle.includes(localTitle)
  );
}

async function fetchDirectWork(publication) {
  const externalId = publication.openAlexId
    ? publication.openAlexId
    : publication.doi
      ? `doi:${publication.doi}`
      : null;

  if (!externalId) {
    return null;
  }

  const directUrl = new URL(`https://api.openalex.org/works/${encodeURIComponent(externalId)}`);
  directUrl.searchParams.set("select", sourceSelectFields);

  const response = await fetchJson(directUrl);
  if (response.ok) {
    return {
      matchType: publication.openAlexId ? "openalex-id" : "doi",
      work: response.data,
    };
  }

  if (response.status === 401 || response.status === 403 || response.status === 429) {
    throw new Error(`OpenAlex request failed with HTTP ${response.status}`);
  }

  return null;
}

async function fetchArxivWork(publication) {
  if (!publication.arxivId) {
    return null;
  }

  const arxivUrl = new URL("https://api.openalex.org/works");
  arxivUrl.searchParams.set("filter", "locations.source.id:https://openalex.org/S4306402567");
  arxivUrl.searchParams.set("search", publication.arxivId);
  arxivUrl.searchParams.set("per-page", "1");
  arxivUrl.searchParams.set("select", sourceSelectFields);

  const response = await fetchJson(arxivUrl);
  if (!response.ok) {
    return null;
  }

  const work = response.data?.results?.[0];
  return work
    ? {
        matchType: "arxiv",
        work,
      }
    : null;
}

async function fetchTitleWork(publication) {
  const publicationYear = Number.parseInt(publication.year, 10);

  if (!Number.isFinite(publicationYear)) {
    return null;
  }

  const searchUrl = new URL("https://api.openalex.org/works");
  searchUrl.searchParams.set("search", publication.title);
  searchUrl.searchParams.set("per-page", "3");
  searchUrl.searchParams.set("select", sourceSelectFields);
  searchUrl.searchParams.set(
    "filter",
    `from_publication_year:${publicationYear - 1},to_publication_year:${publicationYear + 1}`,
  );

  const response = await fetchJson(searchUrl);
  if (!response.ok) {
    return null;
  }

  const work = response.data?.results?.find((candidate) =>
    isReasonableTitleMatch(publication, candidate),
  );

  return work
    ? {
        matchType: "title",
        work,
      }
    : null;
}

async function fetchOpenAlexWork(publication) {
  return (
    (await fetchDirectWork(publication)) ??
    (await fetchArxivWork(publication)) ??
    (await fetchTitleWork(publication))
  );
}

async function fetchCitingWorks(sourceWork) {
  const sourceWorkId = compactOpenAlexId(sourceWork.id);

  if (!sourceWorkId) {
    return [];
  }

  const citedByUrl = new URL("https://api.openalex.org/works");
  citedByUrl.searchParams.set("filter", `cites:${sourceWorkId}`);
  citedByUrl.searchParams.set("per-page", "12");
  citedByUrl.searchParams.set("sort", "publication_year:desc");
  citedByUrl.searchParams.set("select", citingSelectFields);

  const response = await fetchJson(citedByUrl);
  if (!response.ok) {
    return [];
  }

  return response.data?.results?.map(normalizeCitingWork) ?? [];
}

async function fetchCitationSummary(publication) {
  try {
    const matchedWork = await fetchOpenAlexWork(publication);

    if (!matchedWork?.work) {
      return {
        publicationId: publication.id,
        status: "not-found",
        sourceTitle: publication.title,
        citedByCount: 0,
        citingWorks: [],
        message: "No OpenAlex match found.",
      };
    }

    const citingWorks = await fetchCitingWorks(matchedWork.work);

    return {
      publicationId: publication.id,
      status: "ready",
      sourceTitle: cleanDisplayName(matchedWork.work.display_name ?? publication.title),
      openAlexId: compactOpenAlexId(matchedWork.work.id),
      openAlexUrl: matchedWork.work.id,
      matchedBy: matchedWork.matchType,
      citedByCount: matchedWork.work.cited_by_count ?? 0,
      citingWorks,
    };
  } catch (error) {
    return {
      publicationId: publication.id,
      status: "error",
      sourceTitle: publication.title,
      citedByCount: 0,
      citingWorks: [],
      message: error instanceof Error ? error.message : "Citation lookup failed.",
    };
  }
}

async function main() {
  const content = await readFile(contentPath, "utf8");
  const candidates = extractPublications(content).filter(isCitationCandidate);
  const results = {};

  for (const publication of candidates) {
    process.stdout.write(`Fetching citations for ${publication.id}... `);

    const result = await fetchCitationSummary(publication);
    results[publication.id] = result;

    const statusLabel =
      result.status === "ready"
        ? `${result.citedByCount ?? 0} citation${result.citedByCount === 1 ? "" : "s"}`
        : result.status;

    process.stdout.write(`${statusLabel}\n`);
    await new Promise((resolve) => setTimeout(resolve, 120));
  }

  const generatedData = {
    generatedAt: new Date().toISOString(),
    source: "OpenAlex",
    sourceUrl: "https://openalex.org",
    candidateCount: candidates.length,
    readyCount: Object.values(results).filter((result) => result.status === "ready").length,
    results,
  };

  await writeFile(outputPath, `${JSON.stringify(generatedData, null, 2)}\n`);
  console.log(`Wrote citation cache to ${path.relative(repoRoot, outputPath)}.`);

  if (!openAlexApiKey) {
    console.log("OPENALEX_API_KEY was not set; unauthenticated API limits may apply.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
