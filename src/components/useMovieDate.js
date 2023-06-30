import React, { createContext, useContext, useState } from "react";

export const IMG_URL = "https://image.tmdb.org/t/p/original";
export const API_KEY = `?api_key=${process.env.REACT_APP_TMDB_KEY}`;
export const DOMAIN_URL = "https://api.themoviedb.org/3/";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
