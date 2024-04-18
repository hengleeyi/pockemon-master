import { afterEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Category from "./category";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const useSearchParamsMock = vi.hoisted(() => {
  return () => new URLSearchParams("type=fire&typeId=10");
});


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

  test("display 'No Pokemon found' when no pokemon under clicking type", async () => {
    const useSearchParamsMockForUnknown = vi.hoisted(() => {
      return () => new URLSearchParams("type=unknown&typeId=10001");
    });
    vi.mock("next/navigation", async () => {
      const actual = await vi.importActual("next/navigation");
      return {
        ...actual,
        useSearchParams: useSearchParamsMockForUnknown,
        useRouter: vi.fn(() => ({
          push: vi.fn(),
          replace: vi.fn(),
        })),
      };
    });

    renderCategory()
    await waitFor(() => expect(screen.queryByText("No Pokemon found")).toBeInTheDocument());
  });
});