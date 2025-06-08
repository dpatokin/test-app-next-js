import { useState } from "react";
import {
  FetchMediaFilters,
  FetchMediaParams,
  MediaSortType,
  MediaType,
  MovieMediaItem,
  TVMediaItem,
} from "../types";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export default function useFetchMedia(): {
  fetchMedia: (params: FetchMediaParams) => Promise<void>;
  mediaData: (MovieMediaItem | TVMediaItem)[] | undefined;
} {
  const [data, setData] = useState<
    (MovieMediaItem | TVMediaItem)[] | undefined
  >(undefined);
  const [totalPages, setTotalPages] = useState<number>(0);

  async function fetchTotalPages(url: string): Promise<number> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        return 0;
      }
      const result = await response.json();

      setTotalPages(result.total_pages);

      return result.total_pages;
    } catch (error) {
      console.error("Error fetching total pages:", error);
      return 0;
    }
  }

  const fetchMedia = async ({
    mediaType,
    mediaSortType,
    filters,
  }: FetchMediaParams): Promise<void> => {
    let url = getURL(mediaType, mediaSortType, filters);
    let total = totalPages || (await fetchTotalPages(url));
    total = total > 500 ? 500 : total; // There is an API bug if you try to set page number more than 500

    if (total > 0) {
      const pageNumber = total > 1 ? Math.floor(Math.random() * total) + 1 : 1;

      url += `&page=${pageNumber}`;
    }

    try {
      const response: Response = await fetch(url);

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        return;
      }

      const result = await response.json();
      const resultsWithType = result.results
        ? result.results.map((mediaItem: MovieMediaItem | TVMediaItem) => ({
            ...mediaItem,
            media_type: mediaType,
          }))
        : [];

      setData(resultsWithType);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return { fetchMedia, mediaData: data };
}

function getURL(
  mediaType: MediaType,
  mediaSortType: MediaSortType,
  filters?: FetchMediaFilters,
): string {
  let url: string = "";

  switch (mediaSortType) {
    case "random": {
      url = `${BASE_URL}/${mediaType}/popular?api_key=${API_KEY}`;
      break;
    }
    case "name":
      url = `${BASE_URL}/search/${mediaType}?api_key=${API_KEY}&query=${filters?.mediaName}`;
      break;
    case "year":
      url = `${BASE_URL}/discover/${mediaType}?api_key=${API_KEY}&primary_release_year=${filters?.year}`;
      break;
    case "genre":
      url = `${BASE_URL}/discover/${mediaType}?api_key=${API_KEY}&with_genres=${filters?.genre}`;
      break;
    case "language":
      url = `${BASE_URL}/discover/${mediaType}?api_key=${API_KEY}&with_original_language=${filters?.language}`;
      break;
  }

  return url;
}
