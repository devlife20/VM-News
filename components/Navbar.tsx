import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import {
  createStyles,
  Header,
  Group,
  ActionIcon,
  Container,
  Burger,
  rem,
  Paper,
  Menu,
  Center,
  Text,
  Transition,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import { MantineLogo } from "@mantine/ds";
import Link from "next/link";
import Theme from "./Theme";

const navLinks = {
  links: [
    {
      link: "/",
      label: "Breaking News",
    },

    {
      link: "/search",
      label: "Search",
    },
    {
      link: "/category",
      label: "Categories",
      links: [
        {
          link: "/categories/business",
          label: "business",
        },
        {
          link: "/categories/science",
          label: "Science",
        },
        {
          link: "/categories/entertainment",
          label: "Entertainment",
        },
        {
          link: "/categories/technology",
          label: "Technology",
        },
        {
          link: "/categories/health",
          label: "Health",
        },
      ],
    },
  ],
};
// type NavLinkProps= {
//     links: { link: string; label: string }[];
//   }
const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },
  dropdown: {
    position: "absolute",
    top: 55,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
  inner: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: rem(55),

    [theme.fn.smallerThan("sm")]: {
      justifyContent: "flex-start",
    },
  },

  links: {
    width: rem(540),

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.lg,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

export function Navbar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(navLinks.links[0].link);
  const { classes, cx } = useStyles();
  //   <Link
  //     key={link.label}
  //     href={link.link}
  //     className={cx(classes.link, { [classes.linkActive]: active === link.link })}
  //     onClick={() => {
  //       setActive(link.link);
  //     }}
  //   >
  //     {link.label}
  //   </Link>
  const items = navLinks.links.map((link) => {
    const menuItems = link.links?.map((catOption) => (
      <Menu.Item key={catOption.link}>
        <Link href={catOption.link} className={classes.link}>
          {catOption.label}
        </Link>
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <Link href={link.link} className={classes.link}>
              <Center>
                <Text mr="sm">{link.label}</Text>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }
    return (
      <Link
        key={link.label}
        href={link.link}
        className={cx(classes.link, {
          [classes.linkActive]: active === link.link,
        })}
        onClick={() => {
          setActive(link.link);
        }}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <Header height={56} mb={30}>
      <Container className={classes.inner}>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Group>
          {" "}
          <Theme />{" "}
        </Group>

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
