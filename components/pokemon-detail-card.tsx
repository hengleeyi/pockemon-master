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
import dynamic from "next/dynamic";

const RadarChart = dynamic(() => import("@/components/radar-chart"), {
  ssr: false,
});

type Pokemon = z.infer<typeof pokemonSchema>;

type PokemonDetailCardProps = {
  data: Pokemon;
};

const PokemonDetailCard = ({ data }: PokemonDetailCardProps) => {
  const { createQueryString } = useQueryString();

  return (
    <Card>
      <CardHeader>
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
        <div className="flex flex-wrap-reverse gap-16 justify-center">
          <div>
            <div className="flex mb-4">
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
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-lg font-medium leading-none">Name</p>
                <p className="text-lg text-muted-foreground">{data.name}</p>
              </div>
              <div>
                <p className="text-lg font-medium leading-none">Height</p>
                <p className="text-lg text-muted-foreground">{data.height}</p>
              </div>
              <div>
                <p className="text-lg font-medium leading-none">Weight</p>
                <p className="text-lg text-muted-foreground">{data.weight}</p>
              </div>
              <div>
                <p className="text-lg font-medium leading-none">Abilities</p>
                <p className="text-lg text-muted-foreground">
                  {data.abilities.reduce((all, elm) => {
                    if (!all) return elm.ability.name;
                    all = `${all}, ${elm.ability.name}`;
                    return all;
                  }, "")}
                </p>
              </div>
              <div>
                <p className="text-lg font-medium leading-none">
                  Base experience
                </p>
                <p className="text-lg text-muted-foreground">
                  {data.base_experience}
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 max-w-[30rem]">
            <h3 className="text-xl">State</h3>
            <RadarChart data={data.stats} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PokemonDetailCard;
