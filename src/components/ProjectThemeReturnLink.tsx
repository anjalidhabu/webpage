"use client";

import type { ResearchThemeLink } from "@/app/work/data";
import { Column, Flex, SmartLink, Text } from "@once-ui-system/core";
import { useEffect, useState } from "react";

interface ProjectThemeReturnLinkProps {
  themes: ResearchThemeLink[];
}

export function ProjectThemeReturnLink({ themes }: ProjectThemeReturnLinkProps) {
  const [themeId, setThemeId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setThemeId(params.get("theme"));
  }, []);

  if (themes.length === 0) {
    return null;
  }

  const activeTheme = themeId ? themes.find((theme) => theme.id === themeId) : undefined;

  return (
    <Column gap="8" horizontal="center" align="center" style={{ maxWidth: "44rem" }}>
      <Text variant="label-strong-s" onBackground="brand-weak">
        Research Theme{!activeTheme && themes.length > 1 ? "s" : ""}
      </Text>
      <Flex gap="12" wrap horizontal="center">
        {activeTheme ? (
          <SmartLink
            href={activeTheme.href}
            prefixIcon="arrowLeft"
            style={{ margin: "0", maxWidth: "100%" }}
          >
            <Text wrap="balance" variant="body-default-s">
              Back to {activeTheme.label}
            </Text>
          </SmartLink>
        ) : (
          themes.map((theme) => (
            <SmartLink
              key={theme.id}
              href={theme.href}
              suffixIcon="arrowRight"
              style={{ margin: "0", maxWidth: "100%" }}
            >
              <Text wrap="balance" variant="body-default-s">
                View {theme.label}
              </Text>
            </SmartLink>
          ))
        )}
      </Flex>
    </Column>
  );
}
