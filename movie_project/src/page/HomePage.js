import React, { Fragment } from "react";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  return (
    <Fragment>
      <div className="pb-10 movies-layout page-container">
        <h2 className="mb-10 text-3xl font-bold text-white captialize">
          Now Playing
        </h2>
        <MovieList type="now_playing"></MovieList>
      </div>

      <div className="pb-10 movies-layout page-container">
        <h2 className="mb-10 text-3xl font-bold text-white captialize">
          Top rated movies
        </h2>
        <MovieList type="top_rated"></MovieList>
      </div>

      <div className="pb-10 movies-layout page-container">
        <h2 className="mb-10 text-3xl font-bold text-white captialize">
          Trending
        </h2>
        <MovieList type="upcoming"></MovieList>
      </div>
    </Fragment>
  );
};

export default HomePage;
