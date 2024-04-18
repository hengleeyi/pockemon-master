import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import PokemonPage from "./page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function renderPokemonPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  render(
    <QueryClientProvider client={queryClient}>
      <PokemonPage params={{ id: "1" }} />
    </QueryClientProvider>
  );
}

describe("PokemonPage", () => {
  test("renders the Pokemon's details", async () => {
    renderPokemonPage();
    await screen.findByText("Name");
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Pikachu")).toBeInTheDocument();
    expect(screen.getByText("Height")).toBeInTheDocument();
    expect(screen.getByText("40")).toBeInTheDocument();
    expect(screen.getByText("Weight")).toBeInTheDocument();
    expect(screen.getByText("60")).toBeInTheDocument();
    expect(screen.getByText("Abilities")).toBeInTheDocument();
    expect(screen.getByText("Ability 1, Ability 2")).toBeInTheDocument();
    expect(screen.getByText("Base experience")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });
});
