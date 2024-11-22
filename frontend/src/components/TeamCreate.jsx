import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../contexts/UserContext.jsx'

import axios from "axios";
import TeamMemberCard from "./TeamMemberCard.jsx";

import fetchData from "../utils/fetchData.js";
import handleApiError from '../utils/handleApiError.js'
import validateTeam from '../utils/validateTeam.js'
import usePokemonSearch from "../hooks/usePokemonSearch.js";

import itemsData from "../data/items.json";

function TeamCreate() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const { searchTerm, setSearchTerm, searchResults } = usePokemonSearch();
    const items = itemsData.items;

    const [teamName, setTeamName] = useState("");
    const [teamMembers, setTeamMembers] = useState([]);

    // Função que adiciona um novo membro ao time ------------------------------
    const addMember = (newMember) => {
        if (teamMembers.length < 6) {
            setTeamMembers([...teamMembers, newMember]);
        } else {
            alert("Você já adicionou 6 membros ao time.");
        }
    };

    // Função que remove um membro pro Index em TeamMembers --------------------
    const removeMember = (index) => {
        setTeamMembers((prev) => prev.filter((_, i) => i !== index));
    };

    // Função que adiciona o membro selecionado pelo usuário -------------------
    const handleMemberSelect = async (name) => {
        try {
            const res = await fetchData(
                `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
            );
            const member = {
                name,
                abilityList: res.abilities.map((a) => a.ability.name),
                moveList: res.moves.map((m) => m.move.name),
                sprites: [
                    res.sprites.other.home.front_default,
                    res.sprites.other.home.front_shiny
                ],
                ability: "",
                item: "",
                is_shiny: false,
                moves: [],
            };
            addMember(member);
            setSearchTerm("");
        } catch (error) {
            handleApiError(error);
        }
    };

    // Função que atualiza um campo específico de um membro --------------------
    const handleFieldChange = (index, field, value) => {
        setTeamMembers((prev) => {
            const updated = [...prev];
            updated[index][field] = value;
            return updated;
        });
    };

    // Função que salva o time no backend --------------------------------------
    const handleTeamSubmit = async (e) => {
        e.preventDefault();

        if (!validateTeam(teamMembers)) return;

        try {
            const teamPayload = {
                name: teamName || `${user.name}-Team-${user.teams.length}`,
                user_OT: user._id,
                members: teamMembers.map(({ name, ability, item, is_shiny, moves }) => ({
                    name, ability, item, is_shiny, moves,
                })),
            };

            const response = await axios.post(
                `http://localhost:5000/api/users/${user._id}/teams`,
                teamPayload
            );

            // don't ask me
            const createdTeam = response.data.response;

            setUser(prevUser => ({
                ...prevUser,
                teams: [...prevUser.teams, createdTeam],
            }));

            navigate('/home');
            console.log("Time criado:", createdTeam);
        } catch (error) {
            console.error("Erro ao salvar o time:", error.message);
        }
    };

    return (
        <div id="team-create">
            <h1>Monte seu Time!</h1>
            <form onSubmit={handleTeamSubmit}>
                <div>
                    <label>Nome do Time:</label>
                    <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)} />
                </div>
                <div>
                    <label>Pokémon:</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Ex: Charizard"
                    />
                </div>
                {searchResults.length > 0 && (
                    <ul>
                        {searchResults.map((result, idx) => (
                            <li
                                key={idx}
                                onClick={() => handleMemberSelect(result)}>
                                {result}
                            </li>
                        ))}
                    </ul>
                )}
                <ul className="team-members">
                    {teamMembers.map((member, idx) => (
                        <TeamMemberCard
                            key={idx}
                            member={member}
                            idx={idx}
                            items={items}
                            onRemove={removeMember}
                            onFieldChange={handleFieldChange}
                            onShinyToggle={(i) =>
                                handleFieldChange(i, "is_shiny", !teamMembers[i].is_shiny)
                            }
                        />
                    ))}
                </ul>
                <button type="submit">Salvar Time</button>
            </form>
        </div>
    );
}

export default TeamCreate;