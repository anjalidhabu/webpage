"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Button,
  Column,
  DropdownWrapper,
  Fade,
  Flex,
  Line,
  Row,
  ToggleButton,
} from "@once-ui-system/core";

import { awards } from "@/app/awards/content";
import { leadership } from "@/app/leadership/content";
import { publications } from "@/app/publications/content";
import { teaching } from "@/app/teaching/content";
import { about, display, gallery, person, routes, travel, work } from "@/resources";
import styles from "./Header.module.scss";
import { ThemeToggle } from "./ThemeToggle";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";
  const isMoreRoute =
    pathname.startsWith("/awards") ||
    pathname.startsWith("/teaching") ||
    pathname.startsWith("/publication-list") ||
    pathname.startsWith("/gallery") ||
    pathname.startsWith("/travel");
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const displayLocation = person.displayLocation ?? person.location;

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{
          position: "fixed",
        }}
      >
        <Row paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && <Row s={{ hide: true }}>{displayLocation}</Row>}
        </Row>
        <Row fillWidth horizontal="center">
          <Row
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row gap="8" vertical="center" textVariant="body-default-m" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} size="l" />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes["/about"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="person"
                      href="/about"
                      label={about.label}
                      selected={pathname === "/about"}
                      size="l"
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="person"
                      href="/about"
                      selected={pathname === "/about"}
                      size="l"
                    />
                  </Row>
                </>
              )}
              {routes["/work"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      label={work.label}
                      selected={pathname.startsWith("/work")}
                      size="l"
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      selected={pathname.startsWith("/work")}
                      size="l"
                    />
                  </Row>
                </>
              )}
              {routes["/hers"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="university"
                      href="/hers"
                      label="HERS"
                      selected={pathname.startsWith("/hers")}
                      size="l"
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="university"
                      href="/hers"
                      selected={pathname.startsWith("/hers")}
                      size="l"
                    />
                  </Row>
                </>
              )}
              {routes["/leadership"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="rocket"
                      href="/leadership"
                      label={leadership.label}
                      selected={pathname.startsWith("/leadership")}
                      size="l"
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="rocket"
                      href="/leadership"
                      selected={pathname.startsWith("/leadership")}
                      size="l"
                    />
                  </Row>
                </>
              )}
              {routes["/publications"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="document"
                      href="/publications"
                      label={publications.label}
                      selected={pathname.startsWith("/publications")}
                      size="l"
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="document"
                      href="/publications"
                      selected={pathname.startsWith("/publications")}
                      size="l"
                    />
                  </Row>
                </>
              )}
              {(routes["/awards"] ||
                routes["/teaching"] ||
                routes["/publication-list"] ||
                routes["/gallery"] ||
                routes["/travel"]) && (
                <DropdownWrapper
                  isOpen={isMoreOpen}
                  onOpenChange={setIsMoreOpen}
                  closeAfterClick
                  placement="bottom-end"
                  className={styles.moreDropdown}
                  trigger={
                    <ToggleButton
                      prefixIcon="globe"
                      selected={isMoreRoute || isMoreOpen}
                      className={styles.moreTrigger}
                      aria-label="More pages"
                      aria-expanded={isMoreOpen}
                      aria-haspopup="menu"
                      size="l"
                    />
                  }
                  dropdown={
                    <Column className={styles.moreMenu} padding="4" gap="4">
                      {routes["/awards"] && (
                        <Button
                          variant={pathname.startsWith("/awards") ? "primary" : "secondary"}
                          size="s"
                          prefixIcon="trophy"
                          href="/awards"
                          fillWidth
                          horizontal="start"
                        >
                          {awards.label}
                        </Button>
                      )}
                      {routes["/teaching"] && (
                        <Button
                          variant={pathname.startsWith("/teaching") ? "primary" : "secondary"}
                          size="s"
                          prefixIcon="book"
                          href="/teaching"
                          fillWidth
                          horizontal="start"
                        >
                          {teaching.label}
                        </Button>
                      )}
                      {routes["/publication-list"] && (
                        <Button
                          variant={
                            pathname.startsWith("/publication-list") ? "primary" : "secondary"
                          }
                          size="s"
                          prefixIcon="document"
                          href="/publication-list"
                          fillWidth
                          horizontal="start"
                        >
                          Publication list
                        </Button>
                      )}
                      {routes["/travel"] && (
                        <Button
                          variant={pathname.startsWith("/travel") ? "primary" : "secondary"}
                          size="s"
                          prefixIcon="globe"
                          href="/travel"
                          fillWidth
                          horizontal="start"
                        >
                          {travel.label}
                        </Button>
                      )}
                      {routes["/gallery"] && (
                        <Button
                          variant={pathname.startsWith("/gallery") ? "primary" : "secondary"}
                          size="s"
                          prefixIcon="gallery"
                          href="/gallery"
                          fillWidth
                          horizontal="start"
                        >
                          {gallery.label}
                        </Button>
                      )}
                    </Column>
                  }
                />
              )}
              {display.themeSwitcher && (
                <Row s={{ hide: true }} vertical="center" gap="8">
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </Row>
              )}
            </Row>
          </Row>
        </Row>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex s={{ hide: true }}>
              {display.time && <TimeDisplay timeZone={person.location} />}
            </Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
