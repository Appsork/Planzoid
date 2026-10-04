// Fails if the display name, or any forbidden name, appears outside brand/.
// Usage: node scripts/check-brand.mjs   (exit code 1 on findings)
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const brand = JSON.parse(readFileSync(join(root, "brand", "brand.json"), "utf8"));
// Short names are often ordinary words, so only the full display name is checked.
const names = [brand.displayName, ...(brand.forbiddenNames ?? [])]
  .filter(Boolean).map((n) => n.toLowerCase());

const skipDirs = new Set([".git", "node_modules", "dist", "build", "target", "generated",
  "coverage", "playwright-report", "test-results", "brand", "icons", "bin"]);
const exts = new Set([".go", ".ts", ".tsx", ".js", ".mjs", ".jsx", ".json", ".md", ".css",
  ".html", ".yaml", ".yml", ".toml", ".rs", ".txt", ".ps1", ".sh", ".svg"]);

const allowed = new Set((brand.allowedFiles ?? []).map((f) => f.toLowerCase()));
const findings = [];
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) { if (!skipDirs.has(entry)) walk(full); continue; }
    if (!exts.has(extname(entry).toLowerCase())) continue;
    let text;
    try { text = readFileSync(full, "utf8").toLowerCase(); } catch { continue; }
    const rel = relative(root, full).split("\\").join("/");
    for (const n of names) {
      if (!text.includes(n)) continue;
      if (n === brand.displayName.toLowerCase() && allowed.has(rel.toLowerCase())) continue;
      findings.push(`${rel}: contains '${n}'`);
    }
  }
}
walk(root);
for (const f of findings) console.error(f);
if (findings.length) {
  console.error(`check-brand: ${findings.length} finding(s). Read names from brand/.`);
  process.exit(1);
}
console.log("check-brand: clean");
