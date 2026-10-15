import { afterEach, describe, expect, it } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { useState } from "react";
import { getActiveOverlay, resetOverlaysForTests } from "@/lib/overlayCoordinator";
import { useAnyOverlayOpen, useExclusiveOverlay } from "@/hooks/useExclusiveOverlay";

function Panel({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  useExclusiveOverlay(id, open, () => setOpen(false));
  return (
    <div>
      <button onClick={() => setOpen(true)}>open {id}</button>
      {open && <div role="dialog" aria-label={id} />}
    </div>
  );
}

function BannerProbe() {
  return <span>{useAnyOverlayOpen() ? "hidden" : "banner"}</span>;
}

afterEach(() => resetOverlaysForTests());

describe("overlay coordinator", () => {
  it("keeps only one popup open at a time", () => {
    render(
      <>
        <Panel id="chat" />
        <Panel id="donation" />
        <BannerProbe />
      </>,
    );
    expect(screen.getByText("banner")).toBeInTheDocument();

    act(() => screen.getByText("open chat").click());
    expect(screen.getByRole("dialog", { name: "chat" })).toBeInTheDocument();
    expect(screen.getByText("hidden")).toBeInTheDocument();

    act(() => screen.getByText("open donation").click());
    expect(screen.queryByRole("dialog", { name: "chat" })).toBeNull();
    expect(screen.getByRole("dialog", { name: "donation" })).toBeInTheDocument();
    expect(getActiveOverlay()).toBe("donation");
  });

  it("clears the active popup when it unmounts", () => {
    const { unmount } = render(<Panel id="menu" />);
    act(() => screen.getByText("open menu").click());
    expect(getActiveOverlay()).toBe("menu");
    unmount();
    expect(getActiveOverlay()).toBeNull();
  });
});
