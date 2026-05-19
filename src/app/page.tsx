import Image from "next/image";
import Link from "next/link";

import { Column, Meta, RevealFx, Schema } from "@once-ui-system/core";

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
const impactMetrics = [
  {
    value: "DFG",
    label: "Individual research grant",
    detail: "HERS project on heterogeneities and their effect on rotational seismology.",
  },
  {
    value: "7",
    label: "Journal publications",
    detail: "Research output across geophysics, earthquake engineering, and planetary seismology.",
  },
  {
    value: "6C",
    label: "Motion sensing",
    detail: "Applications of six-component measurements for structural vibration analysis.",
  },
  {
    value: "10+",
    label: "Years of research",
    detail: "Civil engineering, structural dynamics, earthquake engineering, and seismology.",
  },
];

const focusAreas = [
  {
    title: "Model Rotational Ground Motions",
    description:
      "I develop analytical and numerical approaches to simulate rotational and translational earthquake ground motions in complex media.",
  },
  {
    title: "Connect Seismology and Structures",
    description:
      "My civil engineering background helps translate seismic modeling into questions of bridge response, structural vibrations, and design resilience.",
  },
  {
    title: "Mentor and Build Research Communities",
    description:
      "I supervise student research, teach computational seismology, review manuscripts, and help organize scientific workshops and conferences.",
  },
];

const researchProfile = [
  "Rotational Seismology",
  "Earthquake Engineering",
  "Structural Dynamics",
  "Seismic Wave Propagation",
];

const publicationSignals = [
  "Journal publications in JGR: Solid Earth, Journal of Seismology, Pure and Applied Geophysics, and Earth and Planetary Science Letters.",
  "Current preprint on rotational ground motions and earthquake-resistant bridge design.",
  "Conference contributions across EGU, AGU, WCEE, IWGoRS, SHMII, and structural engineering venues.",
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
              <p className={styles.eyebrow}>
                Rotational Seismology | Structural Dynamics | Earthquake Engineering
              </p>
              <h1 className={styles.heroTitle}>{home.headline}</h1>
              <p className={styles.heroText}>{home.subline}</p>

              <div className={styles.roleFitPanel}>
                <p className={styles.cardKicker}>Research Profile</p>
                <div className={styles.roleFitChips}>
                  {researchProfile.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <p className={styles.roleFitMeta}>
                  Institute of Geophysics, University of Hamburg.
                </p>
              </div>

              <div className={styles.heroActions}>
                <Link href="/about" className={`${styles.primaryButton} ${styles.workButton}`}>
                  About Anjali
                </Link>
                <Link
                  href="/publications"
                  className={`${styles.secondaryButton} ${styles.cvButton}`}
                >
                  Publications
                </Link>
                <a href={resumeLink} className={`${styles.secondaryButton} ${styles.cvButton}`}>
                  Download CV
                </a>
                <a
                  href={`mailto:${person.email}`}
                  className={`${styles.secondaryButton} ${styles.cvButton}`}
                >
                  Contact
                </a>
              </div>

              <div className={styles.impactPanel}>
                <div className={styles.impactHeader}>
                  <p className={styles.cardKicker}>Selected Research Signals</p>
                  <span>Evidence of independence, publication depth, and applied relevance.</span>
                </div>
                <div className={styles.impactGrid}>
                  {impactMetrics.map((item) => (
                    <article key={item.label} className={styles.impactCard}>
                      <strong>{item.value}</strong>
                      <h3>{item.label}</h3>
                      <p>{item.detail}</p>
                    </article>
                  ))}
                </div>
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
                  <p className={styles.profileLabel}>Based in {person.location}</p>
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
                    <a href="https://orcid.org/0000-0002-2913-3013" className={styles.inlineLink}>
                      ORCID
                    </a>
                  </div>
                </div>
              </div>

              <div className={styles.storyCard}>
                <p className={styles.cardKicker}>Toolkit Snapshot</p>
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
          <div className={styles.logoIntro}>
            <p className={styles.sectionEyebrow}>Collaborative Footprint</p>
            <h2>Institutions connected through publications, projects, and research exchange.</h2>
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

      <RevealFx translateY={8} delay={0.2}>
        <section className={styles.section}>
          <div className={styles.sectionIntro}>
            <p className={styles.sectionEyebrow}>What She Brings</p>
            <h2>Research depth at the boundary of geophysics and civil engineering.</h2>
            <p>
              Her work is strongest where wave physics, structural response, and practical
              earthquake engineering questions need to be understood together.
            </p>
          </div>

          <div className={styles.capabilityGrid}>
            {focusAreas.map((item) => (
              <article key={item.title} className={styles.capabilityCard}>
                <p className={styles.cardKicker}>Focus Area</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </RevealFx>

      <RevealFx translateY={12} delay={0.25}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionEyebrow}>Research Output</p>
              <h2>Publications and conference contributions grounded in seismic modeling.</h2>
              <div className={styles.caseStudyList}>
                {publicationSignals.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
            <Link href="/publications" className={styles.inlineLink}>
              Review publications
            </Link>
          </div>
        </section>
      </RevealFx>

      <RevealFx translateY={12} delay={0.3}>
        <section className={styles.section}>
          <article className={styles.ctaCard}>
            <p className={styles.cardKicker}>Research Collaborations</p>
            <h2>Open to scientific exchange across seismology and structural resilience.</h2>
            <p>
              Reach out for research collaboration, invited talks, student supervision discussions,
              or questions about rotational ground-motion modeling and structural monitoring.
            </p>
            <div className={styles.heroActions}>
              <a
                href={`mailto:${person.email}`}
                className={`${styles.primaryButton} ${styles.workButton}`}
              >
                Contact
              </a>
              <Link href="/about" className={`${styles.secondaryButton} ${styles.cvButton}`}>
                More About Anjali
              </Link>
            </div>
            <div className={styles.ctaList}>
              <span>Rotational seismology</span>
              <span>Earthquake engineering</span>
              <span>Structural health monitoring</span>
            </div>
          </article>
        </section>
      </RevealFx>
    </Column>
  );
}
