import { Apps, LiveTvTwoTone, MovieCreationTwoTone } from "@mui/icons-material";
import { Grid, Button, ButtonGroup } from "@mui/material";
import { MediaType } from "@/types";

export default function FavoriteMediaTypeSwitcher({
  favoriteMediaType,
  setFavoriteMediaType,
}: {
  favoriteMediaType: MediaType | "all";
  setFavoriteMediaType: (favoriteMediaType: MediaType | "all") => void;
}) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 8, lg: 6 }} offset={{ md: 2, lg: 3 }}>
        <ButtonGroup size="large" fullWidth={true}>
          <Button
            variant={favoriteMediaType === "all" ? "contained" : "outlined"}
            startIcon={<Apps />}
            onClick={() => setFavoriteMediaType("all")}
          >
            All
          </Button>
          <Button
            variant={favoriteMediaType === "movie" ? "contained" : "outlined"}
            startIcon={<MovieCreationTwoTone />}
            onClick={() => setFavoriteMediaType("movie")}
          >
            Movies
          </Button>
          <Button
            variant={favoriteMediaType === "tv" ? "contained" : "outlined"}
            startIcon={<LiveTvTwoTone />}
            onClick={() => setFavoriteMediaType("tv")}
          >
            Series
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
