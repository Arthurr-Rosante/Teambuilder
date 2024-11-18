const handleApiError = (error) => {
  if (error.response && error.response.status === 404) {
    alert("Pokémon não encontrado...");
  } else {
    console.error("Erro ao buscar Pokémon:", error);
  }
};

export default handleApiError;
