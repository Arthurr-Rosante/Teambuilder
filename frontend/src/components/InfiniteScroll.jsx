import { useEffect, useState } from 'react'
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import PokeCard from './PokeCard.jsx';

function InfiniteScroll() {
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
                        if (page.length === idx + 1) {
                            return <PokeCard innerRef={ref} key={idx} entry={entry} />;
                        } else {
                            return <PokeCard key={idx} entry={entry} />;
                        }
                    })
                )
            );
        }
    }, [data]);

    if (status === "pending") return <p id="loading"></p>;
    if (status === "error") return <p id="error">Error: {error.message}</p>;

    return (
        <>
            {content}
            {isFetchingNextPage && <div id="loading"></div>}
        </>
    )
}

export default InfiniteScroll