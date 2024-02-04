// src/components/PokemonList.js
import React from 'react';

const PokemonList = () => {
  const[pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');
            const data = await response.json();

            const pokemonDetails = await Promise.all{
                data.results.map(async (pokemon) => {
                    const detailsResponse = await fetch(pokemon.url);
                    return await detailsResponse.json();
                })
            };

            setPokemonList(pokemonDetails);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, []);
        

  return (
    <div>
      {/* Card Format Display */}
    </div>
  );
}

export default PokemonList;