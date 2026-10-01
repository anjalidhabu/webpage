import { baseURL, home, person, social } from "@/resources";
import { publications } from "@/app/publications/content";

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  }} />;
}

export function ResearcherProfileData() {
  return <JsonLd data={{
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${baseURL}/about/#profile`,
    url: `${baseURL}/about/`,
    mainEntity: {
      "@type": "Person",
      "@id": `${baseURL}/#person`,
      name: `${person.firstName} ${person.lastName}`,
      honorificPrefix: "Dr.",
      alternateName: [person.name, "A. C. Dhabu"],
      url: `${baseURL}/`,
      image: `${baseURL}${person.avatar}`,
      description: home.description,
      jobTitle: person.role,
      affiliation: { "@type": "Organization", name: "University of Hamburg" },
      knowsAbout: person.hardSkills,
      sameAs: social.map((profile) => profile.link).filter((url) => url.startsWith("https://")),
    },
  }} />;
}

export function PublicationStructuredData() {
  const articles = publications.groups.flatMap((group) => group.items)
    .filter((item) => item.type === "Journal" && item.doi);
  return <JsonLd data={{
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: `${baseURL}/publications/`,
    name: publications.title,
    about: { "@id": `${baseURL}/#person` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "ScholarlyArticle",
          "@id": `https://doi.org/${item.doi}`,
          headline: item.title,
          url: item.href,
          identifier: item.doi,
          creditText: item.authors,
          datePublished: item.year,
          isPartOf: { "@type": "Periodical", name: item.venue },
          keywords: item.tags,
        },
      })),
    },
  }} />;
}
