import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import PokeCard from "./PokeCard.jsx";
import axios from "axios";
import PropTypes from "prop-types";

function InfiniteScroll({ btn }) {
  const [nameOrId, setNameOrId] = useState("");
  const [content, setContent] = useState(null);

  const limit = 20;
  const fetchPages = async ({ pageParam }) => {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${pageParam}`
    );
    return res.data.results;
  };

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: fetchPages,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length * limit : undefined;
      return nextPage;
    },
  });

  const { ref, inView } = useInView();
  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  useEffect(() => {
    if (data) {
      setContent(
        data.pages.map((page) =>
          page.map((entry, idx) => {
            if (!btn && page.length === idx + 1) {
              return <PokeCard innerRef={ref} key={idx} entry={entry} />;
            } else {
              return <PokeCard key={idx} entry={entry} />;
            }
          })
        )
      );
    }
  }, [data, btn, ref]);

  const handleSearch = () => {
    if (!nameOrId) {
      // Se o campo de pesquisa estiver vazio, exibe todos os Pokémon
      setContent(
        data?.pages.map((page) =>
          page.map((entry, idx) => {
            return <PokeCard key={idx} entry={entry} />;
          })
        ) || null
      );
    } else {
      const entry = {
        name: nameOrId,
        url: `https://pokeapi.co/api/v2/pokemon/${nameOrId}`,
      };
      setContent(<PokeCard entry={entry} />);
    }
    refetch();
  };

  const handleReset = () => {
    setNameOrId("");
    // Reseta o conteúdo para todos os Pokémon ao redefinir
    setContent(
      data?.pages.map((page) =>
        page.map((entry, idx) => {
          return <PokeCard key={idx} entry={entry} />;
        })
      ) || null
    );
  };

  if (status === "pending") return <p id="loading"></p>;
  if (status === "error") return <p id="error">Error: {error.message}</p>;

  return (
    <div id="pokedex">
      <div className="search-container">
        <p>
          Busque por <b>Nome</b> ou <b>Id</b>
        </p>
        <input
          type="text"
          id="inSearch"
          value={nameOrId}
          onChange={(e) => setNameOrId(e.target.value)}
        />
        <button onClick={handleSearch}>
          <i className="bx bx-search-alt"></i>
        </button>
        <button type="reset" onClick={handleReset}>
          Redefinir
        </button>
      </div>
      <div id="results">
        {content}
        {btn && (
          <button
            onClick={fetchNextPage}
            disabled={isFetchingNextPage && hasNextPage ? true : false}
          >
            Carregar mais
          </button>
        )}
        {isFetchingNextPage && <div id="loading"></div>}
      </div>
    </div>
  );
}

InfiniteScroll.propTypes = {
  btn: PropTypes.bool,
};

export default InfiniteScroll;
