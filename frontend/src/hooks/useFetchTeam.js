import { useEffect, useState } from "react";
import axios from "axios";

const useFetchTeam = (members) => {
  const [members, setMembers] = useState([]);
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

  return { members, error, loading };
};

export default useFetchTeam;
