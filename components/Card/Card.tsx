import { Box, Card as MUICard, Grid } from "@mui/material";
import { MovieMediaItem, TVMediaItem } from "@/types";
import { ReactElement } from "react";
import CardMedia from "./CardMedia";
import CardContent from "./CardContent";
import CardActions from "./CardActions";
import CardTitle from "./CardTitle";

export default function Card({
  mediaItem,
  favoriteMedia,
  onToggleFavorite,
}: {
  mediaItem: MovieMediaItem | TVMediaItem;
  favoriteMedia: (MovieMediaItem | TVMediaItem)[];
  onToggleFavorite: (mediaItem: MovieMediaItem | TVMediaItem) => void;
}): ReactElement {
  return (
    <Grid size={1}>
      <MUICard
        sx={{
          display: { lg: "flex" },
          alignItems: { lg: "flex-start" },
          height: { lg: "100%" },
        }}
      >
        <CardMedia {...mediaItem} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            height: "100%",
          }}
        >
          <CardTitle {...mediaItem} />
          <CardContent {...mediaItem} />
          <CardActions
            mediaItem={mediaItem}
            favoriteMedia={favoriteMedia}
            onToggleFavorite={onToggleFavorite}
          />
        </Box>
      </MUICard>
    </Grid>
  );
}
