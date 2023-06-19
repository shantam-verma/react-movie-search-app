import React, { useState, useEffect } from "react";
import axios from "axios";
import Items from "./Items";

import { DOMAIN_URL, API_KEY } from "../useMovieDate";
import { useGlobalContext } from "../useMovieDate";
import Spinner from "../Spinner";

export default function Cards(props) {
  const { loading, setLoading } = useGlobalContext();
  const [movieData, setMovieData] = useState([]);
  const [, setIsError] = useState({ show: "false", msg: "" });
  let { category } = props;

  useEffect(() => {
    async function fetchMovieData() {
      setLoading(true);
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
          `${DOMAIN_URL}${category}${API_KEY}&include_adult=false&language=en-US&page=1`
        );
        if (response.data.results) {
          setLoading(false);
          setMovieData(response.data.results);
        } else {
          setIsError({ show: true, msg: response.error });
        }
      } catch (error) {
        console.error("Error in Fetching", error);
      }
    }

    fetchMovieData();
  }, []);

  return <>{loading ? <Spinner /> : <Items movieData={movieData} />}</>;
}
