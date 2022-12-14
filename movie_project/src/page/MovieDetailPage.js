import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config";

const MovieDetailPage = () => {
  const [show, setShow] = useState(false);
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
  if (!data) return null;
  const {
    overview,
    title,
    backdrop_path,
    poster_path,
    tagline,
    runtime,
    release_date,
    genres,
  } = data;

  return (
    <>
      <div className="relative w-full h-screen -translate-y-[145px] z-0 ">
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div
          className="object-cover w-full h-full bg-no-repeat bg-cover "
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
          }}
        ></div>

        <div className="absolute w-full  max-w-[400px] mx-auto rounded-xl top-[70px] left-[80px]">
          <img
            src={`https://image.tmdb.org/t/p/original/${poster_path}`}
            alt=""
            className="object-cover object-top w-full h-full rounded-xl"
          />
        </div>

        <div className="absolute z-10 flex flex-col text-white top-48 left-1/3 max-w-[800px]">
          <h1 className="py-5 font-extrabold capitalize text-7xl">{title}</h1>
          <h2 className="pb-3 text-xl font-semibold text-outrinh">{tagline}</h2>
          <span>Time : {runtime} min</span>
          <span>Release: {release_date}</span>
          <div className="flex py-5 gap-x-4">
            <button
              onClick={() => setShow(true)}
              className="p-2 font-bold border-2 rounded-md border-sky-500"
            >
              Trailer
            </button>
            {genres.length > 0 &&
              genres.map((item) => (
                <button
                  key={item.id}
                  className="p-2 font-bold border-2 rounded-md border-outrinh"
                >
                  {item.name}
                </button>
              ))}
          </div>
          <p className="font-light">{overview}</p>
        </div>

        <div className="w-full absolute bottom-4 Cast_Movie px-[80px]">
          <h1 className="py-5 text-2xl font-extrabold text-white capitalize ml">
            Cast of {title}{" "}
          </h1>
          <CastMovie></CastMovie>
        </div>
        <GetTrailer show={show} setShow={() => setShow(false)}></GetTrailer>

        <div className="py-5 Similar-movie px-[80px]">
          <h1 className="py-5 text-2xl font-extrabold text-white capitalize ml">
            Similar Movie of {title}{" "}
          </h1>
          <SimilarMovie></SimilarMovie>
        </div>
      </div>
    </>
  );
};

function MovieMeta (type='videos') {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher);
  return data;

}
function CastMovie() {
  const castData = MovieMeta('credits')?.cast || [];
  return (
    <>
      <div className="flex justify-between text-white">
        {castData.length > 0 &&
          castData.slice(0, 9).map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center Cast_info gap-y-2"
            >
              <img
                className="object-cover object-top rounded-full w-[100px] h-[100px]"
                src={tmdbAPI.img500(item.profile_path)}
                alt=""
              />
              <p className="text-sm">
                {item.character.length > 15
                  ? item.character.slice(0, 13) + "..."
                  : item.character}
              </p>
              <p className="text-sm">
                {item.original_name.length > 15
                  ? item.original_name.slice(0, 13) + "..."
                  : item.original_name}
              </p>
            </div>
          ))}
      </div>
    </>
  );
}
function GetTrailer({ show, setShow }) {

  const keyTrailer = MovieMeta('videos')?.results[0]?.key || [];
  return (
    <>
      <div
        className={`${
          show ? "" : "opacity-0 hidden visible"
        }absolute cursor-pointer inset-0 z-40 flex items-center justify-center w-full h-full frame-traier`}
      >
        <div
          onClick={setShow}
          className="inset-0 w-full h-full bg-black overlay bg-opacity-70"
        ></div>
        {show && (
          <iframe
            width="949"
            height="534"
            src={`https://www.youtube.com/embed/${keyTrailer}`}
            title="Fall (2022 Movie) - Special Feature 'Technical Challenges' - Grace Caroline Currey, Virginia Gardner"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute"
          ></iframe>
        )}
      </div>
    </>
  );
}
function SimilarMovie() {
  const movies = MovieMeta('similar')?.results || [];
  return (
    <div className="movies-list">
      <Swiper slidesPerView={4} grabCursor={"true"} spaceBetween={27}>
        {movies.length > 0 &&
          movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard item={movie}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
export default MovieDetailPage;
