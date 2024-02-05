// Import necessary dependencies from the 'react' library
import React, { useState, useEffect } from 'react';

// Import the styles for the component
import './PokemonList.css';

// Functional component definition for PokemonList
const PokemonList = () => {
  // State hook to manage the list of Pokemon data
  const [pokemonList, setPokemonList] = useState([]);

  // useEffect hook to fetch Pokemon data when the component mounts
  useEffect(() => {
    // Asynchronous function to fetch Pokemon data
    const fetchPokemonData = async () => {
      try {
        // Array of Pokemon IDs to fetch data for
        const pokemonIds = [4, 243, 322];

        // Use Promise.all to fetch details for multiple Pokemon concurrently
        const pokemonDetails = await Promise.all(
          pokemonIds.map(async (id) => {
            // Fetch basic Pokemon data using the PokeAPI
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const pokemonData = await response.json();

            // Fetch additional details (type, stats, and description)
            const speciesResponse = await fetch(pokemonData.species.url);
            const speciesData = await speciesResponse.json();
            const flavorTexts = speciesData.flavor_text_entries.filter(
              (entry) => entry.language.name === 'en'
            );

            // Return an object containing formatted Pokemon details
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

        // Set the fetched Pokemon details to the state
        setPokemonList(pokemonDetails);
      } catch (error) {
        // Handle any errors that occur during data fetching
        console.error('Error fetching Pokemon data:', error);
      }
    };

    // Invoke the fetchPokemonData function when the component mounts
    fetchPokemonData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // JSX structure for rendering the PokemonList component
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Playable Pokemon</h1>
      <div className="row">
        {/* Map through the PokemonList array and render individual Pokemon cards */}
        {pokemonList.map((pokemon) => (
          <div key={pokemon.id} className="col-md-4 mb-4">
            <div className="card">
              {/* Display Pokemon image using the PokeAPI sprites URL */}
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                className="card-img-top"
                alt={pokemon.name}
              />
              <div className="card-body">
                {/* Display Pokemon name, base experience, height, and weight */}
                <h5 className="card-title">{pokemon.name}</h5>
                <p className="card-text">Base Experience: {pokemon.base_experience}</p>
                <p className="card-text">Height: {pokemon.height}</p>
                <p className="card-text">Weight: {pokemon.weight}</p>
                {/* Display Pokemon types */}
                <p className="card-text">Types: {pokemon.types.join(', ')}</p>
                {/* Display Pokemon stats using an unordered list */}
                <p className="card-text">Stats:</p>
                <ul>
                  {pokemon.stats.map((stat) => (
                    <li key={stat.stat.name}>
                      {stat.stat.name}: {stat.base_stat}
                    </li>
                  ))}
                </ul>
                {/* Display Pokemon description */}
                <p className="card-text">Description: {pokemon.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the PokemonList component as the default export
export default PokemonList;
