export interface BaseMediaItem {
  id: number;
  poster_path: string;
  overview: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  media_type: MediaType;
}

export interface MovieMediaItem extends BaseMediaItem {
  title: string;
  release_date: string;
  original_title: string;
  video: boolean;
}

export interface TVMediaItem extends BaseMediaItem {
  name: string;
  first_air_date: string;
  original_name: string;
}

export type MediaType = "movie" | "tv";

export type MediaSortType = "random" | "name" | "year" | "genre" | "language";

export interface FetchMediaFilters {
  mediaName?: string;
  year?: string;
  genre?: string;
  language?: string;
}

export interface FetchMediaParams {
  mediaType: MediaType;
  mediaSortType: MediaSortType;
  filters?: FetchMediaFilters;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Language {
  english_name: string;
  iso_639_1: string;
  name: string;
}
