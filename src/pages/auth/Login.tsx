import { Anchor, Button, Checkbox, Container, Group, Paper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    return (
        <Container size={420} my={100}>
            <Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
                Login to ZY!
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} w={400} radius="md">
                <TextInput label="Email" placeholder="you@mantine.dev" required />
                <PasswordInput label="Password" placeholder="Your password" required mt="lg" />
                <Group position="apart" mt="lg">
                    <Checkbox label="Remember me" />
                    <Anchor
                        component="button"
                        size="sm"
                        onClick={() => {
                            navigate("/forgot-password");
                        }}
                    >
                        Forgot password?
                    </Anchor>
                </Group>
                <Button fullWidth mt="xl" style={{ backgroundColor: "#3161D1" }}>
                    Sign in
                </Button>
            </Paper>

            <Text color="dimmed" size="sm" align="center" mt={5}>
                Don't have an account yet?{" "}
                <Anchor
                    size="sm"
                    component="button"
                    onClick={() => {
                        navigate("/register");
                    }}
                >
                    Register
                </Anchor>
            </Text>
        </Container>
    );
}
