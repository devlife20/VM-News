import "@/styles/globals.css";
import { MantineProvider, Box } from "@mantine/core";
import type { AppProps } from "next/app";
import { Navbar } from "../../components/Navbar";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <NextNProgress />
        <Navbar />
        <Box>
          <Component {...pageProps} />
        </Box>
      </MantineProvider>
    </>
  );
}
