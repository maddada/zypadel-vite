import { Anchor, Button, Container, Group, Paper, PasswordInput, Radio, Text, TextInput, Title } from "@mantine/core";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDocs, where, query, setDoc, doc, collection, getFirestore } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "reactfire";
import classes from "./auth.module.css";
import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export default function Register() {
    const navigate = useNavigate();
    const auth = useAuth();
    let [password, setPassword] = useState("");
    let [email, setEmail] = useState("");
    let [name, setName] = useState("");
    let [mobileNumber, setMobileNumber] = useState("");
    let [gender, setGender] = useState("");
    let [errorText, setErrorText] = useState("");
    const icon = <IconInfoCircle />;

    async function handleRegistration() {
        if (name.split(" ").length < 2) {
            setErrorText("Please enter first and last name");
            return;
        }

        if (email == "" || !email.includes("@") || !email.includes(".")) {
            setErrorText("Email is empty or invalid");
            return;
        }

        if (password.length < 6) {
            setErrorText("Password should be at least 6 characters long");
            return;
        }

        if (!mobileNumber.startsWith("05") && !mobileNumber.startsWith("+9715")) {
            setErrorText("Invalid mobile number. Should start with 05 or +9715.");
            return;
        }

        if (mobileNumber.length != 10 && mobileNumber.length != 13) {
            setErrorText("Invalid mobile number. Should be 10 or 13 digits long.");
            return;
        }

        // convert mobile number to +9715 format
        let tempMobileNumber = mobileNumber.startsWith("05") ? mobileNumber.replace("05", "+9715") : mobileNumber;

        // check if mobile number exists in firestore before creating the user
        const db = getFirestore();
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("mobileNumber", "==", tempMobileNumber));
        const snapshot = await getDocs(q);
        console.log(snapshot);

        // if mobile number exists, setErrorText the user and return
        if (snapshot.docs.length > 0) {
            setErrorText(`Mobile number ${mobileNumber} was already registered previously`);
            return;
        }

        if (gender == "") {
            setErrorText("Gender is required");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password) // Use the signInWithEmailAndPassword function
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);

                let objectToSetInFB = {
                    uid: user.uid,
                    email,
                    name,
                    mobileNumber: tempMobileNumber,
                    gender,
                };

                console.log(objectToSetInFB);

                // write code to set the user in firestore
                const db = getFirestore();
                setDoc(doc(db, "users", objectToSetInFB.mobileNumber), objectToSetInFB).then(() => {
                    navigate("/book-padel-court");
                });
            })
            .catch(async (error) => {
                console.log(error);
                setErrorText(`Error registering user. ${error.code} - ${error.message}`);
            });
    }

    return (
        <>
            <Container size={420} my={100}>
                <Title ta="center" style={{ fontWeight: 900 }}>
                    Register with ZY!
                </Title>

                <Paper withBorder shadow="md" p={30} mt={30} w={400} radius="md">
                    <TextInput label="Name" placeholder="Enter first and last name" onChange={(e) => setName(e.target.value)} required />
                    <TextInput label="Email" placeholder="you@email.com" required mt="lg" onChange={(e) => setEmail(e.target.value)} />
                    <PasswordInput label="Password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)} mt="lg" />
                    <TextInput label="Mobile Number" placeholder="0501234567" onChange={(e) => setMobileNumber(e.target.value)} required mt="lg" />
                    <Radio.Group name="gender" label="Gender" description="" onChange={(value) => setGender(value)} required mt="lg">
                        <Group mt="xs">
                            <Radio value="male" label="Male" className={classes.checkbox} />
                            <Radio value="female" label="Female" className={classes.checkbox} />
                        </Group>
                    </Radio.Group>
                    <Button type="button" fullWidth mt="xl" onClick={handleRegistration}>
                        Register
                    </Button>
                </Paper>
                <Text color="primary" size="sm" ta="center" mt="md">
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
                {errorText != "" && (
                    <Alert
                        withCloseButton
                        onClose={() => {
                            setErrorText("");
                        }}
                        variant="light"
                        color="red"
                        title="Error"
                        styles={{ title: { fontWeight: "700" }, message: { fontWeight: "500", color: "var(--mantine-color-gray-9)" } }}
                        icon={icon}
                        mt={30}
                    >
                        {errorText}
                    </Alert>
                )}
            </Container>
        </>
    );
}
