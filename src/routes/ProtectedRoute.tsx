import { Container } from "@mantine/core";
import { Navigate } from "react-router-dom";
import { useSigninCheck } from "reactfire";

export default function ProtectedRoute({ redirectPath = "/login", children }) {
    const { status, data: signInCheckResult } = useSigninCheck();

    if (status === "loading") {
        return (
            <Container>
                <span>loading...</span>
            </Container>
        );
    }

    if (signInCheckResult.signedIn === false) {
        return <Navigate to={redirectPath} replace />;
    }

    return children;
}
