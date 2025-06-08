import { Grid, Skeleton } from "@mui/material";

export default function CardsPlaceholder() {
  return (
    <>
      {Array.from({ length: 20 }).map((_, index) => (
        <Grid key={index} size={1} className="seriesCard">
          <Skeleton variant="rounded" height={360} />
        </Grid>
      ))}
    </>
  );
}
