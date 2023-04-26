import { SimpleGrid, Container } from "@mantine/core";
import Link from "next/link";
import AritclesCards from "./AritclesCards";

export default function ArticlesGrid({
  NewResultsArray,
}: BreakingNewsPageProps) {
  return (
    <SimpleGrid
      cols={3}
      breakpoints={[
        { maxWidth: "sm", cols: 1 },
        { maxWidth: "md", cols: 2 },
      ]}
      px={{ base: "xs", sm: "sm", lg: "lg", xl: "xl" }}
    >
      {NewResultsArray.map((article) => (
        <Link
          href={article.url}
          key={article.url}
          style={{ textDecoration: "none" }}
        >
          <AritclesCards articles={article} />
        </Link>
      ))}
    </SimpleGrid>
  );
}
