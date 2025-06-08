import { Box, Typography } from "@mui/material";
import { useGlobalData } from "../../hooks/useGlobalData";
import { MovieMediaItem, TVMediaItem } from "../../types";

export default function CardDetails(
  props: Partial<
    Pick<MovieMediaItem, "release_date" | "original_language"> &
      Pick<TVMediaItem, "first_air_date">
  >,
) {
  const { release_date, first_air_date, original_language } = props;
  const { languages: languagesList } = useGlobalData();
  const date = release_date || first_air_date;
  const formattedDate = date ? new Date(date).getFullYear() : undefined;
  const originalLanguage = languagesList.find(
    (language) => language.iso_639_1 === original_language,
  );

  return (
    <Box>
      <Typography variant="body2" sx={{ color: "text.disabled" }}>
        Release date: {formattedDate ? formattedDate : "-"}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.disabled" }}>
        Original language: {originalLanguage?.english_name}
      </Typography>
    </Box>
  );
}
