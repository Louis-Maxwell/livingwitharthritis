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

const toastError = vi.fn();
vi.mock("sonner", () => ({
  toast: { error: (...args: unknown[]) => toastError(...args), success: vi.fn() },
}));

function sseResponse(tokens: string[], extra?: { error?: boolean }) {
  const lines = tokens.map((t) => `data: ${JSON.stringify({ type: "token", content: t })}\n\n`);
  if (extra?.error) {
    lines.push(`data: ${JSON.stringify({ type: "error", error: "provider failed" })}\n\n`);
  } else {
    lines.push(`data: ${JSON.stringify({ type: "done" })}\n\n`);
  }
  return new Response(lines.join(""), {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

describe("useStreamingChat", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    toastError.mockClear();
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

  it("sends profileSummary when About You profile is provided", async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body || "{}"));
      expect(body.profileSummary).toContain("Osteoarthritis");
      expect(body.profileSummary).toContain("Knees");
      return sseResponse(["Personalised reply"]);
    });
    vi.stubGlobal("fetch", fetchMock);
    const { result } = renderHook(() => useStreamingChat());
    await act(async () => {
      await result.current.sendMessage("Help with pain", {
        arthritisType: "Osteoarthritis",
        affectedJoints: ["Knees"],
        severity: "Moderate",
      });
    });
    await waitFor(() => {
      expect(result.current.messages.some((m) => m.content.includes("Personalised reply"))).toBe(
        true,
      );
    });
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

  it("shows a clear rate-limit message on HTTP 429", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(JSON.stringify({ ok: false, code: "rate_limited" }), {
            status: 429,
            headers: { "Content-Type": "application/json" },
          }),
      ),
    );
    const { result } = renderHook(() => useStreamingChat());
    await act(async () => {
      await result.current.sendMessage("Hello again");
    });
    await waitFor(() => {
      const assistant = result.current.messages.find((m) => m.role === "assistant");
      expect(assistant?.content).toMatch(/wait about a minute/i);
      expect(assistant?.content.includes("FALLBACK_ANSWER")).toBe(false);
    });
    expect(toastError).toHaveBeenCalled();
  });

  it("keeps partial stream content when SSE ends with an error event", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => sseResponse(["Partial "], { error: true })),
    );
    const { result } = renderHook(() => useStreamingChat());
    await act(async () => {
      await result.current.sendMessage("Tell me about flares");
    });
    await waitFor(() => {
      const assistant = result.current.messages.find((m) => m.role === "assistant");
      expect(assistant?.content).toContain("Partial");
      expect(assistant?.content).toMatch(/interrupted/i);
    });
  });

  it("does not double-send while a request is in flight", async () => {
    let resolveFetch: (value: Response) => void = () => {};
    const fetchPromise = new Promise<Response>((resolve) => {
      resolveFetch = resolve;
    });
    const fetchMock = vi.fn(() => fetchPromise);
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => useStreamingChat());
    await act(async () => {
      void result.current.sendMessage("First");
    });
    await act(async () => {
      void result.current.sendMessage("Second should be ignored");
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolveFetch(sseResponse(["Ok"]));
      await fetchPromise;
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it("aborts in-flight request on clearMessages", async () => {
    const fetchMock = vi.fn((_url: string, init?: RequestInit) => {
      return new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => {
          reject(new DOMException("Aborted", "AbortError"));
        });
      });
    });
    vi.stubGlobal("fetch", fetchMock);
    const { result } = renderHook(() => useStreamingChat());
    await act(async () => {
      void result.current.sendMessage("Abort me");
    });
    await act(async () => {
      await result.current.clearMessages();
    });
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.messages).toEqual([]);
    });
  });
});
