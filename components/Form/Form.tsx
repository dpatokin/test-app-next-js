import { Grid, Box, Button } from "@mui/material";
import { useState } from "react";
import {
  FetchMediaFilters,
  FetchMediaParams,
  MediaType,
  MediaSortType,
} from "../../types";
import MediaSortTypeSelector from "./MediaSortTypeSelector";
import NameInput from "./NameInput";
import YearInput from "./YearInput";
import GenreSelect from "./GenreSelect";
import LanguageAutocomplete from "./LanguageAutocomplete";
import MediaTypeSwitcher from "./MediaTypeSwitcher";

export function Form({
  fetchMedia,
  loading,
}: {
  fetchMedia: (params: FetchMediaParams) => Promise<void>;
  loading: boolean;
}) {
  const [mediaType, setMediaType] = useState<MediaType>("movie");
  const [mediaSortType, setMediaSortType] = useState<MediaSortType>("random");
  const [filters, setFilters] = useState<FetchMediaFilters>({});
  const [errors, setErrors] = useState({
    mediaName: "",
    year: "",
    genre: "",
    language: "",
  });

  const validate = () => {
    const newErrors = { mediaName: "", year: "", genre: "", language: "" };

    if (
      mediaSortType === "name" &&
      (!filters.mediaName || filters.mediaName.trim() === "")
    ) {
      newErrors.mediaName = "Please enter a movie name";
    }
    if (
      mediaSortType === "year" &&
      (!filters?.year ||
        filters.year.trim() === "" ||
        filters.year.trim() < "1900" ||
        filters.year.trim() > new Date().getFullYear().toString())
    ) {
      newErrors.year = "Please select a correct year";
    }
    if (mediaSortType === "genre" && !filters.genre) {
      newErrors.genre = "Please select a genre";
    }
    if (mediaSortType === "language" && !filters.language) {
      newErrors.language = "Please select a language";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();

        if (validate()) {
          fetchMedia({ mediaType, mediaSortType, filters });
        }
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8, lg: 6 }} offset={{ md: 2, lg: 3 }}>
          <MediaTypeSwitcher
            mediaType={mediaType}
            setMediaType={setMediaType}
          />
          <Grid
            container
            spacing={mediaSortType === "random" ? 0 : 2}
            columns={2}
            mt={2}
            mb={2}
          >
            <MediaSortTypeSelector
              mediaSortType={mediaSortType}
              setMediaSortType={setMediaSortType}
              disabled={loading}
            />
            <Grid size={1}>
              {mediaSortType === "name" && (
                <NameInput
                  mediaName={filters.mediaName || ""}
                  setFilters={(value) => {
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      mediaName: value,
                    }));
                  }}
                  error={!!errors.mediaName}
                  helperText={errors.mediaName}
                  disabled={loading}
                />
              )}
              {mediaSortType === "year" && (
                <YearInput
                  setFilters={(value) => {
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      year: value,
                    }));
                  }}
                  helperText={errors.year}
                  disabled={loading}
                />
              )}
              {mediaSortType === "genre" && (
                <GenreSelect
                  genre={filters.genre || ""}
                  setFilters={(value) => {
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      genre: value,
                    }));
                  }}
                  error={!!errors.genre}
                  helperText={errors.genre}
                  mediaType={mediaType}
                  disabled={loading}
                />
              )}
              {mediaSortType === "language" && (
                <LanguageAutocomplete
                  setFilters={(value) => {
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      language: value,
                    }));
                  }}
                  error={!!errors.language}
                  helperText={errors.language}
                  disabled={loading}
                />
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="outlined"
            size="large"
            fullWidth={true}
            loading={loading}
          >
            Search {mediaType === "movie" ? "Movies" : "TV Series"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
