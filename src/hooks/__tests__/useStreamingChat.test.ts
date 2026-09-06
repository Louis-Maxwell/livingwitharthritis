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

describe("useStreamingChat", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("fetch", vi.fn());
  });

  it("answers from local UK-safe fallback without calling /api/chat", async () => {
    const { result } = renderHook(() => useStreamingChat());
    await act(async () => {
      await result.current.sendMessage("What about methotrexate?");
    });
    await waitFor(() => {
      const assistant = result.current.messages.find((m) => m.role === "assistant");
      expect(assistant?.content).toContain("FALLBACK_ANSWER");
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("does not double-send while a request is in flight", async () => {
    const { result } = renderHook(() => useStreamingChat());
    await act(async () => {
      void result.current.sendMessage("First");
      void result.current.sendMessage("Second should be ignored");
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    const users = result.current.messages.filter((m) => m.role === "user");
    expect(users).toHaveLength(1);
  });

  it("clears messages on clearMessages", async () => {
    const { result } = renderHook(() => useStreamingChat());
    await act(async () => {
      await result.current.sendMessage("Hello");
    });
    await act(async () => {
      await result.current.clearMessages();
    });
    expect(result.current.messages).toEqual([]);
  });
});
