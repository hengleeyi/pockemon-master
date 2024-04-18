import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TypeButton } from "./type-button";
import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

type TypeButtonProps = {
  type: string;
  url: string;
};

function setupMock() {
  const useQeryStringMock = vi.hoisted(() => {
    return () => ({
      searchParams: new URLSearchParams("type=fire&typeId=10"),
      createQueryString: vi.fn(),
    });
  });
  vi.mock("@/hooks/useQueryString", async () => {
    const actual = await vi.importActual("@/hooks/useQueryString");
    return {
      ...actual,
      useQueryString: useQeryStringMock,
    };
  });

  const usePathnameMock = vi.hoisted(() => {
    return () => "/";
  });

  vi.mock("next/navigation", async () => {
    const actual = await vi.importActual("next/navigation");
    return {
      ...actual,
      usePathname: usePathnameMock,
    };
  });
  HTMLAnchorElement.prototype.click = vi.fn();
}

function renderTypeButton({ type, url }: TypeButtonProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  render(
    <QueryClientProvider client={queryClient}>
      <TypeButton type={type} url={url} />
    </QueryClientProvider>
  );
}

describe("TypeButton", () => {
  setupMock();
  test("renders type button", async () => {
    renderTypeButton({
      type: "fire",
      url: "https://pokeapi.co/api/v2/type/10/",
    });
    expect(screen.getByText("fire")).toBeInTheDocument();
    await fireEvent.click(screen.getByRole("link"));
  });
});
