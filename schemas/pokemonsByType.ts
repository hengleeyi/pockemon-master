import { z } from "zod";

const nameUrlSchema = z.object({
  name: z.string(),
  url: z.string(),
});

const nameSchema = z.object({
  language: nameUrlSchema,
  name: z.string(),
});

const pokemonSchema = z.object({
  pokemon: z.object({
    name: z.string(),
    url: z.string(),
  }),
  slot: z.number(),
});

const damageRelationSchema = z.object({
  double_damage_from: z.array(nameUrlSchema),
  double_damage_to: z.array(nameUrlSchema),
  half_damage_from: z.array(nameUrlSchema),
  half_damage_to: z.array(nameUrlSchema),
  no_damage_from: z.array(nameUrlSchema),
  no_damage_to: z.array(nameUrlSchema),
});

const gameIndicesSchema = z.object({
  game_index: z.number(),
  generation: nameUrlSchema,
});

export const pokemonsByTypeSchema = z.object({
  damage_relations: damageRelationSchema,
  game_indices: z.array(gameIndicesSchema),
  generation: nameUrlSchema,
  id: z.number(),
  move_damage_class: nameUrlSchema.nullable(),
  moves: z.array(nameUrlSchema).nullable(),
  name: z.string(),
  names: z.array(nameSchema),
  past_damage_relations: z.array(z.unknown()),
  pokemon: z.array(pokemonSchema),
});
