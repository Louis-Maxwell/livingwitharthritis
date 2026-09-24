import { describe, expect, it } from "vitest";
import { getGbpMapsEmbedUrl } from "../gbpMaps";

describe("getGbpMapsEmbedUrl", () => {
  it("returns null when unset or blank", () => {
    expect(getGbpMapsEmbedUrl(undefined)).toBeNull();
    expect(getGbpMapsEmbedUrl("")).toBeNull();
    expect(getGbpMapsEmbedUrl("   ")).toBeNull();
  });

  it("accepts allowlisted Google Maps embed URLs", () => {
    const ok =
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d0!2d0!3d0";
    expect(getGbpMapsEmbedUrl(ok)).toBe(ok);
    const uk =
      "https://www.google.co.uk/maps/embed?pb=!1m18!1m12!1m3!1d0!2d0!3d0";
    expect(getGbpMapsEmbedUrl(uk)).toBe(uk);
  });

  it("rejects non-embed or non-https URLs (no invented Place IDs)", () => {
    expect(
      getGbpMapsEmbedUrl("https://evil.example/maps/embed?pb=x"),
    ).toBeNull();
    expect(getGbpMapsEmbedUrl("http://www.google.com/maps/embed?pb=x")).toBeNull();
    expect(getGbpMapsEmbedUrl("javascript:alert(1)")).toBeNull();
    expect(
      getGbpMapsEmbedUrl("https://www.google.com/maps/place/Oswestry"),
    ).toBeNull();
  });
});
