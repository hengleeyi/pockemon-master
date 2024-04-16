"use client";
import usePokemonsByType from "@/hooks/queries/usePokemonsByType";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import PokemonCard from "./pokemon-card";
import { Input } from "./ui/input";
import { useDebounce } from "use-debounce";
import { Label } from "./ui/label";

const Category = () => {
  const [filterName, setFilterName] = useState("");
  const [searchName] = useDebounce(filterName, 500);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const { data } = usePokemonsByType(false, type);

  useEffect(() => {
    if (type) {
      setFilterName("");
    }
  }, [type]);

  const filterData = useMemo(() => {
    if (!data) {
      return undefined;
    }

    return data.pokemon.filter((pokemonData) =>
      pokemonData.pokemon.name.includes(searchName)
    );
  }, [data, searchName]);

  console.log("🚀 ~ filterData ~ filterData:", filterData);
  if (!filterData) {
    return <div className="text-center text-2xl">No Pokemon found</div>;
  }

  return (
    <>
      <div className="grid w-full md:max-w-sm items-center gap-1.5">
        <Label className="text-xl mb-4">Quick Search</Label>
        <Input
          placeholder="Enter pokemon name here..."
          onChange={(e) => {
            setFilterName(e.target.value);
          }}
          className="px-6 py-6 mb-7"
        />
      </div>

      <>
        {filterData.length > 0 ? (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-6">
            {filterData.map((pokemonData) => (
              <PokemonCard
                key={pokemonData.pokemon.name}
                name={pokemonData.pokemon.name}
                url={pokemonData.pokemon.url}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-2xl">No match Pokemon name</div>
        )}
      </>
    </>
  );
};

export default Category;
