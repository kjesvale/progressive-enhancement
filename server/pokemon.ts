export enum PokemonType {
    Fire = "fire",
    Water = "water",
    Grass = "grass",
    Electric = "electric",
}

export type Pokemon = {
    name: string;
    type: PokemonType;
    description: string;
};

export let allPokemon: Pokemon[] = [
    {
        name: "Pikachu",
        type: PokemonType.Electric,
        description: "A short, yellow, chubby rodent Pokémon.",
    },
];
