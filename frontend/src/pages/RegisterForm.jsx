import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { NavLink } from 'react-router-dom'
import '../styles/form.css'

function RegisterForm() {
  const { register, loading, error } = useUser();

  // Register User -----------------------------------------------------------
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const { name, email, password } = registerData;

  const onChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    register(name, email, password);
  }

  const [pswrdVisible, setPswrdVisible] = useState(false);
  const togglePswrd = () => {
    setPswrdVisible(prev => !prev);
  }

  return (
    <div className="form-container">
      {error && (
        <div id='error'>{error}</div>
      )}
      <form onSubmit={handleRegister} id="register" className="auth-form">
        <h1 className="auth-form__header">Criar Conta</h1>
        <p className="auth-form__description">
          Por favor forneça as credenciais abaixo para que possamos cadastrar seu usuário.
        </p>
        <div className="auth-form-inputs">
          <label htmlFor="name" className="auth-form__label">Nome:</label>
          <input
            onChange={onChange}
            type="text"
            name="name"
            value={name}
            placeholder="(Campo opcional)"
            autoFocus
            className="auth-form__input"
          />
          <label htmlFor="email" className="auth-form__label">Email:</label>
          <input
            onChange={onChange}
            type="email"
            name="email"
            value={email}
            required
            className="auth-form__input"
          />
          <label htmlFor="password" className="auth-form__label">Senha:</label>
          <span className="auth-form__password">
            <input
              onChange={onChange}
              type={pswrdVisible ? 'text' : 'password'}
              name="password"
              value={password}
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
          Cadastrar-se
        </button>
        <NavLink to='/'>
          voltar para
          <i className='bx bxs-home'></i>
        </NavLink>
      </form>
    </div>
  )
}

export default RegisterForm