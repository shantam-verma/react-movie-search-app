import React from "react";
import ReactDOM from "react-dom/client";
import "./media/Index.css";
import App from "./App";
import { AppProvider } from "./components/useMovieDate";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>
);
