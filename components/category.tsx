"use client";
import usePokemonsByType from "@/hooks/queries/usePokemonsByType";
import { useSearchParams } from "next/navigation";
import React from "react";

const Category = () => {
  const searchParams = useSearchParams();
  const typeId = searchParams.get("typeId");
  const { data } = usePokemonsByType(false, typeId);

  return <div>{JSON.stringify(data)}</div>;
};

export default Category;
