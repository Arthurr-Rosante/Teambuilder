import pkmData from "../data/pokemon.json";
import { useState, useEffect } from "react";

const usePokemonSearch = () => {
  const pkmNames = pkmData.pokemon.default;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const results = pkmNames.filter((name) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return { searchTerm, setSearchTerm, searchResults };
};

export default usePokemonSearch;
