import React from 'react'

function UserMenu({ user, logout }) {

    if (user) {
        const { name, pfp, teams } = user

        return (
            <div>
                <h1 className="user-greets">Olá, {name ? name : "Treinador"}!</h1>
                <img src={`./${pfp}`} alt={name + " profile"} className="user-profile" />
                <button
                    className="btn-logout"
                    onClick={logout}>encerrar sessão
                </button>
                {teams.map((team, idx) => (
                    <ul key={idx}>{team.name}: {team.members.map((member, idx) => (
                        <li key={idx}>{member.name} | {member.ability}
                            <ul>
                                {member.moves.map((move, idx) => (
                                    <li key={idx}>{move.name} | {move.type}</li>
                                ))}
                            </ul>
                        </li>
                    ))}</ul>
                ))}
            </div>
        )
    }
}

export default UserMenu