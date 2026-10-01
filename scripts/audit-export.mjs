import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? files(filename) : [filename];
  }))).flat();
}

const exported = await files("out");
const publicFiles = await files("public");
const publicPaths = new Set(publicFiles.map((file) => path.relative("public", file)));
const text = (await Promise.all(exported
  .filter((file) => /\.(html|js|css|txt|xml|json)$/.test(file))
  .map((file) => readFile(file, "utf8")))).join("\n");
const problems = [];

for (const file of exported) {
  const relative = path.relative("out", file);
  if (/^(blog|gallery|travel)(\/|$)/.test(relative)) {
    problems.push(`Disabled route exported: ${relative}`);
  }
  const frameworkFile = relative.startsWith("_next/") && /\.(js|css|woff2?|ttf|otf|png|jpg|jpeg|gif|webp|svg|ico)$/.test(relative);
  const pageFile = /\.(html|txt)$/.test(relative);
  if (!publicPaths.has(relative) && !frameworkFile && !pageFile &&
      !["favicon.ico", "sitemap.xml"].includes(relative)) {
    problems.push(`Unexpected export file: ${relative}`);
  }
  if (/(^|\/)\.(?!nojekyll$)/.test(relative) || /\.(map|md|mdx|tsx?|sql)$/.test(relative)) {
    problems.push(`Development file exported: ${relative}`);
  }
}

for (const file of publicFiles) {
  const relative = path.relative("public", file);
  if (!exported.includes(path.join("out", relative))) {
    problems.push(`Public asset missing from export: ${relative}`);
  }
  if (relative === ".nojekyll") continue;
  const basename = path.basename(file);
  if (![basename, encodeURI(basename), encodeURIComponent(basename)].some((name) => text.includes(name))) {
    console.warn(`Unused public asset (non-blocking): ${relative}`);
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exitCode = 1;
} else {
  const bytes = (await Promise.all(exported.map((file) => stat(file)))).reduce((sum, item) => sum + item.size, 0);
  console.log(`Export audit passed: ${exported.length} files, ${(bytes / 1024 / 1024).toFixed(2)} MiB; ${publicFiles.length} public assets.`);
}
