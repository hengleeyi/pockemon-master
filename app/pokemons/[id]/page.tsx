"use client";
import PokemonDetailCard from "@/components/pokemon-detail-card";
import usePokemon from "@/hooks/queries/usePokemon";
import React from "react";

type PokemonPageProps = {
  params: { id: string };
};

const PokemonPage = ({ params }: PokemonPageProps) => {
  const { data } = usePokemon(true, params.id);

  if (!data) {
    return null;
  }
  return <PokemonDetailCard data={data} />;
};

export default PokemonPage;
