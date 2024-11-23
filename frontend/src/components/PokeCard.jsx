import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import fetchData from "../utils/fetchData.js";
import PropTypes from "prop-types";
import "../styles/pokecard.css";

function PokeCard({ innerRef, entry }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const getPokeData = async () => {
      const pkmData = await fetchData(entry.url);
      setPokemon(pkmData);
    };

    getPokeData();
  }, [entry]);

  if (pokemon?.is_default !== true) return null;

  const mainType = pokemon?.types[0]?.type?.name || "normal"; // Obtém o tipo principal

  return (
    <div
  className={`poke-card type-${pokemon?.types[0]?.type.name}`}
  ref={innerRef ? innerRef : undefined}
>
  <NavLink to={`/entry/${pokemon.name}`}>
    <img
      className="poke-card-image"
      src={pokemon?.sprites.other.home.front_default}
      alt={pokemon?.name + " image."}
    />
  </NavLink>
  <span className="poke-card-span">{`N° ${pokemon?.id
    .toString()
    .padStart(4, "0")}`}</span>
  <h2 className="poke-card-name">{pokemon.species.name}</h2>
  <ul className="poke-card-types">
    {pokemon?.types.map((type) => (
      <li
        className={`poke-card-type type-badge-${type.type.name}`}
        key={type.slot}
      >
        {type.type.name}
      </li>
    ))}
  </ul>
</div>
  );
}

PokeCard.propTypes = {
  entry: PropTypes.object.isRequired,
  innerRef: PropTypes.func,
};

export default PokeCard;