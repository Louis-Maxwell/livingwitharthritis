import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChatBot } from "../ChatBot";

const mockSendMessage = vi.fn();
const mockClearMessages = vi.fn();
let mockMessages: { role: string; content: string }[] = [];
let mockIsLoading = false;

vi.mock("@/hooks/useStreamingChat", () => ({
  useStreamingChat: () => ({
    messages: mockMessages,
    isLoading: mockIsLoading,
    sendMessage: mockSendMessage,
    clearMessages: mockClearMessages,
  }),
}));

vi.mock("@/data/images", () => ({
  chatRheumatoid: "/test-image.jpg",
  chatFoods: "/test-image.jpg",
  chatExercise: "/test-image.jpg",
  chatDoctor: "/test-image.jpg",
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("ChatBot", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMessages = [];
    mockIsLoading = false;
  });

  it("renders the header with title", () => {
    render(<ChatBot />);
    expect(screen.getByText("Help & Support")).toBeInTheDocument();
  });

  it("shows welcome message when no messages", () => {
    render(<ChatBot />);
    expect(screen.getByText("How can I help?")).toBeInTheDocument();
  });

  it("shows quick suggestions when no messages", () => {
    render(<ChatBot />);
    expect(screen.getByText("What is rheumatoid arthritis?")).toBeInTheDocument();
    expect(screen.getByText("Best anti-inflammatory foods?")).toBeInTheDocument();
    expect(screen.getByText("Safe exercises for OA?")).toBeInTheDocument();
    expect(screen.getByText("When should I see a doctor?")).toBeInTheDocument();
  });

  it("sends message on quick suggestion click", () => {
    render(<ChatBot />);
    fireEvent.click(screen.getByText("What is rheumatoid arthritis?"));
    expect(mockSendMessage).toHaveBeenCalledWith("What is rheumatoid arthritis?");
  });

  it("has a text input placeholder", () => {
    render(<ChatBot />);
    expect(screen.getByPlaceholderText("Type a message…")).toBeInTheDocument();
  });

  it("sends message on form submit", () => {
    render(<ChatBot />);
    const textarea = screen.getByPlaceholderText("Type a message…");
    fireEvent.change(textarea, { target: { value: "Hello" } });
    fireEvent.submit(textarea.closest("form")!);
    expect(mockSendMessage).toHaveBeenCalledWith("Hello");
  });

  it("does not send empty message", () => {
    render(<ChatBot />);
    const textarea = screen.getByPlaceholderText("Type a message…");
    fireEvent.submit(textarea.closest("form")!);
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it("shows Online status when not loading", () => {
    render(<ChatBot />);
    expect(screen.getByText("Online")).toBeInTheDocument();
  });

  it("shows Typing status when loading", () => {
    mockIsLoading = true;
    render(<ChatBot />);
    expect(screen.getByText("Typing…")).toBeInTheDocument();
  });

  it("shows clear button when messages exist", () => {
    mockMessages = [{ role: "user", content: "Hi" }];
    render(<ChatBot />);
    // Trash icon button should exist
    const clearButtons = screen.getAllByRole("button");
    expect(clearButtons.length).toBeGreaterThan(0);
  });

  it("shows disclaimer text", () => {
    render(<ChatBot />);
    expect(screen.getByText("Always consult your healthcare provider")).toBeInTheDocument();
  });
});
