import { researchThemes } from "@/app/work/data";
import { baseURL, routes as routesConfig } from "@/resources";
import { getPosts } from "@/utils/utils";

export const dynamic = "force-static";
const hersProjectSlug = "hers_heterogeneities_rotational_seismology";
const legacyProjectSlugs = new Set(["Planetory_Seismology1"]);

export default async function sitemap() {
  const blogs = routesConfig["/blog"]
    ? getPosts(["src", "app", "blog", "posts"]).map((post) => ({
        url: `${baseURL}/blog/${post.slug}`,
        lastModified: post.metadata.publishedAt,
      }))
    : [];

  const works = getPosts(["src", "app", "work", "projects"])
    .filter((post) => post.slug !== hersProjectSlug && !legacyProjectSlugs.has(post.slug))
    .map((post) => ({
      url: `${baseURL}/work/${encodeURIComponent(post.slug)}/`,
    }));

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}/`,
  }));

  const themes = researchThemes
    .filter((theme) => theme.id !== "heterogeneities-rotational-seismology")
    .map((theme) => ({ url: `${baseURL}/work/themes/${theme.id}/` }));

  return [...routes, ...blogs, ...works, ...themes];
}
