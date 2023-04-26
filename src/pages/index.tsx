import Head from "next/head";

import { Inter } from "next/font/google";
import { Box } from "@mantine/core";
import { GetServerSideProps } from "next";
import AritclesCards from "../../components/AritclesCards";
import ArticlesGrid from "../../components/ArticlesGrid";

export const getServerSideProps: GetServerSideProps<
  BreakingNewsPageProps
> = async () => {
  // Fetch data from external API
  const res = await fetch(
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=" +
      process.env.NEWS_API_KEY
  );
  const NewsResponse = await res.json();

  // Pass data to the page via props
  return { props: { NewResultsArray: NewsResponse.articles } };
};

export default function BreakingNewsPage({
  NewResultsArray,
}: BreakingNewsPageProps) {
  return (
    <>
      <Head>
        <title>WM News</title>
        <meta name="description" content="All news at one place" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box px={"md"}>
          <h1>Breaking News</h1>
          <ArticlesGrid NewResultsArray={NewResultsArray} />
        </Box>
      </main>
    </>
  );
}
