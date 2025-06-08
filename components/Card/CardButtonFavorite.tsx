import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MovieMediaItem, TVMediaItem } from "../../types";

export function CardButtonFavorite({
  mediaItem,
  isFavorite,
  onToggleFavorite,
}: {
  mediaItem: MovieMediaItem | TVMediaItem;
  isFavorite: boolean;
  onToggleFavorite: (mediaItem: MovieMediaItem | TVMediaItem) => void;
}) {
  return (
    <IconButton
      aria-label="add to favorites"
      color={isFavorite ? "error" : "default"}
      onClick={() => {
        onToggleFavorite(mediaItem);
      }}
    >
      <FavoriteIcon />
    </IconButton>
  );
}
