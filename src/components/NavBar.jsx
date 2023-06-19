import { useState } from "react";

export default function Navbar({ onInput }) {
  const [inp, setInp] = useState("");

  const handleClick = (event) => {
    if (event.key === "Enter") {
      setInp(event.target.value);
      // console.log(event.target.value);
      onInput(event.target.value);
      event.preventDefault();
      setInp("");
    }
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand  mx-5" href="/">
            ShowTime
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/movies"
                >
                  Movies
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/Series"
                >
                  Series
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/trending"
                >
                  Trending
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/upcoming"
                >
                  Upcoming
                </a>
              </li>
            </ul>
            <form className="d-flex col-7" role="search">
              <input
                value={inp}
                onChange={(e) => setInp(e.target.value)}
                className="form-control me-5"
                type="search"
                placeholder="Search movie"
                aria-label="Search"
                onKeyDown={handleClick}
              />
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
