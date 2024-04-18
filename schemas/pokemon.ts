import { z } from "zod";

export const stateSchema = z.object({
  base_stat: z.number(),
  effort: z.number(),
  stat: z.object({
    name: z.string(),
    url: z.string(),
  }),
});

export const pokemonSchema = z.object({
  abilities: z.array(
    z.object({
      ability: z.object({
        name: z.string(),
        url: z.string(),
      }),
      is_hidden: z.boolean(),
      slot: z.number(),
    })
  ),
  base_experience: z.number(),
  cries: z.object({
    latest: z.string().url().nullable(),
    legacy: z.string().url().nullable(),
  }),
  forms: z.array(z.unknown()),
  game_indices: z.array(z.unknown()),
  height: z.number(),
  held_items: z.array(z.unknown()),
  id: z.number(),
  is_default: z.boolean(),
  location_area_encounters: z.string(),
  moves: z.array(
    z.object({
      move: z
        .object({
          url: z.string().url(),
        })
        .optional(),
      version_group_details: z.array(z.unknown()),
    })
  ),
  name: z.string(),
  order: z.number(),
  past_abilities: z.array(z.unknown()),
  past_types: z.array(
    z.object({
      generation: z.object({
        name: z.string(),
        url: z.string().url(),
      }),
      types: z.array(
        z.object({
          slot: z.number(),
          type: z.object({
            name: z.string(),
            url: z.string().url(),
          }),
        })
      ),
    })
  ),
  species: z.object({
    name: z.string(),
    url: z.string(),
  }),
  sprites: z.object({
    back_default: z.string().url().nullable(),
    back_female: z.string().url().nullable(),
    back_shiny: z.string().url().nullable(),
    back_shiny_female: z.string().url().nullable(),
    front_default: z.string().url().nullable(),
    front_female: z.string().url().nullable(),
    front_shiny: z.string().url().nullable(),
    front_shiny_female: z.string().url().nullable(),
    other: z.unknown().nullable(),
  }),
  stats: z.array(stateSchema),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({
        name: z.string(),
        url: z.string(),
      }),
    })
  ),
  weight: z.number(),
});
