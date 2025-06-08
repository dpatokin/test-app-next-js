import { Autocomplete, Box, TextField } from "@mui/material";
import { useGlobalData } from "../../hooks/useGlobalData";

export default function LanguageAutocomplete({
  setFilters,
  error,
  helperText,
  disabled,
}: {
  setFilters: (language: string) => void;
  error: boolean;
  helperText: string;
  disabled: boolean;
}) {
  const { languages } = useGlobalData();

  return (
    <Autocomplete
      id="media-language-autocomplete"
      fullWidth={true}
      options={languages}
      getOptionLabel={(option) => option.english_name}
      onChange={(_, newValue) =>
        setFilters(newValue ? newValue.iso_639_1.toLowerCase() : "")
      }
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          key={option.iso_639_1}
          sx={{
            "& > img": {
              mr: 2,
              flexShrink: 0,
              display: "inline-block",
              width: 20,
            },
          }}
        >
          {option.english_name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Language"
          disabled={!languages.length || disabled}
          error={error}
          helperText={helperText}
        />
      )}
      disabled={disabled}
    />
  );
}
