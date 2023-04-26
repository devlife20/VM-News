type NewArticlesResultsTypes = {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  content: string;
};
type BreakingNewsPageProps = {
  NewResultsArray: NewArticlesResultsTypes[];
};
type ArticleCardsProps = {
  articles: NewArticlesResultsTypes;
};
