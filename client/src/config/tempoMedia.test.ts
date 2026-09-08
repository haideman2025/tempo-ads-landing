import { readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { TEMPO_MEDIA, type ResponsiveAsset } from "./tempoMedia";

const testDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(testDir, "../../..");
const publicDir = path.join(projectRoot, "client/public");
const pageSource = readFileSync(path.join(projectRoot, "client/src/pages/TempoRestoreV2Staging.tsx"), "utf8");

const assets = Object.entries(TEMPO_MEDIA) as [string, ResponsiveAsset][];
const sizeOf = (webPath: string) => statSync(path.join(publicDir, webPath)).size;

// Ngưỡng đặt trên mức thực đo (480w ≤ 45KB, 960w ≤ 130KB, gốc ≤ 233KB) để một ảnh
// nguồn chưa nén lọt vào sẽ làm đỏ test thay vì âm thầm làm nặng trang quảng cáo.
const BUDGET = { webp480: 70 * 1024, webp960: 200 * 1024, webp: 400 * 1024 } as const;

describe("TEMPO landing media budget", () => {
  it("ships all three responsive variants for every optimized asset", () => {
    expect(assets.length).toBe(25);
    for (const [name, asset] of assets) {
      for (const variant of ["webp480", "webp960", "webp"] as const) {
        expect(asset[variant], `${name}.${variant}`).toMatch(/^\/media\/[\w-]+\.webp$/);
        expect(() => sizeOf(asset[variant]), `${name}.${variant} phải tồn tại`).not.toThrow();
      }
      expect(asset.fallback).toBe(asset.webp);
      expect(asset.width).toBeGreaterThan(0);
      expect(asset.height).toBeGreaterThan(0);
    }
  });

  it("keeps every variant inside its weight budget", () => {
    for (const [name, asset] of assets) {
      for (const variant of ["webp480", "webp960", "webp"] as const) {
        expect(sizeOf(asset[variant]), `${name}.${variant} vượt ngân sách`).toBeLessThanOrEqual(BUDGET[variant]);
      }
    }
  });

  it("serves the ritual, packaging, feedback and diary imagery without the 2MB PNG originals", () => {
    // 25 ảnh này từng là PNG ~2MB tải thẳng từ Manus storage — khách phải nuốt ~45MB
    // trước khi cuộn tới form COD. Không được để chúng quay lại.
    expect(pageSource).not.toMatch(/"\/manus-storage\/[^"]+\.png"/);
    expect(pageSource).not.toContain("LegacyImage");
    for (const key of ["tempo-story", "feedback-02-wait", "tempo-use-steps", "tempo-pack-front"]) {
      expect(pageSource).toContain(`TEMPO_MEDIA["${key}"]`);
    }
  });

  it("references only media files that exist on disk", () => {
    const referenced = [...pageSource.matchAll(/"(\/media\/[^"]+)"/g)].map(match => match[1]);
    for (const webPath of referenced) {
      expect(() => sizeOf(webPath), `${webPath} được tham chiếu nhưng không có file`).not.toThrow();
    }
  });
});
