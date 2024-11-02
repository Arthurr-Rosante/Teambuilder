const getUserPfp = (name) => {
  name = name.trim();
  if (!name) return "eevee-pfp.jpg";

  const checksum = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);

  switch (checksum % 4) {
    case 0:
      return "bulbasaur-pfp.jpg";
    case 1:
      return "charmander-pfp.jpg";
    case 2:
      return "squirtle-pfp.jpg";
    case 3:
      return "pikachu-pfp.jpg";
    default:
      return "eevee-pfp.jpg";
  }
};

export default getUserPfp;
