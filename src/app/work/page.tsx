import { about, baseURL, person, work } from "@/resources";
import { withBasePath } from "@/utils/paths";
import { Button, Column, Heading, Meta, Row, Schema, Text } from "@once-ui-system/core";
import {
  type ResearchTheme,
  associatedWorkSections,
  researchThemes,
  researchVisionGroups,
} from "./data";
import styles from "./page.module.css";

const researchThemeGroupClassNames: Record<ResearchTheme["group"], string> = {
  "wavefield-physics-theory": styles.signalWavefieldPhysics,
  "earth-sources": styles.signalEarthSources,
  "computational-modeling-tools": styles.signalComputationalTools,
  "observables-data": styles.signalObservablesData,
  "structural-health-monitoring": styles.signalStructuralHealthMonitoring,
};

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: "/images/og/anjali-research-preview.png",
    path: work.path,
  });
}

export default function Work() {
  const associatedProjectCounts = new Map(
    associatedWorkSections.map((section) => [section.id, section.projectSlugs.length]),
  );

  return (
    <Column as="main" className={styles.workPage} paddingTop="24" gap="40">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image="/images/og/anjali-research-preview.png"
        author={{
          name: person.name,
          url: baseURL + about.path,
          image: baseURL + person.avatar,
        }}
      />

      <section className={styles.heroSection} aria-labelledby="work-heading">
        <div className={styles.heroCopy}>
          <Text variant="label-strong-m" onBackground="brand-weak" className={styles.eyebrow}>
            Selected Research Work
          </Text>
          <Heading
            as="h1"
            id="work-heading"
            variant="display-strong-m"
            className={styles.heroTitle}
          >
            Seeing earthquake motion beyond translation.
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak" className={styles.heroText}>
            I use numerical simulations to reveal how complex Earth structure shapes rotations,
            strains, and translations in seismic wavefields, connecting earthquake physics with
            structural resilience and six-component ground-motion analysis.
          </Text>
          <div className={styles.heroActions}>
            <Button href="/hers" variant="primary">
              HERS: DFG Individual Grant
            </Button>
            <Button href="/publications" variant="secondary" prefixIcon="document">
              Publications
            </Button>
            <Button href="/leadership" variant="secondary" prefixIcon="rocket">
              Funding & Leadership
            </Button>
          </div>
        </div>

        <figure className={styles.visionFigure}>
          <div className={styles.visionImageScroller}>
            <img
              src={withBasePath("/images/projects/research_vision.png")}
              alt="Research vision diagram connecting complex Earth media, six-component ground motion, and engineering interpretation for structural resilience."
            />
          </div>
          <figcaption>
            The research line moves from complex Earth physics to 6C wavefields and engineering
            decisions for resilient infrastructure.
          </figcaption>
        </figure>
      </section>

      <section className={styles.lookForSection} aria-labelledby="research-themes">
        <Column className={styles.lookForIntro} gap="12">
          <Text variant="label-strong-s" onBackground="brand-weak" className={styles.eyebrow}>
            Research Themes
          </Text>
          <Heading
            as="h2"
            id="research-themes"
            variant="heading-strong-l"
            className={styles.heading}
          >
            Five themes organize the research program.
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-weak" className={styles.introText}>
            Each theme opens into focused projects with methods, outputs, and publication context
            for an independent research agenda.
          </Text>
        </Column>
        <div className={styles.visionThemeGroups}>
          {researchVisionGroups.map((group, groupIndex) => {
            const groupThemes = researchThemes.filter((theme) => theme.group === group.id);
            const groupHeadingId = group.id + "-heading";
            const groupClassName = [
              styles.visionThemeGroup,
              researchThemeGroupClassNames[group.id],
            ].join(" ");

            return (
              <section key={group.id} className={groupClassName} aria-labelledby={groupHeadingId}>
                <div className={styles.visionThemeGroupHeader}>
                  <span className={styles.visionThemeGroupNumber}>{groupIndex + 1}</span>
                  <Column gap="4">
                    <Heading
                      as="h3"
                      id={groupHeadingId}
                      variant="heading-strong-m"
                      className={styles.visionThemeGroupTitle}
                    >
                      {group.title}
                    </Heading>
                    <Text
                      variant="body-default-s"
                      onBackground="neutral-weak"
                      className={styles.visionThemeGroupDetail}
                    >
                      {group.detail}
                    </Text>
                  </Column>
                </div>
                <div className={styles.signalGrid}>
                  {groupThemes.map((theme) => (
                    <a
                      key={theme.label}
                      href={
                        theme.id === "heterogeneities-rotational-seismology"
                          ? "/hers"
                          : "/work/themes/" + theme.id
                      }
                      className={styles.signalCard}
                    >
                      <Heading as="h4" variant="heading-strong-m" className={styles.signalLabel}>
                        {theme.label}
                      </Heading>
                      <Text
                        variant="body-default-s"
                        onBackground="neutral-weak"
                        className={styles.signalDetail}
                      >
                        {theme.detail}
                      </Text>
                      {theme.image && (
                        <span className={styles.signalImageWrap}>
                          <img src={withBasePath(theme.image)} alt="" aria-hidden="true" />
                        </span>
                      )}
                      <span className={styles.signalAction}>
                        {theme.id === "heterogeneities-rotational-seismology"
                          ? "Open HERS flagship"
                          : `${associatedProjectCounts.get(theme.id) ?? 0} associated ${(associatedProjectCounts.get(theme.id) ?? 0) === 1 ? "project" : "projects"}`}
                      </span>
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section className={styles.contactSection}>
        <Column gap="12" className={styles.contactIntro}>
          <Text variant="label-strong-s" onBackground="brand-weak" className={styles.eyebrow}>
            Collaboration & Academic Exchange
          </Text>
          <Heading as="h2" variant="heading-strong-l">
            Interested in collaboration, supervision, or invited talks?
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-weak" className={styles.introText}>
            I welcome research conversations in rotational seismology, earthquake engineering,
            ground-motion simulation, six-component monitoring, and structural health monitoring.
          </Text>
        </Column>
        <Row gap="12" wrap>
          <Button href={"mailto:" + person.email} variant="primary" prefixIcon="email">
            Contact
          </Button>
          <Button
            href={withBasePath("/documents/cv.pdf")}
            download
            variant="secondary"
            prefixIcon="download"
          >
            Download CV
          </Button>
          <Button href="/publications" variant="secondary" prefixIcon="document">
            Publications
          </Button>
          <Button href="/about" variant="secondary" prefixIcon="person">
            About
          </Button>
        </Row>
      </section>
    </Column>
  );
}
