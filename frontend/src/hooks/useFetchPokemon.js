import { useEffect, useState } from "react";
import axios from "axios";

const useFetchPokemon = (params) => {
  const [entries, setEntries] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      setError(null);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [params]);

  return { entries, error, loading };
};

export default useFetchPokemon;
