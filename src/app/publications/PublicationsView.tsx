"use client";

import type { Publications } from "@/types";
import { withBasePath } from "@/utils/paths";
import { useMemo, useState } from "react";
import { CollaborationMap } from "./CollaborationMap";
import styles from "./page.module.css";

type PublicationGroup = Publications["groups"][number];
type PublicationItem = PublicationGroup["items"][number];

type PublicationsViewProps = {
  publications: Publications;
};

const typeClassNames: Record<PublicationItem["type"], string> = {
  Journal: styles.typeJournal,
  Preprint: styles.typePreprint,
  Manuscript: styles.typeManuscript,
  Conference: styles.typeConference,
  "Invited Talk": styles.typeTalk,
};

const groupColorClassNames: Record<string, string> = {
  "rotational-ground-motion-theory": styles.groupColorRotational,
  "simulation-topography-subsurface": styles.groupColorSimulation,
  "structural-response-6c-monitoring": styles.groupColorStructural,
  "planetary-source-characterization": styles.groupColorPlanetary,
};

export function PublicationsView({ publications }: PublicationsViewProps) {
  const [activeGroup, setActiveGroup] = useState("all");

  const activeGroups = useMemo(() => {
    if (activeGroup === "all") {
      return publications.groups;
    }

    return publications.groups.filter((group) => group.id === activeGroup);
  }, [activeGroup, publications.groups]);

  return (
    <main className={styles.publicationsPage}>
      <section className={styles.heroSection}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Publications</p>
          <h1>Research output by publication group.</h1>
          <p className={styles.heroIntro}>{publications.intro}</p>
          <figure className={styles.heroThemeFigure}>
            <div className={styles.heroThemeScroller}>
              <img
                src={withBasePath("/images/diagrams/research_themes.png")}
                alt="Visual overview of research themes: rotational ground-motion theory, simulation and topography, structural response and 6C monitoring, and planetary seismology."
              />
            </div>
          </figure>
        </div>
      </section>

      <section className={styles.groupOverview} aria-label="Publication groups">
        {publications.groups.map((group) => (
          <button
            key={group.id}
            type="button"
            className={`${styles.groupCard} ${groupColorClassNames[group.id] ?? ""} ${
              activeGroup === group.id ? styles.activeGroupCard : ""
            }`}
            onClick={() => setActiveGroup(activeGroup === group.id ? "all" : group.id)}
            aria-pressed={activeGroup === group.id}
          >
            <span>{group.items.length} publications</span>
            <strong>{group.title}</strong>
            <small>{group.focus}</small>
          </button>
        ))}
      </section>

      <CollaborationMap publications={publications} activeGroup={activeGroup} />

      <div className={styles.groupStack}>
        {activeGroups.map((group) => (
          <section
            key={group.id}
            className={`${styles.groupSection} ${groupColorClassNames[group.id] ?? ""}`}
            id={group.id}
          >
            <div className={styles.groupHeader}>
              <div>
                <p className={styles.eyebrow}>{group.focus}</p>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </div>
              <span>{group.items.length} entries</span>
            </div>

            <div className={styles.publicationList}>
              {group.items.map((item, index) => (
                <PublicationCard key={item.id} item={item} index={index + 1} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

function PublicationCard({ item, index }: { item: PublicationItem; index: number }) {
  const coverVenue = item.venue.replace(/\.$/, "");

  return (
    <article className={styles.publicationCard}>
      <div className={styles.publicationIndex}>{String(index).padStart(2, "0")}</div>

      <div className={styles.publicationBody}>
        <div className={styles.publicationMeta}>
          <span className={`${styles.typeBadge} ${typeClassNames[item.type]}`}>{item.type}</span>
          <span>{item.year}</span>
          {item.status && <span>{item.status}</span>}
        </div>

        <h3>{item.title}</h3>
        <p className={styles.authors}>{item.authors}</p>
        <p className={styles.venue}>
          <strong>{item.venue}</strong> {item.details}
        </p>

        {item.insights && (
          <div className={styles.publicationInsightGrid}>
            <div>
              <span>Contribution</span>
              <p>{item.insights.contribution}</p>
            </div>
            <div>
              <span>Key finding / direction</span>
              <p>{item.insights.keyFinding}</p>
            </div>
            <div>
              <span>My role</span>
              <p>{item.insights.role}</p>
            </div>
            <div>
              <span>Why it matters</span>
              <p>{item.insights.whyItMatters}</p>
            </div>
          </div>
        )}

        {(item.tags?.length || item.institutions?.length) && (
          <div className={styles.tagRow}>
            {item.institutions?.map((institution) => (
              <span key={institution}>{institution}</span>
            ))}
            {item.tags?.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}

        {(item.href || item.pdf) && (
          <div className={styles.linkRow}>
            {item.href && (
              <a href={item.href} target="_blank" rel="noreferrer">
                View publication
              </a>
            )}
            {item.pdf && (
              <a href={item.pdf} target="_blank" rel="noreferrer">
                View PDF
              </a>
            )}
          </div>
        )}
      </div>

      <aside
        className={styles.coverPage}
        aria-label={`${coverVenue}, ${item.year}${item.quartile ? `, ${item.quartile}` : ""}`}
      >
        <span>{item.type}</span>
        <strong>{coverVenue}</strong>
        <div className={styles.coverMetrics}>
          <small>{item.year}</small>
          {item.quartile && <em>{item.quartile}</em>}
        </div>
        <div className={styles.coverLines} aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </aside>
    </article>
  );
}
