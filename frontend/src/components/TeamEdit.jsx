import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../contexts/UserContext.jsx'

import axios from "axios";
import TeamMemberCard from "./TeamMemberCard.jsx";

import fetchData from "../utils/fetchData.js";
import handleApiError from "../utils/handleApiError.js";
import validateTeam from '../utils/validateTeam.js'
import usePokemonSearch from "../hooks/usePokemonSearch.js";

import itemsData from "../data/items.json";

function TeamEdit() {
    const teamIdParam = useParams();
    const teamId = teamIdParam.teamId;

    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const { searchTerm, setSearchTerm, searchResults } = usePokemonSearch();
    const items = itemsData.items;

    const [teamName, setTeamName] = useState("");
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        const fetchExistingTeam = async () => {
            try {
                const existingTeam = await fetchData(
                    `http://localhost:5000/api/users/${user._id}/teams/${teamId}`
                );

                setTeamMembers(existingTeam.team.members)
            } catch (error) {
                console.log(error)
            }
        }
        fetchExistingTeam()
    }, [teamIdParam]);

    return (
        <div>
            {teamMembers.length > 0 && (
                teamMembers.map((member, idx) => {
                    <TeamMemberCard
                        key={idx}
                        member={member}
                        idx={idx}
                        items={items}
                        onShinyToggle={(i) =>
                            handleFieldChange(i, "is_shiny", !teamMembers[i].is_shiny)
                        }
                    />
                })
            )}
        </div>
    )
}

export default TeamEdit