import { Chip, Stack } from "@mui/material";
import { useGlobalData } from "../../hooks/useGlobalData";
import { BaseMediaItem } from "../../types";

export default function CardGenres(
  props: Pick<BaseMediaItem, "genre_ids" | "media_type">,
) {
  const { genre_ids, media_type } = props;
  const { movieGenres, tvGenres } = useGlobalData();
  const genresList = media_type === "movie" ? movieGenres : tvGenres;
  const genres = genre_ids
    ? genresList.filter((genre) => genre_ids.includes(genre.id))
    : [];

  return (
    <>
      {genres && (
        <Stack direction="row" spacing={0.5} sx={{ mt: 2 }}>
          {genres.map((genre) => (
            <Chip
              key={genre.id}
              label={genre.name}
              variant="outlined"
              size="small"
            />
          ))}
        </Stack>
      )}
    </>
  );
}
