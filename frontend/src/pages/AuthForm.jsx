import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken.js';
import '../styles/form.css'

function AuthForm() {
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState(null);
    const [loginError, setLoginError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [pending, setPending] = useState(false);

    // Register User -----------------------------------------------------------
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const { name, email: register_email, password: register_password } = registerData;

    const onChangeRegister = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const newUser = { name, email: register_email, password: register_password };

        try {
            setPending(true)
            const res = await axios.post("http://localhost:5000/api/auth/register", newUser);

            setRegisterError(null)
            setSuccess(true)

            setTimeout(() => {
                localStorage.setItem('token', res.data.token);
                setAuthToken(res.data.token)
                navigate("/home")
            }, 1000)
        } catch (error) {
            setRegisterError(error.message)
        } finally {
            setPending(false)
        }

    }
    // Log User ----------------------------------------------------------------
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const { email: login_email, password: login_password } = loginData;

    const onChangeLogin = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = { email: login_email, password: login_password };

        try {
            setPending(true);

            const res = await axios.post("http://localhost:5000/api/auth/login", user);
            const token = res.data.token

            localStorage.setItem("token", token)
            setAuthToken(token)
            setLoginError(null)
            navigate("/home")
        } catch (error) {
            setLoginError(error.message)
        } finally {
            setPending(false)
        }
    }
    // -------------------------------------------------------------------------

    const [pswrdType, setPswrdType] = useState("password");
    const handleShowPswrd = () => {
        pswrdType === "password" ?
            setPswrdType("text") :
            setPswrdType("password")
    }

    return (
        <div className="auth-forms">
    
    <form onSubmit={handleRegister} id="register" className="auth-form">
        <h1 className="auth-form__header">Criar Conta</h1>
        <p className="auth-form__description">
            Por favor forneça as credenciais abaixo para que possamos cadastrar seu usuário.
        </p>
        <label htmlFor="name" className="auth-form__label">Nome:</label>
        <input
            onChange={onChangeRegister}
            type="text"
            name="name"
            value={name}
            placeholder="(Campo opcional)"
            autoFocus
            className="auth-form__input"
        />
        <label htmlFor="email" className="auth-form__label">Email:</label>
        <input
            onChange={onChangeRegister}
            type="email"
            name="email"
            value={register_email}
            required
            className="auth-form__input"
        />
        <label htmlFor="password" class="auth-form__label">Senha:</label>
        <span className="auth-form__password">
            <input
                onChange={onChangeRegister}
                type={pswrdType}
                name="password"
                value={register_password}
                required
                className="auth-form__input"
            />
            <i
                onClick={handleShowPswrd}
                className={`bx bxs-${pswrdType === "password" ? "show" : "hide"}`}
            ></i>
        </span>
        <button type="submit" disabled={pending} className="auth-form__button">Cadastrar-se</button>
        {registerError && <div className="auth-form__error">{registerError}</div>}
    </form>

    
    <form onSubmit={handleLogin} id="login" className="auth-form">
        <h1 className="auth-form__header">Já está cadastrado?</h1>
        <p className="auth-form__description">
            Por favor forneça as credenciais abaixo para que possamos buscar seu usuário.
        </p>
        <label htmlFor="email" className="auth-form__label">Email:</label>
        <input
            type="email"
            name="email"
            value={login_email}
            onChange={onChangeLogin}
            required
            className="auth-form__input"
        />
        <label htmlFor="password" className="auth-form__label">Senha:</label>
        <span className="auth-form__password">
            <input
                type="password"
                name="password"
                value={login_password}
                onChange={onChangeLogin}
                required
                className="auth-form__input"
            />
            <i
                onClick={handleShowPswrd}
                className={`bx bxs-${pswrdType === "password" ? "show" : "hide"}`}
            ></i>
        </span>
        <button type="submit" className="auth-form__button">Logar-se</button>
        {loginError && <div>{loginError}</div>}
    </form>

    {success && (
        <div >
            Operação realizada com sucesso! Redirecionando....
        </div>
    )}
</div>
    )
}

export default AuthForm