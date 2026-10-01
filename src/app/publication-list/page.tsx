import { generateSiteMetadata } from "@/utils/metadata";
import { publications } from "@/app/publications/content";
import { about, baseURL, home, person } from "@/resources";
import type { Publications } from "@/types";
import {
  Column,
  Heading,
  Line,
  Row,
  Schema,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";

type PublicationItem = Publications["groups"][number]["items"][number];
type ListedPublication = PublicationItem & {
  groupTitle: string;
  originalIndex: number;
};

const publicationList = {
  path: "/publication-list",
  title: `Publication List - ${person.name}`,
  description: `A concise publication list for ${person.name}.`,
};

const flatPublications = publications.groups.flatMap((group, groupIndex) =>
  group.items.map((item, itemIndex) => ({
    ...item,
    groupTitle: group.title,
    originalIndex: groupIndex * 100 + itemIndex,
  })),
);

const publicationSections = [
  {
    title: "Journal Articles",
    description:
      "Peer-reviewed journal publications across seismology, geophysics, and planetary science.",
    items: getSortedPublications(flatPublications.filter((item) => item.type === "Journal")),
  },
  {
    title: "Preprints and Manuscripts",
    description: "Current manuscripts, preprints, and work moving toward journal submission.",
    items: getSortedPublications(
      flatPublications.filter((item) => item.type === "Preprint" || item.type === "Manuscript"),
    ),
  },
  {
    title: "Conference Contributions and Invited Talks",
    description:
      "Conference papers, abstracts, presentations, and invited scientific contributions.",
    items: getSortedPublications(
      flatPublications.filter((item) => item.type === "Conference" || item.type === "Invited Talk"),
    ),
  },
].filter((section) => section.items.length > 0);

const totalPublications = publicationSections.reduce(
  (count, section) => count + section.items.length,
  0,
);

export async function generateMetadata() {
  return generateSiteMetadata({
    title: publicationList.title,
    description: publicationList.description,
    baseURL: baseURL,
    image: home.image,
    path: publicationList.path,
  });
}

export default function PublicationListPage() {
  return (
    <Column maxWidth="m" paddingTop="24" gap="xl">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={publicationList.path}
        title={publicationList.title}
        description={publicationList.description}
        image={home.image}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column fillWidth gap="16" horizontal="center">
        <Tag size="l">{totalPublications} entries</Tag>
        <Heading variant="heading-strong-xl" align="center" wrap="balance">
          Publication list.
        </Heading>
        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
          align="center"
          wrap="balance"
          style={{ maxWidth: "44rem" }}
        >
          Journal articles, manuscripts, preprints, conference papers, and invited contributions by{" "}
          {person.name}.
        </Text>
      </Column>

      {publicationSections.map((section) => (
        <Column key={section.title} fillWidth gap="20">
          <Column fillWidth gap="8">
            <Row fillWidth horizontal="between" vertical="center" wrap gap="12">
              <Column gap="4" style={{ maxWidth: "42rem" }}>
                <Heading as="h2" variant="heading-strong-l">
                  {section.title}
                </Heading>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {section.description}
                </Text>
              </Column>
              <Tag size="l">{section.items.length} entries</Tag>
            </Row>
            <Line />
          </Column>

          <Column fillWidth gap="16">
            {section.items.map((item, index) => (
              <Column
                key={item.id}
                fillWidth
                gap="12"
                padding="20"
                background="page"
                border="neutral-alpha-medium"
                radius="m"
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                  borderRadius: "8px",
                }}
              >
                <Row fillWidth horizontal="between" vertical="start" wrap gap="12">
                  <Column gap="8" style={{ maxWidth: "44rem" }}>
                    <Text variant="body-strong-m" wrap="balance">
                      {index + 1}. {item.title}
                    </Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {item.authors}
                    </Text>
                  </Column>
                  <Row gap="8" wrap>
                    <Tag size="m">{item.type}</Tag>
                    <Tag size="m">{item.year}</Tag>
                    {item.quartile && <Tag size="m">{item.quartile}</Tag>}
                  </Row>
                </Row>

                <Text variant="body-default-s" onBackground="neutral-weak">
                  <strong>{item.venue}</strong> {item.details}
                </Text>

                <Text variant="body-default-s" onBackground="neutral-weak">
                  <strong>Research theme:</strong> {item.groupTitle}
                </Text>

                {item.institutions && item.institutions.length > 0 && (
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    <strong>Collaborating institutions:</strong> {item.institutions.join(", ")}
                  </Text>
                )}

                <Row fillWidth horizontal="between" vertical="center" wrap gap="12">
                  <Row gap="8" wrap>
                    {item.doi && <Tag size="m">DOI {item.doi}</Tag>}
                    {item.arxivId && <Tag size="m">arXiv {item.arxivId}</Tag>}
                  </Row>
                  {(item.href || item.pdf) && (
                    <Row gap="12" wrap>
                      {item.href && (
                        <SmartLink href={item.href} suffixIcon="arrowUpRightFromSquare">
                          View publication
                        </SmartLink>
                      )}
                      {item.pdf && (
                        <SmartLink href={item.pdf} suffixIcon="arrowUpRightFromSquare">
                          View PDF
                        </SmartLink>
                      )}
                    </Row>
                  )}
                </Row>
              </Column>
            ))}
          </Column>
        </Column>
      ))}
    </Column>
  );
}

function getSortedPublications(items: ListedPublication[]) {
  return [...items].sort((a, b) => {
    const yearDifference = getYearValue(b.year) - getYearValue(a.year);

    if (yearDifference !== 0) {
      return yearDifference;
    }

    return a.originalIndex - b.originalIndex;
  });
}

function getYearValue(year: string) {
  const numericYear = Number.parseInt(year, 10);

  if (Number.isNaN(numericYear)) {
    return Number.MAX_SAFE_INTEGER;
  }

  return numericYear;
}
