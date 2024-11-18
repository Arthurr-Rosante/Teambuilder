const validateTeam = (teamMembers) => {
  const errors = [];
  for (let [idx, member] of teamMembers.entries()) {
    if (!member.ability) {
      errors.push(`O ${idx + 1}° Membro não possuí nenhuma Habilidade.`);
    }
    if (member.moves.length === 0) {
      errors.push(`O ${idx + 1}° Membro não possuí nenhum Move.`);
    }
    const uniqueMoves = new Set(member.moves);
    if (uniqueMoves.size !== member.moves.length) {
      errors.push(`O ${idx + 1}° Membro possuí Moves duplicados.`);
    }
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return false;
  }

  return true;
};

export default validateTeam;
