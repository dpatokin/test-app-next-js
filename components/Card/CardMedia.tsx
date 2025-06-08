"use client";
import {
  CardMedia as MUICardMedia,
  Box,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { MovieMediaItem, TVMediaItem } from "@/types";

export default function CardMedia(
  props: Partial<Pick<MovieMediaItem, "title" | "poster_path">> &
    Partial<Pick<TVMediaItem, "name">>,
) {
  const { poster_path, title, name } = props;
  const mediaBaseURL = "https://image.tmdb.org/t/p/w500/";
  const [loading, setLoading] = useState(true);
  const alt = title || name || "Media Image";

  return (
    <Box
      sx={{
        position: "relative",
        flexShrink: 0,
        width: { xs: "100%", lg: "240px" },
        height: { xs: "auto", lg: "360px" },
      }}
    >
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <MUICardMedia
        component="img"
        width="500"
        height="750"
        image={
          poster_path
            ? mediaBaseURL + poster_path
            : "https://placehold.co/240x360/222/fff?text=No+Image"
        }
        alt={alt}
        sx={{
          width: { xs: "100%", lg: "240px" },
          height: { xs: "auto", lg: "100%" },
          display: loading ? "none" : "block",
        }}
        onLoad={() => setLoading(false)}
      />
    </Box>
  );
}
