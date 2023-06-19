import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

import { IMG_URL, DOMAIN_URL, API_KEY } from "./useMovieDate";
import { useGlobalContext } from "./useMovieDate";

export default function Carousel() {
  const { loading, setLoading } = useGlobalContext();
  const [movieData, setMovieData] = useState([]);
  const [, setIsError] = useState({ show: "false", msg: "" });

  const getMovie = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      if (response.data.results) {
        setLoading(false);
        setMovieData(response.data.results);
      } else {
        setIsError({ show: true, msg: response.error });
      }
    } catch (error) {
      console.error("Error in Fetching", error);
      setIsError(error.message);
    }
  };

  useEffect(() => {
    getMovie(`${DOMAIN_URL}movie/popular${API_KEY}`);
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div
            id="carouselExampleSlidesOnly"
            className="carousel slide my-5"
            data-bs-ride="carousel"
            data-bs-wrap="true"
          >
            <div className="carousel-inner">
              {movieData.map((movie, index) => (
                <div
                  className={`carousel-item${index === 0 ? " active" : ""}`}
                  data-bs-interval="2000"
                  key={movie.id}
                >
                  <div className="img-gradient">
                    <img
                      src={`${IMG_URL}${movie.backdrop_path}`}
                      className="d-block w-100 fitimage"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-caption d-none d-md-block">
                    <h1>{movie.original_title}</h1>
                    <p>{movie.release_date}</p>
                    <p>
                      {movie.vote_average} <i className="fa-solid fa-star"></i>
                    </p>

                    <p>{movie.overview}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleSlidesOnly"
              data-bs-slide="prev"
            >
              <span aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleSlidesOnly"
              data-bs-slide="next"
            >
              <span aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </>
      )}
    </>
  );
}
