import React, { useState, useEffect } from 'react';
import './PokemonList.css';


const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const pokemonIds = [4, 243, 322];

        const pokemonDetails = await Promise.all(
          pokemonIds.map(async (id) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const pokemonData = await response.json();

            // Fetch additional details (type, stats, and description)
            const speciesResponse = await fetch(pokemonData.species.url);
            const speciesData = await speciesResponse.json();
            const flavorTexts = speciesData.flavor_text_entries.filter(
              (entry) => entry.language.name === 'en'
            );

            return {
              id: pokemonData.id,
              name: pokemonData.name,
              base_experience: pokemonData.base_experience,
              height: pokemonData.height,
              weight: pokemonData.weight,
              types: pokemonData.types.map((type) => type.type.name),
              stats: pokemonData.stats,
              description: flavorTexts[0].flavor_text, // Using the first English flavor text
            };
          })
        );

        setPokemonList(pokemonDetails);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Pokemon List</h1>
      <div className="row">
        {pokemonList.map((pokemon) => (
          <div key={pokemon.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                className="card-img-top"
                alt={pokemon.name}
              />
              <div className="card-body">
                <h5 className="card-title">{pokemon.name}</h5>
                <p className="card-text">Base Experience: {pokemon.base_experience}</p>
                <p className="card-text">Height: {pokemon.height}</p>
                <p className="card-text">Weight: {pokemon.weight}</p>
                <p className="card-text">Types: {pokemon.types.join(', ')}</p>
                <p className="card-text">Stats:</p>
                <ul>
                  {pokemon.stats.map((stat) => (
                    <li key={stat.stat.name}>
                      {stat.stat.name}: {stat.base_stat}
                    </li>
                  ))}
                </ul>
                <p className="card-text">Description: {pokemon.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
