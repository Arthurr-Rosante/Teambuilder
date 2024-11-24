import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { NavLink } from 'react-router-dom'
import '../styles/form.css'

function LoginForm() {
    const { login, loading, error } = useUser();

    // Log User ----------------------------------------------------------------
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const { email, password } = loginData;

    const onChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        login(email, password)
    }
    // -------------------------------------------------------------------------

    const [pswrdVisible, setPswrdVisible] = useState(false);

    const togglePswrd = () => {
        setPswrdVisible(prev => !prev);
    }

    return (
        <div className='form-container'>
            <form onSubmit={handleLogin} id="login" className="auth-form">
                {error && (
                    <div id='error'>{error}</div>
                )}
                <h1 className="auth-form__header">Já está cadastrado?</h1>
                <p className="auth-form__description">
                    Por favor forneça as credenciais abaixo para que possamos buscar seu usuário.
                </p>
                <div className='auth-form-inputs'>
                    <label htmlFor="email" className="auth-form__label">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                        className="auth-form__input"
                    />
                    <label htmlFor="password" className="auth-form__label">Senha:</label>
                    <span className="auth-form__password">
                        <input
                            type={pswrdVisible ? 'text' : 'password'}
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                            className="auth-form__input"
                        />
                        <i
                            onClick={togglePswrd}
                            className={`bx bxs-${pswrdVisible ? "hide" : "show"}`}
                        ></i>
                    </span>
                </div>
                <button type="submit" disabled={loading} className="auth-form__button">
                    Logar-se
                </button>
                <NavLink to='/'>
                    voltar para
                    <i className='bx bxs-home'></i>
                </NavLink>
            </form>
        </div>
    )
}

export default LoginForm