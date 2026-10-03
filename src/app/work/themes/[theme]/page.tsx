import { generateSiteMetadata } from "@/utils/metadata";
import { Projects } from "@/components/work/Projects";
import { about, baseURL, person, work } from "@/resources";
import { withBasePath } from "@/utils/paths";
import { Button, Column, Heading, Schema, SmartLink, Text } from "@once-ui-system/core";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { associatedWorkSections, researchThemes } from "../../data";
import type { ResearchTheme } from "../../data";
import styles from "../../page.module.css";

export const dynamicParams = false;
const hersThemeId = "heterogeneities-rotational-seismology";

const researchThemeGroupClassNames: Record<ResearchTheme["group"], string> = {
  "wavefield-physics-theory": styles.signalWavefieldPhysics,
  "earth-sources": styles.signalEarthSources,
  "computational-modeling-tools": styles.signalComputationalTools,
  "observables-data": styles.signalObservablesData,
  "structural-health-monitoring": styles.signalStructuralHealthMonitoring,
};

function getThemePath(theme: string | string[]) {
  const themePath = Array.isArray(theme) ? theme.join("/") : theme || "";

  return decodeURIComponent(themePath);
}

function getThemeData(themeId: string) {
  const theme = researchThemes.find((theme) => theme.id === themeId);
  const section = associatedWorkSections.find((section) => section.id === themeId);

  if (!theme || !section) {
    return undefined;
  }

  return { theme, section };
}

export async function generateStaticParams(): Promise<{ theme: string }[]> {
  return researchThemes
    .filter((theme) => theme.id !== hersThemeId)
    .map((theme) => ({
      theme: theme.id,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ theme: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const themeId = getThemePath(routeParams.theme);
  const themeData = getThemeData(themeId);

  if (!themeData) return {};

  return generateSiteMetadata({
    title: `${themeData.section.title} - ${work.title}`,
    description: themeData.section.summary,
    baseURL: baseURL,
    image: themeData.theme.image || "/images/og/anjali-research-preview-v2.png",
    path: `${work.path}/themes/${themeData.theme.id}`,
  });
}

export default async function ResearchThemePage({
  params,
}: {
  params: Promise<{ theme: string | string[] }>;
}) {
  const routeParams = await params;
  const themeId = getThemePath(routeParams.theme);
  if (themeId === hersThemeId) {
    redirect("/hers");
  }

  const themeData = getThemeData(themeId);

  if (!themeData) {
    notFound();
  }

  const { theme, section } = themeData;

  return (
    <Column
      as="section"
      className={`${styles.themePage} ${researchThemeGroupClassNames[theme.group]}`}
    >
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={`${work.path}/themes/${theme.id}`}
        title={section.title}
        description={section.summary}
        image={theme.image || "/images/og/anjali-research-preview-v2.png"}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <SmartLink href="/work">
        <Text variant="label-strong-m">Work</Text>
      </SmartLink>

      <section className={styles.themeHero}>
        <div className={styles.themeHeroCopy}>
          <Text variant="label-strong-s" onBackground="brand-weak" className={styles.eyebrow}>
            Research Theme
          </Text>
          <Heading as="h1" variant="display-strong-m">
            {section.title}
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak" className={styles.themeLead}>
            {section.summary}
          </Text>
          <div className={styles.themeActions}>
            <Button href="/work" variant="secondary">
              Back to Research Themes
            </Button>
            <Button href="#associated-projects" variant="primary">
              Associated Projects
            </Button>
          </div>
        </div>

        {theme.image && (
          <div className={styles.themeHeroImage}>
            <img src={withBasePath(theme.image)} alt="" aria-hidden="true" />
          </div>
        )}
      </section>

      <section className={styles.themeProjectsSection} aria-labelledby="associated-projects">
        <Column gap="12" className={styles.lookForIntro}>
          <Text variant="label-strong-s" onBackground="brand-weak" className={styles.eyebrow}>
            Associated Projects
          </Text>
          <Heading as="h2" id="associated-projects" variant="heading-strong-l">
            Projects in this theme.
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-weak" className={styles.introText}>
            Each card opens a full project brief with the methods, outputs, collaborators, and
            publication context behind this research direction.
          </Text>
        </Column>

        <Projects slugs={section.projectSlugs} themeId={theme.id} />
      </section>
    </Column>
  );
}
