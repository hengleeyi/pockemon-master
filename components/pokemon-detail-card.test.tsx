import { render, screen, waitFor } from "@testing-library/react";
import { z } from "zod";
import { describe, expect, test, vi } from "vitest";
import PokemonDetailCard from "./pokemon-detail-card";
import { pokemonSchema } from "@/schemas/pokemon";
import mockPokemon from "@/msw/mockPokemon";

function setupMock() {
  const useQeryStringMock = vi.hoisted(() => {
    return () => ({
      createQueryString: vi.fn(() => "pokemonName=Pikachu&reset=true"),
    });
  });
  vi.mock("@/hooks/useQueryString", async () => {
    const actual = await vi.importActual("@/hooks/useQueryString");
    return {
      ...actual,
      useQueryString: useQeryStringMock,
    };
  });
}

type Pokemon = z.infer<typeof pokemonSchema>;

function renderPokemonDetailCard() {
  render(<PokemonDetailCard data={mockData} />);
}

const mockData: Pokemon = mockPokemon

describe("PokemonDetailCard", () => {
  setupMock();

  test("renders the Pokemon's types", () => {
    renderPokemonDetailCard();
    const typeLinks = screen.getAllByRole("link");
    expect(typeLinks).toHaveLength(2);
    expect(typeLinks[0]).toHaveTextContent("Type 1");
    expect(typeLinks[1]).toHaveTextContent("Type 2");
  });

  test("renders the Pokemon's images", () => {
    renderPokemonDetailCard();
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(4);
  });

  test("renders the Pokemon's details", () => {
    renderPokemonDetailCard();
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

  test("renders the status values radar chart", async () => {
    renderPokemonDetailCard();

    expect(screen.getByText("Status values")).toBeInTheDocument();
    expect(
      screen.getByText("These are the default values in battles")
    ).toBeInTheDocument();
  });
});
