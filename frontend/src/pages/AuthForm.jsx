import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken.js';

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
        <div className='auth-forms'>
            <form onSubmit={handleRegister} id="register">
                <h1>Criar Conta</h1>
                <p>
                    Por favor forneça as credenciais abaixo para que possamos
                    cadastrar seu usuário.
                </p>
                <label htmlFor="name">Name:</label>
                <input
                    onChange={onChangeRegister}
                    type="text"
                    name='name'
                    value={name}
                    placeholder='(Campo opcional)'
                    autoFocus />
                <label htmlFor="name">Email:</label>
                <input
                    onChange={onChangeRegister}
                    type="email"
                    name='email'
                    value={register_email}
                    required />
                <label htmlFor="name">Senha:</label>
                <span>
                    <input
                        onChange={onChangeRegister}
                        type={pswrdType}
                        name='password'
                        value={register_password}
                        required />
                    <i
                        onClick={handleShowPswrd}
                        className={`bx bxs-${pswrdType === "password" ? "show" : "hide"}`}></i>
                </span>
                <button type="submit" disabled={pending}>Cadastrar-se</button>
                {registerError && <div id='error'>{registerError}</div>}
            </form>
            <form onSubmit={handleLogin} id="login">
                <h1>Já está cadastrado?</h1>
                <p>
                    Por favor forneça as credenciais abaixo para que possamos
                    buscar seu usuário.
                </p>
                <label htmlFor="name">Email:</label>
                <input
                    type="email"
                    name='email'
                    value={login_email}
                    onChange={onChangeLogin}
                    required />
                <label htmlFor="name">Senha:</label>
                <span>
                    <input
                        type="password"
                        name='password'
                        value={login_password}
                        onChange={onChangeLogin}
                        required />
                    <i
                        onClick={handleShowPswrd}
                        className={`bx bxs-${pswrdType === "password" ? "show" : "hide"}`}></i>
                </span>
                <button type="submit">Logar-se</button>
                {loginError && <div id='error'>{loginError}</div>}
            </form>
            {success && (<div id='success'>
                Operação realizada com sucesso! Redirecionando....
            </div>)
            }
        </div>
    )
}

export default AuthForm