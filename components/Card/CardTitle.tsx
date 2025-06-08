import { CardHeader as MUICardHeader } from "@mui/material";
import { MovieMediaItem, TVMediaItem } from "@/types";

export default function CardTitle(
  props: Partial<
    Pick<MovieMediaItem, "title" | "original_title" | "original_language"> &
      Pick<TVMediaItem, "name" | "original_name" | "original_language">
  >,
) {
  const { title, original_title, name, original_name, original_language } =
    props;
  const mediaName = title || name;
  const mediaOriginalName =
    original_language !== "en" ? original_title || original_name : undefined;

  return <MUICardHeader title={mediaName} subheader={mediaOriginalName} />;
}
