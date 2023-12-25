import { Burger, Container, Flex, Group, Header, Image, Paper, Text, Transition, createStyles, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useFirebaseApp } from "reactfire";
import zypadelLogo from "src/assets/zypadelLogo.webp";
import { useStore } from "src/state/Store";
import { useSigninCheck } from "reactfire";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
    root: {
        position: "fixed",
        zIndex: 1,
        width: "100vw",
        top: 0,
        left: 0,
    },
    dropdown: {
        position: "absolute",
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        zIndex: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: "hidden",
        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
    },
    links: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },
    burger: {
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
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,
        "&:hover": {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        },
        [theme.fn.smallerThan("sm")]: {
            borderRadius: 0,
            padding: theme.spacing.md,
        },
    },
    signedInUserLink: {
        display: "block",
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 700,
        "&:hover": {
            backgroundColor: "initial",
            color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
            cursor: "default",
        },
        [theme.fn.smallerThan("sm")]: {
            borderRadius: 0,
            padding: theme.spacing.md,
        },
    },
    linkActive: {
        "&, &:hover": {
            backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
        },
    },
}));

interface ResponsiveHeaderProps {
    links: {
        link: string;
        label: string;
        logInRequired: boolean;
        adminLogInRequired: boolean;
    }[];
}

export function ResponsiveHeader({ links }: ResponsiveHeaderProps) {
    const [opened, { toggle, close }] = useDisclosure(false); //ts-ignore
    const { status, data: signInCheckResult } = useSigninCheck(); // Fix the eslint problem
    const activeLink = useStore((state) => state.activeLink);
    const setActiveLink = useStore((state) => state.setActiveLink);
    let firebaseApp = useFirebaseApp();
    let auth = useAuth(firebaseApp);
    let navigate = useNavigate();
    let [navItems, setNavItems] = useState();

    const { classes, cx } = useStyles();

    let generateNavLink = (link) => {
        let isLoggedIn = signInCheckResult?.signedIn != false;
        let isAdmin = isLoggedIn && auth?.currentUser?.email?.includes("@zypadel.com");

        // Case 1: user is not logged in, can access login and register pages only
        let accessableByUnauthenticated = ["/login", "/register"];
        if (!isLoggedIn && !accessableByUnauthenticated.includes(link.link)) {
            return;
        }

        // Case 2: user is logged in, can access booking pages only
        if (isLoggedIn && !link.link.includes("book-")) {
            return;
        }

        // Case 3: admin is logged in, can access management pages only
        if (isAdmin && !link.link.includes("manage-")) {
            return;
        }

        return (
            <Link
                key={link.label}
                to={link.link}
                className={cx(classes.link, { [classes.linkActive]: activeLink === link.link })}
                onClick={() => {
                    // event.preventDefault();
                    setActiveLink(link.link);
                    close();
                }}
            >
                {link.label}
            </Link>
        );
    };

    return (
        <Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
            <Container className={classes.header}>
                <Flex gap={10}>
                    <Image src={zypadelLogo} width={28} />
                    <Text weight={"bold"}>Padel & Fitness Hub</Text>
                </Flex>
                <Group spacing={5} className={classes.links}>
                    {links.map((link) => generateNavLink(link))}
                    <Link
                        key={"logout"}
                        // to={"logout"}
                        className={classes.link}
                        style={{ display: auth?.currentUser?.email != null ? "block" : "none" }}
                        onClick={() => {
                            auth.signOut().then(() => console.log("signed out"));
                            navigate("/login");
                        }}
                    >
                        Logout
                    </Link>
                    <Link key={"email"} to={"#"} style={{ display: auth?.currentUser?.email != null ? "block" : "none" }} className={classes.signedInUserLink} label="Signed In User">
                        {auth?.currentUser?.email != null ? auth.currentUser.email : ""}
                    </Link>
                </Group>

                <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

                <Transition transition="pop-top-right" duration={200} mounted={opened}>
                    {(styles) => (
                        <>
                            <Paper className={classes.dropdown} withBorder style={styles}>
                                {navItems}
                            </Paper>
                        </>
                    )}
                </Transition>
            </Container>
        </Header>
    );
}
