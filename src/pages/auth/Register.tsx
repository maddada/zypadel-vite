import { Anchor, Button, Checkbox, Container, Radio, Group, Paper, PasswordInput, Text, TextInput, Title, createStyles } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    button: {
        position: "relative",
        transition: "background-color 150ms ease",
    },

    progress: {
        ...theme.fn.cover(-1),
        height: "auto",
        backgroundColor: "transparent",
        zIndex: 0,
    },

    label: {
        position: "relative",
        zIndex: 1,
    },

    checkbox: { input: { cursor: "pointer" }, label: { cursor: "pointer" } },
}));

export default function Register() {
    const navigate = useNavigate();
    const { classes, theme } = useStyles();

    return (
        <Container size={420} my={100}>
            <Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
                Register with ZY!
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} w={400} radius="md">
                <TextInput label="Email" placeholder="you@email.com" required />
                <PasswordInput label="Password" placeholder="Your password" required mt="lg" />
                <TextInput label="Mobile Number" placeholder="050 1234567" required mt="lg" />
                <Radio.Group name="gender" label="Gender" description="" required mt="lg">
                    <Group mt="xs">
                        <Radio value="male" label="Male" className={classes.checkbox} />
                        <Radio value="female" label="Female" className={classes.checkbox} />
                    </Group>
                </Radio.Group>
                <Button type="button" fullWidth mt="xl" style={{ backgroundColor: "#3161D1" }}>
                    Register
                </Button>
            </Paper>
            <Text color="primary" size="sm" align="center" mt="md">
                Already have an account?{" "}
                <Anchor
                    size="sm"
                    component="button"
                    onClick={() => {
                        navigate("/login");
                    }}
                >
                    Login
                </Anchor>
            </Text>
        </Container>
    );
}
