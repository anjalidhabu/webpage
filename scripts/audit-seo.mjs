import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

const sitemap = await readFile("out/sitemap.xml", "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert(urls.length > 0, "Sitemap must contain public pages");
assert.equal(new Set(urls).size, urls.length, "Duplicate sitemap URLs");
const home = urls.find((url) => !url.includes("/work/") && new URL(url).pathname.endsWith("/"));
assert(home, "Homepage missing from sitemap");
const basePath = new URL(home).pathname;

for (const url of urls) {
  const parsed = new URL(url);
  assert(parsed.pathname.startsWith(basePath), `URL outside site: ${url}`);
  assert(!parsed.hostname.includes("localhost"), "Localhost in sitemap");
  const relative = decodeURIComponent(parsed.pathname.slice(basePath.length));
  const html = await readFile(path.join("out", relative, "index.html"), "utf8");
  const canonical = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)];
  assert.equal(canonical.length, 1, `Expected one canonical: ${url}`);
  assert.equal(decodeURI(canonical[0][1]), decodeURI(url), `Canonical mismatch: ${url}`);
  assert(!/<meta name="robots" content="[^"]*noindex/.test(html), `Noindex: ${url}`);
  const rendered = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  assert(/<h1\b/.test(rendered), `Missing server-rendered heading: ${url}`);
}

function structuredData(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]));
}
const about = structuredData(await readFile("out/about/index.html", "utf8"));
assert(about.some((item) => item["@type"] === "ProfilePage" && item.mainEntity.sameAs.length),
  "Missing rendered researcher profile data");
const publications = structuredData(await readFile("out/publications/index.html", "utf8"));
assert(publications.some((item) => item["@type"] === "CollectionPage" && item.mainEntity.itemListElement.length),
  "Missing rendered publication data");
assert(urls.some((url) => url.includes("/work/themes/")), "Research themes missing from sitemap");
console.log(`SEO audit passed: ${urls.length} crawlable pages, canonical URLs, profile and publication structured data.`);
