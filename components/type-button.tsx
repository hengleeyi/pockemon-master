"use client";

import React from "react";
import Link from "next/link";
import { Badge, badgeVariants } from "./ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { usePathname, useSearchParams } from "next/navigation";
import useQueryString from "@/hooks/useQueryString";
import usePokemonsByType from "@/hooks/queries/usePokemonsByType";

type TypeButton = {
  type: string;
  url: string;
};

export const TypeButton = ({ type, url }: TypeButton) => {
  const { searchParams, createQueryString } = useQueryString();

  const urlSegments = url.split("/");
  const typeId = urlSegments[urlSegments.length - 2];
  const typeQueryStr = searchParams.get("type");

  const pathname = usePathname();

  usePokemonsByType(type === typeQueryStr, typeId);

  return (
    <Link
      href={pathname + "?" + createQueryString({ type, typeId })}
      className={badgeVariants({ variant: "default" })}
    >
      {type}
    </Link>
  );
};
