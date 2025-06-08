import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts";
import { ReactNode } from "react";
import { styled, useTheme } from "@mui/material";
import { BaseMediaItem } from "../../types";

const size = {
  width: 50,
  height: 50,
};

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.secondary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 13,
}));

function PieCenterLabel({ children }: { children: ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function CardUserScore(
  props: Pick<BaseMediaItem, "vote_average">,
) {
  const { vote_average } = props;
  const userScore = Math.round(vote_average * 10);
  const theme = useTheme();
  const data = userScore
    ? [
        { value: userScore, color: theme.palette.primary.main },
        { value: 100 - userScore, color: theme.palette.text.disabled },
      ]
    : [{ value: 100, color: theme.palette.text.disabled }];

  return (
    <PieChart
      sx={{
        mt: 2,
        flexGrow: 0,
        justifyContent: "flex-end",
      }}
      series={[
        {
          innerRadius: 25,
          outerRadius: 20,
          paddingAngle: 5,
          data,
        },
      ]}
      {...size}
      hideLegend
    >
      <PieCenterLabel>{userScore ? `${userScore}%` : "NR"}</PieCenterLabel>
    </PieChart>
  );
}
