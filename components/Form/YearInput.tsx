import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { FormControl } from "@mui/material";

export default function YearInput({
  setFilters,
  helperText,
  disabled,
}: {
  setFilters: (year: string) => void;
  helperText: string;
  disabled: boolean;
}) {
  return (
    <FormControl fullWidth={true}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Year"
          views={["year"]}
          openTo="year"
          minDate={dayjs("1900-01-01")}
          maxDate={dayjs()}
          onChange={(value: PickerValue) =>
            setFilters(value ? value.format("YYYY") : "")
          }
          slotProps={{
            textField: {
              helperText: helperText,
            },
          }}
          disabled={disabled}
        />
      </LocalizationProvider>
    </FormControl>
  );
}
