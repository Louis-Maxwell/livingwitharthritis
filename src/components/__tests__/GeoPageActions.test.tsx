import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const subscribeNewsletter = vi.fn();
vi.mock("@/lib/backendSubmit", () => ({
  subscribeNewsletter: (...args: unknown[]) => subscribeNewsletter(...args),
}));
vi.mock("sonner", () => ({ toast: { message: vi.fn(), error: vi.fn() } }));

import GeoPageActions from "@/components/geo/GeoPageActions";
import SeoDefaults from "@/components/SeoDefaults";

const TAGS = "utm_source=whatsapp&utm_medium=social_share&utm_campaign=guide_action_card";
let gtag: ReturnType<typeof vi.fn>;
const events = (name: string) =>
  gtag.mock.calls.filter((c) => c[0] === "event" && c[1] === name).map((c) => c[2] as Record<string, unknown>);

const renderAt = (path: string) =>
  render(
    <MemoryRouter>
      <GeoPageActions path={path} title="How to claim PIP for arthritis" />
    </MemoryRouter>,
  );

beforeEach(() => {
  gtag = vi.fn();
  (window as unknown as { gtag: unknown }).gtag = gtag;
  subscribeNewsletter.mockReset();
});
afterEach(() => {
  cleanup();
  delete (window as unknown as { gtag?: unknown }).gtag;
  document.head.innerHTML = "";
});

describe("GeoPageActions", () => {
  it("renders share and email cards on a priority page with a tagged share link", () => {
    renderAt("/guides/benefits-pip");
    const link = screen.getByTestId("whatsapp-action-card").querySelector('a[href^="https://wa.me/?text="]');
    expect(link).not.toBeNull();
    const text = new URL(link!.getAttribute("href")!).searchParams.get("text")!;
    expect(text).toContain(`https://livingwitharthritis.org.uk/guides/benefits-pip?${TAGS}`);
    const resource = screen.getByTestId("resource-download-card");
    expect(resource.querySelector('input[type="email"]')).not.toBeNull();
    expect(resource.querySelector('a[href="/resources/pip-evidence-diary"]')).not.toBeNull();
  });

  it("renders nothing on other pages", () => {
    const { container } = renderAt("/guides/diet");
    expect(container.innerHTML).toBe("");
  });

  it("fires whatsapp_share_click with guide_slug and position on tap", () => {
    renderAt("/blog/hip-replacement-recovery-week-by-week");
    fireEvent.click(screen.getByRole("link", { name: /share on whatsapp/i }));
    expect(events("whatsapp_share_click")).toEqual([
      expect.objectContaining({
        guide_slug: "hip-replacement-recovery-week-by-week",
        position: "after_article",
        method: "whatsapp",
      }),
    ]);
  });

  it("copies the tagged message and fires whatsapp_share_copy only after the copy works", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    renderAt("/conditions/polymyalgia-rheumatica/symptoms");
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /copy message/i }));
    });
    expect(writeText.mock.calls[0][0]).toContain(`/conditions/polymyalgia-rheumatica/symptoms?${TAGS}`);
    expect(events("whatsapp_share_copy")).toEqual([
      expect.objectContaining({ guide_slug: "polymyalgia-rheumatica/symptoms", position: "after_article" }),
    ]);

    writeText.mockRejectedValueOnce(new Error("denied"));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /copy message|message copied/i }));
    });
    expect(events("whatsapp_share_copy")).toHaveLength(1);
  });

  const submit = async (email: string) => {
    fireEvent.change(screen.getByTestId("resource-download-card").querySelector('input[type="email"]')!, {
      target: { value: email },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /send me free guides/i }));
    });
  };

  it("fires lead_magnet_conversion and generate_lead only after a confirmed signup", async () => {
    subscribeNewsletter.mockResolvedValue({ ok: true, via: "formsubmit", message: "Thanks" });
    renderAt("/guides/knee-exercises-for-osteoarthritis");
    await submit("reader@example.org");
    await waitFor(() => expect(events("lead_magnet_conversion")).toHaveLength(1));
    expect(events("lead_magnet_conversion")[0]).toEqual(
      expect.objectContaining({ sequence_id: "knee-exercise-guide", page_path: "/guides/knee-exercises-for-osteoarthritis" }),
    );
    expect(events("generate_lead")[0]).toEqual(expect.objectContaining({ sequence_id: "knee-exercise-guide" }));
    // No email address leaves in any event.
    expect(JSON.stringify(gtag.mock.calls)).not.toContain("reader@example.org");
  });

  it("does not count a failed, throttled, invalid or mailto-only signup as a conversion", async () => {
    renderAt("/blog/best-supplements-arthritis-uk");
    await submit("not-an-email");
    subscribeNewsletter.mockResolvedValueOnce({ ok: false, via: "error", message: "Failed" });
    await submit("reader@example.org");
    subscribeNewsletter.mockResolvedValueOnce({ ok: false, via: "throttled", message: "Slow down" });
    await submit("reader@example.org");
    subscribeNewsletter.mockResolvedValueOnce({ ok: true, via: "mailto", message: "Send the email" });
    await submit("reader@example.org");
    expect(events("lead_magnet_conversion")).toHaveLength(0);
  });

  it("keeps the canonical clean when a visitor arrives from a tagged WhatsApp link", async () => {
    render(
      <MemoryRouter initialEntries={[`/guides/benefits-pip?${TAGS}`]}>
        <HelmetProvider>
          <SeoDefaults />
        </HelmetProvider>
      </MemoryRouter>,
    );
    await waitFor(() => {
      const canonical = document.head.querySelectorAll('link[rel="canonical"]');
      expect(canonical).toHaveLength(1);
      expect(canonical[0].getAttribute("href")).toBe("https://livingwitharthritis.org.uk/guides/benefits-pip");
    });
  });
});
