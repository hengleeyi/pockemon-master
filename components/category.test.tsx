import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Category from "./category";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function setTypeAndTriggerFetch() {
  const useSearchParamsMock = vi.hoisted(() => {
    return () => new URLSearchParams("type=fire&typeId=10");
  });
  vi.mock("next/navigation", async () => {
    const actual = await vi.importActual("next/navigation");
    return {
      ...actual,
      useSearchParams: useSearchParamsMock,
      useRouter: vi.fn(() => ({
        push: vi.fn(),
        replace: vi.fn(),
      })),
    };
  });
}

function setupMock() {
  HTMLAnchorElement.prototype.click = vi.fn();
}

function renderCategory() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <Category />
    </QueryClientProvider>
  );
}

describe("Category", () => {
  setupMock();

  test("renders 'No Pokemon found' when filterData is undefined", () => {
    renderCategory();
    expect(screen.queryByText("No Pokemon found")).toBeInTheDocument();
  });

  test("renders the filtered Pokemon cards when filterData is not empty", async () => {
    setTypeAndTriggerFetch();
    renderCategory();

    await screen.findByTestId("active-type-badge");
    const notfoundElement = screen.queryByText("No Pokemon found");
    expect(notfoundElement).not.toBeInTheDocument();

    expect(screen.getAllByTestId("pokemon-title-card")).toHaveLength(103);
  });

  test("updates pokemon card when input value changes", async () => {
    setTypeAndTriggerFetch();
    renderCategory();
    await screen.findByTestId("active-type-badge");

    const inputElement = screen.getByPlaceholderText(
      "Enter pokemon name here..."
    );
    fireEvent.change(inputElement, { target: { value: "fla" } });
    expect(inputElement).toHaveValue("fla");

    await waitFor(() => {
      expect(screen.getAllByTestId("pokemon-title-card")).toHaveLength(3);
    }, { timeout: 1000 });
  });

  test("display 'No match Pokemon name' when input name doesn't match any pokemon", async () => {
    setTypeAndTriggerFetch();
    renderCategory();
    await screen.findByTestId("active-type-badge");

    const inputElement = screen.getByPlaceholderText(
      "Enter pokemon name here..."
    );
    fireEvent.change(inputElement, { target: { value: "blalaaaaaa" } });

    await waitFor(() => {
      expect(screen.queryByText("No match Pokemon name")).toBeInTheDocument();
    }, { timeout: 1000 });
  });
});
