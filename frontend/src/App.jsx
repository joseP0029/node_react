import { useEffect, useState } from "react";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState(null);

  const getRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 1025) + 1;

    const pokemonRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );

    const pokemonData = await pokemonRes.json();

    const speciesRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${randomId}`
    );

    const speciesData = await speciesRes.json();

    setPokemon({
      id: pokemonData.id,
      name: pokemonData.name,
      types: pokemonData.types.map(
        (t) => t.type.name
      ),
      height: pokemonData.height,
      weight: pokemonData.weight,
      color: speciesData.color.name,
      moves: pokemonData.moves
        .slice(0, 5)
        .map((m) => m.move.name),
      image:
        pokemonData.sprites.other.dream_world
          .front_default ||
        pokemonData.sprites.front_default,
    });

    setGuess("");
    setResult(null);
  };

  useEffect(() => {
    getRandomPokemon();
  }, []);

  const checkAnswer = () => {
    setResult(
      guess.toLowerCase().trim() ===
      pokemon.name.toLowerCase()
    );
  };

  if (!pokemon) return <h2>Cargando...</h2>;

  return (
    <div>
      <h1>Adivina el Pokémon</h1>

      <p>ID: {pokemon.id}</p>
      <p>Tipo: {pokemon.types.join(", ")}</p>
      <p>Color: {pokemon.color}</p>
      <p>Altura: {pokemon.height}</p>
      <p>Peso: {pokemon.weight}</p>
      <p>Ataques: {pokemon.moves.join(", ")}</p>

      <input
        value={guess}
        onChange={(e) =>
          setGuess(e.target.value)
        }
      />

      <button onClick={checkAnswer}>
        Adivinar
      </button>

      {result !== null && (
        <>
          <h2>
            {result
              ? `¡Correcto! Es ${pokemon.name}`
              : `Incorrecto. Era ${pokemon.name}`}
          </h2>

          <img
            src={pokemon.image}
            alt={pokemon.name}
            width="250"
          />
        </>
      )}

      <button onClick={getRandomPokemon}>
        Nuevo Pokémon
      </button>
    </div>
  );
}

export default App;