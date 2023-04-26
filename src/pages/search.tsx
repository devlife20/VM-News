import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Container,
  Loader,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";
import { FormEvent, useState } from "react";
import ArticlesGrid from "../../components/ArticlesGrid";
import Head from "next/head";

export default function SearchNewsPage() {
  const [searchResults, setSearchResults] = useState<
    NewArticlesResultsTypes[] | null
  >(null);
  const [searchResultLoading, setSearchResultLoading] = useState(false);
  const [searchResultsError, setSearchResultError] = useState(false);
  const form = useForm({
    initialValues: {
      searchQuery: "",
    },
  });

  const handleSubmit = form.onSubmit(async ({ searchQuery }) => {
    const searchTerm = searchQuery.trim();
    if (searchQuery) {
      try {
        setSearchResultError(false);
        setSearchResultLoading(true);
        const response = await fetch("/api/search-news?q=" + searchQuery);
        const NewResultsArray = await response.json();

        setSearchResults(NewResultsArray.articles);
        // console.log(NewResultsArray);
        // console.log(searchResults);
      } catch (error) {
        console.error(error);

        setSearchResultError(true);
      } finally {
        setSearchResultLoading(false);
      }
    }
  });

  return (
    <>
      <Head>
        <title>Search News-VM News</title>
      </Head>
      <Container size="xl">
        <h1>Search News</h1>
        <Box>
          <form onSubmit={handleSubmit}>
            <TextInput
              label="search query"
              placeholder="Eg. politics, sports...."
              {...form.getInputProps("searchQuery")}
              icon={<IconSearch />}
              radius="md"
              size="lg"
            />

            <Group position="left" mt="md">
              <Button
                type="submit"
                px={{ base: "2.2rem", sm: "2.5rem", md: "3rem", lg: "3.5rem" }}
                disabled={searchResultLoading}
              >
                Submit
              </Button>
            </Group>
          </form>
        </Box>
        <Box mt="2rem" ta="center">
          {searchResultLoading && (
            <Loader color="indigo" size="lg" variant="bars" />
          )}
          {searchResultsError && (
            <Text fz="lg">Something went wrong.Please Try again.</Text>
          )}
          {searchResults?.length === 0 && (
            <Text fz="lg">Nothing found.Please Try a different term.</Text>
          )}
          {searchResults && <ArticlesGrid NewResultsArray={searchResults} />}
        </Box>
      </Container>
    </>
  );
}

// async function handleSubmit(e: FormEvent<HTMLFormElement>) {
//   e.preventDefault();
//   const formData = new FormData(e.target as HTMLFormElement);
//   const searchQuery = formData.get("searchQuery")?.toString().trim();
//   if (searchQuery) {
//     try {
//       setSearchResultError(false);
//       setSearchResultLoading(true);
//       const response = await fetch("/api/search-news?q=" + searchQuery);
//       const NewResultsArray = await response.json();

//       setSearchResults(NewResultsArray.articles);
//       console.log(NewResultsArray);
//       console.log(searchResults);
//     } catch (error) {
//       console.error(error);

//       setSearchResultError(true);
//     } finally {
//       setSearchResultLoading(false);
//     }
//   }
// }
