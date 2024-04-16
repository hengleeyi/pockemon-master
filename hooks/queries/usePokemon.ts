import { pokemonSchema } from "@/schemas/pokemon";
import { useQuery } from "@tanstack/react-query";

const usePokemon = (canFetch: boolean, pokemonId: string | null) => {
  return useQuery({
    queryKey: ["pokemon", { pokemonId }],
    queryFn: async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      const data = await response.json();
      const validation = pokemonSchema.safeParse(data);

      if (validation.success) {
        return validation.data;
      } else {
        throw new Error("Incorrect data format");
      }
    },
    enabled: !!pokemonId && canFetch,
  });
};

export default usePokemon;
