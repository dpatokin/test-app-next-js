import { LiveTvTwoTone, MovieCreationTwoTone } from "@mui/icons-material";
import { Button, ButtonGroup } from "@mui/material";
import { MediaType } from "../../types";

export default function MediaTypeSwitcher({
  mediaType,
  setMediaType,
}: {
  mediaType: MediaType;
  setMediaType: (mediaType: MediaType) => void;
}) {
  return (
    <ButtonGroup sx={{ gridColumn: "4 / 10" }} size="large" fullWidth={true}>
      <Button
        variant={mediaType === "movie" ? "contained" : "outlined"}
        startIcon={<MovieCreationTwoTone />}
        onClick={() => setMediaType("movie")}
      >
        Movies
      </Button>
      <Button
        variant={mediaType === "tv" ? "contained" : "outlined"}
        startIcon={<LiveTvTwoTone />}
        onClick={() => setMediaType("tv")}
      >
        Series
      </Button>
    </ButtonGroup>
  );
}
