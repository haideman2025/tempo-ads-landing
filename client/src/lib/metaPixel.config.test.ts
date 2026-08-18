import { describe, expect, it } from "vitest";

const META_PIXEL_ID = process.env.VITE_META_PIXEL_ID;

describe("Meta Pixel configuration", () => {
  it("has a numeric Pixel ID and forms the Meta library endpoint with that ID", () => {
    expect(META_PIXEL_ID).toMatch(/^\d{10,20}$/);

    const endpoint = new URL("https://connect.facebook.net/en_US/fbevents.js");
    endpoint.searchParams.set("pixel_id", META_PIXEL_ID!);
    expect(endpoint.searchParams.get("pixel_id")).toBe(META_PIXEL_ID);
  });
});
