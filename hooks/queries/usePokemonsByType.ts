import { pokemonsByTypeSchema } from "@/schemas/pokemonsByType";
import { useQuery } from "@tanstack/react-query";

const usePokemonsByType = (canFetch: boolean, type: string | null) => {
  return useQuery({
    queryKey: ["type", { type }],
    queryFn: async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await response.json();

      const validation = pokemonsByTypeSchema.safeParse(data);

      if (validation.success) {
        return validation.data;
      } else {
        throw new Error("Incorrect data format");
      }
    },
    enabled: !!type && canFetch,
  });
};

export default usePokemonsByType;
