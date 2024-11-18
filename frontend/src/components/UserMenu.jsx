import TeamPreview from "./TeamPreview.jsx";
import PropTypes from "prop-types";
import { UserPropTypes } from "../types.js";
import { NavLink } from 'react-router-dom'

function UserMenu({ user, logout }) {
  
  if (user) {
    const { name, pfp, teams } = user;

    return (
      <div id="user-info">
        <div className="user-profile">
          <h2>Olá, {name ? name : "Treinador"}!</h2>
          <img src={`./${pfp}`} alt={name + " profile"} className="user-pfp" />
          <div className="user-controllers">
            <button className="btn-create-team">
              <NavLink to={'/home/teams/create'} >
                <span>Criar Time</span>
                <i className="bx bx-plus"></i>
              </NavLink>
            </button>
            <button className="btn-return-home">
              <NavLink to={'/home'}>
                <i className="bx bxs-home"></i>
              </NavLink>
            </button>
            <button onClick={logout} className="btn-logout">
              <span>Logout</span>
              <i className='bx bx-exit'></i>
            </button>
          </div>
        </div>
        <div className="user-teams">
          <h2>Seus times</h2>
          <div className="user-teams-container">
            {teams.map((team) => (
              <TeamPreview key={team._id} team={team} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

// UserMenu.propTypes = {
//   user: UserPropTypes.isRequired,
//   logout: PropTypes.func,
// };

export default UserMenu;
