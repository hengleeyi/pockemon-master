"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import PokemonCard from "./pokemon-card";
import { useDebounce } from "use-debounce";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import usePokemonsByType from "@/hooks/queries/usePokemonsByType";
import { Input } from "./ui/input";

const Category = () => {
  const [filterName, setFilterName] = useState("");
  const [searchName] = useDebounce(filterName, 500);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const { data, isLoading } = usePokemonsByType(true, type);

  useEffect(() => {
    if (type) {
      setFilterName("");
    }
  }, [type]);

  const filterData = useMemo(() => {
    if (!data || data.pokemon.length === 0) {
      return undefined;
    }

    return data.pokemon.filter((pokemonData) =>
      pokemonData.pokemon.name.includes(searchName)
    );
  }, [data, searchName]);

  if (isLoading) {
    return <div className="text-center text-2xl">Loading ...</div>;
  }

  if (!filterData && type) {
    return <div className="text-center text-2xl">No Pokemon found</div>;
  }

  return (
    <>
      <div className="grid w-full md:max-w-sm items-center gap-1.5">
        <Label className="text-xl mb-4 flex">
          Quick Search
          {type && (
            <Badge data-testid="active-type-badge" className="ml-4">
              {type}
            </Badge>
          )}
        </Label>
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
