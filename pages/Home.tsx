"use client";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import CardsList from "../components/CardsList";
import useFetchMedia from "../hooks/useFetchMedia";
import { Form } from "@/components/Form/Form";
import { useCallback, useState } from "react";
import { FetchMediaParams } from "@/types";
import useAPIStatus from "../hooks/useAPIStatus";

export default function Home() {
  const { fetchMedia, mediaData } = useFetchMedia();
  const [loading, setLoading] = useState(false);
  const { isAPIWorking, loading: apiLoading } = useAPIStatus();

  const handleFetchMedia = useCallback(
    async (params: FetchMediaParams) => {
      setLoading(true);
      await fetchMedia(params);
      setLoading(false);
    },
    [fetchMedia],
  );

  let content;

  if (apiLoading) {
    content = (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  } else if (!isAPIWorking) {
    content = (
      <Typography variant="h2" align="center">
        The service is currently unavailable
      </Typography>
    );
  } else {
    content = (
      <>
        <Form fetchMedia={handleFetchMedia} loading={loading} />
        <CardsList mediaData={mediaData} loading={loading} />
      </>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ pt: 17, pb: 8 }}>
      {content}
    </Container>
  );
}
