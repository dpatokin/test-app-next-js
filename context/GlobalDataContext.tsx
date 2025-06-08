"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { Genre, Language } from "@/types";

export interface GlobalDataContextType {
  movieGenres: Genre[];
  tvGenres: Genre[];
  languages: Language[];
}

const GlobalDataContext = createContext<GlobalDataContextType | undefined>(
  undefined,
);

export const GlobalDataProvider = ({ children }: { children: ReactNode }) => {
  const [movieGenres, setMovieGenres] = useState<Genre[]>([]);
  const [tvGenres, setTVGenres] = useState<Genre[]>([]);
  const [languages, setLanguage] = useState<Language[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedMovieGenres = localStorage.getItem("movieGenres");
      const storedTVGenres = localStorage.getItem("tvGenres");
      const storedLanguages = localStorage.getItem("languages");

      if (storedMovieGenres && storedTVGenres && storedLanguages) {
        setMovieGenres(JSON.parse(storedMovieGenres || "[]"));
        setTVGenres(JSON.parse(storedTVGenres || "[]"));
        setLanguage(JSON.parse(storedLanguages || "[]"));

        return;
      }

      try {
        const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

        const [movieGenresResponse, tvGenresResponse, languagesResponse] =
          await Promise.all([
            fetch(
              `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
            ),
            fetch(
              `${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=en-US`,
            ),
            fetch(`${BASE_URL}/configuration/languages?api_key=${API_KEY}`),
          ]);

        const tvGenresResult = await movieGenresResponse.json();
        const movieGenresResult = await tvGenresResponse.json();
        const languagesResult = await languagesResponse.json();

        setMovieGenres(tvGenresResult.genres);
        setTVGenres(movieGenresResult.genres);
        setLanguage(languagesResult);

        localStorage.setItem("tvGenres", JSON.stringify(tvGenresResult.genres));
        localStorage.setItem(
          "movieGenres",
          JSON.stringify(movieGenresResult.genres),
        );
        localStorage.setItem("languages", JSON.stringify(languagesResult));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <GlobalDataContext.Provider value={{ movieGenres, tvGenres, languages }}>
      {children}
    </GlobalDataContext.Provider>
  );
};

export default GlobalDataContext;
