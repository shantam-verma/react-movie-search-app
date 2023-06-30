import { useState } from "react";
import "./media/App.css";

import Navbar from "./components/NavBar";
import Router from "./router/Router";

let history = null;

function App() {
  const [searchedMovie, setSearchedMovie] = useState(null);

  const handleInput = (name) => {
    const moviName = encodeURIComponent(name);
    setSearchedMovie(moviName);
    history("/search");
  };

  const handleGetHistory = (navigate) => {
    history = navigate;
  };

  return (
    <div className="App">
      <Navbar onInput={handleInput} getHistory={handleGetHistory} />
      <Router searchedMovie={searchedMovie} />
    </div>
  );
}

export default App;
