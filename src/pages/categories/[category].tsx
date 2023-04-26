import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import ArticlesGrid from "../../../components/ArticlesGrid";
import { useRouter } from "next/router";
import Head from "next/head";

type staticProps = {
  newsArticles: NewArticlesResultsTypes[];
};
export const getStaticPaths: GetStaticPaths = async () => {
  const categoryOptions = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const paths = categoryOptions.map((option) => ({
    params: { category: option },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<BreakingNewsPageProps> = async ({
  params,
}) => {
  const category = params?.category?.toString();
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
  );
  const NewsResponse = await res.json();

  // Pass post data to the page via props
  return {
    props: { NewResultsArray: NewsResponse.articles },
    revalidate: 5 * 6,
  };
};

function CategoryNewPage({ NewResultsArray }: BreakingNewsPageProps) {
  const router = useRouter();
  const categoryName = router.query.category?.toString();

  const title = `category: ${categoryName}`;

  return (
    <>
      <Head>
        <title>{`${title} - VM News`}</title>
      </Head>
      <h1>{title}</h1>
      <ArticlesGrid NewResultsArray={NewResultsArray} />;
    </>
  );
}

export default CategoryNewPage;
