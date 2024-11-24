import { NavLink } from 'react-router-dom'
import { useUser } from '../contexts/UserContext.jsx';
import TeamPreview from "./TeamPreview.jsx";

function UserMenu() {
  const { user, logout } = useUser();
  const { name, pfp, teams } = user;

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="user-info">
      <div className="user-profile">
        <div>
          <h1>Olá, {name ? name : "Treinador"}!</h1>
          <img src={`/${pfp}`} alt={name + " profile"} className="user-pfp" />
        </div>
        <div className="user-controllers">
          <NavLink to={'/home/teams/create'} >
            <button className="btn-create-team">
              <span>Criar Time</span>
              <i className="bx bx-plus"></i>
            </button>
          </NavLink>
          <NavLink to={'/home'}>
            <button className="btn-return-home">
              <i className="bx bxs-home"></i>
            </button>
          </NavLink>
          <button onClick={logout} className="btn-logout">
            <span>Logout</span>
            <i className='bx bx-exit'></i>
          </button>
        </div>
      </div>
      <div className="user-teams">
        <h2>Seus times</h2>
        <div className="user-teams-container">
          {teams.length > 0 ? (
            teams.map((team, idx) => (
              <TeamPreview key={idx} team={team} />
            ))
          ) : (
            <span className='user-teams-warning'>
              Hmmm... parece que você ainda não cadastrou nenhum time
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserMenu;