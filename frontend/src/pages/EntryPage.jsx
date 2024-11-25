import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import fetchData from '../utils/fetchData.js'
import '../styles/entry.css';

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
        <div id='entry'>
            <h1 className='entry-title'>{entry?.name}</h1>

            <div className='entry-info'>
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
                        ✨
                    </button>
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
                            <li key={stat.stat.name} className='entry-stat'>
                                <p>{stat.stat.name}: {stat.base_stat}</p>
                                    <div
                                        id="stat-bar"
                                        style={{
                                            width: `${(stat.base_stat / 100) * 255}%`,
                                        }}
                                    />
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default EntryPage