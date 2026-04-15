import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartDrawer } from "../CartDrawer";

const mockUpdateQuantity = vi.fn();
const mockRemoveItem = vi.fn();
const mockGetCheckoutUrl = vi.fn();
const mockSyncCart = vi.fn();

let mockItems: any[] = [];
let mockIsLoading = false;
let mockIsSyncing = false;

vi.mock("@/stores/cartStore", () => ({
  useCartStore: () => ({
    items: mockItems,
    isLoading: mockIsLoading,
    isSyncing: mockIsSyncing,
    updateQuantity: mockUpdateQuantity,
    removeItem: mockRemoveItem,
    getCheckoutUrl: mockGetCheckoutUrl,
    syncCart: mockSyncCart,
  }),
}));

const sampleItem = {
  variantId: "variant-1",
  quantity: 2,
  price: { amount: "19.99", currencyCode: "GBP" },
  selectedOptions: [{ name: "Size", value: "M" }],
  product: {
    node: {
      title: "Arthritis Gloves",
      images: {
        edges: [{ node: { url: "https://example.com/img.jpg" } }],
      },
    },
  },
};

describe("CartDrawer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockItems = [];
    mockIsLoading = false;
    mockIsSyncing = false;
  });

  it("renders cart icon button", () => {
    render(<CartDrawer />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("shows badge with item count when items exist", () => {
    mockItems = [sampleItem];
    render(<CartDrawer />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("does not show badge when cart is empty", () => {
    render(<CartDrawer />);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("shows Shopping Cart title when opened", () => {
    render(<CartDrawer />);
    // Click the cart button to open
    const cartButton = screen.getAllByRole("button")[0];
    fireEvent.click(cartButton);
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
  });

  it("shows empty cart message when no items", () => {
    render(<CartDrawer />);
    const cartButton = screen.getAllByRole("button")[0];
    fireEvent.click(cartButton);
    expect(screen.getAllByText("Your cart is empty").length).toBeGreaterThan(0);
  });

  it("displays item details when cart has items", () => {
    mockItems = [sampleItem];
    render(<CartDrawer />);
    const cartButton = screen.getAllByRole("button")[0];
    fireEvent.click(cartButton);
    expect(screen.getByText("Arthritis Gloves")).toBeInTheDocument();
    expect(screen.getByText("GBP 19.99")).toBeInTheDocument();
    expect(screen.getByText("M")).toBeInTheDocument();
  });

  it("shows correct total price", () => {
    mockItems = [sampleItem]; // 2 x 19.99 = 39.98
    render(<CartDrawer />);
    const cartButton = screen.getAllByRole("button")[0];
    fireEvent.click(cartButton);
    expect(screen.getByText("GBP 39.98")).toBeInTheDocument();
  });

  it("calculates items description correctly", () => {
    mockItems = [sampleItem];
    render(<CartDrawer />);
    const cartButton = screen.getAllByRole("button")[0];
    fireEvent.click(cartButton);
    expect(screen.getByText("2 items in your cart")).toBeInTheDocument();
  });
});
