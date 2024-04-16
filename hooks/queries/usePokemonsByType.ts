import { pokemonsByTypeSchema } from "@/schemas/pokemonsByType";
import { useQuery } from "@tanstack/react-query";

const usePokemonsByType = (canFetch: boolean, typeId: string | null) => {
  return useQuery({
    queryKey: ["type", { typeId }],
    queryFn: async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${typeId}`);
      const data = await response.json();

      const validation = pokemonsByTypeSchema.safeParse(data);

      if (validation.success) {
        return validation.data;
      } else {
        throw new Error("Incorrect data format");
      }

    },
    enabled: !!typeId && canFetch,
  });
};

export default usePokemonsByType;
