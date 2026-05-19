import { Flex } from "@once-ui-system/core";

interface ProjectBadgeStripProps {
  domain?: string;
  focus?: string;
  scale?: string;
  techStack?: string[];
}

type BadgeItem = {
  label: string;
  value: string;
  color: string;
};

function createBadgeUrl(label: string, value: string, color: string) {
  const params = new URLSearchParams({
    label,
    message: value,
    color,
  });

  return `https://img.shields.io/static/v1?${params.toString()}`;
}

const TECH_COLOR_RULES: Array<{ match: string[]; color: string }> = [
  { match: ["python", "pandas", "numpy", "opencv", "scikitlearn", "geopandas"], color: "3776AB" },
  { match: ["matlab"], color: "E16737" },
  { match: ["specfem", "spectral element", "wave-field", "wave propagation"], color: "2563EB" },
  { match: ["finite element", "numerical modeling", "ground-motion"], color: "0F766E" },
  { match: ["rotational", "6c", "six-component", "sensing"], color: "7C3AED" },
  { match: ["structural", "modal", "damage", "bridge"], color: "B45309" },
  { match: ["micropolar", "analytical"], color: "475569" },
  { match: ["ggplot2", "dplyr", "dpyr", "hmisc", "caret", "boruta", "vsurf"], color: "EA580C" },
  { match: ["qgis", "openstreetmaps", "osmnx", "networkx"], color: "3A7A3A" },
  { match: ["xgboost", "random forest", "ann", "knn", "svm", "ml:"], color: "C62828" },
  { match: ["kalman", "state-space"], color: "6A1B9A" },
];

function getTechColor(tech: string) {
  const normalizedTech = tech.trim().toLowerCase();

  if (normalizedTech.startsWith("python:")) {
    return "3776AB";
  }

  if (normalizedTech === "r" || normalizedTech.startsWith("r:")) {
    return "EA580C";
  }

  return (
    TECH_COLOR_RULES.find(({ match }) => match.some((keyword) => normalizedTech.includes(keyword)))
      ?.color || "0A66C2"
  );
}

export function ProjectBadgeStrip({
  domain,
  focus,
  scale,
  techStack = [],
}: ProjectBadgeStripProps) {
  const badges: BadgeItem[] = [
    domain ? { label: "Area", value: domain, color: "blue" } : null,
    focus ? { label: "Method", value: focus, color: "blueviolet" } : null,
    scale ? { label: "Output", value: scale, color: "success" } : null,
    ...techStack.filter(Boolean).map((tech) => ({
      label: "Tool",
      value: tech,
      color: getTechColor(tech),
    })),
  ].filter((badge): badge is BadgeItem => Boolean(badge));

  if (badges.length === 0) {
    return null;
  }

  return (
    <Flex wrap gap="8" style={{ lineHeight: 0 }}>
      {badges.map((badge) => (
        <img
          key={`${badge.label}-${badge.value}`}
          src={createBadgeUrl(badge.label, badge.value, badge.color)}
          alt={`${badge.label}: ${badge.value}`}
        />
      ))}
    </Flex>
  );
}
