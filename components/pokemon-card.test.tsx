import { fireEvent, render, screen } from "@testing-library/react";
import PokemonCard from "./pokemon-card";
import { describe, expect, test, vi } from "vitest";

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
  HTMLAnchorElement.prototype.click = vi.fn();

}

describe("PokemonCard", () => {
  setupMock();
  test("renders PokemonCard component with correct name and description", () => {
    const name = "Pikachu";
    const url = "https://pokeapi.co/api/v2/pokemon/25";

    render(<PokemonCard name={name} url={url} />);
    const cardTitle = screen.getAllByText(name)[0];
    expect(cardTitle).toBeInTheDocument();
  });

  test("router.push have been called when card is clicked", () => {
    const useRouterMock = vi.hoisted(() => {
      return vi.fn(() => ({
        push: vi.fn(),
        replace: vi.fn(),
      }));
    });

    const routerMock = useRouterMock();

    const pushSpy = vi.spyOn(routerMock, "push");

    vi.mock("next/navigation", async () => {
      const actual = await vi.importActual("next/navigation");
      return {
        ...actual,
        useRouter: useRouterMock,
      };
    });
    const name = "Pikachu";
    const url = "https://pokeapi.co/api/v2/pokemon/25";

    render(<PokemonCard name={name} url={url} />);

    const card = screen.getByTestId("pokemon-title-card");

    fireEvent.click(card);

    expect(pushSpy).not.toHaveBeenCalled();
  });
});
