import { useQuery } from "@tanstack/react-query";

const usePokemonsByType = (canFetch: boolean, typeId: string | null) => {
  return useQuery({
    queryKey: ["type", { typeId }],
    queryFn: async () => {
      const data = await fetch(`https://pokeapi.co/api/v2/type/${typeId}`);
      return data.json();
    },
    enabled: !!typeId && canFetch,
  });
};

export default usePokemonsByType;
