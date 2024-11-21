import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import '../styles/form.css'

function AuthForm() {
    const { register, login, loading, error } = useUser();

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
        register(name, register_email, register_password);
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
        login(login_email, login_password)
    }
    // -------------------------------------------------------------------------

    const [registerPswrdVisible, setRegisterPswrdVisible] = useState(false);
    const [logPswrdVisible, setlogPswrdVisible] = useState(false);

    const toggleLogPswrd = () => {
        setlogPswrdVisible(prev => !prev);
    }
    const toggleRegisterPswrd = () => {
        setRegisterPswrdVisible(prev => !prev);
    }

    return (
        <>
            {error && (
                <div id='error'>{error}</div>
            )}
            <div className="forms-container">
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
                    <label htmlFor="password" className="auth-form__label">Senha:</label>
                    <span className="auth-form__password">
                        <input
                            onChange={onChangeRegister}
                            type={registerPswrdVisible ? 'text' : 'password'}
                            name="password"
                            value={register_password}
                            required
                            className="auth-form__input"
                        />
                        <i
                            onClick={toggleRegisterPswrd}
                            className={`bx bxs-${registerPswrdVisible ? "hide" : "show"}`}
                        ></i>
                    </span>
                    <button type="submit" disabled={loading} className="auth-form__button">Cadastrar-se</button>
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
                            type={logPswrdVisible ? 'text' : 'password'}
                            name="password"
                            value={login_password}
                            onChange={onChangeLogin}
                            required
                            className="auth-form__input"
                        />
                        <i
                            onClick={toggleLogPswrd}
                            className={`bx bxs-${logPswrdVisible ? "hide" : "show"}`}
                        ></i>
                    </span>
                    <button type="submit" disabled={loading} className="auth-form__button">Logar-se</button>
                </form>
            </div>
        </>
    )
}

export default AuthForm