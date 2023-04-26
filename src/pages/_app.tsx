import "@/styles/globals.css";
import {
  MantineProvider,
  Box,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import type { AppProps } from "next/app";
import { Navbar } from "../../components/Navbar";
import NextNProgress from "nextjs-progressbar";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >
          <NextNProgress />
          <Navbar />
          <Box>
            <Component {...pageProps} />
          </Box>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
