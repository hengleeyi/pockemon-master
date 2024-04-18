"use client";

import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { redirect, usePathname, useRouter } from "next/navigation";
import useQueryString from "@/hooks/useQueryString";

type PokemonCardProps = {
  name: string;
  url: string;
};

const PokemonCard = ({ name, url }: PokemonCardProps) => {
  const router = useRouter();
  const { createQueryString } = useQueryString();

  const urlSegments = url.split("/");
  const pokemonId = urlSegments[urlSegments.length - 2];
  
  return (
    <Card
      onClick={() => {
        router.push(
          `/pokemons/${pokemonId}` +
            "?" +
            createQueryString({
              paramsToUpdate: { pokemonName: name },
              reset: true,
            })
        );
      }}
      data-testid="pokemon-title-card"
    >
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{name}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default PokemonCard;
