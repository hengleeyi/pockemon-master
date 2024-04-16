import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { pokemonSchema } from "@/schemas/pokemon";
import { badgeVariants } from "./ui/badge";
import Image from "next/image";
import Link from "next/link";
import useQueryString from "@/hooks/useQueryString";

type Pokemon = z.infer<typeof pokemonSchema>;

type PokemonDetailCardProps = {
  data: Pokemon;
};

const PokemonDetailCard = ({ data }: PokemonDetailCardProps) => {
  const { createQueryString } = useQueryString();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>
          {data.types.map((typeData) => {
            return (
              <Link
                href={
                  "/" +
                  "?" +
                  createQueryString({
                    paramsToUpdate: { type: typeData.type.name },
                    reset: true,
                  })
                }
                key={typeData.type.name}
                className={`${badgeVariants({ variant: "default" }) + " mr-2"}`}
              >
                {typeData.type.name}
              </Link>
            );
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div>
            <div className="flex">
              {data.sprites.front_default && (
                <Image
                  src={data.sprites.front_default}
                  alt={data.name}
                  width="100"
                  height="100"
                />
              )}

              {data.sprites.back_default && (
                <Image
                  src={data.sprites.back_default}
                  alt={data.name}
                  width="100"
                  height="100"
                />
              )}

              {data.sprites.front_shiny && (
                <Image
                  src={data.sprites.front_shiny}
                  alt={data.name}
                  width="100"
                  height="100"
                />
              )}
              {data.sprites.back_shiny && (
                <Image
                  src={data.sprites.back_shiny}
                  alt={data.name}
                  width="100"
                  height="100"
                />
              )}
            </div>
            <div>
              <p>Height: {data.height}</p>
              <p>Weight: {data.weight}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PokemonDetailCard;
