const mockPokemon = {
  name: "Pikachu",
  height: 40,
  weight: 60,
  abilities: [
    { ability: { name: "Ability 1", url: "" }, is_hidden: false, slot: 1 },
    { ability: { name: "Ability 2", url: "" }, is_hidden: false, slot: 2 },
  ],
  base_experience: 100,
  types: [
    { type: { name: "Type 1", url: "" }, slot: 1 },
    { type: { name: "Type 2", url: "" }, slot: 2 },
  ],
  sprites: {
    back_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
    back_female:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/25.png",
    back_shiny:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png",
    back_shiny_female:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/25.png",
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    front_female:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/25.png",
    front_shiny:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png",
    front_shiny_female:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/25.png",
    other: {},
  },

  stats: [
    { base_stat: 50, effort: 0, stat: { name: "Stat 1", url: "" } },
    { base_stat: 70, effort: 0, stat: { name: "Stat 2", url: "" } },
    { base_stat: 90, effort: 0, stat: { name: "Stat 3", url: "" } },
  ],
  id: 1,
  order: 1,
  species: { name: "Pikachu", url: "" },
  is_default: true,
  game_indices: [],
  held_items: [],
  location_area_encounters: "",
  moves: [],
  forms: [],
  cries: { latest: null, legacy: null },
  past_abilities: [],
  past_types: [],
};

export default mockPokemon;
