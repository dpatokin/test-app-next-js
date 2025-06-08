"use client";
import { useState, useEffect, ReactElement, useCallback } from "react";
import {
  getFavoriteMediaArray,
  updateFavoriteMediaData,
} from "@/utils/favoriteMedia";
import { MovieMediaItem, TVMediaItem } from "@/types";
import { Grid, Typography } from "@mui/material";
import Card from "./Card/Card";
import CardsPlaceholder from "./CardsPlaceholder";

export default function CardsList({
  mediaData,
  loading,
}: {
  mediaData: (MovieMediaItem | TVMediaItem)[] | undefined;
  loading?: boolean;
}): ReactElement {
  const [favoriteMedia, setFavoriteMedia] = useState<
    (MovieMediaItem | TVMediaItem)[]
  >([]);

  useEffect(() => {
    setFavoriteMedia(getFavoriteMediaArray());
  }, []);

  const handleToggleFavorite = useCallback(
    (mediaItem: MovieMediaItem | TVMediaItem) => {
      setFavoriteMedia((prev) =>
        prev.some((favoriteItem) => favoriteItem.id === mediaItem.id)
          ? prev.filter((filterItem) => filterItem.id !== mediaItem.id)
          : [...prev, mediaItem],
      );
      updateFavoriteMediaData(mediaItem);
    },
    [],
  );

  let content;

  if (mediaData?.length === 0 && !loading) {
    content = (
      <Typography
        variant="h4"
        align="center"
        color="text.disabled"
        sx={{ flexGrow: 1 }}
      >
        No results found
      </Typography>
    );
  } else if (loading) {
    content = <CardsPlaceholder />;
  } else if (mediaData?.length) {
    content = mediaData.map((mediaItem: MovieMediaItem | TVMediaItem) => (
      <Card
        key={mediaItem.id}
        mediaItem={mediaItem}
        favoriteMedia={favoriteMedia}
        onToggleFavorite={handleToggleFavorite}
      />
    ));
  } else {
    content = (
      <Typography
        variant="h4"
        align="center"
        color="text.disabled"
        sx={{ flexGrow: 1 }}
      >
        Let's add some random!
      </Typography>
    );
  }

  return (
    <Grid container columns={{ xs: 1, sm: 2 }} spacing={2} mt={8}>
      {content}
    </Grid>
  );
}
