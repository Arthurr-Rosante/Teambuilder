import { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext';
import axios from 'axios';

import fetchData from '../utils/fetchData';
import validateTeam from '../utils/validateTeam.js'

import pokemonData from '../data/pokemon.json';
import itemsData from '../data/items.json';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function TeamEdit() {
    const { teamId } = useParams();
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const [team, setTeam] = useState(null);
    const [teamName, setTeamName] = useState('');
    const [teamMembers, setTeamMembers] = useState([]);

    const pkmNames = pokemonData.pokemon.default;
    const items = itemsData.items;

    useEffect(() => {
        if (!user) return;

        const fetchExistingTeam = async () => {
            try {
                const res = await fetchData(
                    `${BASE_URL}/api/users/${user._id}/teams/${teamId}`
                );


                const { team } = res;

                setTeam(team);
                setTeamName(team.name);

                const updatedMembers = await Promise.all(
                    team.members.map(async (member) => {
                        try {
                            const res = await fetchData(
                                `https://pokeapi.co/api/v2/pokemon/${member.name}`
                            );

                            return {
                                _id: member._id,
                                name: member.name,
                                ability: member.ability,
                                item: member.item,
                                is_shiny: member.is_shiny,
                                moves: member.moves,
                                abilityList: res.abilities.map((a) => a.ability.name),
                                moveList: res.moves.map((m) => m.move.name),
                                sprites: [
                                    res.sprites.other.home.front_default,
                                    res.sprites.other.home.front_shiny
                                ],
                                searchTerm: member.name || '',
                                searchResults: [],
                            };
                        } catch (error) {
                            if (error instanceof Error)
                                console.log(error.message);
                            return member;
                            //... remender to handle this better
                        }
                    })
                )
                setTeamMembers(updatedMembers);
            } catch (error) {
                if (error instanceof Error)
                    console.log(error);
            }
        }

        fetchExistingTeam();
    }, [teamId, user]);

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

    const handleMemberAlter = async (name, index) => {
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
    };

    const addMember = (e) => {
        e.preventDefault();

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
        setTeamMembers((prev) => prev.filter((_, i) => i !== index));
    };

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
                members: teamMembers.map(({ name, ability, item, is_shiny, moves }) => (
                    { name, ability, item, is_shiny, moves }
                ))
            };

            const response = await axios.put(
                `${BASE_URL}/api/users/${user._id}/teams/${teamId}`,
                teamPayload
            );

            const updatedTeam = response.data.updatedTeam;
            setUser(prevUser => ({
                ...prevUser,
                teams: prevUser.teams.map(team =>
                    team._id === updatedTeam._id ? updatedTeam : team
                ),
            }));

            navigate('/home');
            console.log("Time Atualizado:", updatedTeam);
        } catch (error) {
            console.error("Erro ao salvar o time:", error.message);
        }
    }

    const handleTeamExclude = async (e) => {
        e.preventDefault();

        const confirmDelete = window.confirm("Tem certeza de que deseja excluir este time?");
        if (!confirmDelete) return;

        try {
            await axios.delete(
                `${BASE_URL}/api/users/${user._id}/teams/${teamId}`
            );

            setUser(prevUser => ({
                ...prevUser,
                teams: prevUser.teams.filter((team) => team._id !== teamId)
            }))

            navigate("/home");
            console.log('Time excluído com sucesso');
        } catch (error) {
            console.error("Erro ao deletar o time: ", error.message);
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
        <div id='team-edit'>
            <h1>Edite seu time abaixo:</h1>
            {team && (
                <form onSubmit={(e) => handleTeamSubmit(e)}>
                    <h2>{team.name}</h2>
                    <div>
                        <label>Nome do Time: </label>
                        <input
                            type="text"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)} />
                    </div>
                    {teamMembers.length < 6 && (
                        <button onClick={(e) => addMember(e)}>
                            Adicionar novo membro
                        </button>
                    )}
                    <ul className='team-members'>
                        {teamMembers.map((member, index) => (
                            <li key={member._id || index}>
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
                                                    onClick={() => handleMemberAlter(result, index)}>
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
                        ))}
                    </ul>
                    <button type="submit">Atualizar Time</button>
                    <button onClick={(e) => handleTeamExclude(e)}>
                        Excluir Time
                    </button>
                </form>
            )}
        </div>
    )
}

export default TeamEdit