import React, { useState, useEffect } from "react";
import axios from "axios";
import Items from "./cards/Items";
import Spinner from "./Spinner";

import { DOMAIN_URL, API_KEY } from "../components/useMovieDate";
import { useGlobalContext } from "../components/useMovieDate";

export default function SearchedMovie(props) {
  const { loading, setLoading } = useGlobalContext();
  let { searchedMovie } = props;
  console.log(searchedMovie);
  const [movieData, setMovieData] = useState([]);
  const [isError, setIsError] = useState({ show: "false", msg: "" });

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
    }
  };

  useEffect(() => {
    getMovie(
      `${DOMAIN_URL}search/movie${API_KEY}&query=${searchedMovie}&include_adult=false&language=en-US&page=1`
    );
  }, [searchedMovie]);

  return <>{loading ? <Spinner /> : <Items movieData={movieData} />}</>;
}
