import { FormControl, TextField } from "@mui/material";

export default function NameInput({
  mediaName,
  setFilters,
  error = false,
  helperText = "",
  disabled,
}: {
  mediaName: string;
  setFilters: (mediaName: string) => void;
  error: boolean;
  helperText: string;
  disabled: boolean;
}) {
  return (
    <FormControl fullWidth={true}>
      <TextField
        id="media-name-input"
        label="Movie name"
        value={mediaName}
        onChange={(e) => setFilters(e.target.value)}
        error={error}
        helperText={helperText}
        disabled={disabled}
      />
    </FormControl>
  );
}
