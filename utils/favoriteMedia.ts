import { MovieMediaItem, TVMediaItem } from "@/types";

export function getFavoriteMediaArray(): (MovieMediaItem | TVMediaItem)[] {
  const favoriteMediaJSON = localStorage.getItem("favoriteMedia");

  return favoriteMediaJSON ? JSON.parse(favoriteMediaJSON) : [];
}

export function updateFavoriteMediaData(
  mediaItem: MovieMediaItem | TVMediaItem,
): boolean {
  const favoriteMedia = getFavoriteMediaArray();

  if (favoriteMedia.some((favoriteItem) => favoriteItem.id === mediaItem.id)) {
    removeFavoriteMedia(mediaItem, favoriteMedia);

    return false;
  }

  addFavoriteMedia(mediaItem, favoriteMedia);

  return true;
}

function addFavoriteMedia(
  mediaItem: MovieMediaItem | TVMediaItem,
  idList: (MovieMediaItem | TVMediaItem)[] = [],
) {
  localStorage.setItem("favoriteMedia", JSON.stringify([...idList, mediaItem]));
}

function removeFavoriteMedia(
  mediaItem: MovieMediaItem | TVMediaItem,
  idList: (MovieMediaItem | TVMediaItem)[],
) {
  localStorage.setItem(
    "favoriteMedia",
    JSON.stringify(
      idList.filter(
        (filterItem: MovieMediaItem | TVMediaItem) =>
          filterItem.id !== mediaItem.id,
      ),
    ),
  );
}
