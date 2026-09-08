import { readFile } from "node:fs/promises";

const reportPath = process.argv[2];
if (!reportPath) throw new Error("Cần truyền đường dẫn báo cáo Lighthouse JSON.");

const report = JSON.parse(await readFile(reportPath, "utf8"));
const categoryIds = ["performance", "accessibility", "best-practices", "seo"];
const auditIds = [
  "first-contentful-paint",
  "largest-contentful-paint",
  "total-blocking-time",
  "cumulative-layout-shift",
  "speed-index",
];
const opportunityIds = [
  "render-blocking-resources",
  "uses-optimized-images",
  "uses-responsive-images",
  "offscreen-images",
  "unminified-css",
  "unminified-javascript",
  "unused-css-rules",
  "unused-javascript",
  "total-byte-weight",
  "third-party-summary",
  "largest-contentful-paint-element",
];

console.log(JSON.stringify({
  requestedUrl: report.requestedUrl,
  finalUrl: report.finalUrl,
  categories: Object.fromEntries(categoryIds.map(id => [id, Math.round((report.categories[id]?.score ?? 0) * 100)])),
  audits: Object.fromEntries(auditIds.map(id => [id, {
    score: report.audits[id]?.score ?? null,
    displayValue: report.audits[id]?.displayValue ?? null,
  }])),
  opportunities: Object.fromEntries(opportunityIds.map(id => [id, {
    score: report.audits[id]?.score ?? null,
    displayValue: report.audits[id]?.displayValue ?? null,
    details: report.audits[id]?.details?.items?.slice(0, 4) ?? [],
  }])),
}, null, 2));
