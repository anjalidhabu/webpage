#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const contentPath = path.join(repoRoot, "src/app/publications/content.tsx");
const outputPath = path.join(repoRoot, "src/app/publications/coauthor-affiliations.generated.json");
const missingAffiliationLabel = "Coauthor affiliation not specified";
const openAlexSelectFields = "id,display_name,doi,publication_year,authorships,primary_location";
const combiningMarksPattern = /\p{Mark}/gu;

function normalizeName(value) {
  return value
    .normalize("NFKD")
    .replace(combiningMarksPattern, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function cleanAffiliation(value) {
  return value
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function authorKey(surname, initials) {
  return `${surname}-${initials}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractAuthors(authorText) {
  const matches = Array.from(
    authorText.matchAll(/(?:^|,\s+|\sand\s+)([A-Z][A-Za-z'. -]+?),\s*((?:[A-Z]\.){1,4})/g),
  );

  return matches.map((match) => {
    const surname = match[1].trim();
    const initials = match[2].trim();

    return {
      key: authorKey(surname, initials),
      surname,
      initials,
      initialLetters: initials.replace(/[^A-Z]/g, "").toLowerCase(),
    };
  });
}

function extractField(block, fieldName) {
  const match = block.match(new RegExp(`${fieldName}:\\s*(?:"([^"]*)"|\`([\\s\\S]*?)\`)`));
  return match?.[1] ?? match?.[2] ?? null;
}

function extractPublications(content) {
  const itemBlocks = content.match(/^ {8}\{[\s\S]*?^ {8}\},/gm) ?? [];

  return itemBlocks
    .map((block) => {
      const id = extractField(block, "id");
      const authors = extractField(block, "authors");
      const title = extractField(block, "title");

      if (!id || !authors || !title) {
        return null;
      }

      return {
        id,
        authors,
        title: title.replace(/\.$/, ""),
        doi: extractField(block, "doi"),
        arxivId: extractField(block, "arxivId"),
        openAlexId: extractField(block, "openAlexId"),
        year: extractField(block, "year"),
        authorList: extractAuthors(authors),
      };
    })
    .filter(Boolean);
}

function affiliationsFromOpenAlexAuthorship(authorship) {
  const institutions =
    authorship.institutions?.map((institution) => institution.display_name).filter(Boolean) ?? [];

  if (institutions.length) {
    return institutions;
  }

  return authorship.raw_affiliation_strings?.filter(Boolean) ?? [];
}

function initialsFromDisplayName(displayName, localSurname) {
  const normalizedSurname = normalizeName(localSurname);
  return normalizeName(displayName)
    .split(" ")
    .filter((token) => token && token !== normalizedSurname)
    .map((token) => token[0])
    .join("");
}

function scoreAuthorMatch(localAuthor, authorship, index) {
  const displayName = authorship.author?.display_name ?? "";
  const normalizedDisplayName = normalizeName(displayName);
  const normalizedSurname = normalizeName(localAuthor.surname);

  if (!normalizedDisplayName || !normalizedSurname) {
    return 0;
  }

  let score = 0;

  if (normalizedDisplayName.split(" ").includes(normalizedSurname)) {
    score += 3;
  } else if (normalizedDisplayName.includes(normalizedSurname)) {
    score += 2;
  }

  const displayInitials = initialsFromDisplayName(displayName, localAuthor.surname);
  if (displayInitials.startsWith(localAuthor.initialLetters)) {
    score += 2;
  } else if (localAuthor.initialLetters.startsWith(displayInitials) && displayInitials.length > 0) {
    score += 1;
  }

  if (index >= 0) {
    score += 1;
  }

  return score;
}

function matchAuthorship(localAuthor, authorships, fallbackIndex) {
  const rankedMatches = authorships
    .map((authorship, index) => ({
      authorship,
      index,
      score: scoreAuthorMatch(localAuthor, authorship, index === fallbackIndex ? index : -1),
    }))
    .sort((first, second) => second.score - first.score);

  const bestMatch = rankedMatches[0];

  if (bestMatch?.score >= 3) {
    return bestMatch.authorship;
  }

  return authorships[fallbackIndex] ?? null;
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Anjali_Website coauthor-affiliation-fetcher (metadata enrichment)",
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

async function fetchOpenAlexWork(publication) {
  const publicationYear = Number.parseInt(publication.year, 10);
  const externalId = publication.openAlexId
    ? publication.openAlexId
    : publication.doi
      ? `doi:${publication.doi}`
      : null;

  if (externalId) {
    const directUrl = new URL(`https://api.openalex.org/works/${encodeURIComponent(externalId)}`);
    directUrl.searchParams.set("select", openAlexSelectFields);

    const directWork = await fetchJson(directUrl);
    if (directWork?.authorships?.length) {
      return directWork;
    }
  }

  if (publication.arxivId) {
    const arxivUrl = new URL("https://api.openalex.org/works");
    arxivUrl.searchParams.set("filter", "locations.source.id:https://openalex.org/S4306402567");
    arxivUrl.searchParams.set("search", publication.arxivId);
    arxivUrl.searchParams.set("per-page", "1");
    arxivUrl.searchParams.set("select", openAlexSelectFields);

    const arxivData = await fetchJson(arxivUrl);
    if (arxivData?.results?.[0]?.authorships?.length) {
      return arxivData.results[0];
    }
  }

  if (!Number.isFinite(publicationYear)) {
    return null;
  }

  const searchUrl = new URL("https://api.openalex.org/works");
  searchUrl.searchParams.set("search", publication.title);
  searchUrl.searchParams.set("per-page", "1");
  searchUrl.searchParams.set("select", openAlexSelectFields);
  searchUrl.searchParams.set(
    "filter",
    `from_publication_year:${publicationYear - 1},to_publication_year:${publicationYear + 1}`,
  );

  const searchData = await fetchJson(searchUrl);
  return searchData?.results?.[0] ?? null;
}

async function fetchCrossrefAffiliations(doi) {
  if (!doi) {
    return [];
  }

  const crossrefUrl = new URL(`https://api.crossref.org/works/${encodeURIComponent(doi)}`);
  const data = await fetchJson(crossrefUrl);
  return data?.message?.author ?? [];
}

function addAffiliations(directory, authorKeyValue, affiliations) {
  const filteredAffiliations = affiliations
    .map((affiliation) => (affiliation ? cleanAffiliation(affiliation) : null))
    .filter((affiliation) => affiliation && affiliation !== missingAffiliationLabel);

  if (!filteredAffiliations.length) {
    return;
  }

  const current = directory[authorKeyValue] ?? [];

  for (const affiliation of filteredAffiliations) {
    const normalizedAffiliation = normalizeName(affiliation);
    const overlappingIndex = current.findIndex((existingAffiliation) => {
      const normalizedExistingAffiliation = normalizeName(existingAffiliation);
      return (
        normalizedAffiliation.includes(normalizedExistingAffiliation) ||
        normalizedExistingAffiliation.includes(normalizedAffiliation)
      );
    });

    if (overlappingIndex === -1) {
      current.push(affiliation);
      return;
    }

    if (affiliation.length < current[overlappingIndex].length) {
      current[overlappingIndex] = affiliation;
    }
  }

  directory[authorKeyValue] = current.sort((first, second) => first.localeCompare(second));
}

async function main() {
  const content = await readFile(contentPath, "utf8");
  const publications = extractPublications(content);
  const directory = {};
  const misses = [];

  for (const publication of publications) {
    process.stdout.write(`Fetching ${publication.id}... `);

    const work = await fetchOpenAlexWork(publication);
    const authorships = work?.authorships ?? [];
    const crossrefAuthors = await fetchCrossrefAffiliations(publication.doi);
    let publicationHits = 0;

    publication.authorList.forEach((author, index) => {
      if (author.surname.toLowerCase() === "dhabu") {
        return;
      }

      const authorship = matchAuthorship(author, authorships, index);
      const openAlexAffiliations = authorship ? affiliationsFromOpenAlexAuthorship(authorship) : [];
      const crossrefAffiliations =
        crossrefAuthors[index]?.affiliation
          ?.map((affiliation) => affiliation.name)
          .filter(Boolean) ?? [];
      const beforeCount = directory[author.key]?.length ?? 0;

      addAffiliations(directory, author.key, [...openAlexAffiliations, ...crossrefAffiliations]);

      if ((directory[author.key]?.length ?? 0) > beforeCount) {
        publicationHits += 1;
      }
    });

    process.stdout.write(
      `${publicationHits} coauthor affiliation hit${publicationHits === 1 ? "" : "s"}\n`,
    );

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  for (const publication of publications) {
    for (const author of publication.authorList) {
      if (author.surname.toLowerCase() !== "dhabu" && !directory[author.key]) {
        misses.push(author.key);
      }
    }
  }

  const sortedDirectory = Object.fromEntries(
    Object.entries(directory).sort(([firstKey], [secondKey]) => firstKey.localeCompare(secondKey)),
  );

  await writeFile(outputPath, `${JSON.stringify(sortedDirectory, null, 2)}\n`);

  console.log(
    `Wrote ${Object.keys(sortedDirectory).length} fetched coauthor affiliation entries to ${path.relative(
      repoRoot,
      outputPath,
    )}.`,
  );

  if (misses.length) {
    console.log(
      `No fetched affiliation found for: ${Array.from(new Set(misses)).sort().join(", ")}`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
