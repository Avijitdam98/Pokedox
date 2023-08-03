import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function downloadPokemon() {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
      const pokemonResult = response.data.results;
      const pokemonResultPromises = pokemonResult.map((pokemon) =>
        axios.get(pokemon.url)
      );
      const pokemonDataList = await Promise.all(pokemonResultPromises);
      const parsedData = pokemonDataList.map((pokemonData) => ({
        name: pokemonData.data.name,
        image: pokemonData.data.sprites.other.dream_world.front_default,
      }));
      setPokemonList(parsedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    downloadPokemon();
  }, []);

  return (
    <div className="pokemon-list-wrapper">
      PokemonList
      {isLoading ? "Loading..." : "Data downloaded"}
      {pokemonList.map((pokemon) => (
        <div key={pokemon.name}>
          <img src={pokemon.image} alt={pokemon.name} />
          <span>{pokemon.name}</span>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
