import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import fetchData from '../utils/fetchData.js'

function EntryPage() {
    const { name } = useParams();
    const [entry, setEntry] = useState(null);

    if (!name) return <div id="loading"></div>;

    useEffect(() => {
        const fetchEntry = async (entry) => {
            try {
                const res = await fetchData(
                    `https://pokeapi.co/api/v2/pokemon/${entry}`
                );

                if (res.status === 404) {
                    throw new Error('Erro ao buscar o pokémon');
                }

                setEntry(res);
            } catch (error) {
                console.log(error);
            }
        }

        fetchEntry(name);

        document.title = `TeamBuilder | ${name?.charAt(0).toUpperCase()}${name?.slice(
            1
        )}`;

        return () => {
            document.title = 'TeamBuilder';
        }

    }, [name]);

    const [shiny, setShiny] = useState(false);
    const handleShinyToggle = () => {
        setShiny(!shiny);
    };

    return (
        <div className='entry'>
            <section className="entry-profile">
                <img
                    src={
                        !shiny
                            ? entry?.sprites.other.home.front_default
                            : entry?.sprites.other.home.front_shiny
                    }
                    alt={`${entry?.name}-image`}
                    className="pokemon-image"
                />
                <button onClick={handleShinyToggle}>
                    <i className="bx bxs-star"></i>
                </button>
            </section>

            <section className="entry-description">
                <p>
                    {/* {species?.flavor_text_entries.find(
                        (entry) => entry.language.name === "en"
                    )?.flavor_text || "No description available..."} */}
                </p>
            </section>

            <section className="entry-details">
                <div className="info-block">
                    <h3>Height</h3>
                    <p>{Number(entry?.height) / 10 + " m"}</p>
                </div>
                <div className="info-block">
                    <h3>Weight</h3>
                    <p>{Number(entry?.weight) / 10 + " Kg"}</p>
                </div>
                <div className="info-block">
                    <h3>Abilities</h3>
                    {entry?.abilities.map((ability) => (
                        <p key={ability.ability.name}>{ability.ability.name}</p>
                    ))}
                </div>
                <div className="info-block">
                    <h3>Generation</h3>
                    {/* <p>{species?.generation.name}</p> */}
                </div>
            </section>

            <section className="entry-types">
                <h3>Type</h3>
                <ul className="entry-types-list">
                    {entry?.types.map((type) => (
                        <li
                            className={`type-badge type-badge-${type.type.name}`}
                            key={type.slot}
                        >
                            {type.type.name}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="stats-section">
                <h3>Stats</h3>
                <ul className="entry-stats-list">
                    {entry?.stats.map((stat) => (
                        <li key={stat.stat.name}>
                            <p>{stat.stat.name}:</p>
                            <div>
                                {stat.base_stat}
                                <div
                                    className="stat-bar"
                                    style={{
                                        width: `${(stat.base_stat / 255) * 100}%`,
                                    }}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default EntryPage