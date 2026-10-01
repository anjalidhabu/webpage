import {
  type ResearchThemeLink,
  getProjectHref,
  getResearchThemeLinksForProject,
} from "@/app/work/data";
import { ProjectCard } from "@/components";
import { person } from "@/resources";
import { getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import styles from "./Projects.module.scss";

const preferredProjectOrder = [
  "hers_heterogeneities_rotational_seismology",
  "extending_specfem_rotational_ground_motions",
  "rotational_ground_motion_theory",
  "fundamental_solutions_reduced_micropolar_half_space",
  "homogeneous reduced micropolar half-space",
  "bridge_rotational_ground_motions",
  "six_component_structural_monitoring",
  "himalayan_topography_ground_motions",
  "strong_motion_generation_extreme_value",
  "topography_simple",
  "mars_seismicity",
  "lunar_boulder_avalanches_moonquake",
  "coupled_teleseismic_ground_motion_simulation",
] as const;

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  slugs?: string[];
  themeId?: string;
}

function orderThemeLinks(themeLinks: ResearchThemeLink[], themeId?: string) {
  if (!themeId) {
    return themeLinks;
  }

  const activeTheme = themeLinks.find((theme) => theme.id === themeId);
  const otherThemes = themeLinks.filter((theme) => theme.id !== themeId);

  return activeTheme ? [activeTheme, ...otherThemes] : themeLinks;
}

export function Projects({ range, exclude, slugs, themeId }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"], { includeContent: false }).filter(
    (post) => post.slug !== "Planetory_Seismology1",
  );

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects =
    slugs && slugs.length > 0
      ? slugs
          .map((slug) => allProjects.find((post) => post.slug === slug))
          .filter((post): post is (typeof allProjects)[number] => Boolean(post))
      : allProjects.sort((a, b) => {
          const aPriority = preferredProjectOrder.indexOf(
            a.slug as (typeof preferredProjectOrder)[number],
          );
          const bPriority = preferredProjectOrder.indexOf(
            b.slug as (typeof preferredProjectOrder)[number],
          );

          if (aPriority !== -1 || bPriority !== -1) {
            if (aPriority === -1) return 1;
            if (bPriority === -1) return -1;
            return aPriority - bPriority;
          }

          return (
            new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
          );
        });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" className={styles.projectList}>
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={getProjectHref(post.slug, themeId)}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          avatars={
            post.metadata.team
              ?.map((member) => ({
                src:
                  member.avatar ||
                  (member.name === person.name || member.name.includes(person.firstName)
                    ? person.avatar
                    : ""),
              }))
              .filter((member) => member.src) || []
          }
          link={post.metadata.link || ""}
          domain={post.metadata.domain}
          focus={post.metadata.focus}
          scale={post.metadata.scale}
          techStack={post.metadata.techStack || []}
          themeLinks={orderThemeLinks(getResearchThemeLinksForProject(post.slug), themeId)}
        />
      ))}
    </Column>
  );
}
