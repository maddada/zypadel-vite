import { Anchor, Button, Container, Paper, Text, TextInput, Title } from "@mantine/core";
import { sendPasswordResetEmail } from "firebase/auth"; // Import the signInWithEmailAndPassword function
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "reactfire";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const auth = useAuth();
    let [email, setEmail] = useState("");

    const handleLogin = () => {
        sendPasswordResetEmail(auth, email) // Use the signInWithEmailAndPassword function
            .then((res) => {
                console.log(res);
                alert("Pass");
                navigate("/login");
                return true;
            })
            .catch(async (error) => {
                console.log(error);
                alert("Error Resetting Password, email was not found.");
            });
    };

    return (
        <Container size={420} my={100}>
            <Title ta="center" style={{ fontWeight: 900 }}>
                Forgot Password
            </Title>

            {/* <div id="recaptcha-container" ref={captchaRef}></div> */}

            <Paper withBorder shadow="md" p={30} mt={30} w={400} radius="md">
                <TextInput label="Email" placeholder="you@mantine.dev" onChange={(e) => setEmail(e.target.value)} required />
                <Button id="sign-in-button" fullWidth mt="xl" onClick={handleLogin}>
                    Send Password Reset Email
                </Button>
            </Paper>

            <Text color="dimmed" size="sm" ta="center" mt={5}>
                Go back to {" "}
                <Anchor
                    size="sm"
                    component="button"
                    onClick={() => {
                        navigate("/login");
                    }}
                >
                    Sign In
                </Anchor>
            </Text>
        </Container>
    );
}
