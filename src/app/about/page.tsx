import { ResearcherProfileData } from "@/components/ResearchStructuredData";
import { generateSiteMetadata } from "@/utils/metadata";
import Image from "next/image";
import { awards as awardsPage } from "@/app/awards/content";
import { publications } from "@/app/publications/content";
import { teaching } from "@/app/teaching/content";
import { FooterContact } from "@/components";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import { about, baseURL, home, person, routes, social } from "@/resources";
import { withBasePath } from "@/utils/paths";
import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Row,
  Schema,
  Tag,
  Text,
} from "@once-ui-system/core";
import React from "react";

export async function generateMetadata() {
  return generateSiteMetadata({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: home.image,
    path: about.path,
  });
}

export default function About() {
  const displayLocation = person.displayLocation ?? person.location;
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
    ...(about.coordination
      ? [
          {
            title: about.coordination.title,
            display: about.coordination.display,
            items: about.coordination.items.map((item) => item.title),
          },
        ]
      : []),
    {
      title: "Awards and Honours",
      display: Boolean(about.awards?.display),
      items: [],
      href: awardsPage.path,
    },
    {
      title: publications.label,
      display: true,
      items: [],
      href: publications.path,
    },
  ];
  return (
    <Column maxWidth="m" className={styles.aboutPage}>
      <ResearcherProfileData />
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={home.image}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {about.tableOfContent.display && <TableOfContents structure={structure} about={about} />}
      <Row fillWidth s={{ direction: "column" }} horizontal="center">
        {(about.avatar.display || about.strengths.display || about.studies.display) && (
          <Column
            className={styles.avatar}
            top="64"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            {about.avatar.display && <Avatar src={withBasePath(person.avatar)} size="xl" />}
            <Row gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {displayLocation}
            </Row>
            {person.languages && person.languages.length > 0 && (
              <Row wrap gap="8">
                {person.languages.map((language) => (
                  <Tag key={language} size="l">
                    {language}
                  </Tag>
                ))}
              </Row>
            )}
            {about.strengths.display && about.strengths.items.length > 0 && (
              <Column fillWidth gap="12">
                <Heading as="h2" id={about.strengths.title} variant="heading-strong-l">
                  {about.strengths.title}
                </Heading>
                <Column as="ul" fillWidth gap="8" paddingLeft="20">
                  {about.strengths.items.map((item) => (
                    <Text as="li" key={item} variant="body-default-s" onBackground="neutral-medium">
                      {item}
                    </Text>
                  ))}
                </Column>
              </Column>
            )}
            {person.hardSkills && person.hardSkills.length > 0 && (
              <Column fillWidth gap="8">
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Toolkit:
                </Text>
                <Row wrap gap="8">
                  {person.hardSkills.map((skill) => (
                    <Tag key={skill} size="l">
                      {skill}
                    </Tag>
                  ))}
                </Row>
              </Column>
            )}
            {about.studies.display && (
              <Column fillWidth gap="12">
                <Heading as="h2" id={about.studies.title} variant="heading-strong-l">
                  {about.studies.title}
                </Heading>
                <Column fillWidth gap="m">
                  {about.studies.institutions.map((institution) => (
                    <Row key={institution.name} fillWidth gap="12" vertical="start">
                      {institution.logo && (
                        <div className={styles.institutionLogo}>
                          <Image
                            src={withBasePath(institution.logo)}
                            alt={`${institution.name} logo`}
                            width={48}
                            height={48}
                            className={styles.institutionLogoImage}
                          />
                        </div>
                      )}
                      <Column className={styles.institutionDetails} fillWidth gap="4">
                        <Text id={institution.name} variant="body-strong-m">
                          {institution.name}
                        </Text>
                        <Text variant="body-default-s" onBackground="neutral-weak">
                          {institution.description}
                        </Text>
                      </Column>
                    </Row>
                  ))}
                </Column>
              </Column>
            )}
          </Column>
        )}
        <Column className={`${styles.blockAlign} ${styles.mainColumn}`} flex={9} maxWidth={40}>
          <Column
            id={about.intro.title}
            className={styles.introBlock}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            {about.calendar.display && (
              <Row
                fitWidth
                border="brand-alpha-medium"
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
              >
                <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                <Row paddingX="8">Schedule a call</Row>
                <IconButton
                  href={about.calendar.link}
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Row>
            )}
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            {social.length > 0 && (
              <Column className={styles.blockAlign} paddingTop="20" paddingBottom="8" gap="8">
                <Row gap="8" wrap horizontal="center" fitWidth data-border="rounded">
                  {social
                    .filter((item) => item.essential)
                    .map(
                      (item) =>
                        item.link && (
                          <React.Fragment key={item.name}>
                            <Row s={{ hide: true }}>
                              <Button
                                key={item.name}
                                href={item.link}
                                prefixIcon={item.icon}
                                label={item.name}
                                size="s"
                                weight="default"
                                variant="secondary"
                              />
                            </Row>
                            <Row hide s={{ hide: false }}>
                              <IconButton
                                size="l"
                                key={`${item.name}-icon`}
                                href={item.link}
                                icon={item.icon}
                                variant="secondary"
                              />
                            </Row>
                          </React.Fragment>
                        ),
                    )}
                  <Row s={{ hide: true }}>
                    <FooterContact email={person.email} />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <FooterContact email={person.email} compact />
                  </Row>
                </Row>
                {about.references?.display && (
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {about.references.note}
                  </Text>
                )}
              </Column>
            )}
          </Column>

          {about.intro.display && (
            <Column
              className={styles.narrativeBlock}
              textVariant="body-default-l"
              fillWidth
              gap="m"
              marginBottom="xl"
            >
              {about.intro.description}
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading
                className={styles.sectionTitle}
                as="h2"
                id={about.work.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience) => (
                  <Column
                    key={`${experience.company}-${experience.role}`}
                    className={styles.experienceCard}
                    fillWidth
                  >
                    <Row fillWidth gap="12" vertical="start" marginBottom="m">
                      {experience.logo && (
                        <div className={styles.institutionLogo}>
                          <Image
                            src={withBasePath(experience.logo)}
                            alt={`${experience.company} logo`}
                            width={48}
                            height={48}
                            className={styles.institutionLogoImage}
                          />
                        </div>
                      )}
                      <Column className={styles.institutionDetails} fillWidth gap="4">
                        <Row
                          className={styles.experienceHeader}
                          fillWidth
                          horizontal="between"
                          vertical="end"
                          s={{ direction: "column", vertical: "start" }}
                        >
                          <Text id={experience.company} variant="heading-strong-l">
                            {experience.company}
                          </Text>
                          <Text variant="heading-default-xs" onBackground="neutral-weak">
                            {experience.timeframe}
                          </Text>
                        </Row>
                        <Text variant="body-default-s" onBackground="brand-weak">
                          {experience.role}
                        </Text>
                      </Column>
                    </Row>
                    <Column as="ul" gap="16">
                      {experience.achievements.map((achievement: React.ReactNode) => (
                        <Text
                          as="li"
                          variant="body-default-m"
                          key={`${experience.company}-${String(achievement)}`}
                        >
                          {achievement}
                        </Text>
                      ))}
                    </Column>
                    {experience.images && experience.images.length > 0 && (
                      <Row fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
                        {experience.images.map((image) => (
                          <Row
                            key={`${image.src}-${image.alt}`}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={withBasePath(image.src)}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
                {routes["/teaching"] && (
                  <Row>
                    <Button
                      href={teaching.path}
                      variant="secondary"
                      prefixIcon="book"
                      label="See Teaching and Mentoring"
                    />
                  </Row>
                )}
              </Column>
            </>
          )}
          {about.technical.display && (
            <>
              <Heading
                className={styles.sectionTitle}
                as="h2"
                id={about.technical.title}
                variant="display-strong-s"
                marginBottom="40"
              >
                {about.technical.title}
              </Heading>
              <Column fillWidth gap="l">
                {about.technical.skills.map((skill) => (
                  <Column key={skill.title} className={styles.skillCard} fillWidth gap="4">
                    <Text id={skill.title} variant="heading-strong-l">
                      {skill.title}
                    </Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {skill.description}
                    </Text>
                    {skill.tags && skill.tags.length > 0 && (
                      <Row wrap gap="8" paddingTop="8">
                        {skill.tags.map((tag, tagIndex) => (
                          <Tag key={`${skill.title}-${tagIndex}`} size="l" prefixIcon={tag.icon}>
                            {tag.name}
                          </Tag>
                        ))}
                      </Row>
                    )}
                    {skill.images && skill.images.length > 0 && (
                      <Row fillWidth paddingTop="m" gap="12" wrap>
                        {skill.images.map((image) => (
                          <Row
                            key={`${image.src}-${image.alt}`}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={withBasePath(image.src)}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}
          {about.coordination?.display && (
            <>
              <Heading
                className={styles.sectionTitle}
                as="h2"
                id={about.coordination.title}
                variant="display-strong-s"
                marginTop="xl"
                marginBottom="40"
              >
                {about.coordination.title}
              </Heading>
              <Column fillWidth gap="l">
                {about.coordination.items.map((item) => (
                  <Column key={item.title} className={styles.coordinationCard} fillWidth gap="4">
                    <Row
                      className={styles.experienceHeader}
                      fillWidth
                      horizontal="between"
                      vertical="end"
                      marginBottom="4"
                    >
                      <Text id={item.title} variant="heading-strong-l">
                        {item.title}
                      </Text>
                      {item.timeframe && (
                        <Text variant="heading-default-xs" onBackground="neutral-weak">
                          {item.timeframe}
                        </Text>
                      )}
                    </Row>
                    <Column as="ul" gap="16">
                      {item.points.map((point, pointIndex) => (
                        <Text
                          as="li"
                          variant="body-default-m"
                          key={`${item.title}-${pointIndex}`}
                        >
                          {point}
                        </Text>
                      ))}
                    </Column>
                  </Column>
                ))}
              </Column>
            </>
          )}
        </Column>
      </Row>
    </Column>
  );
}
