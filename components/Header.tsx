"use client";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import TheatersIcon from "@mui/icons-material/Theaters";
import { AccountCircle } from "@mui/icons-material";
import { navLinks } from "@/constants/navLinks";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 20 }}>
          <Box
            sx={{
              position: "absolute",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <TheatersIcon sx={{ display: "flex", mr: 1 }} />
            <Typography variant="h6">Cinema Randomizer</Typography>
          </Box>
          <Box
            sx={{
              flex: "1 1 100%",
              justifyContent: "center",
              display: { xs: "none", md: "flex" },
            }}
          >
            {navLinks.map(({ label, to }) => (
              <Button
                key={to}
                color={pathname === to ? "primary" : "inherit"}
                onClick={() => router.push(to)}
                size="large"
              >
                {label}
              </Button>
            ))}
          </Box>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            sx={{
              position: "absolute",
              zIndex: 1,
              right: 0,
            }}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
