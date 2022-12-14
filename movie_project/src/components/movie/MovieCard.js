import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "../../config";
import Button from "../button/Button";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieCard = ({ item }) => {
  const navigate = useNavigate();
  const { poster_path, title, release_date, vote_average, id } = item;
  return (
    <div className="p-3 text-white rounded-lg movie-card bg-slate-800">
      <img
        src={tmdbAPI.img500(poster_path)}
        alt=""
        className="w-full h-[250px] object-cover object-top rounded-lg mb-5"
      ></img>
      <h3 className="h-16 mb-2 text-xl font-bold">{title}</h3>
      <div className="flex items-center justify-between mb-5 text-sm opacity-50">
        <span>{new Date(release_date).getFullYear()}</span>
        <span>{vote_average}</span>
      </div>
      <Button onClick={() => navigate(`/movie/${id}`)} bgColor="secondary">
        Watch now
      </Button>
    </div>
  );
};
export const MovieCardSkeleton = () => {
  return (
    <div className="p-3 text-white rounded-lg movie-card bg-slate-800">
      <div className="mb-5">
        <SkeletonTheme
          height={200}
          baseColor="#ebebeb"
          highlightColor="#DDDDDD"
        >
          <Skeleton count={1} />
        </SkeletonTheme>
      </div>

      <div className="mb-2">
        <Skeleton count={2} />
      </div>
      <SkeletonTheme
        baseColor="#ebebeb"
        highlightColor="#F93C6E"
      ></SkeletonTheme>
      <div className="flex items-center justify-between mb-5 text-sm opacity-50">
        <Skeleton width={60} count={1} />
        <Skeleton width={50} count={1} />
      </div>
      <Skeleton height={50} count={1}></Skeleton>
    </div>
  );
};
MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
};
function FallbackComponent() {
  <p className="text-red-400 bg-red-50">
    Something went wrong with this component
  </p>;
}
export default withErrorBoundary(MovieCard, FallbackComponent);
