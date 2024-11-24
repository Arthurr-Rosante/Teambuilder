import { createContext, useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Configura o Token de sessão do usuário
    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common["x-auth-token"] = token;
        } else {
            delete axios.defaults.headers.common["x-auth-token"];
        }
    };

    // Verifica se o token expirou
    const isTokenExpired = (token) => {
        try {
            const { exp } = jwtDecode(token);
            const now = Math.floor(Date.now() / 1000);
            return exp < now;
        } catch {
            return true;
        }
    };

    const register = async (name = undefined, email, password) => {
        try {
            setLoading(true);
            const userData = { email, password };
            if (name) {
                userData.name = name;
            }

            const res = await axios.post("http://localhost:5000/api/auth/register", userData);
            const token = res.data.token;

            localStorage.setItem('token', token);
            setAuthToken(token);

            await fetchUser();

            setError(null);
            navigate("/home");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setError(`Erro: ${error.response.data.msg || "Erro ao fazer Cadastro."}`);
                } else if (error.request) {
                    setError("Não foi possível conectar ao servidor. Verifique sua conexão.");
                } else {
                    setError(`Erro desconhecido: ${error.message}`);
                }
            } else {
                setError(`Erro ao fazer login: ${error.message || "Ocorreu um erro inesperado."}`);
            }
        } finally {
            setLoading(false);
        }
    }

    const login = async (email, password) => {
        try {
            setLoading(true);
            const res = await axios.post(
                "http://localhost:5000/api/auth/login", { email, password }
            );
            const token = res.data.token;

            localStorage.setItem("token", token);
            setAuthToken(token);

            await fetchUser();

            setError(null);
            navigate("/home");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setError(`Erro: ${error.response.data.msg || "Erro ao fazer login."}`);
                } else if (error.request) {
                    setError("Não foi possível conectar ao servidor. Verifique sua conexão.");
                } else {
                    setError(`Erro desconhecido: ${error.message}`);
                }
            } else {
                setError(`Erro ao fazer login: ${error.message || "Ocorreu um erro inesperado."}`);
            }
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setAuthToken(null);
        setUser(null);
        navigate('/');
    };

    const fetchUser = async (initialCheck = false) => {
        const token = localStorage.getItem('token');
        if (!token || isTokenExpired(token)) {
            if (initialCheck) {
                setUser(null);
                setAuthToken(null);
            } else {
                logout();
            }
            return;
        }

        setAuthToken(token);

        try {
            setLoading(true);
            const res = await axios.get("http://localhost:5000/api/auth/user");
            setUser(res.data);
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser(true);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, error, register, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);