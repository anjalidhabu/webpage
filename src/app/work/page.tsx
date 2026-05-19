import { Projects } from "@/components/work/Projects";
import { about, baseURL, person, work } from "@/resources";
import { withBasePath } from "@/utils/paths";
import { Button, Column, Heading, Meta, Row, Schema, Text } from "@once-ui-system/core";
import styles from "./page.module.css";

const researchThemes = [
  {
    label: "Rotational seismology",
    detail:
      "Modeling rotational ground motions, strains, and six-component observations for earthquake science.",
  },
  {
    label: "Earthquake engineering",
    detail:
      "Connecting simulated ground motion with structural response and earthquake-resistant design questions.",
  },
  {
    label: "Heterogeneous media",
    detail:
      "Studying how layered, irregular, or complex Earth structures affect wave propagation and response.",
  },
  {
    label: "Structural monitoring",
    detail:
      "Using 6C sensing and modal analysis to interpret vibrations, damage, and civil infrastructure behavior.",
  },
  {
    label: "Analytical modeling",
    detail:
      "Developing reduced micropolar formulations, fundamental solutions, and interpretable theory.",
  },
  {
    label: "Numerical simulation",
    detail:
      "Building finite-element and spectral-element workflows for regional and teleseismic wave fields.",
  },
];

const visionPillars = [
  {
    title: "Physics of Rotational Ground Motions",
    detail:
      "Quantify how heterogeneities, topography, source processes, and near-surface structure shape rotations, strains, and translations together.",
  },
  {
    title: "6C Simulation-to-Observation Workflows",
    detail:
      "Build numerical and analytical workflows that compare simulated six-component wavefields with emerging rotational and translational measurements.",
  },
  {
    title: "Engineering Translation",
    detail:
      "Turn rotational ground-motion quantities into interpretable inputs for bridge response, structural monitoring, and earthquake-resistant design.",
  },
];

const independenceSignals = [
  "Leads the DFG-funded HERS project at the University of Hamburg.",
  "Builds an independent postdoctoral research line beyond Ph.D. supervision.",
  "Connects geophysics, civil engineering, instrumentation, and structural monitoring.",
];

const caseStudySignals = [
  {
    label: "Research question",
    detail: "The scientific or engineering gap each project addresses.",
  },
  {
    label: "Method",
    detail: "The analytical, numerical, observational, or modeling approach used.",
  },
  {
    label: "Contribution",
    detail: "What the work adds to seismology, earthquake engineering, or monitoring practice.",
  },
  {
    label: "Outputs",
    detail: "Related papers, preprints, conference contributions, grants, or supervision outcomes.",
  },
];

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
  return (
    <Column maxWidth="m" paddingTop="24" gap="40">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image="/images/og/anjali-research-preview.png"
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column gap="20" horizontal="center" align="center">
        <Text variant="label-strong-m" onBackground="brand-weak">
          Selected Research Work
        </Text>
        <Heading variant="display-strong-m" align="center">
          Research vision and stories behind the publications.
        </Heading>
        <Text
          variant="body-default-m"
          onBackground="neutral-weak"
          align="center"
          style={{ maxWidth: "52rem" }}
        >
          A focused view of my work in rotational seismology, earthquake engineering, seismic wave
          simulation, and structural monitoring. The page links a long-term research agenda with
          project briefs that explain the question, method, contribution, and output behind the
          publications.
        </Text>
        <Row gap="12" wrap horizontal="center">
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
          <Button href="/leadership" variant="secondary" prefixIcon="rocket">
            Funding & Leadership
          </Button>
          <Button href={`mailto:${person.email}`} variant="secondary" prefixIcon="email">
            Contact
          </Button>
        </Row>
      </Column>

      <section className={styles.visionSection} aria-labelledby="research-vision">
        <div className={styles.visionLead}>
          <Text variant="label-strong-s" onBackground="brand-weak" className={styles.eyebrow}>
            Research Vision
          </Text>
          <Heading as="h2" id="research-vision" variant="display-strong-s">
            Toward a 6-component understanding of earthquake ground motion and structural
            resilience.
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak" className={styles.visionText}>
            Earthquake-resistant design still relies heavily on translation-focused descriptions of
            ground motion. My research vision is to make rotations and strains physically
            interpretable, computationally predictable, and useful for understanding how complex
            Earth media and civil structures respond during earthquakes.
          </Text>
          <div className={styles.visionActions}>
            <Button href="/work/hers_heterogeneities_rotational_seismology" variant="primary">
              HERS Project
            </Button>
            <Button href="/publications" variant="secondary" prefixIcon="document">
              Related Publications
            </Button>
            <Button href="/leadership" variant="secondary" prefixIcon="rocket">
              Funding & Leadership
            </Button>
          </div>
        </div>

        <aside className={styles.centralQuestion}>
          <Text variant="label-strong-s" onBackground="brand-weak" className={styles.eyebrow}>
            Central Question
          </Text>
          <Heading as="h3" variant="heading-strong-l">
            How do complex Earth media transform earthquake wavefields into rotations and strains
            that matter for structures?
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            This question connects the current DFG-funded HERS project with a broader future group
            direction: simulation, six-component observation, and engineering interpretation in one
            research programme.
          </Text>
        </aside>

        <div className={styles.visionGrid}>
          {visionPillars.map((pillar) => (
            <article key={pillar.title} className={styles.visionCard}>
              <Text variant="label-strong-s" onBackground="brand-weak">
                Five-Year Direction
              </Text>
              <Heading as="h3" variant="heading-strong-m">
                {pillar.title}
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {pillar.detail}
              </Text>
            </article>
          ))}
        </div>

        <div className={styles.independencePanel}>
          <Text variant="label-strong-s" onBackground="brand-weak" className={styles.eyebrow}>
            Independent PI Signals
          </Text>
          <ul>
            {independenceSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.diagramSection} aria-labelledby="research-programme-diagram">
        <Column className={styles.diagramIntro} gap="12">
          <Text variant="label-strong-s" onBackground="brand-weak" className={styles.eyebrow}>
            Research Diagram
          </Text>
          <Heading as="h2" id="research-programme-diagram" variant="heading-strong-l">
            A compact map of the research programme.
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-weak" className={styles.introText}>
            The diagram shows how complex Earth media, earthquake sources, and structures feed into
            simulation and 6C interpretation workflows, then return as publications, HERS outputs,
            monitoring applications, and earthquake-engineering insight.
          </Text>
        </Column>
        <figure className={styles.diagramFigure}>
          <div className={styles.diagramScroller}>
            <img
              src={withBasePath("/images/diagrams/anjali-research-workflow.svg")}
              alt="Research workflow diagram connecting earthquake sources, complex Earth media, structures, modeling, six-component motion fields, observations, engineering meaning, and outcomes."
            />
          </div>
          <figcaption>
            Rotations and strains are treated as physical quantities that connect seismology,
            simulation, sensing, and structural resilience.
          </figcaption>
        </figure>
      </section>

      <section className={styles.lookForSection}>
        <Column className={styles.lookForIntro} gap="12">
          <Text variant="label-strong-s" onBackground="brand-weak" className={styles.eyebrow}>
            Research Themes
          </Text>
          <Heading as="h2" variant="heading-strong-l" className={styles.heading}>
            The work sits at the boundary of seismology and structural resilience.
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-weak" className={styles.introText}>
            These themes make the Work page different from a publication list: they show the
            recurring problems, methods, and engineering questions that connect the projects.
          </Text>
        </Column>
        <div className={styles.signalGrid}>
          {researchThemes.map((theme) => (
            <article key={theme.label} className={styles.signalCard}>
              <Text
                variant="label-strong-s"
                onBackground="brand-weak"
                className={styles.signalLabel}
              >
                {theme.label}
              </Text>
              <Text
                variant="body-default-s"
                onBackground="neutral-weak"
                className={styles.signalDetail}
              >
                {theme.detail}
              </Text>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.framingSection}>
        <Column className={styles.lookForIntro} gap="12">
          <Text variant="label-strong-s" onBackground="brand-weak" className={styles.eyebrow}>
            Case Study Frame
          </Text>
          <Heading as="h2" variant="heading-strong-l" className={styles.heading}>
            Each project is written as a compact research brief.
          </Heading>
        </Column>
        <div className={styles.compactGrid}>
          {caseStudySignals.map((signal) => (
            <article key={signal.label} className={styles.compactCard}>
              <Text variant="label-strong-s" onBackground="brand-weak">
                {signal.label}
              </Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {signal.detail}
              </Text>
            </article>
          ))}
        </div>
      </section>

      <Projects />

      <section className={styles.contactSection}>
        <Column gap="12" className={styles.contactIntro}>
          <Text variant="label-strong-s" onBackground="brand-weak" className={styles.eyebrow}>
            Collaborations
          </Text>
          <Heading as="h2" variant="heading-strong-l">
            Interested in research collaboration?
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-weak" className={styles.introText}>
            I am open to collaborations in rotational seismology, earthquake engineering,
            ground-motion simulation, 6C monitoring, and structural health monitoring.
          </Text>
        </Column>
        <Row gap="12" wrap>
          <Button href={`mailto:${person.email}`} variant="primary" prefixIcon="email">
            Contact Me
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
            More About Me
          </Button>
        </Row>
      </section>
    </Column>
  );
}
