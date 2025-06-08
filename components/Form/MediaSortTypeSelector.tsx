import { Grid, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { MediaSortType } from "../../types";

export default function MediaSortTypeSelector({
  mediaSortType,
  setMediaSortType,
  disabled,
}: {
  mediaSortType: MediaSortType;
  setMediaSortType: (mediaSortType: MediaSortType) => void;
  disabled: boolean;
}) {
  const sortTypes: MediaSortType[] = [
    "random",
    "name",
    "year",
    "genre",
    "language",
  ];

  return (
    <Grid size={mediaSortType === "random" ? 2 : 1}>
      <FormControl fullWidth={true}>
        <InputLabel id="media-type-select-label">Search by...</InputLabel>
        <Select
          labelId="media-type-select-label"
          id="media-type-select"
          value={mediaSortType}
          label="Select by..."
          onChange={(e) => setMediaSortType(e.target.value)}
          disabled={disabled}
        >
          {sortTypes.map((type, i) => (
            <MenuItem key={i} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
