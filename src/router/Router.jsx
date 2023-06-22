import React from "react";
import { useRoutes } from "react-router-dom";
import Cards from "../components/cards/Cards";
import Carousel from "../components/Carousel";
import SearchedMovie from "../components/SearchedMovie";
import SingleCard from "../components/cards/SingleCard";

export default function Router({ searchedMovie }) {
  const rout = ["/movies", "/series", "/upcoming", "/trending"].map(
    (path, index) => ({
      path: path,
      key: index,
      element: <Cards category={path.substring(1)} />,
    })
  );
  let elements = useRoutes([
    {
      path: "/",
      key: "homePage",
      element: (
        <>
          <Carousel />
          <Cards category="top_rated" />
        </>
      ),
    },
    ...rout,
    {
      path: "/search",
      key: "search/movie",
      element: <SearchedMovie searchedMovie={searchedMovie} />,
    },
    {
      path: "/search/movie/:title/:id",
      key: "singleMovie",
      element: <SingleCard />,
    },
  ]);
  return elements;
}
