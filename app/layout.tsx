import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Header } from "@/components/Header";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../theme";
import BottomNav from "@/components/BottomNav";
import { GlobalDataProvider } from "@/context/GlobalDataContext";

export const metadata: Metadata = {
  title: "Cinema Randomizer",
  description:
    "Use some randomization to choose a movie or tv show for you to watch.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <GlobalDataProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Header />
              {children}
              <BottomNav />
            </ThemeProvider>
          </GlobalDataProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
