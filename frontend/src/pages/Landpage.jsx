import { NavLink } from "react-router-dom";
import "../styles/landpage.css";

function Landpage() {
  return (
    <div id="landpage">
      <div className="landpage-container">
        <div className="navbar">
          <img src="/pokemon-logo.png" alt="pokémon logo" draggable="false" />
          <h2>
            {" "}
            TeamBuilder | Feito por{" "}
            <a href="https://github.com/Arthurr-Rosante" target="a_blank">
              Arthur
            </a>{" "}
            e{" "}
            <a href="https://github.com/NightEdu" target="a_blank">
              Eduardo
            </a>
          </h2>
        </div>
        <div className="hero">
          <span>PIKACHU</span>
          <span>PIKACHU</span>
          <span>PIKACHU</span>
          <div>
            <h1>Monte seu Time Conosco!</h1>
            <div className="hero-buttons">
              <NavLink to="/authenticate/register">Cadastrar-se</NavLink>
              <NavLink to="/authenticate/login">Logar-se</NavLink>
            </div>
          </div>
          <div className="hero-img-container">
            <img
              className="hero-img"
              src="/pikachu-hero.webp"
              alt="pikachu hero"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landpage;
