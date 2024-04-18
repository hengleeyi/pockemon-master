import { HttpResponse, http } from "msw";
import mockByType from "./mockByType";
import mockPokemon from "./mockPokemon";

export const handlers = [
  http.get("https://pokeapi.co/api/v2/type//:type", () => {
    return HttpResponse.json(mockByType);
  }),
  http.get("https://pokeapi.co/api/v2/pokemon/:id", () => {
    return HttpResponse.json(mockPokemon);
  }),
];
