"use client";

import type { Publications } from "@/types";
import { withBasePath } from "@/utils/paths";
import { useMemo, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { getCoauthorAffiliationEntry, missingAffiliationLabel } from "./coauthor-affiliations";
import openAlexCitationCache from "./openalex-citations.generated.json";
import styles from "./page.module.css";

type PublicationGroup = Publications["groups"][number];
type PublicationItem = PublicationGroup["items"][number];

type FlatPublication = PublicationItem & {
  groupId: string;
  groupTitle: string;
  groupFocus: string;
};

type MapMode = "authors" | "institutions" | "citations";

type AuthorSummary = {
  key: string;
  displayName: string;
  shortName: string;
  surname: string;
  initials: string;
  publicationIds: string[];
  publications: FlatPublication[];
  institutions: string[];
  affiliationSource: "manual" | "fetched" | "missing";
  groups: string[];
};

type InstitutionSummary = {
  key: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  publicationIds: string[];
  publications: FlatPublication[];
  authors: string[];
  groups: string[];
};

type HomeCollaboratorSummary = InstitutionSummary;

type HomeInstitutionSummary = {
  key: string;
  name: string;
  city: string;
  country: string;
  publicationIds: string[];
  publications: FlatPublication[];
  collaborators: HomeCollaboratorSummary[];
};

type ThemeSummary = {
  id: string;
  title: string;
  shortTitle: string;
  focus: string;
  color: string;
  deepColor: string;
  publicationIds: string[];
  publications: FlatPublication[];
  coauthors: string[];
  institutions: string[];
};

type CitationStatus = "ready" | "not-found" | "error";
type CitationMatchType = "openalex-id" | "doi" | "arxiv" | "title";

type CitingWork = {
  id: string;
  title: string;
  year: string;
  authors: string;
  venue: string;
  url: string;
};

type CitationResult = {
  publicationId: string;
  status: CitationStatus;
  sourceTitle: string;
  openAlexId?: string;
  openAlexUrl?: string;
  matchedBy?: CitationMatchType;
  citedByCount?: number;
  citingWorks: CitingWork[];
  message?: string;
};

type OpenAlexCitationCache = {
  generatedAt: string | null;
  source: string;
  sourceUrl: string;
  candidateCount: number;
  readyCount: number;
  results: Record<string, CitationResult>;
};

type CollaborationMapProps = {
  publications: Publications;
  activeGroup: string;
};

const modeOptions: Array<{
  id: MapMode;
  label: string;
  statLabel: string;
}> = [
  { id: "authors", label: "Coauthors", statLabel: "people" },
  { id: "institutions", label: "Institutions", statLabel: "places" },
  { id: "citations", label: "Citations", statLabel: "sources" },
];

const themePalette: Record<
  string,
  {
    title: string;
    color: string;
    deepColor: string;
    shortTitle: string;
  }
> = {
  "wavefield-physics-theory": {
    title: "Wavefield Theory",
    color: "#0f766e",
    deepColor: "#115e59",
    shortTitle: "Wavefield Theory",
  },
  "earth-sources": {
    title: "Earth Structure & Sources",
    color: "#4d7c0f",
    deepColor: "#365314",
    shortTitle: "Earth Structure",
  },
  "computational-modeling-tools": {
    title: "Computational Modeling",
    color: "#2563eb",
    deepColor: "#1e3a8a",
    shortTitle: "Computational Modeling",
  },
  "observables-data": {
    title: "Observables & Data",
    color: "#7c3aed",
    deepColor: "#4c1d95",
    shortTitle: "New Observables",
  },
  "structural-health-monitoring": {
    title: "Structural Monitoring",
    color: "#c2410c",
    deepColor: "#7c2d12",
    shortTitle: "SHM",
  },
};

const cnrsInstitutionName = "Centre national de la recherche scientifique";
const csirFourthParadigmInstituteName = "CSIR Fourth Paradigm Institute (CSIR-4PI)";

const institutionDirectory: Record<
  string,
  {
    city: string;
    country: string;
    lat: number;
    lon: number;
  }
> = {
  "Indian Institute of Technology Madras": {
    city: "Chennai",
    country: "India",
    lat: 12.9915,
    lon: 80.2337,
  },
  "University of Hamburg": {
    city: "Hamburg",
    country: "Germany",
    lat: 53.5667,
    lon: 9.9833,
  },
  "Universität Hamburg": {
    city: "Hamburg",
    country: "Germany",
    lat: 53.5667,
    lon: 9.9833,
  },
  "Ludwig Maximilian University of Munich": {
    city: "Munich",
    country: "Germany",
    lat: 48.1505,
    lon: 11.5801,
  },
  "Federal Institute for Materials Research and Testing": {
    city: "Berlin",
    country: "Germany",
    lat: 52.428,
    lon: 13.3,
  },
  "BGR - Federal Institute for Geosciences and Natural Resources": {
    city: "Hannover",
    country: "Germany",
    lat: 52.394,
    lon: 9.761,
  },
  "Vestas Wind Systems, Vestas Deutschland GmbH": {
    city: "Hamburg",
    country: "Germany",
    lat: 53.5511,
    lon: 9.9937,
  },
  "Opole University of Technology": {
    city: "Opole",
    country: "Poland",
    lat: 50.6751,
    lon: 17.9213,
  },
  "National Geophysical Research Institute": {
    city: "Hyderabad",
    country: "India",
    lat: 17.4141,
    lon: 78.5504,
  },
  [csirFourthParadigmInstituteName]: {
    city: "Bengaluru",
    country: "India",
    lat: 12.9716,
    lon: 77.5946,
  },
  "Indian Space Research Organisation": {
    city: "Bengaluru",
    country: "India",
    lat: 12.9667,
    lon: 77.5667,
  },
  "ISRO-Space Applications Centre Ahmedabad India": {
    city: "Ahmedabad",
    country: "India",
    lat: 23.0304,
    lon: 72.5108,
  },
  "Max Planck Institute for Solar System Research": {
    city: "Gottingen",
    country: "Germany",
    lat: 51.5604,
    lon: 9.9563,
  },
  "Planetary Science Institute": {
    city: "Tucson",
    country: "United States",
    lat: 32.2226,
    lon: -110.9747,
  },
  "German Aerospace Center": {
    city: "Cologne",
    country: "Germany",
    lat: 50.8532,
    lon: 7.1229,
  },
  "University of Potsdam": {
    city: "Potsdam",
    country: "Germany",
    lat: 52.401,
    lon: 13.012,
  },
  [cnrsInstitutionName]: {
    city: "Paris",
    country: "France",
    lat: 48.8566,
    lon: 2.3522,
  },
};

const homeInstitutionNames = [
  "Indian Institute of Technology Madras",
  "University of Hamburg",
] as const;
const homeInstitutionSet = new Set<string>(homeInstitutionNames);

const featuredInstitutionNames = [
  "University of Hamburg",
  "Indian Institute of Technology Madras",
  "Ludwig Maximilian University of Munich",
  "Federal Institute for Materials Research and Testing",
  cnrsInstitutionName,
  "BGR - Federal Institute for Geosciences and Natural Resources",
  "National Geophysical Research Institute",
  csirFourthParadigmInstituteName,
] as const;

const institutionAliases: Record<string, string> = {
  "CSIR-4PI": csirFourthParadigmInstituteName,
  CNRS: cnrsInstitutionName,
  "Centre National de la Recherche Scientifique": cnrsInstitutionName,
  "Centre National de la Recherche Scientifique (CNRS)": cnrsInstitutionName,
  "Centre national de la recherche scientifique (CNRS)": cnrsInstitutionName,
  "French National Centre for Scientific Research": cnrsInstitutionName,
  "Universität Hamburg": "University of Hamburg",
};

const institutionLogoPaths: Record<string, string> = {
  "Indian Institute of Technology Madras": "/images/logos/IIT_Madras_Logo.svg",
  "University of Hamburg": "/images/logos/Seal_of_the_University_of_Hamburg.svg",
  "Ludwig Maximilian University of Munich": "/images/logos/LMU_Muenchen_Logo.svg",
  "Federal Institute for Materials Research and Testing": "/images/logos/BAM-Logo-2015.svg",
  "BGR - Federal Institute for Geosciences and Natural Resources":
    "/images/logos/BGR_Logo-cropped.svg",
  "Vestas Wind Systems, Vestas Deutschland GmbH": "/images/logos/Vestas.svg",
  "Opole University of Technology": "/images/logos/Opole_University_of_Technology.png",
  "National Geophysical Research Institute":
    "/images/logos/National_Geophysical_Research_Institute_Logo.png",
  [csirFourthParadigmInstituteName]: "/images/logos/CSIR-Logo.png",
  "Indian Space Research Organisation": "/images/logos/Indian_Space_Research_Organisation_Logo.svg",
  "ISRO-Space Applications Centre Ahmedabad India":
    "/images/logos/Indian_Space_Research_Organisation_Logo.svg",
  "Max Planck Institute for Solar System Research": "/images/logos/Logo-mps.png",
  "Planetary Science Institute": "/images/logos/Planetary_Science_Institute_logo.png",
  [cnrsInstitutionName]: "/images/logos/LOGO_CNRS_BLEU.png",
};

const generatedCitationCache = openAlexCitationCache as OpenAlexCitationCache;
const generatedCitationResults = generatedCitationCache.results;

function getScopedPublications(publications: Publications, activeGroup: string): FlatPublication[] {
  return publications.groups.flatMap((group) => {
    if (activeGroup !== "all" && group.id !== activeGroup) {
      return [];
    }

    return group.items.map((item) => ({
      ...item,
      groupId: group.id,
      groupTitle: group.title,
      groupFocus: group.focus,
    }));
  });
}

function authorKey(surname: string, initials: string) {
  return `${surname}-${initials}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractAuthors(authorText: string) {
  const matches = Array.from(
    authorText.matchAll(/(?:^|,\s+|\sand\s+)([A-Z][A-Za-z'. -]+?),\s*((?:[A-Z]\.){1,4})/g),
  );

  return matches.map((match) => {
    const surname = match[1].trim();
    const initials = match[2].trim();

    return {
      key: authorKey(surname, initials),
      displayName: `${initials} ${surname}`,
      shortName: surname,
      surname,
      initials,
      isSelf: surname.toLowerCase() === "dhabu",
    };
  });
}

function getDoi(publication: PublicationItem) {
  if (publication.doi) {
    return publication.doi;
  }

  const doiPrefix = "https://doi.org/";
  if (publication.href?.startsWith(doiPrefix)) {
    return publication.href.slice(doiPrefix.length);
  }

  return null;
}

function getCitationCandidates(publications: FlatPublication[]) {
  return publications.filter((publication) => {
    const numericYear = Number.parseInt(publication.year, 10);
    return Boolean(getDoi(publication) || publication.arxivId || Number.isFinite(numericYear));
  });
}

function normalizeInstitutionName(institution: string) {
  return institutionAliases[institution] ?? institution;
}

function getInstitutionLogo(institution: string) {
  const logoPath = institutionLogoPaths[normalizeInstitutionName(institution)];

  return logoPath ? withBasePath(logoPath) : null;
}

function getInstitutionLocation(institution: string) {
  const normalizedInstitution = normalizeInstitutionName(institution);

  return (
    institutionDirectory[normalizedInstitution] ?? {
      city: "Research network",
      country: "Collaboration",
      lat: 18,
      lon: 25,
    }
  );
}

function addUnique<T>(items: T[], item: T) {
  if (!items.includes(item)) {
    items.push(item);
  }
}

function buildNetworkData(publications: FlatPublication[]) {
  const authorMap = new Map<string, AuthorSummary>();
  const institutionMap = new Map<string, InstitutionSummary>();
  const homeInstitutionMap = new Map<string, HomeInstitutionSummary>();
  const themeMap = new Map<string, ThemeSummary>();

  for (const publication of publications) {
    const authors = extractAuthors(publication.authors);
    const authorAffiliationEntries = authors.map((author) => ({
      author,
      affiliationEntry: getCoauthorAffiliationEntry(author.key),
    }));
    const homeInstitutions = Array.from(
      new Set(
        (publication.institutions ?? [])
          .map(normalizeInstitutionName)
          .filter((institution) => homeInstitutionSet.has(institution)),
      ),
    );
    const publicationInstitutions = Array.from(
      new Set([
        ...(publication.institutions ?? []).map(normalizeInstitutionName),
        ...authorAffiliationEntries.flatMap(({ author, affiliationEntry }) =>
          author.isSelf
            ? []
            : affiliationEntry.institutions
                .filter((institution) => institution !== missingAffiliationLabel)
                .map(normalizeInstitutionName),
        ),
      ]),
    );
    const palette = themePalette[publication.groupId] ?? {
      title: publication.groupTitle,
      color: "#167d9c",
      deepColor: "#0f5369",
      shortTitle: publication.groupTitle,
    };

    const theme = themeMap.get(publication.groupId) ?? {
      id: publication.groupId,
      title: palette.title,
      shortTitle: palette.shortTitle,
      focus: publication.groupFocus,
      color: palette.color,
      deepColor: palette.deepColor,
      publicationIds: [],
      publications: [],
      coauthors: [],
      institutions: [],
    };

    if (!theme.publicationIds.includes(publication.id)) {
      theme.publicationIds.push(publication.id);
      theme.publications.push(publication);
    }

    for (const institution of publicationInstitutions) {
      addUnique(theme.institutions, institution);
    }

    for (const homeInstitutionName of homeInstitutions) {
      const location = getInstitutionLocation(homeInstitutionName);
      const homeInstitution = homeInstitutionMap.get(homeInstitutionName) ?? {
        key: homeInstitutionName,
        name: homeInstitutionName,
        city: location.city,
        country: location.country,
        publicationIds: [],
        publications: [],
        collaborators: [],
      };

      if (!homeInstitution.publicationIds.includes(publication.id)) {
        homeInstitution.publicationIds.push(publication.id);
        homeInstitution.publications.push(publication);
      }

      for (const institution of publicationInstitutions) {
        if (institution === homeInstitutionName) {
          continue;
        }

        const collaboratorLocation = getInstitutionLocation(institution);
        const existingCollaborator = homeInstitution.collaborators.find(
          (collaborator) => collaborator.key === institution,
        ) ?? {
          key: institution,
          name: institution,
          city: collaboratorLocation.city,
          country: collaboratorLocation.country,
          lat: collaboratorLocation.lat,
          lon: collaboratorLocation.lon,
          publicationIds: [],
          publications: [],
          authors: [],
          groups: [],
        };

        if (!existingCollaborator.publicationIds.includes(publication.id)) {
          existingCollaborator.publicationIds.push(publication.id);
          existingCollaborator.publications.push(publication);
        }

        for (const { author, affiliationEntry } of authorAffiliationEntries) {
          const authorInstitutions = affiliationEntry.institutions
            .filter((affiliation) => affiliation !== missingAffiliationLabel)
            .map(normalizeInstitutionName);

          if (!author.isSelf && authorInstitutions.includes(institution)) {
            addUnique(existingCollaborator.authors, author.displayName);
          }
        }

        addUnique(existingCollaborator.groups, publication.groupTitle);

        if (
          !homeInstitution.collaborators.some(
            (collaborator) => collaborator.key === existingCollaborator.key,
          )
        ) {
          homeInstitution.collaborators.push(existingCollaborator);
        }
      }

      homeInstitutionMap.set(homeInstitutionName, homeInstitution);
    }

    for (const { author, affiliationEntry } of authorAffiliationEntries) {
      const existing = authorMap.get(author.key) ?? {
        key: author.key,
        displayName: author.isSelf ? "Anjali Dhabu" : author.displayName,
        shortName: author.isSelf ? "Dhabu" : author.shortName,
        surname: author.surname,
        initials: author.initials,
        publicationIds: [],
        publications: [],
        institutions: [],
        affiliationSource: affiliationEntry.source,
        groups: [],
      };

      if (!existing.publicationIds.includes(publication.id)) {
        existing.publicationIds.push(publication.id);
        existing.publications.push(publication);
      }

      for (const institution of affiliationEntry.institutions) {
        addUnique(existing.institutions, normalizeInstitutionName(institution));
      }

      if (existing.affiliationSource === "missing" && affiliationEntry.source !== "missing") {
        existing.affiliationSource = affiliationEntry.source;
      }

      addUnique(existing.groups, publication.groupTitle);

      authorMap.set(author.key, existing);

      if (!author.isSelf && !theme.coauthors.includes(author.displayName)) {
        theme.coauthors.push(author.displayName);
      }
    }

    themeMap.set(publication.groupId, theme);

    for (const institution of publicationInstitutions) {
      const directoryEntry = getInstitutionLocation(institution);

      const existing = institutionMap.get(institution) ?? {
        key: institution,
        name: institution,
        city: directoryEntry.city,
        country: directoryEntry.country,
        lat: directoryEntry.lat,
        lon: directoryEntry.lon,
        publicationIds: [],
        publications: [],
        authors: [],
        groups: [],
      };

      if (!existing.publicationIds.includes(publication.id)) {
        existing.publicationIds.push(publication.id);
        existing.publications.push(publication);
      }

      for (const { author, affiliationEntry } of authorAffiliationEntries) {
        const authorInstitutions = affiliationEntry.institutions
          .filter((affiliation) => affiliation !== missingAffiliationLabel)
          .map(normalizeInstitutionName);

        if (!author.isSelf && authorInstitutions.includes(institution)) {
          addUnique(existing.authors, author.displayName);
        }
      }

      addUnique(existing.groups, publication.groupTitle);

      institutionMap.set(institution, existing);
    }
  }

  const coauthors = Array.from(authorMap.values())
    .filter((author) => author.surname.toLowerCase() !== "dhabu")
    .sort(
      (first, second) =>
        second.publicationIds.length - first.publicationIds.length ||
        first.displayName.localeCompare(second.displayName),
    );

  const institutions = Array.from(institutionMap.values()).sort(
    (first, second) =>
      second.publicationIds.length - first.publicationIds.length ||
      first.name.localeCompare(second.name),
  );

  const themes = Array.from(themeMap.values()).sort(
    (first, second) =>
      second.publicationIds.length - first.publicationIds.length ||
      first.title.localeCompare(second.title),
  );
  const homeInstitutions = Array.from(homeInstitutionMap.values())
    .map((homeInstitution) => ({
      ...homeInstitution,
      collaborators: homeInstitution.collaborators.sort(
        (first, second) =>
          second.publicationIds.length - first.publicationIds.length ||
          first.name.localeCompare(second.name),
      ),
    }))
    .sort(
      (first, second) =>
        homeInstitutionNames.indexOf(first.name as never) -
        homeInstitutionNames.indexOf(second.name as never),
    );

  return {
    coauthors,
    homeInstitutions,
    institutions,
    themes,
  };
}

function themeStyle(theme: Pick<ThemeSummary, "color" | "deepColor">): CSSProperties {
  return {
    "--theme-color": theme.color,
    "--theme-deep-color": theme.deepColor,
  } as CSSProperties;
}

function getPrimaryThemeForAuthor(author: AuthorSummary, themes: ThemeSummary[]) {
  const themeCounts = author.publications.reduce<Record<string, number>>((counts, publication) => {
    counts[publication.groupId] = (counts[publication.groupId] ?? 0) + 1;
    return counts;
  }, {});
  const primaryThemeId = Object.entries(themeCounts).sort(
    (first, second) => second[1] - first[1],
  )[0]?.[0];

  return themes.find((theme) => theme.id === primaryThemeId);
}

function getPrimaryThemeForPublications(publications: FlatPublication[], themes: ThemeSummary[]) {
  const themeCounts = publications.reduce<Record<string, number>>((counts, publication) => {
    counts[publication.groupId] = (counts[publication.groupId] ?? 0) + 1;
    return counts;
  }, {});
  const primaryThemeId = Object.entries(themeCounts).sort(
    (first, second) => second[1] - first[1],
  )[0]?.[0];

  return themes.find((theme) => theme.id === primaryThemeId);
}

function getPublicationThemeIds(publications: FlatPublication[]) {
  return Array.from(new Set(publications.map((publication) => publication.groupId)));
}

function publicationLabel(publication: PublicationItem) {
  const cleanTitle = publication.title.replace(/\.$/, "");
  return cleanTitle.length > 84 ? `${cleanTitle.slice(0, 81)}...` : cleanTitle;
}

function citationPlotLabel(publication: PublicationItem) {
  const cleanTitle = publication.title.replace(/\.$/, "");
  return cleanTitle.length > 36 ? `${cleanTitle.slice(0, 33)}...` : cleanTitle;
}

function authorTooltip(author: AuthorSummary) {
  return [
    `${author.displayName}, ${author.publicationIds.length} shared publications`,
    `Affiliations: ${author.institutions.join("; ")}`,
  ].join("\n");
}

function institutionTooltip(institution: {
  name: string;
  city: string;
  country: string;
  publicationIds: string[];
  authors: string[];
}) {
  return [
    `${institution.name}, ${institution.city}, ${institution.country}`,
    `${institution.publicationIds.length} publication${
      institution.publicationIds.length === 1 ? "" : "s"
    }`,
    `${institution.authors.length} coauthor${institution.authors.length === 1 ? "" : "s"}`,
  ].join("\n");
}

function handleSvgKeyboard(event: KeyboardEvent<SVGGElement>, onSelect: () => void) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    onSelect();
  }
}

function polarPoint(index: number, total: number, radiusX: number, radiusY: number) {
  const angle = total === 1 ? -Math.PI / 2 : (index / total) * Math.PI * 2 - Math.PI / 2;

  return {
    x: 360 + Math.cos(angle) * radiusX,
    y: 215 + Math.sin(angle) * radiusY,
  };
}

const networkWidth = 720;
const networkHeight = 430;
const institutionNetworkCenter = {
  x: networkWidth / 2,
  y: networkHeight / 2,
};

const shortInstitutionNames: Record<string, string> = {
  "Indian Institute of Technology Madras": "IIT Madras",
  "University of Hamburg": "U Hamburg",
  "Ludwig Maximilian University of Munich": "LMU Munich",
  "Federal Institute for Materials Research and Testing": "BAM Berlin",
  "BGR - Federal Institute for Geosciences and Natural Resources": "BGR Hannover",
  "Vestas Wind Systems, Vestas Deutschland GmbH": "Vestas Hamburg",
  "Opole University of Technology": "Opole Tech",
  "National Geophysical Research Institute": "NGRI Hyderabad",
  [csirFourthParadigmInstituteName]: "CSIR-4PI",
  "Indian Space Research Organisation": "ISRO Bengaluru",
  "ISRO-Space Applications Centre Ahmedabad India": "ISRO SAC",
  "Max Planck Institute for Solar System Research": "MPS Gottingen",
  "Planetary Science Institute": "PSI Tucson",
  "German Aerospace Center": "DLR Cologne",
  "University of Potsdam": "U Potsdam",
  [cnrsInstitutionName]: "CNRS",
};

function institutionLabel(institutionName: string) {
  return shortInstitutionNames[institutionName] ?? institutionName;
}

function splitInstitutionNodeLabel(label: string) {
  const words = label.split(/\s+/).filter(Boolean);

  if (label.length <= 11 || words.length <= 1) {
    return [label.length > 14 ? `${label.slice(0, 12)}...` : label];
  }

  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;

    if (nextLine.length <= 12 || !currentLine) {
      currentLine = nextLine;
      continue;
    }

    lines.push(currentLine);
    currentLine = word;
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  if (lines.length <= 2) {
    return lines;
  }

  const secondLine = lines.slice(1).join(" ");
  return [lines[0], secondLine.length > 14 ? `${secondLine.slice(0, 12)}...` : secondLine];
}

function citationCacheDateLabel(generatedAt: string | null) {
  return generatedAt ? generatedAt.slice(0, 10) : "not generated";
}

function citationMatchLabel(matchType?: CitationMatchType) {
  if (!matchType) {
    return null;
  }

  const labels: Record<CitationMatchType, string> = {
    "openalex-id": "OpenAlex ID",
    doi: "DOI",
    arxiv: "arXiv",
    title: "title search",
  };

  return labels[matchType];
}

function NetworkNodeLabel({ lines, y = 0 }: { lines: string[]; y?: number }) {
  return (
    <text textAnchor="middle">
      {lines.map((line, index) => (
        <tspan key={line} x="0" y={y + (lines.length === 1 ? 4 : index === 0 ? -3 : 10)}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

function InstitutionNodeLogo({ logo, radius }: { logo: string; radius: number }) {
  const logoWidth = Math.min(56, Math.max(42, radius * 1.72));
  const logoHeight = 24;
  const logoPadding = 4;

  return (
    <>
      <rect
        className={styles.institutionLogoPlate}
        x={-logoWidth / 2}
        y={-logoHeight / 2}
        width={logoWidth}
        height={logoHeight}
        rx="5"
      />
      <image
        className={styles.institutionNodeLogo}
        href={logo}
        x={-logoWidth / 2 + logoPadding}
        y={-9}
        width={logoWidth - logoPadding * 2}
        height={18}
        preserveAspectRatio="xMidYMid meet"
      />
    </>
  );
}

function ellipsePoint(
  index: number,
  total: number,
  radiusX: number,
  radiusY: number,
  startAngle = -Math.PI / 2,
) {
  const angle = total === 1 ? startAngle : (index / total) * Math.PI * 2 + startAngle;

  return {
    x: institutionNetworkCenter.x + Math.cos(angle) * radiusX,
    y: institutionNetworkCenter.y + Math.sin(angle) * radiusY,
  };
}

function homeInstitutePoint(index: number, total: number) {
  if (total === 1) {
    return {
      x: institutionNetworkCenter.x,
      y: institutionNetworkCenter.y - 104,
    };
  }

  if (total === 2) {
    return {
      x: institutionNetworkCenter.x + (index === 0 ? -118 : 118),
      y: institutionNetworkCenter.y,
    };
  }

  return ellipsePoint(index, total, 128, 86);
}

function AuthorNetwork({
  coauthors,
  themes = [],
  selectedKey,
  onSelect,
}: {
  coauthors: AuthorSummary[];
  themes: ThemeSummary[];
  selectedKey: string | null;
  onSelect: (key: string) => void;
}) {
  const center = { x: 360, y: 215 };
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const focusedKey = selectedKey ?? hoveredKey;
  const focusedThemeId = focusedKey?.startsWith("theme:") ? focusedKey.replace("theme:", "") : null;
  const themeNodes = themes.map((theme, index) => {
    const point = polarPoint(index, themes.length, 122, 86);

    return {
      ...theme,
      key: `theme:${theme.id}`,
      x: point.x,
      y: point.y,
      radius: Math.min(24, 11 + theme.publicationIds.length * 2),
    };
  });
  const nodes = coauthors.map((author, index) => {
    const point = polarPoint(index, coauthors.length, 255, 142);
    const primaryTheme = getPrimaryThemeForAuthor(author, themes);

    return {
      ...author,
      primaryTheme,
      themeIds: Array.from(new Set(author.publications.map((publication) => publication.groupId))),
      x: point.x,
      y: point.y,
      radius: Math.min(26, 10 + author.publicationIds.length * 4),
    };
  });
  const focusedAuthor =
    focusedKey && !focusedKey.startsWith("theme:")
      ? nodes.find((node) => node.key === focusedKey)
      : null;
  const focusedAuthorThemeIds = focusedAuthor ? new Set(focusedAuthor.themeIds) : null;

  return (
    <svg
      className={styles.networkSvg}
      viewBox="0 0 720 430"
      role="img"
      aria-label="Coauthor network"
      onMouseLeave={() => setHoveredKey(null)}
    >
      <g className={styles.networkGrid}>
        <circle cx={center.x} cy={center.y} r="170" />
        <circle cx={center.x} cy={center.y} r="88" />
        <line x1="80" y1={center.y} x2="640" y2={center.y} />
        <line x1={center.x} y1="52" x2={center.x} y2="378" />
      </g>

      <g className={styles.networkLinks}>
        {themeNodes.map((theme) => (
          <line
            key={theme.key}
            x1={center.x}
            y1={center.y}
            x2={theme.x}
            y2={theme.y}
            className={`${styles.themeNetworkLink} ${
              focusedKey === theme.key || focusedAuthorThemeIds?.has(theme.id)
                ? styles.activeThemeNetworkLink
                : ""
            } ${
              focusedAuthorThemeIds && !focusedAuthorThemeIds.has(theme.id)
                ? styles.mutedNetworkLink
                : ""
            }`}
            style={themeStyle(theme)}
            strokeWidth={Math.min(6, 1.4 + theme.publicationIds.length * 0.45)}
          />
        ))}
        {themeNodes.flatMap((theme) =>
          nodes
            .filter((node) =>
              node.publications.some((publication) => publication.groupId === theme.id),
            )
            .map((node) => (
              <line
                key={`${theme.key}-${node.key}`}
                x1={theme.x}
                y1={theme.y}
                x2={node.x}
                y2={node.y}
                className={`${styles.themeNetworkLink} ${styles.authorThemeNetworkLink} ${
                  focusedKey === theme.key ||
                  focusedKey === node.key ||
                  (focusedAuthor?.key === node.key && focusedAuthorThemeIds?.has(theme.id))
                    ? styles.activeThemeNetworkLink
                    : ""
                } ${
                  focusedAuthor && focusedAuthor.key !== node.key ? styles.mutedNetworkLink : ""
                }`}
                style={themeStyle(theme)}
                strokeWidth={1.1}
              />
            )),
        )}
      </g>

      <g className={styles.coreNode}>
        <circle cx={center.x} cy={center.y} r="34" />
        <text x={center.x} y={center.y - 2} textAnchor="middle">
          Anjali
        </text>
        <text x={center.x} y={center.y + 13} textAnchor="middle">
          Dhabu
        </text>
      </g>

      {themeNodes.map((theme) => (
        <g
          key={theme.key}
          // biome-ignore lint/a11y/useSemanticElements: SVG network nodes need grouped focus, transforms, and titles.
          role="button"
          tabIndex={0}
          className={`${styles.networkNode} ${styles.themeNode} ${
            focusedKey === theme.key || focusedAuthorThemeIds?.has(theme.id)
              ? styles.activeNetworkNode
              : ""
          } ${
            focusedAuthorThemeIds && !focusedAuthorThemeIds.has(theme.id)
              ? styles.mutedNetworkNode
              : ""
          }`}
          style={themeStyle(theme)}
          transform={`translate(${theme.x} ${theme.y})`}
          onPointerEnter={() => setHoveredKey(theme.key)}
          onFocus={() => setHoveredKey(theme.key)}
          onBlur={() => setHoveredKey(null)}
          onClick={() => onSelect(theme.key)}
          onKeyDown={(event) => handleSvgKeyboard(event, () => onSelect(theme.key))}
        >
          <title>
            {theme.title}, {theme.publicationIds.length} publications
          </title>
          <circle r={theme.radius} />
          <text y="4" textAnchor="middle">
            {theme.shortTitle}
          </text>
        </g>
      ))}

      {nodes.map((node) => (
        <g
          key={node.key}
          // biome-ignore lint/a11y/useSemanticElements: SVG network nodes need grouped focus, transforms, and titles.
          role="button"
          tabIndex={0}
          className={`${styles.networkNode} ${styles.coauthorNode} ${
            focusedKey === node.key ? styles.activeNetworkNode : ""
          } ${
            (focusedThemeId && !node.themeIds.includes(focusedThemeId)) ||
            (focusedAuthor && focusedAuthor.key !== node.key)
              ? styles.mutedNetworkNode
              : ""
          }`}
          style={node.primaryTheme ? themeStyle(node.primaryTheme) : undefined}
          transform={`translate(${node.x} ${node.y})`}
          onPointerEnter={() => setHoveredKey(node.key)}
          onFocus={() => setHoveredKey(node.key)}
          onBlur={() => setHoveredKey(null)}
          onClick={() => onSelect(node.key)}
          onKeyDown={(event) => handleSvgKeyboard(event, () => onSelect(node.key))}
        >
          <title>{authorTooltip(node)}</title>
          <circle r={node.radius} />
          <text y="4" textAnchor="middle">
            {node.shortName}
          </text>
        </g>
      ))}
    </svg>
  );
}

function InstitutionNetwork({
  institutions,
  homeInstitutions,
  themes,
  selectedKey,
  onSelect,
}: {
  institutions: InstitutionSummary[];
  homeInstitutions: HomeInstitutionSummary[];
  themes: ThemeSummary[];
  selectedKey: string | null;
  onSelect: (key: string) => void;
}) {
  const institutionLookup = new Map(
    institutions.map((institution) => [institution.key, institution]),
  );
  const focusedThemeId = selectedKey?.startsWith("theme:")
    ? selectedKey.replace("theme:", "")
    : null;
  const selectedTheme = themes.find((theme) => theme.id === focusedThemeId);
  const homeInstitutionKeys = new Set<string>(homeInstitutionNames);
  const collaboratorMap = new Map<string, InstitutionSummary>();

  for (const homeInstitution of homeInstitutions) {
    for (const collaborator of homeInstitution.collaborators) {
      const fullInstitution = institutionLookup.get(collaborator.key);

      collaboratorMap.set(collaborator.key, fullInstitution ?? collaborator);
    }
  }

  for (const institution of institutions) {
    if (!homeInstitutionKeys.has(institution.key) && !collaboratorMap.has(institution.key)) {
      collaboratorMap.set(institution.key, institution);
    }
  }

  const makeNode = (
    institution: InstitutionSummary | HomeCollaboratorSummary | HomeInstitutionSummary,
    point: { x: number; y: number },
    isHome: boolean,
  ) => {
    const fullInstitution = institutionLookup.get(institution.key);
    const location = getInstitutionLocation(institution.name);
    const publications = fullInstitution?.publications ?? institution.publications;
    const publicationIds = fullInstitution?.publicationIds ?? institution.publicationIds;
    const authors =
      fullInstitution?.authors ?? ("authors" in institution ? institution.authors : []);
    const groups =
      fullInstitution?.groups ??
      ("groups" in institution
        ? institution.groups
        : Array.from(new Set(publications.map((publication) => publication.groupTitle))));
    const primaryTheme = getPrimaryThemeForPublications(publications, themes);
    const label = institutionLabel(institution.name);
    const logo = getInstitutionLogo(institution.name);

    return {
      key: institution.key,
      name: institution.name,
      city: institution.city,
      country: institution.country,
      lat: "lat" in institution ? institution.lat : location.lat,
      lon: "lon" in institution ? institution.lon : location.lon,
      publicationIds,
      publications,
      authors,
      groups,
      isHome,
      logo,
      primaryTheme,
      themeIds: getPublicationThemeIds(publications),
      x: point.x,
      y: point.y,
      radius: isHome
        ? Math.min(40, Math.max(30, 18 + publicationIds.length * 2.2))
        : Math.min(34, Math.max(24, 14 + publicationIds.length * 2.1)),
      labelLines: splitInstitutionNodeLabel(label),
    };
  };

  const homeNodes = homeInstitutions.map((homeInstitution, index) =>
    makeNode(homeInstitution, homeInstitutePoint(index, homeInstitutions.length), true),
  );
  const collaboratorInstitutions = Array.from(collaboratorMap.values()).sort(
    (first, second) =>
      second.publicationIds.length - first.publicationIds.length ||
      first.name.localeCompare(second.name),
  );
  const collaboratorNodes = collaboratorInstitutions.map((institution, index) =>
    makeNode(institution, ellipsePoint(index, collaboratorInstitutions.length, 282, 158), false),
  );
  const institutionNodes = [...homeNodes, ...collaboratorNodes];
  const renderInstitutionNodeContent = (node: ReturnType<typeof makeNode>) => {
    if (node.logo) {
      return <InstitutionNodeLogo logo={node.logo} radius={node.radius} />;
    }

    const labelLength = node.labelLines.join(" ").length;
    const labelY = node.labelLines.length > 1 || labelLength > 11 ? node.radius + 10 : 0;

    return <NetworkNodeLabel lines={node.labelLines} y={labelY} />;
  };
  const nodeLookup = new Map(institutionNodes.map((node) => [node.key, node]));
  const links = homeInstitutions.flatMap((homeInstitution) =>
    homeInstitution.collaborators.map((collaborator) => {
      const themeIds = getPublicationThemeIds(collaborator.publications);
      const primaryTheme =
        selectedTheme && themeIds.includes(selectedTheme.id)
          ? selectedTheme
          : getPrimaryThemeForPublications(collaborator.publications, themes);

      return {
        key: `${homeInstitution.key}-${collaborator.key}`,
        homeKey: homeInstitution.key,
        collaboratorKey: collaborator.key,
        publications: collaborator.publications,
        publicationIds: collaborator.publicationIds,
        themeIds,
        primaryTheme,
      };
    }),
  );
  const selectedInstitutionKey =
    selectedKey && !selectedKey.startsWith("theme:") ? selectedKey : null;
  const connectedInstitutionKeys = new Set<string>();

  if (selectedInstitutionKey) {
    connectedInstitutionKeys.add(selectedInstitutionKey);

    for (const link of links) {
      if (
        link.homeKey === selectedInstitutionKey ||
        link.collaboratorKey === selectedInstitutionKey
      ) {
        connectedInstitutionKeys.add(link.homeKey);
        connectedInstitutionKeys.add(link.collaboratorKey);
      }
    }
  }

  const isMutedNode = (node: ReturnType<typeof makeNode>) => {
    if (focusedThemeId) {
      return !node.themeIds.includes(focusedThemeId);
    }

    if (selectedInstitutionKey) {
      return !connectedInstitutionKeys.has(node.key);
    }

    return false;
  };
  const isActiveLink = (link: (typeof links)[number]) =>
    Boolean(
      (focusedThemeId && link.themeIds.includes(focusedThemeId)) ||
        selectedInstitutionKey === link.homeKey ||
        selectedInstitutionKey === link.collaboratorKey,
    );
  const isMutedLink = (link: (typeof links)[number]) =>
    Boolean(
      (focusedThemeId && !link.themeIds.includes(focusedThemeId)) ||
        (selectedInstitutionKey &&
          selectedInstitutionKey !== link.homeKey &&
          selectedInstitutionKey !== link.collaboratorKey),
    );

  return (
    <svg
      className={`${styles.networkSvg} ${styles.institutionNetworkSvg}`}
      viewBox={`0 0 ${networkWidth} ${networkHeight}`}
      role="img"
      aria-label="Collaborative institute network"
    >
      <g className={styles.networkGrid}>
        <circle cx={institutionNetworkCenter.x} cy={institutionNetworkCenter.y} r="176" />
        <circle cx={institutionNetworkCenter.x} cy={institutionNetworkCenter.y} r="94" />
        <line x1="78" y1={institutionNetworkCenter.y} x2="642" y2={institutionNetworkCenter.y} />
        <line x1={institutionNetworkCenter.x} y1="50" x2={institutionNetworkCenter.x} y2="380" />
      </g>

      <g className={styles.institutionHomeLinks}>
        {homeNodes.map((node) => (
          <line
            key={`center-${node.key}`}
            x1={institutionNetworkCenter.x}
            y1={institutionNetworkCenter.y}
            x2={node.x}
            y2={node.y}
          />
        ))}
      </g>

      <g className={styles.networkLinks}>
        {links.map((link) => {
          const homeNode = nodeLookup.get(link.homeKey);
          const collaboratorNode = nodeLookup.get(link.collaboratorKey);

          if (!homeNode || !collaboratorNode) {
            return null;
          }

          const controlX =
            institutionNetworkCenter.x + (collaboratorNode.x - institutionNetworkCenter.x) * 0.18;

          return (
            <path
              key={link.key}
              d={`M ${homeNode.x} ${homeNode.y} C ${controlX} ${homeNode.y}, ${controlX} ${collaboratorNode.y}, ${collaboratorNode.x} ${collaboratorNode.y}`}
              className={`${styles.institutionNetworkLink} ${
                isActiveLink(link) ? styles.activeThemeNetworkLink : ""
              } ${isMutedLink(link) ? styles.mutedNetworkLink : ""}`}
              style={link.primaryTheme ? themeStyle(link.primaryTheme) : undefined}
              strokeWidth={Math.min(6, 1.4 + link.publicationIds.length * 0.65)}
            />
          );
        })}
      </g>

      <g className={styles.coreNode}>
        <circle cx={institutionNetworkCenter.x} cy={institutionNetworkCenter.y} r="34" />
        <text x={institutionNetworkCenter.x} y={institutionNetworkCenter.y - 2} textAnchor="middle">
          Anjali
        </text>
        <text
          x={institutionNetworkCenter.x}
          y={institutionNetworkCenter.y + 13}
          textAnchor="middle"
        >
          Dhabu
        </text>
      </g>

      {homeNodes.map((node) => (
        <g
          key={node.key}
          // biome-ignore lint/a11y/useSemanticElements: SVG network nodes need grouped focus, transforms, and titles.
          role="button"
          tabIndex={0}
          className={`${styles.networkNode} ${styles.institutionHubNode} ${
            selectedKey === node.key ? styles.activeNetworkNode : ""
          } ${isMutedNode(node) ? styles.mutedNetworkNode : ""}`}
          style={node.primaryTheme ? themeStyle(node.primaryTheme) : undefined}
          transform={`translate(${node.x} ${node.y})`}
          aria-label={node.name}
          onClick={() => onSelect(node.key)}
          onKeyDown={(event) => handleSvgKeyboard(event, () => onSelect(node.key))}
        >
          <title>{institutionTooltip(node)}</title>
          <circle r={node.radius} />
          {renderInstitutionNodeContent(node)}
        </g>
      ))}

      {collaboratorNodes.map((node) => (
        <g
          key={node.key}
          // biome-ignore lint/a11y/useSemanticElements: SVG network nodes need grouped focus, transforms, and titles.
          role="button"
          tabIndex={0}
          className={`${styles.networkNode} ${styles.institutionPartnerNode} ${
            selectedKey === node.key ? styles.activeNetworkNode : ""
          } ${isMutedNode(node) ? styles.mutedNetworkNode : ""}`}
          style={node.primaryTheme ? themeStyle(node.primaryTheme) : undefined}
          transform={`translate(${node.x} ${node.y})`}
          aria-label={node.name}
          onClick={() => onSelect(node.key)}
          onKeyDown={(event) => handleSvgKeyboard(event, () => onSelect(node.key))}
        >
          <title>{institutionTooltip(node)}</title>
          <circle r={node.radius} />
          {renderInstitutionNodeContent(node)}
        </g>
      ))}

      {!collaboratorNodes.length && (
        <text className={styles.citationEmptyText} x="360" y="342" textAnchor="middle">
          Institute links build from publication affiliations
        </text>
      )}
    </svg>
  );
}

function CitationNetwork({
  publications,
  themes = [],
  citationResults,
  selectedKey,
  onSelect,
}: {
  publications: FlatPublication[];
  themes: ThemeSummary[];
  citationResults: Record<string, CitationResult>;
  selectedKey: string | null;
  onSelect: (key: string) => void;
}) {
  const plotTop = 74;
  const plotHeight = 320;
  const barX = 278;
  const barMaxWidth = 168;
  const sourcePublications = [...publications]
    .sort((first, second) => {
      const firstResult = citationResults[first.id];
      const secondResult = citationResults[second.id];
      const firstCount = firstResult?.citedByCount ?? 0;
      const secondCount = secondResult?.citedByCount ?? 0;
      const firstYear = Number.parseInt(first.year, 10) || 0;
      const secondYear = Number.parseInt(second.year, 10) || 0;

      return (
        secondCount - firstCount ||
        Number(secondResult?.status === "ready") - Number(firstResult?.status === "ready") ||
        secondYear - firstYear ||
        publicationLabel(first).localeCompare(publicationLabel(second))
      );
    })
    .slice(0, 9);
  const maxCitationCount = Math.max(
    1,
    ...sourcePublications.map((publication) => citationResults[publication.id]?.citedByCount ?? 0),
  );
  const citingWorkMap = new Map<CitingWork["id"], CitingWork & { sourceIds: string[] }>();

  for (const publication of sourcePublications) {
    for (const work of (citationResults[publication.id]?.citingWorks ?? []).slice(0, 3)) {
      const existingWork = citingWorkMap.get(work.id);

      if (existingWork) {
        addUnique(existingWork.sourceIds, publication.id);
        continue;
      }

      citingWorkMap.set(work.id, {
        ...work,
        sourceIds: [publication.id],
      });
    }
  }

  const uniqueCitingWorks = Array.from(citingWorkMap.values()).slice(0, 9);
  const sourceSpacing = plotHeight / Math.max(1, sourcePublications.length);
  const citingSpacing = plotHeight / Math.max(1, uniqueCitingWorks.length);
  const themeSpacing = plotHeight / Math.max(1, themes.length);
  const themeNodes = themes.map((theme, index) => ({
    ...theme,
    key: `theme:${theme.id}`,
    x: 82,
    y: plotTop + themeSpacing * index + themeSpacing / 2,
    radius: Math.min(22, 11 + theme.publicationIds.length * 1.4),
  }));
  const themeLookup = new Map(themeNodes.map((theme) => [theme.id, theme]));
  const sourceNodes = sourcePublications.map((publication, index) => {
    const result = citationResults[publication.id];
    const citationCount = result?.citedByCount ?? 0;
    const statusLabel =
      result?.status === "ready"
        ? `${citationCount} citation${citationCount === 1 ? "" : "s"}`
        : "not indexed";

    return {
      publication,
      theme: themeLookup.get(publication.groupId),
      key: `source:${publication.id}`,
      x: 242,
      y: plotTop + sourceSpacing * index + sourceSpacing / 2,
      citationCount,
      status: result?.status,
      statusLabel,
      label: citationPlotLabel(publication),
      barWidth: Math.round((citationCount / maxCitationCount) * barMaxWidth),
    };
  });
  const citingNodes = uniqueCitingWorks.map((work, index) => ({
    work,
    key: `citing:${work.id}`,
    x: 610,
    y: plotTop + citingSpacing * index + citingSpacing / 2,
  }));
  const sourceLookup = new Map(sourceNodes.map((node) => [node.publication.id, node]));
  const citingLookup = new Map(citingNodes.map((node) => [node.work.id, node]));

  return (
    <svg
      className={styles.networkSvg}
      viewBox="0 0 760 430"
      role="img"
      aria-label="Citation network"
    >
      <g className={styles.networkColumnLabels}>
        <text x="82" y="36" textAnchor="middle">
          Themes
        </text>
        <text x={barX} y="36">
          Source papers
        </text>
        <text x="610" y="36" textAnchor="middle">
          Recent citing works
        </text>
        <text className={styles.networkColumnHint} x={barX} y="54">
          Ranked by OpenAlex cited-by count
        </text>
      </g>

      <g className={styles.networkGrid}>
        <line x1="164" y1="62" x2="164" y2="402" />
        <line x1="512" y1="62" x2="512" y2="402" />
        <line x1={barX} y1="402" x2={barX + barMaxWidth} y2="402" />
        <circle cx="242" cy="234" r="126" />
        <circle cx="610" cy="234" r="126" />
      </g>

      <g className={styles.networkLinks}>
        {sourceNodes.map((node) => {
          if (!node.theme) {
            return null;
          }

          return (
            <path
              key={`${node.theme.key}-${node.key}`}
              d={`M ${node.theme.x + node.theme.radius} ${node.theme.y} C 142 ${node.theme.y}, 184 ${
                node.y
              }, ${node.x - 16} ${node.y}`}
              className={`${styles.themeNetworkLink} ${
                selectedKey === node.theme.key || selectedKey === node.key
                  ? styles.activeThemeNetworkLink
                  : ""
              }`}
              style={themeStyle(node.theme)}
            />
          );
        })}
        {uniqueCitingWorks.flatMap((work) =>
          work.sourceIds.map((sourceId) => {
            const sourceNode = sourceLookup.get(sourceId);
            const citingNode = citingLookup.get(work.id);

            if (!sourceNode || !citingNode) {
              return null;
            }

            const linkStartX = barX + Math.max(12, sourceNode.barWidth) + 8;

            return (
              <path
                key={`${sourceId}-${work.id}`}
                d={`M ${linkStartX} ${sourceNode.y + 4} C 468 ${sourceNode.y}, 510 ${
                  citingNode.y
                }, ${citingNode.x - 16} ${citingNode.y}`}
                className={
                  selectedKey === sourceNode.key ||
                  selectedKey === citingNode.key ||
                  selectedKey === sourceNode.theme?.key
                    ? styles.activeNetworkLink
                    : undefined
                }
              />
            );
          }),
        )}
      </g>

      {themeNodes.map((theme) => (
        <g
          key={theme.key}
          // biome-ignore lint/a11y/useSemanticElements: SVG network nodes need grouped focus, transforms, and titles.
          role="button"
          tabIndex={0}
          className={`${styles.networkNode} ${styles.themeNode} ${
            selectedKey === theme.key ? styles.activeNetworkNode : ""
          }`}
          style={themeStyle(theme)}
          transform={`translate(${theme.x} ${theme.y})`}
          onClick={() => onSelect(theme.key)}
          onKeyDown={(event) => handleSvgKeyboard(event, () => onSelect(theme.key))}
        >
          <title>{theme.title}</title>
          <circle r={theme.radius} />
          <text y="4" textAnchor="middle">
            {theme.shortTitle}
          </text>
        </g>
      ))}

      {sourceNodes.map((node) => {
        const radius = Math.min(24, 11 + Math.sqrt(node.citationCount));

        return (
          <g
            key={node.key}
            // biome-ignore lint/a11y/useSemanticElements: SVG network nodes need grouped focus, transforms, and titles.
            role="button"
            tabIndex={0}
            className={`${styles.networkNode} ${styles.sourceNode} ${
              selectedKey === node.key ? styles.activeNetworkNode : ""
            }`}
            style={node.theme ? themeStyle(node.theme) : undefined}
            transform={`translate(${node.x} ${node.y})`}
            onClick={() => onSelect(node.key)}
            onKeyDown={(event) => handleSvgKeyboard(event, () => onSelect(node.key))}
          >
            <title>{publicationLabel(node.publication)}</title>
            <circle r={radius} />
            <text y="4" textAnchor="middle">
              {node.publication.year}
            </text>
          </g>
        );
      })}

      <g className={styles.citationBars}>
        {sourceNodes.map((node) => (
          <g
            key={`${node.key}:bar`}
            className={selectedKey === node.key ? styles.activeCitationBarRow : undefined}
            style={node.theme ? themeStyle(node.theme) : undefined}
          >
            <text className={styles.citationSourceTitle} x={barX} y={node.y - 11}>
              {node.label}
            </text>
            <rect
              className={styles.citationBarTrack}
              x={barX}
              y={node.y - 1}
              width={barMaxWidth}
              height="8"
              rx="4"
            />
            {node.barWidth > 0 ? (
              <rect
                className={styles.citationBar}
                x={barX}
                y={node.y - 1}
                width={node.barWidth}
                height="8"
                rx="4"
              />
            ) : null}
            <text
              className={`${styles.citationCountLabel} ${
                node.status === "ready" ? "" : styles.citationNotIndexedLabel
              }`}
              x={barX + Math.max(12, node.barWidth) + 8}
              y={node.y + 7}
            >
              {node.statusLabel}
            </text>
          </g>
        ))}
      </g>

      {citingNodes.map((node) => (
        <g
          key={node.key}
          // biome-ignore lint/a11y/useSemanticElements: SVG network nodes need grouped focus, transforms, and titles.
          role="button"
          tabIndex={0}
          className={`${styles.networkNode} ${styles.citingNode} ${
            selectedKey === node.key ? styles.activeNetworkNode : ""
          }`}
          transform={`translate(${node.x} ${node.y})`}
          onClick={() => onSelect(node.key)}
          onKeyDown={(event) => handleSvgKeyboard(event, () => onSelect(node.key))}
        >
          <title>{node.work.title}</title>
          <circle r="13" />
          <text y="4" textAnchor="middle">
            {node.work.year}
          </text>
        </g>
      ))}

      {!sourceNodes.length && (
        <text className={styles.citationEmptyText} x="360" y="216" textAnchor="middle">
          No citation candidates in this view
        </text>
      )}
      {sourceNodes.length > 0 && !uniqueCitingWorks.length && (
        <text className={styles.citationEmptyText} x="610" y="216" textAnchor="middle">
          No citing works loaded
        </text>
      )}
    </svg>
  );
}

function DetailPanel({
  mode,
  selectedKey,
  coauthors,
  institutions,
  themes = [],
  publications,
  citationResults,
  citationGeneratedAt,
}: {
  mode: MapMode;
  selectedKey: string | null;
  coauthors: AuthorSummary[];
  institutions: InstitutionSummary[];
  themes: ThemeSummary[];
  publications: FlatPublication[];
  citationResults: Record<string, CitationResult>;
  citationGeneratedAt: string | null;
}) {
  const focusedThemeId = selectedKey?.startsWith("theme:")
    ? selectedKey.replace("theme:", "")
    : null;
  const selectedTheme = themes.find((theme) => theme.id === focusedThemeId);

  if (selectedTheme) {
    return (
      <aside className={styles.networkDetails}>
        <p className={styles.detailLabel}>Research theme</p>
        <h3>{selectedTheme.title}</h3>
        <p>
          {selectedTheme.focus}. {selectedTheme.publicationIds.length} publication
          {selectedTheme.publicationIds.length === 1 ? "" : "s"}, {selectedTheme.coauthors.length}{" "}
          coauthor{selectedTheme.coauthors.length === 1 ? "" : "s"}, and{" "}
          {selectedTheme.institutions.length} institution
          {selectedTheme.institutions.length === 1 ? "" : "s"} in this view.
        </p>
        <div className={styles.detailMeta}>
          {selectedTheme.institutions.map((institution) => (
            <span key={institution}>{institution}</span>
          ))}
        </div>
        <ul className={styles.detailList}>
          {selectedTheme.publications.slice(0, 4).map((publication) => (
            <li key={publication.id}>{publicationLabel(publication)}</li>
          ))}
        </ul>
      </aside>
    );
  }

  if (mode === "authors") {
    const focusedAuthor = coauthors.find((author) => author.key === selectedKey) ?? coauthors[0];

    return (
      <aside className={styles.networkDetails}>
        <p className={styles.detailLabel}>Coauthor focus</p>
        <h3>{focusedAuthor?.displayName ?? "Collaboration network"}</h3>
        <p>
          {focusedAuthor
            ? `${focusedAuthor.publicationIds.length} shared publication${
                focusedAuthor.publicationIds.length === 1 ? "" : "s"
              } across ${focusedAuthor.groups.length} research group${
                focusedAuthor.groups.length === 1 ? "" : "s"
              }.`
            : "Coauthor relationships are derived from the publication list."}
        </p>
        {focusedAuthor && (
          <>
            <div className={styles.detailBlock}>
              <div className={styles.detailBlockHeader}>
                <span>Affiliations</span>
              </div>
              <div className={styles.detailMeta}>
                {focusedAuthor.institutions.map((institution) => (
                  <span key={institution}>{institution}</span>
                ))}
              </div>
            </div>
            <ul className={styles.detailList}>
              {focusedAuthor.publications.slice(0, 4).map((publication) => (
                <li key={publication.id}>{publicationLabel(publication)}</li>
              ))}
            </ul>
          </>
        )}
      </aside>
    );
  }

  if (mode === "institutions") {
    const selectedInstitution =
      institutions.find((institution) => institution.key === selectedKey) ?? institutions[0];
    const selectedInstitutionLogo = selectedInstitution
      ? getInstitutionLogo(selectedInstitution.name)
      : null;
    const linkedPublications = selectedInstitution?.publications.slice(0, 3) ?? [];

    return (
      <aside className={styles.networkDetails}>
        <div className={styles.institutionDetailHeader}>
          {selectedInstitutionLogo && selectedInstitution ? (
            <span className={styles.detailLogoPlate}>
              <img src={selectedInstitutionLogo} alt="" />
            </span>
          ) : null}
          <div>
            <p className={styles.detailLabel}>Institution focus</p>
            <h3>{selectedInstitution?.name ?? "Institute network"}</h3>
          </div>
        </div>
        <p>
          {selectedInstitution
            ? `${selectedInstitution.city}, ${selectedInstitution.country}. ${
                selectedInstitution.publicationIds.length
              } publication${selectedInstitution.publicationIds.length === 1 ? "" : "s"} in this view.`
            : "Institution locations come from the collaboration metadata on each publication."}
        </p>
        {selectedInstitution && (
          <>
            <div className={styles.detailBlock}>
              <div className={styles.detailBlockHeader}>
                <span>Research themes</span>
                <small>{selectedInstitution.groups.length}</small>
              </div>
              <div className={styles.detailMeta}>
                {selectedInstitution.groups.map((group) => (
                  <span key={group}>{group}</span>
                ))}
              </div>
            </div>
            {selectedInstitution.authors.length ? (
              <div className={styles.detailBlock}>
                <div className={styles.detailBlockHeader}>
                  <span>Coauthors</span>
                  <small>{selectedInstitution.authors.length}</small>
                </div>
                <div className={styles.detailMeta}>
                  {selectedInstitution.authors.slice(0, 6).map((author) => (
                    <span key={author}>{author}</span>
                  ))}
                </div>
              </div>
            ) : null}
            {linkedPublications.length ? (
              <div className={styles.detailBlock}>
                <div className={styles.detailBlockHeader}>
                  <span>Linked publications</span>
                  <small>{selectedInstitution.publications.length}</small>
                </div>
                <ul className={styles.detailList}>
                  {linkedPublications.map((publication) => {
                    const publicationUrl = publication.href ?? publication.pdf;

                    return (
                      <li key={publication.id}>
                        {publicationUrl ? (
                          <a
                            href={publicationUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.detailPublicationLink}
                          >
                            {publicationLabel(publication)}
                          </a>
                        ) : (
                          publicationLabel(publication)
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </>
        )}
      </aside>
    );
  }

  const selectedSourceId = selectedKey?.startsWith("source:")
    ? selectedKey.replace("source:", "")
    : null;
  const selectedSource = publications.find((publication) => publication.id === selectedSourceId);
  const selectedCitationResult = selectedSource ? citationResults[selectedSource.id] : null;
  const selectedCitationMatch = citationMatchLabel(selectedCitationResult?.matchedBy);
  const selectedCitingKey = selectedKey?.startsWith("citing:")
    ? selectedKey.replace("citing:", "")
    : null;
  const selectedCitingWork = selectedCitingKey
    ? Object.values(citationResults)
        .flatMap((result) =>
          result.citingWorks.map((work) => ({
            ...work,
            sourceId: result.publicationId,
          })),
        )
        .find((work) => work.id === selectedCitingKey)
    : null;

  if (selectedCitingWork) {
    return (
      <aside className={styles.networkDetails}>
        <p className={styles.detailLabel}>Citing work</p>
        <h3>{selectedCitingWork.title}</h3>
        <p>{selectedCitingWork.authors}</p>
        <div className={styles.detailMeta}>
          <span>{selectedCitingWork.year}</span>
          <span>{selectedCitingWork.venue}</span>
        </div>
        <a
          href={selectedCitingWork.url}
          target="_blank"
          rel="noreferrer"
          className={styles.detailLink}
        >
          Open citing work
        </a>
      </aside>
    );
  }

  return (
    <aside className={styles.networkDetails}>
      <p className={styles.detailLabel}>Citation focus</p>
      <h3>{selectedSource ? publicationLabel(selectedSource) : "Citation network"}</h3>
      <p>
        {selectedCitationResult?.status === "ready"
          ? `${selectedCitationResult.citedByCount ?? 0} citing work${
              selectedCitationResult.citedByCount === 1 ? "" : "s"
            } reported by OpenAlex.`
          : selectedCitationResult?.status === "not-found"
            ? "This publication is not indexed in the current OpenAlex cache."
            : (selectedCitationResult?.message ??
              `Citation records are cached from OpenAlex. Last updated: ${citationCacheDateLabel(
                citationGeneratedAt,
              )}.`)}
      </p>
      {selectedSource && (
        <div className={styles.detailMeta}>
          {getDoi(selectedSource) && <span>DOI {getDoi(selectedSource)}</span>}
          {selectedSource.arxivId && <span>arXiv {selectedSource.arxivId}</span>}
          {selectedCitationMatch && <span>Matched by {selectedCitationMatch}</span>}
          <span>{selectedSource.year}</span>
        </div>
      )}
      {selectedCitationResult?.openAlexUrl ? (
        <a
          href={selectedCitationResult.openAlexUrl}
          target="_blank"
          rel="noreferrer"
          className={styles.detailLink}
        >
          Open OpenAlex record
        </a>
      ) : null}
      {selectedCitationResult?.citingWorks.length ? (
        <ul className={styles.detailList}>
          {selectedCitationResult.citingWorks.slice(0, 4).map((work) => (
            <li key={work.id}>{work.title}</li>
          ))}
        </ul>
      ) : null}
    </aside>
  );
}

export function CollaborationMap({ publications, activeGroup }: CollaborationMapProps) {
  const [mode, setMode] = useState<MapMode>("authors");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const scopedPublications = useMemo(
    () => getScopedPublications(publications, activeGroup),
    [activeGroup, publications],
  );
  const citationCandidates = useMemo(
    () => getCitationCandidates(scopedPublications),
    [scopedPublications],
  );
  const { coauthors, homeInstitutions, institutions, themes } = useMemo(
    () => buildNetworkData(scopedPublications),
    [scopedPublications],
  );
  const featuredInstitutions = featuredInstitutionNames.flatMap((institutionName) => {
    const institution = institutions.find((item) => item.name === institutionName);

    if (!institution) {
      return [];
    }

    const primaryTheme = getPrimaryThemeForPublications(institution.publications, themes);

    return [
      {
        ...institution,
        logo: getInstitutionLogo(institution.name),
        primaryTheme,
      },
    ];
  });

  const readyCitationCount = citationCandidates.filter(
    (publication) => generatedCitationResults[publication.id]?.status === "ready",
  ).length;
  const publicationTotal = scopedPublications.filter(
    (publication) => publication.type === "Journal" || publication.type === "Conference",
  ).length;
  const citationTotal = Object.values(generatedCitationResults)
    .filter((result) =>
      citationCandidates.some((publication) => publication.id === result.publicationId),
    )
    .reduce((total, result) => total + (result.citedByCount ?? 0), 0);

  const modeStats: Record<MapMode, string> = {
    authors: coauthors.length.toString(),
    institutions: institutions.length.toString(),
    citations: citationCandidates.length.toString(),
  };

  return (
    <section className={styles.collaborationSection} aria-label="Collaboration and citation atlas">
      <div className={styles.collaborationHeader}>
        <div>
          <p className={styles.eyebrow}>Collaboration Atlas</p>
          <h2>People, places, and citation paths around the publications.</h2>
          <p>
            Coauthor links, institutional homes, and incoming citation paths reveal how each
            research theme travels beyond the paper list.
          </p>
        </div>
        <div className={styles.networkStats} aria-label="Network summary">
          <span title="Journal articles and conference contributions, matching the home page">
            <strong>{publicationTotal}</strong>
            publications
          </span>
          <span>
            <strong>{themes.length}</strong>
            themes
          </span>
          <span>
            <strong>{institutions.length}</strong>
            Institutions
          </span>
          <span>
            <strong>{citationTotal}</strong>
            citations
          </span>
        </div>
      </div>

      {featuredInstitutions.length ? (
        <div>
          <p className={styles.featuredCollaborationNote}>
            Featured collaborations · {featuredInstitutions.length} of {institutions.length}{" "}
            institutions shown below. Explore the full network in the Institutions tab.
          </p>
          <div className={styles.featuredCollaborationGrid} aria-label="Featured collaborations">
            {featuredInstitutions.map((institution) => {
              const isActive = mode === "institutions" && selectedKey === institution.key;

              return (
                <button
                  key={institution.key}
                  type="button"
                  className={`${styles.featuredCollaborationCard} ${
                    isActive ? styles.activeFeaturedCollaborationCard : ""
                  }`}
                  style={institution.primaryTheme ? themeStyle(institution.primaryTheme) : undefined}
                  onClick={() => {
                    setMode("institutions");
                    setSelectedKey(institution.key);
                  }}
                  aria-pressed={isActive}
                >
                  <span className={styles.featuredLogoPlate}>
                    {institution.logo ? <img src={institution.logo} alt="" /> : null}
                  </span>
                  <span className={styles.featuredCollaborationBody}>
                    <strong>{institutionLabel(institution.name)}</strong>
                    <span>{institution.country}</span>
                  </span>
                  <span className={styles.featuredCollaborationMeta}>
                    <small>
                      {institution.publicationIds.length} publication
                      {institution.publicationIds.length === 1 ? "" : "s"}
                    </small>
                    <small>{institution.primaryTheme?.shortTitle ?? "Institution"}</small>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className={styles.networkToolbar} aria-label="Network view controls">
        <div className={styles.modeTabs} role="tablist" aria-label="Network mode">
          {modeOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`${styles.modeTab} ${mode === option.id ? styles.activeModeTab : ""}`}
              onClick={() => {
                setMode(option.id);
                setSelectedKey(null);
              }}
              role="tab"
              aria-selected={mode === option.id}
            >
              <strong>{modeStats[option.id]}</strong>
              {option.label}
            </button>
          ))}
        </div>
        {mode === "citations" && (
          <p className={styles.citationCacheNote}>
            OpenAlex: {readyCitationCount}/{citationCandidates.length} indexed, updated{" "}
            {citationCacheDateLabel(generatedCitationCache.generatedAt)}
          </p>
        )}
      </div>

      <div className={styles.themeLegend} aria-label="Research themes in the atlas">
        {themes.map((theme) => (
          <button
            key={theme.id}
            type="button"
            className={`${styles.themeLegendItem} ${
              selectedKey === `theme:${theme.id}` ? styles.activeThemeLegendItem : ""
            }`}
            style={themeStyle(theme)}
            onClick={() => setSelectedKey(`theme:${theme.id}`)}
          >
            <span aria-hidden="true" />
            <strong>{theme.title}</strong>
            <small>
              {theme.shortTitle} · {theme.publicationIds.length} publication
              {theme.publicationIds.length === 1 ? "" : "s"}
            </small>
          </button>
        ))}
      </div>

      <div className={styles.networkShell}>
        <div className={styles.networkCanvas}>
          {mode === "authors" && (
            <AuthorNetwork
              coauthors={coauthors}
              themes={themes}
              selectedKey={selectedKey}
              onSelect={setSelectedKey}
            />
          )}
          {mode === "institutions" && (
            <InstitutionNetwork
              institutions={institutions}
              homeInstitutions={homeInstitutions}
              themes={themes}
              selectedKey={selectedKey}
              onSelect={setSelectedKey}
            />
          )}
          {mode === "citations" && (
            <CitationNetwork
              publications={citationCandidates}
              themes={themes}
              citationResults={generatedCitationResults}
              selectedKey={selectedKey}
              onSelect={setSelectedKey}
            />
          )}
        </div>

        <DetailPanel
          mode={mode}
          selectedKey={selectedKey}
          coauthors={coauthors}
          institutions={institutions}
          themes={themes}
          publications={citationCandidates}
          citationResults={generatedCitationResults}
          citationGeneratedAt={generatedCitationCache.generatedAt}
        />
      </div>
    </section>
  );
}
