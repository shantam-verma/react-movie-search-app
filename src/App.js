import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/NavBar";
import Cards from "./components/cards/Cards";
import Carousel from "./components/Carousel";
import SearchedMovie from "./components/SearchedMovie";
import SingleCard from "./components/cards/SingleCard";

function App() {
  const [searchedMovie, setSearchedMovie] = useState(null);
  const [isSearched, setIsSearched] = useState(false);

  const handleInput = (name) => {
    const moviName = encodeURIComponent(name);
    setSearchedMovie(moviName);
    setIsSearched(true);
  };

  return (
    <Router>
      <div className="App">
        <Navbar onInput={handleInput} />
        <Routes>
          {!isSearched ? (
            <>
              <Route
                exact
                key={"homePage"}
                path="/"
                element={
                  <>
                    <Carousel />
                    <Cards category="top_rated" />
                  </>
                }
              />
              <Route
                exact
                key={"movies"}
                path="/movies"
                element={<Cards category="movies" />}
              />
              <Route
                exact
                key={"series"}
                path="/series"
                element={<Cards category="series" />}
              />
              <Route
                exact
                key={"upcoming"}
                path="/upcoming"
                element={<Cards category="upcoming" />}
              />
              <Route
                exact
                key={"trending"}
                path="/trending"
                element={<Cards category="trending" />}
              />
              <Route
                exact
                key={"singleMovie"}
                path="/search/movie/:title/:id"
                element={<SingleCard />}
              />
            </>
          ) : (
            <>
              <Route
                exact
                key={"search/movie"}
                path="/"
                element={<SearchedMovie searchedMovie={searchedMovie} />}
              />
              <Route
                exact
                key={"singleMovie"}
                path="/search/movie/:title/:id"
                element={<SingleCard />}
              />
            </>
          )}
          <Route
            exact
            key={"singleMovie"}
            path="/search/movie/:title/:id"
            element={<SingleCard />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
