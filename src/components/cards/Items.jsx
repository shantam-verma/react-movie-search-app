import React from "react";
import { IMG_URL } from "../useMovieDate";
import defaultPoster from "../cards/default_poster.png";
import { NavLink } from "react-router-dom";

export default function Items({ movieData }) {
  return (
    <div className="row justify-content-around my-5 py-2">
      {movieData.map((movie) => {
        return (
          <div
            className="card text-justify text-bg-dark my-4 mx-4"
            style={{ width: "20rem" }}
            key={movie.id}
          >
            <NavLink
              to={`/search/movie/${movie.original_title}/${movie.id}`}
              className="nav-link active"
            >
              {movie.poster_path ? (
                <img
                  src={`${IMG_URL}${movie.poster_path}`}
                  className="img-thumbnail card container-img-top"
                  alt={`${movie.original_title} poster`}
                />
              ) : (
                <img
                  src={defaultPoster}
                  className="img-thumbnail card container-img-top"
                  alt={`${movie.original_title} poster`}
                />
              )}
              <h3 className="card container-title text-bg-dark">
                {movie.original_title}
              </h3>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-warning">
                {movie.vote_average.toFixed(1)}
                <i className="fa-solid fa-star"></i>
              </span>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
}
