import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import useSWR from "swr";
import {fetcher, tmdbAPI } from "../../config";

const MovieList = ({type}) => {
  const { data,error} = useSWR(
    tmdbAPI.getMovieList(type),
    fetcher
  );
  const isLoading = !data && !error;
  const movies = data?.results || [];
  return (
    <div className="movies-list">
      <Swiper slidesPerView={4} grabCursor={"true"} spaceBetween={27}>
        {movies.length > 0 &&
          movies.map((movie,index) => (
            <SwiperSlide key={index}>{
              isLoading? (<MovieCardSkeleton></MovieCardSkeleton>):(<MovieCard item={movie}></MovieCard>)
            }
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
