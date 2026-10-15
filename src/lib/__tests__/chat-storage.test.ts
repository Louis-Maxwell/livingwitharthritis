import { beforeEach, describe, expect, it } from "vitest";
import { clearChatProfile, loadChatProfile, saveChatProfile } from "@/lib/chatProfile";
import { clearAnonChatHistory, loadAnonChatHistory, saveAnonChatHistory } from "@/lib/chatHistory";

describe("chat health data is not kept in localStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  it("drops a legacy profile and writes only to sessionStorage", () => {
    window.localStorage.setItem(
      "arthritis_chat_profile_v1",
      JSON.stringify({ arthritisType: "Gout", severity: "Severe" }),
    );

    expect(loadChatProfile()).toEqual({});
    expect(window.localStorage.getItem("arthritis_chat_profile_v1")).toBeNull();

    saveChatProfile({ arthritisType: "Osteoarthritis", affectedJoints: ["Knees"] });
    expect(window.localStorage.getItem("arthritis_chat_profile_v1")).toBeNull();
    expect(loadChatProfile().arthritisType).toBe("Osteoarthritis");
    expect(JSON.parse(window.sessionStorage.getItem("arthritis_chat_profile_v1") || "{}").affectedJoints).toEqual([
      "Knees",
    ]);

    clearChatProfile();
    expect(loadChatProfile()).toEqual({});
    expect(window.sessionStorage.getItem("arthritis_chat_profile_v1")).toBeNull();
  });

  it("drops a legacy transcript and keeps the thread only for this tab", () => {
    window.localStorage.setItem(
      "arthritis_chat_anon_history_v1",
      JSON.stringify([{ role: "user", content: "my knees are very swollen" }]),
    );

    expect(loadAnonChatHistory()).toEqual([]);
    expect(window.localStorage.getItem("arthritis_chat_anon_history_v1")).toBeNull();

    saveAnonChatHistory([{ role: "user", content: "short walk today" }]);
    expect(window.localStorage.getItem("arthritis_chat_anon_history_v1")).toBeNull();
    expect(loadAnonChatHistory()).toEqual([{ role: "user", content: "short walk today" }]);

    clearAnonChatHistory();
    expect(loadAnonChatHistory()).toEqual([]);
  });
});
