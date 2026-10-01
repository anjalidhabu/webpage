import { Meta } from "@once-ui-system/core";
import type { Metadata } from "next";

// Keep canonical URLs consistent with the trailing-slash static export.
export function generateSiteMetadata(options: Parameters<typeof Meta.generate>[0]): Metadata {
  const canonical = `${options.baseURL.replace(/\/$/, "")}${options.path === "/" ? "" : options.path}/`;
  return {
    ...Meta.generate(options),
    alternates: { canonical },
  };
}
