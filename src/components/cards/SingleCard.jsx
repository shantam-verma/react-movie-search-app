import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner";

import { NavLink, useParams } from "react-router-dom";
import { useGlobalContext } from "../useMovieDate";
import { IMG_URL } from "../useMovieDate";
import { DOMAIN_URL, API_KEY } from "../useMovieDate";
import ErrorBoundary from "../../errorBoundaries/ErrorBoundary";

export default function SingleCard() {
  const { loading, setLoading } = useGlobalContext();
  const { id } = useParams();
  const [movieData, setMovieData] = useState({});
  const [hasError, setHasError] = useState({ show: false, msg: "" });
  const getMovie = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      if (response.data) {
        setMovieData(response.data);
        setLoading(false);
      } else {
        setHasError({ show: true, msg: "No Movie Found" });
      }
    } catch (error) {
      console.error("Error in Fetching", error);
    }
  };
  useEffect(() => {
    getMovie(
      `${DOMAIN_URL}/movie/${id}${API_KEY}&include_adult=false&language=en-US&page=1`
    );
  }, []);
  const revenueFormatted = Intl.NumberFormat("en-US");
  return (
    <>
      <ErrorBoundary>
        {loading ? (
          <Spinner />
        ) : hasError.show === true ? (
          <h1 className="my-5 py-5" style={{ color: "white" }}>
            Error:{hasError.msg}
          </h1>
        ) : (
          <div className="my-card px-5 py-5 g-2">
            <div className="card text-bg-dark my-5">
              <div className="img-gradient">
                {movieData?.backdrop_path && (
                  <img
                    src={`${IMG_URL}${movieData.backdrop_path}`}
                    className="card-img fitimage single_poster"
                    alt="..."
                  />
                )}
              </div>
              {movieData?.backdrop_path && (
                <div className="card-img-overlay">
                  <h4 className="card-title">{movieData?.original_title}</h4>
                  <div className="card-text">
                    <p>{movieData?.tagline}</p>
                    <p>
                      Genre :{" "}
                      {movieData?.genres &&
                        movieData.genres.map((genre) => (
                          <span key={genre?.id}>{genre?.name} </span>
                        ))}
                    </p>
                    <p>
                      Released Date : {movieData?.release_date} (
                      {movieData?.production_countries[0]?.iso_3166_1})
                    </p>

                    <p>{movieData?.overview}</p>
                    <p>Average Voted : {movieData?.vote_average?.toFixed(1)}</p>
                    <p>
                      Revenue Earned : $
                      {revenueFormatted.format(movieData?.revenue)}
                    </p>
                    <p>
                      <small>Status : {movieData?.status}</small>
                    </p>

                    <NavLink to="/">
                      <button className="back-btn"> Go Back</button>
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </ErrorBoundary>
    </>
  );
}
