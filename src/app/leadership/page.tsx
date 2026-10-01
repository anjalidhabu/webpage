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
    href: "/hers",
    linkLabel: "View HERS project",
  },
  {
    category: "Selected Mentoring & Coaching Programs",
    title: "dynaMENT advanced Mentoring Program",
    period: "2026",
    institution: "University of Hamburg",
    emphasis: "Selected participant",
    description: "Selected to participate in dynaMENT advanced, a mentoring program supporting academic career development.",
  },
  {
    category: "Selected Mentoring & Coaching Programs",
    title: "Agathe Lasch Coaching Program + Diversity",
    institution: "University of Hamburg",
    period: "2025",
    emphasis: "Selected participant",
    description: "Selected to participate in the Agathe Lasch Coaching Program + Diversity, supporting professional development through individual coaching.",
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
    title: "MHRD Scholarships and Fellowships",
    institution: "Ministry of Human Resource Development, Govt. of India",
    period: "2012 - 2019",
    emphasis: "M.Tech. and Ph.D. academic excellence",
    description:
      "Government scholarships awarded for academic excellence during M.Tech. and Ph.D. studies.",
  },
];

const collaborationLogos = [
  {
    name: "University of Hamburg",
    region: "Germany",
    logo: "/images/logos/Seal_of_the_University_of_Hamburg.svg",
  },
  {
    name: "IIT Madras",
    region: "India",
    logo: "/images/logos/IIT_Madras_Logo.svg",
  },
  {
    name: "LMU Munich",
    region: "Germany",
    logo: "/images/logos/LMU_Muenchen_Logo.svg",
  },
  {
    name: "CNRS",
    region: "France",
    logo: "/images/logos/LOGO_CNRS_BLEU.png",
  },
  {
    name: "BAM Berlin",
    region: "Germany",
    logo: "/images/logos/BAM-Logo-2015.svg",
  },
  {
    name: "BGR Hannover",
    region: "Germany",
    logo: "/images/logos/BGR_Logo-cropped.svg",
  },
  {
    name: "ISRO",
    region: "India",
    logo: "/images/logos/Indian_Space_Research_Organisation_Logo.svg",
  },
  {
    name: "NGRI Hyderabad",
    region: "India",
    logo: "/images/logos/National_Geophysical_Research_Institute_Logo.png",
  },
  {
    name: "Max Planck Institute",
    region: "Germany",
    logo: "/images/logos/Logo-mps.png",
  },
  {
    name: "Planetary Science Institute",
    region: "United States",
    logo: "/images/logos/Planetary_Science_Institute_logo.png",
  },
  {
    name: "Opole University of Technology",
    region: "Poland",
    logo: "/images/logos/Opole_University_of_Technology.png",
  },
  {
    name: "Vestas",
    region: "Germany",
    logo: "/images/logos/Vestas.svg",
  },
];

// Edit this list to update workshop titles, descriptions, tags, or YouTube links.
const workshopVideos = [
  {
    title: "SPECFEM — Recorded session at SPIN Short Research Course 1 on Computational Seismology",
    context: "Workshop / training session",
    role: "Delivered as a postdoctoral researcher",
    description:
      "Research-community training connected to computational seismology, wavefield interpretation, and numerical modeling practice.",
    href: "https://www.youtube.com/watch?v=TKjINocbMjM",
    videoId: "TKjINocbMjM",
    tags: ["Workshop", "Postdoctoral Training", "Computational Seismology"],
  },
  {
    title: "Seismology and Rotational Ground Motions — Recorded lecture at SPIN Short Research Course 2",
    context: "Workshop / invited training",
    role: "Delivered as a postdoctoral researcher",
    description:
      "A public workshop recording highlighting teaching, research exchange, and method-focused scientific communication.",
    href: "https://www.youtube.com/watch?v=gagPomSCue4",
    videoId: "gagPomSCue4",
    tags: ["Research Training", "Seismology", "Community Teaching"],
  },
];

const stats = [
  {
    value: "DFG",
    label: "Independent grant",
    detail: "HERS project, 2024-2027.",
  },
  {
    value: "€300K",
    label: "Funding secured",
    detail: "Three-year individual research grant.",
  },
  {
    value: "3",
    label: "Research clusters",
    detail: "Theory, simulation, and monitoring.",
  },
  {
    value: "3",
    label: "Students guided in Hamburg",
    detail: "Thesis mentoring and research collaboration.",
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

      <header className={styles.pageIntro}>
        <h1>Research Leadership</h1>
        <p>
          Leading independent research in rotational seismology through funded projects, scientific
          collaboration, and mentoring.
        </p>
      </header>

      <section className={styles.heroSection}>
        <div className={styles.heroStrip} aria-label="Current HERS role and funding">
          <div className={styles.heroStripProject}>
            <span>HERS</span>
            <strong>Heterogeneities and their Effect on Rotational Seismology</strong>
          </div>
          <div className={styles.heroStripMeta}>
            <span>Current position: Project lead</span>
            <span>Funding: DFG Individual Research Grant, 2024-2027</span>
          </div>
        </div>

        <figure className={styles.heroFigure}>
          <div className={styles.heroImageFrame}>
            <Image
              src={withBasePath("/images/projects/hetro.png")}
              alt="Overview of the HERS research work connecting heterogeneous Earth structure with rotational-seismology simulation outputs."
              width={1254}
              height={1254}
              sizes="(max-width: 720px) 100vw, 58vw"
              className={styles.heroImage}
              priority
            />
          </div>
        </figure>

        <div className={styles.statGrid} aria-label="Funding and leadership summary">
          {stats.map((stat) => (
            <article key={stat.label} className={styles.statCard}>
              <strong>{stat.value}</strong>
              <div>
                <h2>{stat.label}</h2>
                {stat.value === "DFG" && (
                  <Image
                    src={withBasePath("/images/projects/hers_logo.png")}
                    alt="HERS logo"
                    width={576}
                    height={325}
                    sizes="120px"
                    className={styles.statLogo}
                  />
                )}
              </div>
              <p>{stat.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.logoSection} aria-labelledby="collaborative-footprint-title">
        <div className={styles.logoIntro}>
          <p className={styles.eyebrow}>Collaborative Footprint</p>
          <h2 id="collaborative-footprint-title">
            Institutions connected through publications, projects, and research exchange.
          </h2>
        </div>

        <div className={styles.logoGrid} aria-label="Collaborating institutions">
          {collaborationLogos.map((institution) => (
            <article key={institution.name} className={styles.logoCard}>
              <div className={styles.logoMark}>
                <Image
                  src={withBasePath(institution.logo)}
                  alt={`${institution.name} logo`}
                  width={160}
                  height={82}
                  sizes="(max-width: 720px) 42vw, 160px"
                  className={styles.institutionLogo}
                />
              </div>
              <div className={styles.logoMeta}>
                <strong>{institution.name}</strong>
                <span>{institution.region}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-label="Funding and professional development">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Funding Record</p>
          <h2>A progression from academic support to independent project leadership.</h2>
        </div>

        <div className={styles.fundingTimeline}>
          {fundingEntries.map((entry) => (
            <article key={entry.title} className={styles.fundingCard}>
              <div className={styles.timelineMarker} aria-hidden="true" />
              <p className={styles.cardKicker}>{entry.category}</p>
              <h3>{entry.title}</h3>
              <div className={styles.metaRow}>
                {entry.period && <span>{entry.period}</span>}
                <span>{entry.emphasis}</span>
              </div>
              <p className={styles.institution}>{entry.institution}</p>
              <p>{entry.description}</p>
              {"href" in entry && entry.href && (
                <Link href={entry.href} className={styles.inlineLink}>
                  {entry.linkLabel}
                </Link>
              )}
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
                {item.points.map((point, pointIndex) => (
                  <li key={`${item.title}-${pointIndex}`}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.workshopSection} aria-labelledby="recorded-workshops-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Recorded Workshops & Training</p>
          <h2 id="recorded-workshops-title">
            Public research training delivered during postdoctoral appointments.
          </h2>
          <p>
            Selected workshop recordings that show scientific teaching, method-focused training, and
            research-community service beyond written publications.
          </p>
        </div>

        <div className={styles.workshopGrid}>
          {workshopVideos.map((video) => (
            <a
              key={video.videoId}
              href={video.href}
              className={styles.workshopCard}
              target="_blank"
              rel="noreferrer"
            >
              <div className={styles.workshopThumbnail}>
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                  alt={`${video.title} thumbnail`}
                />
                <span className={styles.workshopPlay} aria-hidden="true">
                  <span />
                </span>
              </div>
              <div className={styles.workshopBody}>
                <span className={styles.workshopMeta}>
                  <span>{video.context}</span>
                  <span>{video.role}</span>
                </span>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <span className={styles.workshopTags} aria-label="Workshop topics">
                  {video.tags.map((tag) => (
                    <span key={`${video.videoId}-${tag}`}>{tag}</span>
                  ))}
                </span>
                <span className={styles.watchLink}>Watch recording</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.ctaPanel}>
        <div>
          <p className={styles.eyebrow}>Next Step</p>
          <h2>Research Leadership with Depth and Evidence</h2>
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
