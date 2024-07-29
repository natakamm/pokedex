import { useEffect, useState } from "react";

export const Home = () => {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonUrl, setPokemonUrl] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    let ignore = false;

    const getPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=150"
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        if (!ignore) {
          setPokemon(data.results);
        }
      } catch (e) {
        console.error(e);
      }
    };

    getPokemon();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const getPokemonUrls = () => {
      pokemon.map((pokemon) => pokemon.url);
      setPokemonUrl(getPokemonUrls);
    };
  });

  useEffect(() => {
    let ignore = false;

    const fetchPokemonData = async () => {
      try {
        // Fetch the list of Pokémon URLs (for example, initially set pokemonUrls state)
        // Suppose pokemonUrls is already populated with URLs
        const fetchPromises = pokemonUrl.map(async (pokemonUrl) => {
          const res = await fetch(pokemonUrl);
          if (!res.ok) throw new Error("Something went wrong");
          return res.json(); // Return the data as a promise
        });

        const allPokemonData = await Promise.all(fetchPromises);

        if (!ignore) {
          setPokemonData(allPokemonData); // Update the state with all fetched data
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (pokemonUrl.length > 0) {
      fetchPokemonData();
    }

    return () => {
      ignore = true; // Prevent state update if component unmounts
    };
  }, [pokemonUrl]); // Depend on pokemonUrls so effect runs when URLs change

  return (
    <div>
      <ul>
        {pokemonData.map((poke) => (
          <li
            key={poke.id}
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            {poke.name} <img src={poke.sprites.front_default} alt={poke.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};
