import PropTypes from 'prop-types';
import { MemberShape } from '../types';

function TeamMemberCard({ member, idx, items, onRemove, onFieldChange, onShinyToggle }) {
    return (
        <li key={idx}>
            <div className="member-card">
                <h3>{idx + 1}° Membro - {member.name}</h3>
                <div>
                    <span onClick={() => onShinyToggle(idx)}>✨</span>
                    <img src={member.sprites[member.is_shiny ? 1 : 0]} alt={member.name} />
                </div>
                <div>
                    <label>Item:</label>
                    <select onChange={(e) => onFieldChange(idx, "item", e.target.value)}>
                        <option value="" disabled>Item</option>
                        {Object.values(items).flat().map((item, i) => (
                            <option key={i} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Habilidade:</label>
                    <select onChange={(e) => onFieldChange(idx, "ability", e.target.value)}>
                        <option value="" >Habilidade(s)</option>
                        {member.abilityList.map((ability, i) => (
                            <option key={i} value={ability}>{ability}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Moveset:</label>
                    {[...Array(4)].map((_, i) => (
                        <select
                            key={i}
                            onChange={(e) => {
                                const newMoves = [...member.moves];
                                newMoves[i] = e.target.value;
                                onFieldChange(idx, "moves", newMoves);
                            }}
                            value={member.moves[i] || ""}
                        >
                            <option value="" disabled>{i + 1}° Move</option>
                            {member.moveList.map((move, j) => (
                                <option key={j} value={move}>{move}</option>
                            ))}
                        </select>
                    ))}
                </div>
            </div>
            <button onClick={() => onRemove(idx)}>Remover Membro</button>
        </li>
    );
}

// TeamMemberCard.propTypes = {
//     members: MemberShape.isRequired,
//     idx: PropTypes.number.isRequired,
//     items: PropTypes.shape(PropTypes.arrayOf(PropTypes.string.isRequired)),
//     onRemove: PropTypes.func.isRequired,
//     onFieldChange: PropTypes.func.isRequired,
//     onShinyToggle: PropTypes.func.isRequired
// }

export default TeamMemberCard