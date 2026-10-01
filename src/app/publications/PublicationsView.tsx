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
  "wavefield-physics-theory": styles.groupColorWavefield,
  "earth-sources": styles.groupColorEarthSources,
  "computational-modeling-tools": styles.groupColorComputational,
  "observables-data": styles.groupColorObservables,
  "structural-health-monitoring": styles.groupColorStructural,
};

function pluralize(count: number, singular: string) {
  return `${count} ${singular}${count === 1 ? "" : "s"}`;
}

function getPublicationTypeSummary(group: PublicationGroup) {
  const counts = group.items.reduce<Partial<Record<PublicationItem["type"], number>>>(
    (summary, item) => {
      summary[item.type] = (summary[item.type] ?? 0) + 1;
      return summary;
    },
    {},
  );

  const orderedTypes: PublicationItem["type"][] = [
    "Journal",
    "Preprint",
    "Manuscript",
    "Conference",
    "Invited Talk",
  ];

  return [pluralize(group.items.length, "Publication")]
    .concat(
      orderedTypes
        .filter((type) => counts[type])
        .map((type) => pluralize(counts[type] ?? 0, type.toLowerCase())),
    )
    .join(" · ");
}

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
      <section className={styles.publicationThemesSection} aria-labelledby="publication-themes">
        <div className={styles.publicationThemesIntro}>
          <p className={styles.eyebrow}>Publications</p>
          <h1 id="publication-themes">Research output by research theme.</h1>
          <p className={styles.introText}>
            Publications are organized using the same five research themes that structure the
            research vision.
          </p>
        </div>
        <figure className={styles.publicationThemesFigure}>
          <div className={styles.publicationThemesScroller}>
            <img
              src={withBasePath("/images/projects/research_vision.png")}
              alt="Visual overview of research themes: wavefield physics and theory, Earth and sources, computational modeling tools, observables and data, and structural health monitoring."
            />
          </div>
        </figure>
      </section>

      <section className={styles.groupOverview} aria-label="Publication research themes">
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
            <span>{pluralize(group.items.length, "Publication")}</span>
            <strong>{group.title}</strong>
            <small>{group.focus}</small>
            <em>{getPublicationTypeSummary(group)}</em>
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
              <span>{pluralize(group.items.length, "Publication")}</span>
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
          <details className={styles.publicationInsightDisclosure}>
            <summary className={styles.publicationInsightSummary}>
              <span>Publication insights</span>
              <small>Contribution, key finding, relevance, and my role</small>
            </summary>
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
                <span>Why it matters</span>
                <p>{item.insights.whyItMatters}</p>
              </div>
              <div>
                <span>My role</span>
                <p>{item.insights.role}</p>
              </div>
            </div>
          </details>
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
        {(item.href || item.pdf) && (
          <div className={styles.coverActions}>
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
        <div className={styles.coverLines} aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </aside>
    </article>
  );
}
