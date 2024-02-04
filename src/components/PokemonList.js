import React, { useState, useEffect } from 'react';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const pokemonIds = [4, 243, 322];

        const pokemonDetails = await Promise.all(
          pokemonIds.map(async (id) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            return await response.json();
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
                {/* Add more details as needed */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
