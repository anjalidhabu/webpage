import fetchedCoauthorAffiliations from "./coauthor-affiliations.generated.json";

export const missingAffiliationLabel = "Coauthor affiliation not specified";

export type CoauthorAffiliationSource = "manual" | "fetched" | "missing";

export type CoauthorAffiliationEntry = {
  institutions: string[];
  source: CoauthorAffiliationSource;
};

type CoauthorAffiliationDirectory = Record<string, string[]>;

const generatedCoauthorAffiliations = fetchedCoauthorAffiliations as CoauthorAffiliationDirectory;

// Manual entries win over fetched metadata. Edit this list when a coauthor's current
// or preferred affiliation should be curated by hand.
export const manualCoauthorAffiliations: CoauthorAffiliationDirectory = {
  "balaskas-g": ["University of Hamburg"],
  "bernauer-f": ["Ludwig Maximilian University of Munich"],
  "bode-k": ["Vestas Wind Systems, Vestas Deutschland GmbH"],
  "bonkowski-p": ["Opole University of Technology"],
  "donner-s": ["BGR - Federal Institute for Geosciences and Natural Resources"],
  "igel-h": ["Ludwig Maximilian University of Munich"],
  "liao-c-m": ["Federal Institute for Materials Research and Testing"],
  "matthiessen-n": ["University of Hamburg"],
  "montellier-v": ["University of Hamburg"],
  "muller-l": ["University of Hamburg"],
  "niederleithinger-e": ["Federal Institute for Materials Research and Testing"],
  "wassermann-j": ["Ludwig Maximilian University of Munich"],
  "yuan-s": ["Ludwig Maximilian University of Munich"],
  "zembaty-z": ["Opole University of Technology"],
};

function hasKnownAffiliation(institutions?: string[]) {
  return Boolean(
    institutions?.length &&
      institutions.some((institution) => institution !== missingAffiliationLabel),
  );
}

export function getCoauthorAffiliationEntry(authorKey: string): CoauthorAffiliationEntry {
  const manualInstitutions = manualCoauthorAffiliations[authorKey];

  if (hasKnownAffiliation(manualInstitutions)) {
    return {
      institutions: manualInstitutions,
      source: "manual",
    };
  }

  const fetchedInstitutions = generatedCoauthorAffiliations[authorKey];

  if (hasKnownAffiliation(fetchedInstitutions)) {
    return {
      institutions: fetchedInstitutions,
      source: "fetched",
    };
  }

  return {
    institutions: manualInstitutions ?? [missingAffiliationLabel],
    source: "missing",
  };
}
