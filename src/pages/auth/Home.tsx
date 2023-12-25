import { Container } from "@mantine/core";
import { Navigate } from "react-router-dom";
import { useSigninCheck } from "reactfire";

export default function Home() {
    const { status, data: signInCheckResult } = useSigninCheck();

    if (status === "loading") {
        return (
            <Container>
                <span>loading...</span>
            </Container>
        );
    }

    if (signInCheckResult.signedIn === false) {
        return <Navigate to="/login" replace />;
    }

    return <Navigate to="/book-padel-class" replace />;
}
