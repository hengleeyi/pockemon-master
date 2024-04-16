import React from "react";

type PokemonPageProps = {
  params: { type: string };
};

const PokemonPage = ({ params }: PokemonPageProps) => {
  return <div>{params.type}</div>;
};

export default PokemonPage;
