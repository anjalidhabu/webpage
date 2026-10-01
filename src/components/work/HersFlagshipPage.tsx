import { ProjectBadgeStrip, ScrollToHash } from "@/components";
import { about, baseURL, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { withBasePath } from "@/utils/paths";
import { AvatarGroup, Button, Heading, Schema, SmartLink, Text } from "@once-ui-system/core";
import styles from "./HersFlagshipPage.module.css";

type TeamMember = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type HersProject = {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    heroImage?: string;
    images: string[];
    domain?: string;
    focus?: string;
    scale?: string;
    techStack?: string[];
    team?: TeamMember[];
    link?: string;
  };
};

type HersFlagshipPageProps = {
  post: HersProject;
  avatars: { src: string }[];
  previewImage: string;
  heroImage?: string;
  pagePath?: string;
};

const workflowSteps = [
  {
    number: "01",
    title: "Heterogeneous Earth Structure",
    text: "Define complex media where layers, inclusions, and spatial variability can reshape the seismic wavefield.",
  },
  {
    number: "02",
    title: "Large-Scale Numerical Simulation",
    text: "Use spectral-element modeling workflows to compare translations, rotations, and strain-like quantities.",
  },
  {
    number: "03",
    title: "Observing Rotational Response",
    text: "Identify how heterogeneity changes rotational ground motion and how those changes should be interpreted.",
  },
  {
    number: "04",
    title: "Engineering Interpretation",
    text: "Translate wavefield gradients into questions that matter for earthquake engineering and structural response.",
  },
];

const ecosystemLinks = [
  {
    type: "Simulation workflow",
    title: "Extending SPECFEM for Rotational Ground-Motion Simulation",
    description:
      "A technical modeling workflow for computing rotational motions alongside translations in layered and heterogeneous media.",
    href: "/work/extending_specfem_rotational_ground_motions?theme=layered-earth-rotational-ground-motions",
    image: "/images/projects/research_themes/Extending_SPECFEM.png",
  },
  {
    type: "Connected model direction",
    title: "High-Resolution Subsurface Modeling through Teleseismic Simulation",
    description:
      "A related simulation direction linking teleseismic wavefields, local structure, and observation-driven interpretation.",
    href: "/work/themes/teleseismic-subsurface-modeling",
    image: "/images/projects/research_themes/reghym.png",
  },
];

const projectPeople = [
  {
    name: "Professor Dr. Céline Hadziioannou",
    role: "Jointly responsible",
    institution: "University of Hamburg",
    affiliation: "Institute of Geophysics",
    logo: "/images/logos/Seal_of_the_University_of_Hamburg.svg",
  },
  {
    name: "Professor Dr. Heiner Igel",
    role: "Jointly responsible",
    institution: "LMU Munich",
    affiliation: "Geophysics / Seismology",
    logo: "/images/logos/LMU_Muenchen_Logo.svg",
  },
  {
    name: "Dr. Felix Bernauer",
    role: "Jointly responsible",
    institution: "LMU Munich",
    affiliation: "Geophysics / Seismology",
    logo: "/images/logos/LMU_Muenchen_Logo.svg",
  },
  {
    name: "Professor Dr. Yann Capdeville",
    role: "Cooperation partner",
    institution: "CNRS / Nantes Université",
    affiliation: "Laboratoire de Planétologie et Géosciences",
    logo: "/images/logos/LOGO_CNRS_BLEU.png",
  },
  {
    name: "Dr. Stefanie Donner",
    role: "Cooperation partner / Mentor",
    institution: "BGR Hannover",
    affiliation: "Federal Institute for Geosciences and Natural Resources",
    logo: "/images/logos/BGR_Logo-cropped.svg",
  },
];

const guidedStudents = [
  {
    name: "Laurin Müller",
    level: "B.Sc. thesis co-supervision",
    focus: "Structural health monitoring of wind turbines using 6C ground-motion data.",
  },
  {
    name: "Nicolas Matthießen",
    level: "B.Sc. thesis supervision",
    focus:
      "Numerical simulation of seismic gradients and their response to Earth-medium heterogeneity.",
  },
  {
    name: "Ann Joseph",
    level: "M.Sc. thesis supervision",
    focus: "Analyzing effects of Earth heterogeneity on rotational seismology.",
  },
];

const outputs = [
  "Building capabilities for high-fidelity numerical simulation of rotations, translations, and strain in heterogeneous media.",
  "Developing the extended SPECFEM simulation workflow for rotational ground-motion modeling.",
  "A research bridge between rotational seismology, earthquake engineering, and structural response.",
];

type HersPublicationItem = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  details: string;
  year: string;
  type: string;
  status?: string;
  href?: string;
};

// Edit this array to curate the publication cards shown on the HERS project page.
const hersPublicationItems: HersPublicationItem[] = [
  {
    id: "heterogeneities-rotational-ground-motions",
    authors: "Dhabu, A.C., Matthiessen, N., and Hadziioannou, C.",
    title:
      "Parametric analysis of heterogeneities and their effect on simulated rotational ground motions and strains due to earthquakes.",
    venue: "Manuscript in preparation.",
    details: "Planned submission to Bulletin of the Seismological Society of America.",
    year: "In preparation",
    type: "Manuscript",
    status: "In preparation",
  },
  {
    id: "topograpy-rotational-ground-motions",
    authors: "Dhabu, A.C., Nooghabi, A., and Hadziioannou, C.",
    title:
      "Effect of basin structure and topography on rotational ground motions",
    venue: "40th General Assembly of the European Seismological Commission.",
    details: "Planned submission to Bulletin of the Seismological Society of America.",
    year: "2026",
    type: "Poster",
    status: "Completed",
  },
  {
    id: "Propagation Characteristics of Rotational Ground Motions in Layered Earth Media",
    authors: "Dhabu, A.C., Nooghabi, A., and Hadziioannou, C.",
    title:
      "Propagation Characteristics of Rotational Ground Motions in Layered Earth Media",
    venue: "Extended abstract for EGU 2026.",
    details: "Planned submission to Bulletin of the Seismological Society of America.",
    year: "2026",
    type: "Poster",
    status: "Completed",
  },
  {
    id: "Coupled Numerical Simulation of Teleseismic Wave Propagation Incorporating Local Structural Features",
    authors: "Nooghabi, A., Dhabu, A.C., Monteiller, M., Matthiessen, N., and Hadziioannou, C.",
    title:
      "Coupled Numerical Simulation of Teleseismic Wave Propagation Incorporating Local Structural Features",
    venue: "Extended abstract for EGU 2026.",
    details: "Planned submission to Seismological Research Letters.",
    year: "2026",
    type: "Poster",
    status: "Completed",
  },
  {
    id: "Developing a High-Resolution Subsurface Model through Teleseismic Wave Simulation in Hamburg",
    authors: "Nooghabi, A., Dhabu, A.C., and Hadziioannou, C.",
    title:
      "Developing a High-Resolution Subsurface Model through Teleseismic Wave Simulation in Hamburg",
    venue: "Extended abstract for EGU 2025.",
    details: "Planned submission to Seismological Research Letters.",
    year: "2025",
    type: "Poster",
    status: "Completed",
  },
  {
    id: "6-Component Operational Modal Analysis of wind turbines for damage detection.",
    authors: "Müller, L., Dhabu, A., Bernauer, F., Donner, S., Bode, K., & Hadziioannou, C.",
    title:
      "6-Component Operational Modal Analysis of wind turbines for damage detection.",
    venue: "Presented at the 13th International Conference on Structural Health Monitoring of Intelligent Infrastructure",
    details: "Planned submission to Wind Engineering.",
    year: "2025",
    type: "Presentation",
    status: "Completed",
  },
  
];

export function HersFlagshipPage({
  post,
  avatars,
  previewImage,
  heroImage,
  pagePath,
}: HersFlagshipPageProps) {
  const projectImage = heroImage || post.metadata.images[0] || previewImage;
  const schemaPath = pagePath || `${work.path}/${post.slug}`;

  return (
    <main className={styles.hersPage}>
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={schemaPath}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={previewImage}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <SmartLink href="/work" className={styles.workLink}>
        <Text variant="label-strong-m">Work</Text>
      </SmartLink>

      <section className={styles.piBand} aria-label="Principal investigator">
        <div className={styles.piIdentity}>
          {avatars.length > 0 && <AvatarGroup reverse avatars={avatars} size="m" />}
          <div>
            <Text variant="label-strong-s" onBackground="brand-weak">
              Principal Investigator
            </Text>
            <Heading as="h2" variant="heading-strong-m">
              Dr. Anjali Dhabu
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              University of Hamburg | Rotational seismology, earthquake engineering, and
              six-component ground motion.
            </Text>
          </div>
        </div>
        <div className={styles.piActions}>
          <Button href={`mailto:${person.email}`} variant="primary" prefixIcon="email">
            Contact
          </Button>
          <Button href="/leadership" variant="secondary" prefixIcon="rocket">
            Funding & Leadership
          </Button>
          <Button
            href="/documents/cv.pdf"
            download
            variant="secondary"
            prefixIcon="download"
          >
            CV
          </Button>
        </div>
      </section>

      <section className={styles.hero} aria-labelledby="hers-title">
        <div className={styles.heroCopy}>
          <div className={styles.heroMetaLine}>
            <span>DFG Individual Research Grant</span>
            <span>2024-2027</span>
            <span>Principal Investigator</span>
          </div>

          <div>
            <p className={styles.heroMark}>HERS</p>
            <Heading
              as="h1"
              id="hers-title"
              variant="display-strong-m"
              className={styles.heroTitle}
            >
              Heterogeneities and Their Effect on Rotational Seismology
            </Heading>
          </div>

          <Text variant="body-default-m" onBackground="neutral-weak" className={styles.heroLead}>
            {post.metadata.summary}
          </Text>

          <ProjectBadgeStrip
            domain={post.metadata.domain}
            focus={post.metadata.focus}
            scale={post.metadata.scale}
            techStack={post.metadata.techStack || []}
          />

          <div className={styles.heroActions}>
            <Button href="#hers-workflow" variant="primary" prefixIcon="rocket">
              Research Workflow
            </Button>
            <Button href="#hers-ecosystem" variant="secondary" prefixIcon="document">
              HERS Ecosystem
            </Button>
            <Button href="#hers-network" variant="secondary" prefixIcon="person">
              Project Network
            </Button>
            <Button href="#hers-publications" variant="secondary" prefixIcon="document">
              Publications
            </Button>
          </div>
        </div>

        <figure className={styles.heroVisual}>
          <div className={styles.heroImageWrap}>
            <img
              src={withBasePath(projectImage)}
              alt="Heterogeneous subsurface model used to represent the HERS research direction."
            />
          </div>
          <figcaption>
            HERS studies how complex subsurface structure changes translations, rotations, and
            strain in simulated earthquake motion.
          </figcaption>
        </figure>
      </section>

      <section
        id="hers-network"
        className={styles.networkSection}
        aria-labelledby="hers-network-title"
      >
        <div className={styles.sectionIntro}>
          <Text variant="label-strong-s" onBackground="brand-weak" className={styles.eyebrow}>
            Project Network
          </Text>
          <Heading as="h2" id="hers-network-title" variant="heading-strong-l">
            Joint responsibility and cooperation partners for HERS.
          </Heading>
        </div>

        <div className={styles.peopleGrid}>
          {projectPeople.map((personEntry) => (
            <article key={personEntry.name} className={styles.personCard}>
              <div className={styles.personLogoPlate}>
                <img
                  src={withBasePath(personEntry.logo)}
                  alt={`${personEntry.institution} logo`}
                  className={styles.personLogo}
                />
              </div>
              <div className={styles.personCopy}>
                <span className={styles.personRole}>{personEntry.role}</span>
                <Heading as="h3" variant="heading-strong-s">
                  {personEntry.name}
                </Heading>
                <p>{personEntry.institution}</p>
                <span>{personEntry.affiliation}</span>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.studentStrip} aria-label="Guided students">
          <div className={styles.studentStripIntro}>
            <span>Guided Students</span>
            <strong>Research training connecting Earth heterogeneity and engineering seismology.</strong>
          </div>
          <div className={styles.studentStripItems}>
            {guidedStudents.map((student) => (
              <article key={student.name} className={styles.studentItem}>
                <span>{student.level}</span>
                <Heading as="h3" variant="heading-strong-s">
                  {student.name}
                </Heading>
                <p>{student.focus}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.questionSection} aria-labelledby="hers-question">
        <div className={styles.sectionIntro}>
          <Text variant="label-strong-s" onBackground="brand-weak" className={styles.eyebrow}>
            Central Research Question
          </Text>
          <Heading as="h2" id="hers-question" variant="heading-strong-l">
            What changes when Earth is no longer treated as simple?
          </Heading>
          <div className={styles.questionLogoWrap}>
            <img
              src={withBasePath("/images/projects/research_themes/hers_logo.png")}
              alt="HERS logo"
              className={styles.questionLogo}
            />
          </div>
        </div>
        <div className={styles.questionContent}>
          <div className={styles.questionStatement}>
            <Text variant="body-default-m" onBackground="neutral-weak">
              Rotational seismology opens a richer view of earthquake motion. HERS asks how
              heterogeneous Earth structure changes simulated rotations, strains, and translations,
              and how those effects can be interpreted for seismology and earthquake engineering.
            </Text>
          </div>
          <div className={styles.questionOutputs}>
            <Heading as="h3" variant="heading-strong-m">
              What this project is building.
            </Heading>
            <ul className={styles.outputList}>
              {outputs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="hers-workflow"
        className={styles.workflowSection}
        aria-labelledby="hers-workflow-title"
      >
        <div className={styles.sectionIntro}>
          <Text variant="label-strong-s" onBackground="brand-weak" className={styles.eyebrow}>
            Research Workflow
          </Text>
          <Heading as="h2" id="hers-workflow-title" variant="heading-strong-l">
            From heterogeneous media to engineering interpretation.
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-weak" className={styles.sectionLead}>
            The project links Earth model complexity, numerical simulation, rotational
            observables, and structural meaning in one coherent research line.
          </Text>
        </div>

        <div className={styles.workflowGrid}>
          {workflowSteps.map((step) => (
            <article key={step.number} className={styles.workflowCard}>
              <span className={styles.stepNumber}>{step.number}</span>
              <Heading as="h3" variant="heading-strong-m">
                {step.title}
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {step.text}
              </Text>
            </article>
          ))}
        </div>
      </section>

      <section
        id="hers-ecosystem"
        className={styles.ecosystemSection}
        aria-labelledby="hers-ecosystem-title"
      >
        <div className={styles.sectionIntro}>
          <Text variant="label-strong-s" onBackground="brand-weak" className={styles.eyebrow}>
            Contributions from the HERS Project
          </Text>
          <Heading as="h2" id="hers-ecosystem-title" variant="heading-strong-l">
            Expanding the capabilities for seismic research.
          </Heading>
        </div>

        <div className={styles.ecosystemGrid}>
          {ecosystemLinks.map((item) => (
            <a key={item.href} href={withBasePath(item.href)} className={styles.ecosystemCard}>
              <span className={styles.ecosystemImageWrap}>
                <img src={withBasePath(item.image)} alt="" aria-hidden="true" />
              </span>
              <span className={styles.ecosystemCopy}>
                <Text variant="label-strong-s" onBackground="brand-weak">
                  {item.type}
                </Text>
                <Heading as="h3" variant="heading-strong-m">
                  {item.title}
                </Heading>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {item.description}
                </Text>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section
        id="hers-publications"
        className={styles.publicationSection}
        aria-labelledby="hers-publications-title"
      >
        <div className={styles.sectionIntro}>
          <Text variant="label-strong-s" onBackground="brand-weak" className={styles.eyebrow}>
            Research Outputs
          </Text>
          <Heading as="h2" id="hers-publications-title" variant="heading-strong-l">
            Publications from the HERS Project.
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-weak" className={styles.sectionLead}>
            Current and planned outputs tied directly to the HERS research direction.
          </Text>
        </div>

        <div className={styles.publicationList}>
          {hersPublicationItems.map((item, index) => (
            <article key={item.id} className={styles.publicationItem}>
              <div className={styles.publicationMeta}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{item.type}</span>
                <span>{item.year}</span>
                {item.status && <span>{item.status}</span>}
              </div>
              <Heading as="h3" variant="heading-strong-m">
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
              </Heading>
              <p className={styles.publicationAuthors}>{item.authors}</p>
              <p className={styles.publicationVenue}>
                <strong>{item.venue}</strong> {item.details}
              </p>
            </article>
          ))}
        </div>

        <div>
          <Button
            href="/publications#rotational-ground-motion-theory"
            variant="secondary"
            prefixIcon="document"
          >
            Full publication page
          </Button>
        </div>
      </section>

      <Text variant="body-default-xs" onBackground="neutral-weak" className={styles.publishedAt}>
        Project page updated from research profile entry published{" "}
        {formatDate(post.metadata.publishedAt)}.
      </Text>

      <ScrollToHash />
    </main>
  );
}
