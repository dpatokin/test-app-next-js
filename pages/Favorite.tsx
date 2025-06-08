"use client";
import { Container } from "@mui/material";
import CardsList from "../components/CardsList";
import { getFavoriteMediaArray } from "@/utils/favoriteMedia";
import { useEffect, useState } from "react";
import { MediaType, MovieMediaItem, TVMediaItem } from "@/types";
import FavoriteMediaTypeSwitcher from "../components/FavoriteMediaTypeSwitcher";

export default function Favorite() {
  const [favoriteMedia, setFavoriteMedia] = useState<
    (MovieMediaItem | TVMediaItem)[]
  >([]);
  const [favoriteMediaType, setFavoriteMediaType] = useState<MediaType | "all">(
    "all",
  );
  const mediaData =
    favoriteMediaType === "all"
      ? favoriteMedia
      : favoriteMedia.filter((media) => media.media_type === favoriteMediaType);

  useEffect(() => {
    setFavoriteMedia(getFavoriteMediaArray());
  }, []);

  return (
    <Container maxWidth="xl" sx={{ pt: 17, pb: 8 }}>
      <FavoriteMediaTypeSwitcher
        favoriteMediaType={favoriteMediaType}
        setFavoriteMediaType={setFavoriteMediaType}
      />
      <CardsList mediaData={mediaData} />
    </Container>
  );
}
