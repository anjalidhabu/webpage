import { generateSiteMetadata } from "@/utils/metadata";
import { awards } from "@/app/awards/content";
import { about, baseURL, home, person } from "@/resources";
import { withBasePath } from "@/utils/paths";
import { Schema } from "@once-ui-system/core";
import Link from "next/link";
import type { CSSProperties } from "react";
import styles from "./page.module.css";

type AwardLogo = {
  label: string;
  initials: string;
  src?: string;
  wide?: boolean;
};

type AwardDetailGroup = {
  label: string;
  items: string[];
};

type AwardEntry = {
  group: "academic" | "scholarships";
  year: string;
  sortYear: number;
  title: string;
  institution: string;
  description: string;
  detailGroups?: AwardDetailGroup[];
  href?: string;
  linkLabel?: string;
  logos: AwardLogo[];
};

type AwardMoment = {
  title: string;
  context: string;
  year: string;
  image?: string;
  alt: string;
};

const awardEntries: AwardEntry[] = [
  {
    group: "academic",
    year: "2025",
    sortYear: 2025,
    title: "Agathe Lasch Coaching Program + Diversity",
    institution: "University of Hamburg",
    description: "Selected participant in the Agathe Lasch Coaching Program + Diversity.",
    logos: [
      {
        label: "University of Hamburg",
        initials: "UHH",
        src: "/images/logos/UHH.svg",
      },
    ],
  },
  {
    group: "academic",
    year: "2026",
    sortYear: 2026,
    title: "dynaMENT advanced Mentoring Program",
    institution: "University of Hamburg",
    description: "Selected participant in the dynaMENT advanced Mentoring Program.",
    logos: [
      {
        label: "University of Hamburg",
        initials: "UHH",
        src: "/images/logos/UHH.svg",
      },
    ],
  },
  {
    group: "academic",
    year: "2014",
    sortYear: 2014,
    title: "Silver Medal, VNIT Nagpur",
    institution: "Visvesvaraya National Institute of Technology Nagpur",
    description:
      "Awarded for securing second position in the Department of Applied Mechanics during the M.Tech. programme.",
    logos: [
      {
        label: "Visvesvaraya National Institute of Technology Nagpur",
        initials: "VNIT",
        src: "/images/logos/VNIT_logo.jpeg",
      },
    ],
  },
  {
    group: "academic",
    year: "2011",
    sortYear: 2011,
    title: "Gold Medal, SGSITS Indore",
    institution: "Shri G. S. Institute of Technology and Science, Indore, India",
    description:
      "Awarded for achieving the highest overall academic performance and securing first rank throughout the B.E. (Civil) programme.",
    detailGroups: [
      {
        label: "2011",
        items: [
          "Prof. D. G. Dhavalikar Memorial Gold Medal.",
          "Shri K. G. Seksaria Memorial Medal.",
          "Planarch Gold Medal.",
          "Prof. B. S. Phadke Award.",
          "Gold Medal for securing the highest marks in Structural Engineering.",
        ],
      },
      {
        label: "2010",
        items: ["Gold Medal for securing the highest marks in Geotechnical Engineering."],
      },
    ],
    logos: [
      {
        label: "Shri G.S. Institute of Technology and Science, Indore",
        initials: "SGSITS",
        src: "/images/logos/SGSITS_Indore.png",
      },
    ],
  },
  {
    group: "scholarships",
    year: "2024 - 2027",
    sortYear: 2027,
    title: "Independent DFG Research Project",
    institution: "Deutsche Forschungsgemeinschaft",
    description:
      "Individual research grant (Eigene Stelle) for the Heterogeneities and Their Effect on Rotational Seismology (HERS) project from the Deutsche Forschungsgemeinschaft.",
    href: "/hers",
    linkLabel: "View HERS project",
    logos: [
      {
        label: "Deutsche Forschungsgemeinschaft",
        initials: "DFG",
        src: "/images/logos/logo-dfg.jpg",
        wide: true,
      },
      {
        label: "University of Hamburg",
        initials: "UHH",
        src: "/images/logos/Seal_of_the_University_of_Hamburg.svg",
      },
    ],
  },
  {
    group: "scholarships",
    year: "2014 - 2019",
    sortYear: 2019,
    title: "Five-Year Doctoral Fellowship, IIT Madras",
    institution: "Ministry of Human Resource Development, Government of India",
    description:
      "Received MHRD, Government of India fellowship support for five years of Ph.D. study at IIT Madras, from July 2014 to July 2019.",
    logos: [
      {
        label: "Ministry of Human Resource Development, Government of India",
        initials: "MHRD",
        src: "/images/logos/MHRD_India.png",
        wide: true,
      },
      {
        label: "Indian Institute of Technology Madras",
        initials: "IITM",
        src: "/images/logos/IIT_Madras_Logo.svg",
      },
    ],
  },
  {
    group: "scholarships",
    year: "2012 - 2014",
    sortYear: 2014,
    title: "M.Tech. Scholarship, VNIT Nagpur",
    institution: "Ministry of Human Resource Development, Government of India",
    description: "Received MHRD, Government of India scholarship support for two years of M.Tech. study at VNIT Nagpur, from July 2012 to July 2014.",
    logos: [
      {
        label: "Ministry of Human Resource Development, Government of India",
        initials: "MHRD",
        src: "/images/logos/MHRD_India.png",
        wide: true,
      },
      {
        label: "Visvesvaraya National Institute of Technology Nagpur",
        initials: "VNIT",
        src: "/images/logos/VNIT_logo.jpeg",
      },
    ],
  },
  {
    group: "academic",
    year: "2020",
    sortYear: 2020,
    title: "Institute Research Award, IIT Madras",
    institution: "Indian Institute of Technology Madras",
    description:
      "Honour for the exceptional quality of research, publications, and contributions during doctoral studies.",
    logos: [
      {
        label: "Indian Institute of Technology Madras",
        initials: "IITM",
        src: "/images/logos/IIT_Madras_Logo.svg",
      },
    ],
  },
  {
    group: "scholarships",
    year: "Sep. 2018",
    sortYear: 2018,
    title: "International Travel Grant",
    institution: "Indian Institute of Technology Madras and MHRD",
    description: "Travel grant for international conferences and research collaborations.",
    logos: [
      {
        label: "Ministry of Human Resource Development, Government of India",
        initials: "MHRD",
        src: "/images/logos/MHRD_India.png",
        wide: true,
      },
      {
        label: "Indian Institute of Technology Madras",
        initials: "IITM",
        src: "/images/logos/IIT_Madras_Logo.svg",
      },
    ],
  },
];

const awardStats = [
  {
    value: "€340K",
    label: "DFG Research grant funding",
    detail: "Three-year individual DFG research grant",
  },
  {
    value: String(awardEntries.length),
    label: "Listed honours",
    detail: "Grants, fellowships, medals, mentoring and coaching selections, and travel support",
  },
];

const awardGroups = [
  {
    id: "scholarships",
    eyebrow: "Academic Funding",
    title: "Research Grants, Fellowships & Travel Support",
    description:
      "Competitive research grants, fellowships, scholarships, and travel support for independent projects and academic excellence.",
    accent: "#a94d63",
  },
  {
    id: "academic",
    eyebrow: "Academic Honours",
    title: "Medals & Honours",
    description:
      "Academic distinctions and mentoring and coaching program selections supporting research and professional development.",
    accent: "#c78321",
  },
];

const awardMoments: AwardMoment[] = [
  {
    title: "Gold Medal Ceremony",
    context: "SGSITS Indore | B.E. Civil Engineering",
    year: "2011",
    image:"/images/awards/btech_gold.jpeg",
    alt: "Dr. Anjali Dhabu receiving the SGSITS gold medal",
  },
  {
    title: "Institute Research Award",
    context: "IIT Madras | Doctoral research recognition",
    year: "2020",
    image: "/images/awards/inst_award.png",
    alt: "Dr. Anjali Dhabu receiving the Institute Research Award at IIT Madras",
  },
  {
    title: "Silver Medal Recognition",
    context: "VNIT Nagpur | M.Tech. Applied Mechanics",
    year: "2014",
    image: "/images/awards/mtech.jpg",
    alt: "Dr. Anjali Dhabu receiving the VNIT Nagpur silver medal",
  },
  {
    title: "Research Grant Milestone",
    context: "DFG HERS project | Independent research funding",
    year: "2024",
    image: "/images/awards/AD.jpg",
    alt: "Dr. Anjali Dhabu at a research grant or project recognition moment",
  },
];

export async function generateMetadata() {
  return generateSiteMetadata({
    title: awards.title,
    description: awards.description,
    baseURL,
    image: home.image,
    path: awards.path,
  });
}

export default function AwardsPage() {
  return (
    <main className={styles.awardsPage}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={awards.path}
        title={awards.title}
        description={awards.description}
        image={home.image}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderCopy}>
          <p className={styles.eyebrow}>Academic Recognition</p>
          <h1>Awards, Grants & Honours</h1>
          <p>
            Competitive funding, fellowships, medals, and academic recognition supporting an
            independent research trajectory from civil engineering to rotational seismology.
          </p>
        </div>
        <div className={styles.awardStats} aria-label="Awards and funding summary">
          {awardStats.map((stat) => (
            <span key={stat.label} className={styles.awardStat}>
              <strong>{stat.value}</strong>
              <em>{stat.label}</em>
              <small>{stat.detail}</small>
            </span>
          ))}
        </div>
      </header>

      <section aria-label="Grouped awards">
        <div className={styles.groupStack}>
          {awardGroups.map((group) => (
            <section
              key={group.id}
              className={styles.groupPanel}
              style={{ "--award-accent": group.accent } as CSSProperties}
              aria-labelledby={`award-group-${group.id}`}
            >
              <div className={styles.groupHeader}>
                <p className={styles.eyebrow}>{group.eyebrow}</p>
                <h3 id={`award-group-${group.id}`}>{group.title}</h3>
                <p>{group.description}</p>
              </div>

              <div className={styles.awardList}>
                {awardEntries
                  .filter((entry) => entry.group === group.id)
                  .sort((first, second) => second.sortYear - first.sortYear)
                  .map((entry) => (
                    <article key={entry.title} className={styles.awardItem}>
                      <div className={styles.awardYear}>{entry.year}</div>
                      <div className={styles.awardBody}>
                        <h4>{entry.title}</h4>
                        <p className={styles.institution}>{entry.institution}</p>
                        <p className={styles.awardDescription}>{entry.description}</p>
                        {entry.detailGroups?.length ? (
                          <div className={styles.awardDetailGroups}>
                            {entry.detailGroups.map((detailGroup) => (
                              <div key={detailGroup.label} className={styles.awardDetailGroup}>
                                <h5>{detailGroup.label}</h5>
                                <ul className={styles.awardBullets}>
                                  {detailGroup.items.map((item) => (
                                    <li key={item}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        {entry.href ? (
                          <Link href={entry.href} className={styles.awardLink}>
                            {entry.linkLabel ?? "View details"}
                          </Link>
                        ) : null}
                      </div>
                      <div
                        className={styles.awardLogoGroup}
                        aria-label={`${entry.logos.map((logo) => logo.label).join(" and ")} logos`}
                      >
                        {entry.logos.map((logo) => (
                          <span
                            key={logo.label}
                            className={`${styles.awardLogoPlate} ${
                              logo.wide ? styles.wideAwardLogoPlate : ""
                            }`}
                          >
                            {logo.src ? (
                              <img src={withBasePath(logo.src)} alt="" />
                            ) : (
                              <span aria-hidden="true">{logo.initials}</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className={styles.momentsSection} aria-labelledby="award-moments-heading">
        <div className={styles.momentsHeader}>
          <p className={styles.eyebrow}>Recognition Milestones</p>
          <h2 id="award-moments-heading">
            Selected milestones in academic recognition and research funding.
          </h2>
        </div>
        <div className={styles.momentsGrid}>
          {awardMoments.map((moment) => (
            <article key={moment.title} className={styles.momentCard}>
              <div className={styles.momentImageFrame}>
                {moment.image ? (
                  <img src={withBasePath(moment.image)} alt={moment.alt} />
                ) : (
                  <div className={styles.momentPlaceholder} aria-label={`${moment.title}, ${moment.year}`}>
                    <span>{moment.year}</span>
                    <strong>AD</strong>
                  </div>
                )}
              </div>
              <div className={styles.momentCaption}>
                <span>{moment.year}</span>
                <h3>{moment.title}</h3>
                <p>{moment.context}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.leadershipCta}>
        <div>
          <p className={styles.eyebrow}>Funding Context</p>
          <h2>See how these honours connect to project leadership.</h2>
        </div>
        <Link href="/leadership">Funding & Leadership</Link>
      </section>
    </main>
  );
}
