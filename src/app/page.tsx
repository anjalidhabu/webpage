import Image from "next/image";
import Link from "next/link";

import { Column, Meta, RevealFx, Schema } from "@once-ui-system/core";

import { publications } from "@/app/publications/content";
import { VisitorLocationMap } from "@/components/VisitorLocationMap";
import { about, baseURL, home, person } from "@/resources";
import { withBasePath } from "@/utils/paths";

import styles from "./page.module.css";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

const resumeLink = withBasePath("/documents/cv.pdf");
const publicationTotal = publications.groups.reduce((total, group) => total + group.items.length, 0);

const researchMetrics = [
  {
    value: String(publicationTotal),
    label: "Publications",
    detail: "Journal articles, preprints, manuscripts, and conference contributions.",
  },
  {
    value: 157,
    label: "Citations",
    detail: "Citation count from Google Scholar.",
  },
  {
    value: "€300K",
    label: "DFG individual grant",
    detail: "HERS project on heterogeneous Earth structure and rotational seismology.",
  },
  {
    value: "10+",
    label: "Years of research",
    detail: "Civil engineering, earthquake motion, structural dynamics, and seismology.",
  },
];

const networkHighlights = [
  { value: "12", label: "partner institutions" },
  { value: "3", label: "continents represented" },
  { value: "5", label: "Research Themes" },
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

const experienceHighlights = about.work.experiences.slice(0, 3).map((experience) => ({
  company: experience.company,
  timeframe: experience.timeframe,
  role: experience.role,
}));

const testimonials = [
  {
    quote: "Current host / Former postdoctoral supervisor",
    name: "Prof. Dr. Céline Hadziioannou",
    role: "Director of the Institute of Geophysics | University of Hamburg",
    action: "Contact",
    href: "https://www.geo.uni-hamburg.de/en/geophysik/personen/hadziioannou-celine.html",
  },
  {
    quote: "Mentor",
    name: "Dr. Veronica Rodriguez Tribaldos",
    role: "PI of Helmholtz Young Investigator Group InDySE | GFZ Potsdam, Germany",
    action: "Contact",
    href: "https://www.gfz.de/staff/veronica.rodriguez.tribaldos",
  },
  {
    quote: "Ph.D. supervisor",
    name: "Prof. Dr. S. T. G. Raghukanth",
    role: "HAG Professor, IIT Madras | Seismology & Structural Dynamics",
    action: "Contact",
    href: "https://civil.iitm.ac.in/faculty/raghukanth/",
  },
  {
    quote: "Senior Project Collaborator",
    name: "Prof. Dr. Heiner Igel",
    role: "Professor of Geophysics and Seismology | LMU Munich",
    action: "Contact",
    href: "https://www.geo.lmu.de/geoumwelt/de/department/personen/kontaktseite/heiner-igel-186fe287.html",
  },
  {
    quote: "Postdoctoral colleague",
    name: "Dr. Aida Hejazi Nooghabi",
    role: "Postdoctoral Researcher | University of Hamburg | Wave Physics and Seismology",
    action: "Profile",
    href: "https://www.geo.uni-hamburg.de/en/geophysik/personen/hejazi-aida.html",
  },
  {
    quote: "Project Collaborator",
    name: "Dr. Felix Bernauer",
    role: "Research Scientist | LMU Munich | 6C Sensor Seismology and Structural Dynamics",
    action: "Profile",
    href: "https://www.geo.lmu.de/geoumwelt/de/department/personen/kontaktseite/felix-bernauer-bad01f90.html",
  },
];

export default function Home() {
  return (
    <Column className={styles.page}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={home.image}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <RevealFx translateY={4}>
        <section className={styles.heroSection}>
          <div className={styles.heroBackdrop} />
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <div className={styles.heroInstrument} aria-hidden="true">
                <svg className={styles.seismicTrace} viewBox="0 0 900 180" focusable="false">
                  <path
                    className={styles.traceGlow}
                    d="M0 92 C42 92 54 92 76 92 C94 92 99 42 112 42 C126 42 129 142 144 142 C160 142 163 74 181 74 C205 74 205 108 230 108 C260 108 266 92 302 92 C350 92 352 92 390 92 C420 92 424 58 440 58 C456 58 460 126 478 126 C500 126 506 90 532 90 C576 90 578 92 626 92 C676 92 682 40 704 40 C728 40 730 146 752 146 C776 146 780 92 812 92 C850 92 860 92 900 92"
                  />
                  <path
                    className={styles.traceLine}
                    d="M0 92 C42 92 54 92 76 92 C94 92 99 42 112 42 C126 42 129 142 144 142 C160 142 163 74 181 74 C205 74 205 108 230 108 C260 108 266 92 302 92 C350 92 352 92 390 92 C420 92 424 58 440 58 C456 58 460 126 478 126 C500 126 506 90 532 90 C576 90 578 92 626 92 C676 92 682 40 704 40 C728 40 730 146 752 146 C776 146 780 92 812 92 C850 92 860 92 900 92"
                  />
                </svg>
                <div className={styles.layerBands}>
                  <span />
                  <span />
                  <span />
                </div>
                <div className={styles.epicenterRings} />
              </div>
              <p className={styles.eyebrow}>
                Rotational Seismology | Structural Dynamics | Earthquake Engineering
              </p>
              <div className={styles.heroIdentity}>
                <span>{person.name}</span>
                <span>University of Hamburg</span>
              </div>
              <h1 className={styles.heroTitle}>{home.headline}</h1>
              <p className={styles.heroText}>{home.subline}</p>

              <div className={styles.metricGrid} aria-label="Research evidence metrics">
                {researchMetrics.map((metric) => (
                  <article key={metric.label} className={styles.metricCard}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                    <p>{metric.detail}</p>
                  </article>
                ))}
              </div>

              <div className={styles.heroCollaboration}>
                <p className={styles.cardKicker}>Research Collaborations</p>
                <h2>Open to scientific exchange across seismology and structural resilience.</h2>
                <p>
                  Reach out for research collaboration, invited talks, student supervision
                  discussions, or questions about rotational ground-motion modeling and structural
                  monitoring.
                </p>
              </div>

              <div className={styles.heroActions}>
                <a
                  href={`mailto:${person.email}`}
                  className={`${styles.primaryButton} ${styles.workButton}`}
                >
                  Contact
                </a>
                <Link
                  href="/publications"
                  className={[styles.secondaryButton, styles.cvButton].join(" ")}
                >
                  Publications
                </Link>
                <Link href="/about" className={[styles.secondaryButton, styles.cvButton].join(" ")}>
                  More About Anjali
                </Link>
              </div>
            </div>

            <div className={styles.profilePanel}>
              <div className={styles.profileCard}>
                <div className={styles.imageWrap}>
                  <Image
                    src={withBasePath(person.avatar)}
                    alt={person.name}
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 34vw"
                    className={styles.profileImage}
                  />
                  <div className={styles.imageOverlay} />
                </div>
                <div className={styles.profileBody}>
                  <p className={styles.profileLabel}>Based in {person.displayLocation || person.location}</p>
                  <h2>{person.name}</h2>
                  <p className={styles.profileSummary}>
                    Civil engineer and seismology researcher studying rotational ground motions,
                    seismic wave propagation, and structural response under earthquake loading.
                  </p>
                  <div className={styles.profileContactRow}>
                    <a
                      href="https://www.geo.uni-hamburg.de/en/geophysik/personen/dhabu-anjali.html"
                      className={styles.inlineLink}
                    >
                      University Profile
                    </a>
                    <a
                      href="https://scholar.google.com/citations?user=JlXHkJoAAAAJ&hl=en"
                      className={styles.inlineLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Scholar
                    </a>
                    <a
                      href="https://www.linkedin.com/in/anjali-dhabu-ph-d-93443b23?originalSubdomain=de"
                      className={styles.inlineLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                    <a href={resumeLink} className={styles.inlineLink}>
                      CV
                    </a>
                  </div>
                </div>
              </div>

              <div className={styles.storyCard}>
                <p className={styles.cardKicker}>Research Interests</p>
                <div className={styles.skillCloud}>
                  {person.hardSkills?.slice(0, 10).map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>

              <article className={styles.timelineCard}>
                <p className={styles.cardKicker}>Experience at a Glance</p>
                <h2>Recent Research Positions</h2>
                <div className={styles.timelineList}>
                  {experienceHighlights.map((item) => (
                    <div key={`${item.company}-${item.timeframe}`} className={styles.timelineItem}>
                      <span>{item.timeframe}</span>
                      <h3>{item.role}</h3>
                      <p>{item.company}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>
      </RevealFx>

      <RevealFx translateY={8} delay={0.15}>
        <section className={`${styles.section} ${styles.logoSection}`}>
          <div className={styles.networkHeader}>
            <div className={styles.logoIntro}>
              <p className={styles.sectionEyebrow}>Collaboration Network</p>
              <h2>
                A research network spanning seismology, engineering, monitoring, and planetary
                science.
              </h2>
              <p className={styles.logoIntroText}>
                The work grows through generous scientific exchange, shared datasets, student
                supervision, and cross-institutional modeling conversations.
              </p>
            </div>

            <div className={styles.networkSignal}>
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <Link
                href="/hers"
                className={styles.networkSignalBadge}
                aria-label="Open HERS project page"
              >
                <Image
                  src={withBasePath("/images/projects/hers_logo.png")}
                  alt="HERS logo"
                  width={576}
                  height={325}
                  sizes="88px"
                  className={styles.networkSignalLogo}
                />
              </Link>
            </div>
          </div>

          <div className={styles.networkStats} aria-label="Collaboration summary">
            {networkHighlights.map((item) => (
              <span key={item.label}>
                <strong>{item.value}</strong>
                {item.label}
              </span>
            ))}
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
      </RevealFx>

      <RevealFx translateY={12} delay={0.2}>
        <section className={`${styles.section} ${styles.testimonialSection}`}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionEyebrow}>Academic Network</p>
              <h2>Mentors and Collaborators</h2>
            </div>
          </div>
          <div className={styles.testimonialMarquee} aria-label="Mentors and collaborators">
            <div className={styles.testimonialTrack}>
              {[...testimonials, ...testimonials].map((item, index) => (
                <article key={`${item.name}-${index}`} className={styles.testimonialCard}>
                  <p>{item.quote}</p>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                  <a href={item.href} className={styles.testimonialLink}>
                    {item.action}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </RevealFx>

      <RevealFx translateY={12} delay={0.25}>
        <section className={`${styles.section} ${styles.visitorMapSection}`}>
          <VisitorLocationMap />
        </section>
      </RevealFx>
    </Column>
  );
}
