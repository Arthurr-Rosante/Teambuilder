import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import setAuthToken from "../utils/setAuthToken.js";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isTokenExpired = (token) => {
    try {
      const { exp } = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);
      return exp < now;
    } catch (error) {
      console.log("Erro ao verificar token: ", error);
      return true;
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (token && !isTokenExpired(token)) {
      setAuthToken(token);
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/user`);
        setUser(res.data);
        setError(null);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
        setError(error);
      }
    } else {
      logout();
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
    navigate("/authenticate");
    console.log("Sessão Encerrada.");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, logout, error, loading };
};

export default useAuth;
