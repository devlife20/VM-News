import Link from "next/link";
import {
  createStyles,
  SimpleGrid,
  Card,
  Text,
  Container,
  AspectRatio,
} from "@mantine/core";
import Image from "next/image";
import fallback from "../public/fallback.jpg";
import styles from '../src/styles/ArticleCards.module.css'

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));

export default function AritclesCards({
  articles: { title, description, url, urlToImage },
}: ArticleCardsProps) {
  const validImageUrl =
    urlToImage?.startsWith("http://") || urlToImage?.startsWith("https://")
      ? urlToImage
      : undefined;

  const { classes } = useStyles();

  return (
    <Card p="md" radius="md" className={classes.card}>
      <AspectRatio ratio={1920 / 1080}>
        <Image
          src={validImageUrl || fallback}
          style={{ borderRadius: "10px" }}
          alt="news article image"
          width={500}
          height={200}
          className={styles.crop}
        />
      </AspectRatio>
      {/* <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {article.date}
      </Text> */}
      <Text className={classes.title} mt={5} fz={20}>
        {title}
      </Text>
      <Text mt={4} fz={18}>
        {description}
      </Text>
    </Card>
  );
}
