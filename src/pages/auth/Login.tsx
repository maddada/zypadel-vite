import { Anchor, Button, Checkbox, Container, Group, Paper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import the signInWithEmailAndPassword function
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "reactfire";

export default function Login() {
    const navigate = useNavigate();
    const auth = useAuth();
    let [password, setPassword] = useState("");
    let [email, setEmail] = useState("");

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password) // Use the signInWithEmailAndPassword function
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                navigate("/book-padel-court");
                return true;
            })
            .catch(async (error) => {
                // Failed to sign in
                console.log(error);
                alert("Error Signing In");
            });
    };

    return (
        <Container size={420} my={100}>
            <Title ta="center" style={{ fontWeight: 900 }}>
                Login to ZY!
            </Title>

            {/* <div id="recaptcha-container" ref={captchaRef}></div> */}

            <Paper withBorder shadow="md" p={30} mt={30} w={400} radius="md">
                <TextInput label="Email" placeholder="you@mantine.dev" onChange={(e) => setEmail(e.target.value)} required />
                <PasswordInput label="Password" placeholder="Your password" onChange={(e) => setPassword(e.target.value)} required mt="lg" />
                <Group justify="space-between" mt="lg">
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
                <Button id="sign-in-button" fullWidth mt="xl" onClick={handleLogin}>
                    Sign in
                </Button>
            </Paper>

            <Text color="dimmed" size="sm" ta="center" mt={5}>
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

// function BurritoTaste() {
//     // easily access the Firestore library
//     const burritoRef = doc(useFirestore(), "tryreactfire", "burrito");

//     // subscribe to a document for realtime updates. just one line!
//     const { status, data } = useFirestoreDocData(burritoRef);

//     // easily check the loading status
//     if (status === "loading") {
//         return <p>Fetching burrito flavor...</p>;
//     }

//     return <p>The burrito is {data.yummy ? "good" : "bad"}!</p>;
// }

// const firestoreInstance = getFirestore(useFirebaseApp());
// <FirestoreProvider sdk={firestoreInstance}> */}
// <h1>🌯</h1> */}
// <BurritoTaste />
// </FirestoreProvider>

// useEffect(() => {
//     window.recaptchaVerifier = new RecaptchaVerifier(auth, captchaRef.current, {
//         size: "invisible",
//         callback: (response) => {
//             console.log("reCAPTCHA solved, allow signInWithPhoneNumber.", response);
//             // reCAPTCHA solved, allow signInWithPhoneNumber.
//             // Call sign in handler here
//         },
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);
