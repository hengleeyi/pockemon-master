"use client";
import usePokemonsByType from "@/hooks/queries/usePokemonsByType";
import { useSearchParams } from "next/navigation";
import React from "react";
import PokemonCard from "./pokemon-card";

const Category = () => {
  const searchParams = useSearchParams();
  const typeId = searchParams.get("type");
  const { data } = usePokemonsByType(false, typeId);
  console.log("🚀 ~ Category ~ data:", data)

  return (
    <>
      {data && (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-6">
          {data.pokemon.map((pokemonData) => (
            <PokemonCard
              key={pokemonData.pokemon.name}
              name={pokemonData.pokemon.name}
              url={pokemonData.pokemon.url}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Category;
