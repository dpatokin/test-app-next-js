"use client";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { navLinks } from "@/constants/navLinks";
import { useRouter } from "next/navigation";

export default function BottomNav() {
  const [value, setValue] = useState(0);
  const router = useRouter();

  const icons = {
    "/": <HomeIcon />,
    "/favorite": <FavoriteIcon />,
  };

  return (
    <BottomNavigation
      showLabels
      sx={{
        display: { md: "none" },
        background:
          "#121212 linear-gradient(rgba(255, 255, 255, 0.092), rgba(255, 255, 255, 0.092))",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
      value={value}
      onChange={(_event, newValue) => setValue(newValue)}
    >
      {navLinks.map(({ label, to }) => (
        <BottomNavigationAction
          key={to}
          label={label}
          icon={icons[to as keyof typeof icons]}
          onClick={() => router.push(to)}
        />
      ))}
    </BottomNavigation>
  );
}
