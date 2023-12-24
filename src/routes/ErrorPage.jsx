import { useRouteError, useNavigate } from "react-router-dom";
import { createStyles, Title, Text, Button, Container, Group, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: rem(80),
        paddingBottom: rem(80),
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        maxWidth: "100vw",
    },

    label: {
        textAlign: "center",
        fontWeight: 900,
        fontSize: rem(220),
        lineHeight: 1,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
        color: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],

        [theme.fn.smallerThan("sm")]: {
            fontSize: rem(120),
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: "center",
        fontWeight: 900,
        fontSize: rem(38),

        [theme.fn.smallerThan("sm")]: {
            fontSize: rem(32),
        },
    },

    description: {
        maxWidth: rem(500),
        margin: "auto",
        marginTop: theme.spacing.xl,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    },
}));

export default function ErrorPage() {
    const { classes } = useStyles();
    const navigate = useNavigate();
    const error = useRouteError();
    console.error(error);

    return (
        <Container className={classes.root}>
            <div className={classes.label}>404</div>
            <Title className={classes.title}>An unexpected error has occurred</Title>
            <Text color="dimmed" size="xl" align="center" className={classes.description}>
                {error.statusText || error.message}
            </Text>
            <Group position="center">
                <Button
                    variant="default"
                    size="md"
                    style={{ backgroundColor: "#3161D1" }}
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Take me back to home page
                </Button>
            </Group>
        </Container>
    );
}
