import React, { useState, useEffect } from "react";
import axios from "axios";
import Items from "./cards/Items";

import { DOMAIN_URL, API_KEY } from "../components/useMovieDate";
import { useGlobalContext } from "../components/useMovieDate";
import Spinner from "./Spinner";

export default function SearchedMovie(props) {
  const { loading, setLoading } = useGlobalContext();
  let { searchedMovie } = props;
  console.log(searchedMovie);
  const [movieData, setMovieData] = useState([]);
  const [isError, setIsError] = useState({ show: "false", msg: "" });

  useEffect(() => {
    async function fetchMovieData() {
      setLoading(true);
      try {
        const response = await axios.get(
          `${DOMAIN_URL}search/movie${API_KEY}&query=${searchedMovie}&include_adult=false&language=en-US&page=1`
        );
        if (response.data.results) {
          setLoading(false);
          setMovieData(response.data.results);
        } else {
          setIsError({
            show: true,
            msg: response.error,
          });
        }
      } catch (error) {
        console.error("Error in Fetching", error);
        setIsError(error.message);
      }
    }

    fetchMovieData();
  }, [searchedMovie]);

  return <>{loading ? <Spinner /> : <Items movieData={movieData} />}</>;
}
