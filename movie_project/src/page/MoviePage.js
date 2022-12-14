import React, { useEffect, useState } from "react";
import useSWR from "swr";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { v4 } from "uuid";
const itemsPerPage = 20;
const MoviePage = () => {
  const [page, setPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", page));
  const debonceValue = useDebounce(filter, 500);
  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  const { data, error } = useSWR(url, fetcher);
  const isLoading = !data && !error;
  useEffect(() => {
    if (debonceValue) {
      setUrl(tmdbAPI.getMovieSearch(debonceValue, page));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", page));
    }
  }, [debonceValue, page]);
  const movies = data?.results || [];
  const totalResults = data?.total_results || 0;
  const pageCount = Math.ceil(totalResults / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % totalResults;
    setItemOffset(newOffset);
    setPage(event.selected + 1);
  };
  console.log(movies);
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

      {/* <div className="w-10 h-10 mx-auto border-4 rounded-full border-t-transparent border-outrinh animate-spin"></div> */}
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
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default MoviePage;
