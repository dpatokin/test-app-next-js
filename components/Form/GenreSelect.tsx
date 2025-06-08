import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useGlobalData } from "../../hooks/useGlobalData";
import { MediaType } from "../../types";

export default function GenreSelect({
  genre,
  setFilters,
  error,
  helperText,
  mediaType,
  disabled,
}: {
  genre: string;
  setFilters: (genre: string) => void;
  error: boolean;
  helperText: string;
  mediaType: MediaType;
  disabled: boolean;
}) {
  const { movieGenres, tvGenres } = useGlobalData();
  const label = "Genre";
  const genres = mediaType === "movie" ? movieGenres : tvGenres;
  const validatedGenres = genres.some((g) => g.id === Number(genre))
    ? genre
    : "";

  return (
    <FormControl fullWidth={true} error={error}>
      <InputLabel id="media-genre-select-label">{label}</InputLabel>
      <Select
        labelId="media-genre-select-label"
        id="media-genre-select"
        value={validatedGenres}
        label={label}
        disabled={!genres.length || disabled}
        onChange={(e) => setFilters(e.target.value as string)}
      >
        {genres.map((genre) => (
          <MenuItem key={genre.id} value={genre.id}>
            {genre.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}
