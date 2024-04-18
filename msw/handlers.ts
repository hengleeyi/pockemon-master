import { HttpResponse, http } from "msw";
import mockByType from "./mockByType";
import mockPokemon from "./mockPokemon";
import mockByTypeEmptyPokemon from "./mockByTypeEmptyPokemon";

export const handlers = [
  http.get("https://pokeapi.co/api/v2/type/:type", (params) => {
    if (params.params.type === "unknown") {
      return HttpResponse.json(mockByTypeEmptyPokemon);
    }
    return HttpResponse.json(mockByType);
  }),
  http.get("https://pokeapi.co/api/v2/pokemon/:id", () => {
    return HttpResponse.json(mockPokemon);
  }),
];
