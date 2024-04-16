"use client";

import Link from "next/link";
import { badgeVariants } from "./ui/badge";
import { usePathname } from "next/navigation";
import useQueryString from "@/hooks/useQueryString";
import usePokemonsByType from "@/hooks/queries/usePokemonsByType";
import clsx from "clsx";
import { cn } from "@/lib/utils";

type TypeButtonProps = {
  type: string;
  url: string;
};

export const TypeButton = ({ type, url }: TypeButtonProps) => {
  const { searchParams, createQueryString } = useQueryString();

  const urlSegments = url.split("/");
  const typeId = urlSegments[urlSegments.length - 2];
  const typeQueryStr = searchParams.get("type");
  

  const pathname = usePathname();

  usePokemonsByType(type === typeQueryStr, typeQueryStr);

  return (
    <Link
      href={
        pathname + "?" + createQueryString({ paramsToUpdate: { type, typeId } })
      }
      className={cn(badgeVariants({ variant: "default" }), type === typeQueryStr && "outline outline-2 outline-offset-2 outline-emerald-50")}
    >
      {type}
    </Link>
  );
};
