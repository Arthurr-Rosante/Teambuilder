import TeamPreview from "./TeamPreview.jsx";
import PropTypes from "prop-types";
import { UserPropTypes } from "../types";

function UserMenu({ user, logout }) {
  if (user) {
    const { name, pfp, teams } = user;

    return (
      <div id="user-info">
        <div className="user-profile">
          <h2>Olá, {name ? name : "Treinador"}!</h2>
          <img src={`./${pfp}`} alt={name + " profile"} className="user-pfp" />
          <button onClick={logout} className="btn-logout">
            <span>Logout</span>
            <i className='bx bx-exit'></i>
          </button>
        </div>
        <div className="user-teams">
          <h2>Seus times</h2>
          <div className="user-teams-container">
            {teams.map((team, idx) => (
              <TeamPreview key={idx} team={team} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

UserMenu.propTypes = {
  user: UserPropTypes.isRequired,
  logout: PropTypes.func,
};

export default UserMenu;

/*
<div>
        <h1 className="user-greets">Olá, {name ? name : "Treinador"}!</h1>
        <img
          src={`./${pfp}`}
          alt={name + " profile"}
          className="user-profile"
        />
        <button className="btn-logout" onClick={logout}>
          encerrar sessão
        </button>
        {teams.map((team, idx) => (
          <ul key={idx}>
            {team.name}:{" "}
            {team.members.map((member, idx) => (
              <li key={idx}>
                {member.name} | {member.ability}
                <ul>
                  {member.moves.map((move, idx) => (
                    <li key={idx}>
                      {move.name} | {move.type}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ))}
      </div>
*/
