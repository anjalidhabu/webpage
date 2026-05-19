import Image from "next/image";
import Link from "next/link";

import { leadership } from "@/app/leadership/content";
import { about, baseURL, home, person } from "@/resources";
import { withBasePath } from "@/utils/paths";
import { Meta, Schema } from "@once-ui-system/core";
import styles from "./page.module.css";

const fundingEntries = [
  {
    category: "Independent Funding",
    title: "DFG Individual Research Grant - HERS",
    institution: "University of Hamburg / Deutsche Forschungsgemeinschaft",
    period: "2024 - 2027",
    emphasis: "Current PI-level research line",
    description:
      "Leads Heterogeneities and their Effect on Rotational Seismology, defining the simulation strategy and research direction for rotational ground motions in complex media.",
  },
  {
    category: "Research Recognition",
    title: "Institute Research Award",
    institution: "Indian Institute of Technology Madras",
    period: "2020",
    emphasis: "Doctoral research output",
    description:
      "Recognition for the quality and quantity of research output during doctoral studies in civil engineering and earthquake engineering.",
  },
  {
    category: "Travel Support",
    title: "Student Travel Grant",
    institution: "Indian Institute of Technology Madras",
    period: "Sep. 2018",
    emphasis: "Conference dissemination",
    description:
      "Institutional support for conference presentations and dissemination of doctoral research.",
  },
  {
    category: "Merit Funding",
    title: "MHRD Merit-based Scholarships",
    institution: "Ministry of Human Resource Development, Govt. of India",
    period: "2012 - 2019",
    emphasis: "M.Tech. and Ph.D. academic excellence",
    description:
      "Government scholarships awarded for academic excellence during M.Tech. and Ph.D. studies.",
  },
];

const collaborationThemes = [
  {
    title: "Rotational Ground-Motion Theory",
    description:
      "Theory and simulation collaborations supporting reduced micropolar media, rotational wave physics, and six-component interpretation.",
    tags: ["Theory", "Rotational seismology", "Wave propagation"],
    institutions: [
      {
        name: "IIT Madras",
        logo: "/images/logos/IIT_Madras_Logo.svg",
      },
      {
        name: "University of Hamburg",
        logo: "/images/logos/Seal_of_the_University_of_Hamburg.svg",
      },
      {
        name: "LMU Munich",
        logo: "/images/logos/LMU_Muenchen_Logo.svg",
      },
    ],
  },
  {
    title: "6C Monitoring & Structural Response",
    description:
      "Engineering-facing network for six-component sensing, modal analysis, bridge response, wind turbines, and structural health monitoring.",
    tags: ["6C sensing", "Structures", "Monitoring"],
    institutions: [
      {
        name: "University of Hamburg",
        logo: "/images/logos/Seal_of_the_University_of_Hamburg.svg",
      },
      {
        name: "BAM Berlin",
        logo: "/images/logos/BAM-Logo-2015.svg",
      },
      {
        name: "Opole University of Technology",
        logo: "/images/logos/Opole_University_of_Technology.png",
      },
      {
        name: "Vestas",
        logo: "/images/logos/Vestas.svg",
      },
    ],
  },
  {
    title: "Simulation, Topography & Subsurface Structure",
    description:
      "Collaborations that strengthen heterogeneous-media modeling, topography effects, regional simulations, and subsurface structure questions.",
    tags: ["Simulation", "Topography", "Heterogeneity"],
    institutions: [
      {
        name: "University of Hamburg",
        logo: "/images/logos/Seal_of_the_University_of_Hamburg.svg",
      },
      {
        name: "IIT Madras",
        logo: "/images/logos/IIT_Madras_Logo.svg",
      },
      {
        name: "BGR Hannover",
        logo: "/images/logos/BGR_Logo-cropped.svg",
      },
      {
        name: "NGRI Hyderabad",
        logo: "/images/logos/National_Geophysical_Research_Institute_Logo.png",
      },
    ],
  },
  {
    title: "Planetary & Source Seismology",
    description:
      "A broader geophysical network connecting strong-motion source characterization with lunar, Martian, and planetary seismic applications.",
    tags: ["Planetary seismology", "Source physics", "Applications"],
    institutions: [
      {
        name: "ISRO",
        logo: "/images/logos/Indian_Space_Research_Organisation_Logo.svg",
      },
      {
        name: "Max Planck Institute",
        logo: "/images/logos/Logo-mps.png",
      },
      {
        name: "Planetary Science Institute",
        logo: "/images/logos/Planetary_Science_Institute_logo.png",
      },
    ],
  },
];

const futureDirections = [
  {
    title: "6C Ground-Motion Physics in Complex Media",
    description:
      "Develop simulation and interpretation frameworks for rotations, strains, and translations in heterogeneous Earth models.",
  },
  {
    title: "Rotational Inputs for Earthquake-Resistant Design",
    description:
      "Translate rotational ground-motion characterization into engineering quantities relevant for bridges and infrastructure resilience.",
  },
  {
    title: "Simulation-to-Observation Workflows",
    description:
      "Connect numerical wavefield models with six-component measurements, modal analysis, and structural health monitoring.",
  },
];

const stats = [
  {
    value: "DFG",
    label: "Independent grant",
    detail: "HERS project, 2024-2027.",
  },
  {
    value: "3",
    label: "Leadership streams",
    detail: "Funding, mentoring/service, and collaboration.",
  },
  {
    value: "4",
    label: "Network themes",
    detail: "Collaborations grouped by research value.",
  },
  {
    value: "5-year",
    label: "Future agenda",
    detail: "Proposal-ready research directions.",
  },
];

export async function generateMetadata() {
  return Meta.generate({
    title: leadership.title,
    description: leadership.description,
    baseURL,
    image: home.image,
    path: leadership.path,
  });
}

export default function LeadershipPage() {
  const coordinationItems = about.coordination?.items ?? [];

  return (
    <main className={styles.leadershipPage}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={leadership.path}
        title={leadership.title}
        description={leadership.description}
        image={home.image}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <section className={styles.heroSection}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Funding & Leadership</p>
          <h1>Evidence for independent research leadership.</h1>
          <p>
            A strategic view of Anjali’s funding record, project leadership, scientific service,
            collaborative network, and future research directions for building an independent group
            in rotational seismology and earthquake engineering.
          </p>
          <div className={styles.heroActions}>
            <Link href="/work" className={styles.primaryButton}>
              Research Work
            </Link>
            <Link href="/publications" className={styles.secondaryButton}>
              Publications
            </Link>
          </div>
        </div>

        <div className={styles.statGrid} aria-label="Funding and leadership summary">
          {stats.map((stat) => (
            <article key={stat.label} className={styles.statCard}>
              <strong>{stat.value}</strong>
              <h2>{stat.label}</h2>
              <p>{stat.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.piPanel} aria-labelledby="pi-profile">
        <div>
          <p className={styles.eyebrow}>Independent PI Profile</p>
          <h2 id="pi-profile">From funded project lead to proposal-ready research programme.</h2>
        </div>
        <p>
          The DFG-funded HERS project is the anchor for a broader research trajectory: connecting
          rotational ground-motion theory, heterogeneous media, six-component observation, and
          structural resilience. The leadership profile here is designed to make that trajectory
          visible to grant panels, faculty search committees, and research institutes.
        </p>
      </section>

      <section aria-label="Independent funding and grants">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Funding Record</p>
          <h2>Independent funding, recognition, and academic support.</h2>
        </div>

        <div className={styles.fundingGrid}>
          {fundingEntries.map((entry) => (
            <article key={entry.title} className={styles.fundingCard}>
              <p className={styles.cardKicker}>{entry.category}</p>
              <h3>{entry.title}</h3>
              <div className={styles.metaRow}>
                <span>{entry.period}</span>
                <span>{entry.emphasis}</span>
              </div>
              <p className={styles.institution}>{entry.institution}</p>
              <p>{entry.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-label="Project leadership and service">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Leadership Practice</p>
          <h2>Project leadership, mentoring, service, and community building.</h2>
        </div>

        <div className={styles.leadershipGrid}>
          {coordinationItems.map((item) => (
            <article key={item.title} className={styles.leadershipCard}>
              <span>{item.timeframe}</span>
              <h3>{item.title}</h3>
              <ul>
                {item.points.map((point) => (
                  <li key={`${item.title}-${String(point)}`}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section aria-label="Collaborative network by research theme">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Collaboration Network</p>
          <h2>Collaborative network by research theme.</h2>
          <p>
            The network supports future proposal feasibility because each collaboration cluster
            contributes a distinct capability: theory, simulation, instrumentation, engineering, or
            planetary applications.
          </p>
        </div>

        <div className={styles.collaborationGrid}>
          {collaborationThemes.map((theme) => (
            <article key={theme.title} className={styles.collaborationCard}>
              <div className={styles.collaborationText}>
                <h3>{theme.title}</h3>
                <p>{theme.description}</p>
              </div>

              <div className={styles.themeLogoGrid}>
                {theme.institutions.map((institution) => (
                  <div key={`${theme.title}-${institution.name}`} className={styles.logoPlate}>
                    <Image
                      src={withBasePath(institution.logo)}
                      alt={`${institution.name} logo`}
                      width={160}
                      height={82}
                      sizes="(max-width: 720px) 44vw, 160px"
                      className={styles.logoImage}
                    />
                  </div>
                ))}
              </div>

              <div className={styles.themeTags}>
                {theme.tags.map((tag) => (
                  <span key={`${theme.title}-${tag}`}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.futurePanel} aria-labelledby="future-directions">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Proposal-Ready Directions</p>
          <h2 id="future-directions">Future group directions for ERC and faculty positioning.</h2>
        </div>

        <div className={styles.futureGrid}>
          {futureDirections.map((direction) => (
            <article key={direction.title} className={styles.futureCard}>
              <h3>{direction.title}</h3>
              <p>{direction.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.ctaPanel}>
        <div>
          <p className={styles.eyebrow}>Next Step</p>
          <h2>Connect leadership evidence with research depth.</h2>
        </div>
        <div className={styles.ctaActions}>
          <Link href="/work" className={styles.primaryButton}>
            Research Vision
          </Link>
          <Link href="/awards" className={styles.secondaryButton}>
            Awards
          </Link>
          <a href={withBasePath("/documents/cv.pdf")} className={styles.secondaryButton}>
            Download CV
          </a>
        </div>
      </section>
    </main>
  );
}
