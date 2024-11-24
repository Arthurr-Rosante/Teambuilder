import { Navigate, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

import itemsData from '../data/items.json'
import pkmData from '../data/pokemon.json'
import fetchData from '../utils/fetchData';
import validateTeam from '../utils/validateTeam';

function TeamCreate() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const [teamName, setTeamName] = useState("");
    const [teamMembers, setTeamMembers] = useState([]);

    const items = itemsData.items;
    const pkmNames = pkmData.pokemon.default;

    const addMember = () => {
        if (teamMembers.length >= 6) {
            alert('Você já adicionou 6 membros.')
        } else {
            setTeamMembers([...teamMembers, {
                name: '',
                ability: '',
                item: '',
                is_shiny: false,
                moves: [],
                abilityList: [],
                moveList: [],
                sprites: [],
                searchTerm: '',
                searchResults: [],
            }]);
        }
    };

    const removeMember = (index) => {
        setTeamMembers((members) => members.filter((_, i) => i !== index));
    }

    const handleSearchTerm = (index, value) => {
        const results = pkmNames.filter((name) =>
            name.toLowerCase().includes(value.trim().toLowerCase())
        );

        if (!value.trim()) {
            setTeamMembers(prevMembers => {
                const updatedMembers = [...prevMembers];
                updatedMembers[index] = {
                    ...updatedMembers[index],
                    searchTerm: '',
                    searchResults: []
                }
                return updatedMembers;
            });
        } else {
            setTeamMembers(prevMembers => {
                const updatedMembers = [...prevMembers];
                updatedMembers[index] = {
                    ...updatedMembers[index],
                    searchTerm: value,
                    searchResults: results
                }
                return updatedMembers;
            });
        }
    }

    const handleMemberSelect = async (name, index) => {
        try {
            const res = await fetchData(
                `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
            );

            setTeamMembers(prevMembers => {
                const updatedMembers = [...prevMembers];
                updatedMembers[index] = {
                    ...updatedMembers[index],
                    name: res.name,
                    ability: '',
                    is_shiny: false,
                    moves: [],
                    abilityList: res.abilities.map((a) => a.ability.name),
                    moveList: res.moves.map((m) => m.move.name),
                    sprites: [
                        res.sprites.other.home.front_default,
                        res.sprites.other.home.front_shiny
                    ],
                    searchTerm: res.name || '',
                    searchResults: [],
                }
                return updatedMembers;
            })
        } catch (error) {
            console.log(`Erro atualizando ${index}° membro: ${error}`);
        }
    }

    const handleFieldChange = (index, field, value) => {
        setTeamMembers(prevMembers => {
            const updatedMembers = [...prevMembers];
            updatedMembers[index][field] = value;
            return updatedMembers;
        });
    };

    const toggleShiny = (index) => {
        setTeamMembers(prevMembers => (
            prevMembers.map((member, idx) => idx === index ?
                { ...member, is_shiny: !member.is_shiny } :
                member
            )
        ));
    }

    const handleTeamSubmit = async (e) => {
        e.preventDefault();

        if (!validateTeam(teamMembers)) return;

        try {
            const teamPayload = {
                name: teamName || `${user.name}-Team-${user.teams.length}`,
                user_OT: user._id,
                members: teamMembers.map(({ name, ability, item, is_shiny, moves }) => (
                    { name, ability, item, is_shiny, moves }
                ))
            };

            const response = await axios.post(
                `http://localhost:5000/api/users/${user._id}/teams`,
                teamPayload
            );

            const createdTeam = response.data.response;

            setUser(prevUser => ({
                ...prevUser,
                teams: [...prevUser.teams, createdTeam],
            }));

            navigate('/home');
            console.log("Time Criado:", createdTeam);
        } catch (error) {
            console.error("Erro ao salvar o time:", error.message);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return <Navigate to='/' />
        }
        return;
    }, []);

    return (
        <div id='team-create'>
            <h1>Crie seu Time!</h1>
            {teamMembers.length < 6 && (
                <button onClick={addMember}>
                    <i className='bx bx-plus'></i>
                    Novo membro
                </button>
            )}
            <form onSubmit={e => handleTeamSubmit(e)}>
                <div>
                    <label>Nome do Time: </label>
                    <input
                        type="text"
                        value={teamName}
                        onChange={e => setTeamName(e.target.value)} />
                </div>
                <ul>
                    {teamMembers.length > 0 && (
                        teamMembers.map((member, index) => (
                            <li key={index}>
                                <h3 className='member-name'>{index + 1}° Membro - {member.name}</h3>
                                <div>
                                    <span onClick={() => toggleShiny(index)}>✨</span>
                                    <img src={member.sprites.length > 0 ? member.sprites[member.is_shiny ? 1 : 0] : '/logo.png'} alt={member.name} />
                                </div>
                                <div>
                                    <label>Pokémon: </label>
                                    <input
                                        type="text"
                                        value={member.searchTerm}
                                        onChange={(e) => handleSearchTerm(index, e.target.value)}
                                    />
                                    {member.searchResults.length > 0 && (
                                        <ul>
                                            {member.searchResults.map((result, idx) => (
                                                <li
                                                    key={idx}
                                                    onClick={() => handleMemberSelect(result, index)}>
                                                    {result}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div>
                                    <label>Item:</label>
                                    <select
                                        value={member.item || ''}
                                        onChange={(e) => handleFieldChange(
                                            index, "item", e.target.value
                                        )}>
                                        <option value="" disabled />
                                        {member.item && (
                                            <option value={member.item}>
                                                {member.item}
                                            </option>
                                        )}
                                        {Object.values(items)
                                            .flat()
                                            .filter((item) => item !== member.item)
                                            .map((item, i) => (
                                                <option key={i} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div>
                                    <label>Habilidade:</label>
                                    <select
                                        value={member.ability || ""}
                                        onChange={(e) => handleFieldChange(
                                            index, "ability", e.target.value
                                        )}
                                    >
                                        <option value="" disabled />
                                        {member.ability && (
                                            <option value={member.ability}>
                                                {member.ability}
                                            </option>)
                                        }
                                        {member.abilityList
                                            .filter((ability) => ability !== member.ability)
                                            .map((ability, i) => (
                                                <option key={i} value={ability}>
                                                    {ability}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div>
                                    <label>Moveset:</label>
                                    {[...Array(4)].map((_, i) => (
                                        <select
                                            key={i}
                                            value={member.moves[i] || ''}
                                            onChange={(e) => {
                                                const newMoves = [...member.moves];
                                                newMoves[i] = e.target.value;
                                                handleFieldChange(index, 'moves', newMoves)
                                            }}>
                                            <option value="" disabled>{i + 1}° Move</option>
                                            {member.moveList.map((move, j) => (
                                                <option key={j} value={move}>{move}</option>
                                            )) || <option value='' />}
                                        </select>
                                    ))}
                                </div>
                                <button onClick={() => removeMember(index)}>Remover Membro</button>
                            </li>
                        ))
                    )}
                </ul>
                <button type="submit">Criar Time</button>
            </form>
        </div>
    )
}

export default TeamCreate