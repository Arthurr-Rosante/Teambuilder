import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import fetchData from '../utils/fetchData.js'
import { TeamShape } from "../types.js";

import '../styles/userMenu.css'

function TeamPreview({ team }) {
  const [teamInfo, setTeamInfo] = useState(null);

  useEffect(() => {
    const fetchTeamInfo = async () => {
      try {
        const responses = await Promise.all(
          team.members.map(async (member) => {
            const info = await fetchData(`https://pokeapi.co/api/v2/pokemon/${member.name}`)
            const item = await fetchData(`https://pokeapi.co/api/v2/item/${member.item}`)
            return { member, info, item };
          })
        )

        setTeamInfo(responses)
      } catch (error) {
        if (error instanceof Error) console.log(error.message)
      }
    }

    fetchTeamInfo()
  }, [team]);

  return (
    <NavLink className='user-team-a' to={`/home/teams/edit/${team._id}`}>
      <div className="user-team">
        <h3>{team.name}</h3>
        <div className="team-container">
          {teamInfo && (
            teamInfo.map((t, idx) => (
              <div key={idx} className="member-info">
                <img
                  className="member-profile"
                  src={
                    !t.member.is_shiny ?
                      t.info.sprites.front_default :
                      t.info.sprites.front_shiny
                  }
                  alt={t.member.name} />
                {t.member.is_shiny && <span className="member-shiny">✨</span>}
                {t.member.item && <img src={t.item.sprites.default} className="member-item" />}
              </div>
            ))
          )}
        </div>
      </div>
    </NavLink>
  );
}

TeamPreview.propTypes = {
  team: TeamShape.isRequired,
}

export default TeamPreview;
