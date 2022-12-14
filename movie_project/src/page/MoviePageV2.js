import React, { useEffect, useState } from "react";
import useSWR from "swr";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config";
import useDebounce from "../hooks/useDebounce";
import { v4 } from "uuid";
import Button from "../components/button/Button";
import useSWRInfinite from "swr/infinite";
const itemsPerPage = 20;
const MoviePageV2 = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", page));
  const debonceValue = useDebounce(filter, 500);
  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    if (debonceValue) {
      setUrl(tmdbAPI.getMovieSearch(debonceValue, page));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", page));
    }
  }, [debonceValue, page]);
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  );
  const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
  const isEmpty = data?.[0]?.results.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage);
  const isLoading = !data && !error;
  return (
    <div className="py-10 mx-auto text-center page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            onChange={handleChangeFilter}
            type="text"
            className="w-full p-4 text-white outline-none bg-slate-800"
            placeholder="Type here to search"
          />
        </div>
        <button className="p-4 text-white bg-outrinh">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-4 gap-5">
          {new Array(itemsPerPage).fill(0).map(() => (
            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5">
          {movies.map((item, index) => (
            <MovieCard key={index} item={item}></MovieCard>
          ))}
        </div>
      )}
      <div className="mt-10 text-white pagination">
        <Button
          onClick={() => setSize(size + 1)}
          disabled={isReachingEnd}
          width="30px"
        >
          Load more
        </Button>
      </div>
    </div>
  );
};

export default MoviePageV2;
