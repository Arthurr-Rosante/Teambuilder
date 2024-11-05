import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import setAuthToken from "../utils/setAuthToken.js";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/auth/user`);
      setUser(res.data);
      setError(null);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
    navigate("/authenticate");
    console.log("Sessão Encerrada.");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  return { user, logout, error, loading };
};

export default useAuth;
