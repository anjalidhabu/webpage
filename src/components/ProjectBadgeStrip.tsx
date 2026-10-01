import styles from "./ProjectBadgeStrip.module.scss";

interface ProjectBadgeStripProps {
  domain?: string;
  focus?: string;
  scale?: string;
  techStack?: string[];
}

type BadgeTone =
  | "domain"
  | "focus"
  | "scale"
  | "computing"
  | "modeling"
  | "rotational"
  | "structural"
  | "analytical"
  | "data";

type BadgeItem = {
  label: string;
  value: string;
  tone: BadgeTone;
};

const TECH_TONE_RULES: Array<{ match: string[]; tone: BadgeTone }> = [
  { match: ["python", "pandas", "numpy", "opencv", "scikitlearn", "geopandas"], tone: "data" },
  { match: ["matlab"], tone: "computing" },
  { match: ["specfem", "spectral element", "wave-field", "wave propagation"], tone: "modeling" },
  { match: ["finite element", "numerical modeling", "ground-motion"], tone: "modeling" },
  { match: ["rotational", "6c", "six-component", "sensing"], tone: "rotational" },
  { match: ["structural", "modal", "damage", "bridge"], tone: "structural" },
  { match: ["micropolar", "analytical", "green's functions"], tone: "analytical" },
  { match: ["ggplot2", "dplyr", "dpyr", "hmisc", "caret", "boruta", "vsurf"], tone: "data" },
  { match: ["qgis", "openstreetmaps", "osmnx", "networkx"], tone: "data" },
  { match: ["xgboost", "random forest", "ann", "knn", "svm", "ml:"], tone: "data" },
  { match: ["kalman", "state-space"], tone: "computing" },
];

function getTechTone(tech: string): BadgeTone {
  const normalizedTech = tech.trim().toLowerCase();

  if (normalizedTech.startsWith("python:")) {
    return "data";
  }

  if (normalizedTech === "r" || normalizedTech.startsWith("r:")) {
    return "data";
  }

  return (
    TECH_TONE_RULES.find(({ match }) => match.some((keyword) => normalizedTech.includes(keyword)))
      ?.tone || "computing"
  );
}

export function ProjectBadgeStrip({
  domain,
  focus,
  scale,
  techStack = [],
}: ProjectBadgeStripProps) {
  const badges: BadgeItem[] = [
    domain ? { label: "Area", value: domain, tone: "domain" } : null,
    focus ? { label: "Method", value: focus, tone: "focus" } : null,
    scale ? { label: "Output", value: scale, tone: "scale" } : null,
    ...techStack.filter(Boolean).map((tech) => ({
      label: "Tool",
      value: tech,
      tone: getTechTone(tech),
    })),
  ].filter((badge): badge is BadgeItem => Boolean(badge));

  if (badges.length === 0) {
    return null;
  }

  return (
    <div className={styles.badgeStrip}>
      {badges.map((badge) => (
        <span
          key={`${badge.label}-${badge.value}`}
          className={`${styles.badge} ${styles[badge.tone]}`}
        >
          <span className={styles.badgeLabel}>{badge.label}</span>
          <span className={styles.badgeValue}>{badge.value}</span>
        </span>
      ))}
    </div>
  );
}
