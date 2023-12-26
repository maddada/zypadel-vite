import { Flex, Group, Image, Text } from "@mantine/core";
import cx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useSigninCheck } from "reactfire";
import zypadelLogo from "src/assets/zypadelLogo.webp";
import { useStore } from "src/state/Store";
import classes from "./ResponsiveHeader.module.css";

interface ResponsiveHeaderProps {
    links: {
        link: string;
        label: string;
        logInRequired?: boolean;
        adminLogInRequired?: boolean;
    }[];
}

export function ResponsiveHeader({ links }: ResponsiveHeaderProps) {
    const { data: signInCheckResult } = useSigninCheck();
    const activeLink = useStore((state) => state.activeLink);
    const setActiveLink = useStore((state) => state.setActiveLink);
    let auth = useAuth();
    let navigate = useNavigate();

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
        <header className={classes.header}>
            <Flex className={classes.inner} justify={"space-between"}>
                <Flex visibleFrom="sm" gap={10}>
                    <Image src={zypadelLogo} w="25px" />
                    <Text fw={"bold"}>Padel & Fitness Hub</Text>
                </Flex>
                <Group gap={5}>
                    {links.map((link) => generateNavLink(link))}
                    <Link
                        key={"logout"}
                        to={"#"}
                        className={classes.link}
                        style={{ display: auth?.currentUser?.email != null ? "block" : "none" }}
                        onClick={() => {
                            auth.signOut().then(() => console.log("signed out"));
                            navigate("/login");
                        }}
                    >
                        Logout
                    </Link>
                    <Link key={"email"} to={"#"} style={{ display: auth?.currentUser?.email != null ? "block" : "none" }}>
                        {auth?.currentUser?.email != null ? auth.currentUser.email : ""}
                    </Link>
                </Group>
            </Flex>
        </header>

        // const [opened, { toggle, close }] = useDisclosure(false);
        /* <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" /> */
        // <Container h={HEADER_HEIGHT} mb={120} className={classes.root}>
        //     <Container className={classes.header}>
        //         <Flex gap={10}>
        //             <Image src={zypadelLogo} width={28} />
        //             <Text fw={"bold"}>Padel & Fitness Hub</Text>
        //         </Flex>
        //         <Group gap={5} className={classes.links}>
        //             {links.map((link) => generateNavLink(link))}
        //             <Link
        //                 key={"logout"}
        //                 to={"#"}
        //                 className={classes.link}
        //                 style={{ display: auth?.currentUser?.email != null ? "block" : "none" }}
        //                 onClick={() => {
        //                     auth.signOut().then(() => console.log("signed out"));
        //                     navigate("/login");
        //                 }}
        //             >
        //                 Logout
        //             </Link>
        //             <Link key={"email"} to={"#"} style={{ display: auth?.currentUser?.email != null ? "block" : "none" }} className={classes.signedInUserLink}>
        //                 {auth?.currentUser?.email != null ? auth.currentUser.email : ""}
        //             </Link>
        //         </Group>

        //         <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

        //         <Transition transition="pop-top-right" duration={200} mounted={opened}>
        //             {(styles) => (
        //                 <>
        //                     <Paper className={classes.dropdown} withBorder style={styles}>
        //                         {links.map((link) => generateNavLink(link))}
        //                         <Link
        //                             key={"logout"}
        //                             to={"#"}
        //                             className={classes.link}
        //                             style={{ display: auth?.currentUser?.email != null ? "block" : "none" }}
        //                             onClick={() => {
        //                                 auth.signOut().then(() => console.log("signed out"));
        //                                 navigate("/login");
        //                             }}
        //                         >
        //                             Logout
        //                         </Link>
        //                         <Link key={"email"} to={"#"} style={{ display: auth?.currentUser?.email != null ? "block" : "none" }} className={classes.signedInUserLink}>
        //                             {auth?.currentUser?.email != null ? auth.currentUser.email : ""}
        //                         </Link>
        //                     </Paper>
        //                 </>
        //             )}
        //         </Transition>
        //     </Container>
        // </Container>
    );
}
