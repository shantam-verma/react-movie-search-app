import React, { useState, useEffect } from "react";
import axios from "axios";
import Items from "./Items";
import { DOMAIN_URL, API_KEY } from "../useMovieDate";

export default function Cards(props) {
  const [movieData, setMovieData] = useState([]);
  const [, setApiError] = useState(null);
  let { category } = props;

  useEffect(() => {
    async function fetchMovieData() {
      try {
        if (category === "trending") {
          category = "trending/movie/week";
        } else if (category === "upcoming") {
          category = "movie/upcoming";
        } else if (category === "top_rated") {
          category = "movie/top_rated";
        } else if (category === "movies") {
          category = "discover/movie";
        } else if (category === "series") {
          category = "tv/popular";
        }
        const response = await axios.get(
          `${DOMAIN_URL}movie/top_rated${API_KEY}&include_adult=false&language=en-US&page=1`
        );
        setMovieData(response.data.results);
      } catch (error) {
        console.error("Error in Fetching", error);
        setApiError(error.message);
      }
    }

    fetchMovieData();
  }, []);

  return <Items movieData={movieData} />;
}
