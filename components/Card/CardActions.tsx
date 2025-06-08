import { CardActions as MUICardActions, Button } from "@mui/material";
import { CardButtonFavorite } from "./CardButtonFavorite";
import { MovieMediaItem, TVMediaItem } from "../../types";

export default function CardActions({
  mediaItem,
  favoriteMedia,
  onToggleFavorite,
}: {
  mediaItem: MovieMediaItem | TVMediaItem;
  favoriteMedia: (MovieMediaItem | TVMediaItem)[];
  onToggleFavorite: (mediaItem: MovieMediaItem | TVMediaItem) => void;
}) {
  const { id, media_type } = mediaItem;
  const movieURL = `https://www.themoviedb.org/${media_type}/` + id;
  const isFavorite = favoriteMedia.some(
    (favoriteItem) => favoriteItem.id === mediaItem.id,
  );

  return (
    <MUICardActions
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      <Button size="small" href={movieURL} target="_blank">
        Learn More
      </Button>
      <CardButtonFavorite
        mediaItem={mediaItem}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
      />
    </MUICardActions>
  );
}
