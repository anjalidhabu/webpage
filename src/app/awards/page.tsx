import { awards } from "@/app/awards/content";
import { about, baseURL, home, person } from "@/resources";
import { Meta, Schema } from "@once-ui-system/core";
import Link from "next/link";
import type { CSSProperties } from "react";
import styles from "./page.module.css";

const awardEntries = [
  {
    group: "academic",
    year: "2014",
    sortYear: 2014,
    title: "Silver Medal, VNIT Nagpur",
    institution: "Visvesvaraya National Institute of Technology Nagpur",
    description:
      "Awarded for securing second position in the Department of Applied Mechanics during the M.Tech. programme.",
  },
  {
    group: "academic",
    year: "2010",
    sortYear: 2010,
    title: "Gold Medals and Academic Awards, SGSITS Indore",
    institution: "Shri G.S. Institute of Technology and Science, Indore",
    description:
      "Multiple undergraduate academic honours for first position, highest overall marks, and distinction in structural and geotechnical engineering.",
  },
  {
    group: "scholarships",
    year: "Jan. 2014 - July 2019",
    sortYear: 2019,
    title: "Merit-based Scholarship, Ph.D.",
    institution: "Ministry of Human Resource Development, Govt. of India",
    description: "Government scholarship for academic excellence during Ph.D. studies.",
  },
  {
    group: "scholarships",
    year: "Jan. 2012 - July 2014",
    sortYear: 2014,
    title: "Merit-based Scholarship, M.Tech.",
    institution: "Ministry of Human Resource Development, Govt. of India",
    description: "Government scholarship for academic excellence during M.Tech. studies.",
  },
  {
    group: "research",
    year: "2020",
    sortYear: 2020,
    title: "Institute Research Award, IIT Madras",
    institution: "Indian Institute of Technology Madras",
    description:
      "Recognition for the quality and quantity of research output during doctoral studies.",
  },
  {
    group: "research",
    year: "Sep. 2018",
    sortYear: 2018,
    title: "Student Travel Grant",
    institution: "Indian Institute of Technology Madras",
    description: "Support for conference presentations and research dissemination.",
  },
];

const awardGroups = [
  {
    id: "academic",
    eyebrow: "Medals & Honours",
    title: "Academic Medals / Awards",
    description:
      "Academic distinctions earned through strong performance in civil engineering studies.",
    accent: "#c78321",
  },
  {
    id: "scholarships",
    eyebrow: "Academic Funding",
    title: "Scholarships",
    description:
      "Merit-based Government of India support awarded for postgraduate academic excellence.",
    accent: "#a94d63",
  },
  {
    id: "research",
    eyebrow: "Research Support",
    title: "Research Awards & Travel Grants",
    description:
      "Recognition and institutional support connected to doctoral research and conference dissemination.",
    accent: "#167d9c",
  },
];

const stats = [
  {
    value: awardGroups.length.toString(),
    label: "Grouped themes",
    detail: "Academic awards, scholarships, and research/travel support.",
  },
  {
    value: awardEntries.length.toString(),
    label: "Honours listed",
    detail: "A concise view of awards, medals, scholarships, and grants.",
  },
  {
    value: "2010-2020",
    label: "Recognition span",
    detail: "From undergraduate distinction to doctoral research achievement.",
  },
  {
    value: "3",
    label: "Career stages",
    detail: "Undergraduate, master’s, and doctoral academic milestones.",
  },
];

export async function generateMetadata() {
  return Meta.generate({
    title: awards.title,
    description: awards.description,
    baseURL,
    image: home.image,
    path: awards.path,
  });
}

export default function AwardsPage() {
  const timelineEntries = [...awardEntries].sort(
    (first, second) => second.sortYear - first.sortYear,
  );

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

      <section className={styles.heroSection}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Awards & Honours</p>
          <h1>Recognition across research and academic excellence.</h1>
          <p>
            A focused view of academic medals, merit-based scholarships, research recognition, and
            travel support across Anjali’s civil engineering and earthquake engineering journey.
          </p>
        </div>

        <div className={styles.statGrid} aria-label="Awards summary">
          {stats.map((stat) => (
            <article key={stat.label} className={styles.statCard}>
              <strong>{stat.value}</strong>
              <h2>{stat.label}</h2>
              <p>{stat.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-label="Grouped awards">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Recognition Groups</p>
          <h2>Sorted into three clearer categories.</h2>
          <p>
            Related honours are grouped together so the page reads as a structured academic profile
            instead of a dense list of separate cards.
          </p>
        </div>

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
                  .map((entry) => (
                    <article key={entry.title} className={styles.awardItem}>
                      <div className={styles.awardYear}>{entry.year}</div>
                      <div className={styles.awardBody}>
                        <h4>{entry.title}</h4>
                        <p className={styles.institution}>{entry.institution}</p>
                        <p>{entry.description}</p>
                      </div>
                    </article>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className={styles.timelinePanel} aria-label="Compact recognition timeline">
        <div className={styles.timelineHeader}>
          <div>
            <p className={styles.eyebrow}>At a Glance</p>
            <h2>Chronological overview.</h2>
          </div>
          <span>{awardEntries.length} honours</span>
        </div>

        <ol className={styles.timelineList}>
          {timelineEntries.map((entry) => (
            <li key={`timeline-${entry.title}`} className={styles.timelineItem}>
              <span>{entry.year}</span>
              <strong>{entry.title}</strong>
            </li>
          ))}
        </ol>
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
