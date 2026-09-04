import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useStreamingChat } from "../useStreamingChat";

vi.mock("@/lib/arthritisChatFallback", () => ({
  getFallbackAnswer: () => "FALLBACK_ANSWER",
}));

vi.mock("@/lib/chatHistory", () => ({
  loadAnonChatHistory: () => [],
  saveAnonChatHistory: () => {},
  clearAnonChatHistory: () => {},
}));

function sseResponse(tokens: string[]) {
  const lines = tokens.map((t) => `data: ${JSON.stringify({ type: "token", content: t })}\n\n`);
  lines.push(`data: ${JSON.stringify({ type: "done" })}\n\n`);
  return new Response(lines.join(""), {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

describe("useStreamingChat", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls /api/chat and streams assistant tokens", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => sseResponse(["Hello ", "from AI"])),
    );
    const { result } = renderHook(() => useStreamingChat());
    await act(async () => {
      await result.current.sendMessage("What about methotrexate?");
    });
    await waitFor(() => {
      const assistant = result.current.messages.find((m) => m.role === "assistant");
      expect(assistant?.content).toContain("Hello from AI");
    });
    expect(fetch).toHaveBeenCalledWith(
      "/api/chat",
      expect.objectContaining({ method: "POST" }),
    );
    expect(result.current.messages.some((m) => m.content.includes("FALLBACK_ANSWER"))).toBe(false);
  });

  it("falls back to canned answers when the API fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ ok: false }), { status: 503 })),
    );
    const { result } = renderHook(() => useStreamingChat());
    await act(async () => {
      await result.current.sendMessage("Safe exercises for OA?");
    });
    await waitFor(() => {
      expect(result.current.messages.some((m) => m.content.includes("FALLBACK_ANSWER"))).toBe(true);
    });
  });
});
