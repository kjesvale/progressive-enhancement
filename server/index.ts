import express from "express";
import { Pokemon, allPokemon } from "./pokemon";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

app.get("/api/pokemon", (_, res) => {
    res.json(allPokemon);
});

app.post("/api/pokemon", (req, res) => {
    const pokemon = req.body as Pokemon;
    const message = `Stored ${pokemon.type} type pokemon ${pokemon.name}!`;

    console.log(message);

    allPokemon.push(pokemon);
    res.status(201).send(message);
});

app.listen(port, () => {
    console.log(`Server kjører på port ${port}`);
});
