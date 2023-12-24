import { Flex } from "@mantine/core";
import { getAuth } from 'firebase/auth';
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useFirebaseApp } from 'reactfire';
import { ResponsiveHeader } from "src/layout/ResponsiveHeader";
import { links } from "src/routes/Routes";
import { AuthProvider } from 'reactfire';

export default function Root() {
    const isInIframe = window.self !== window.top;
    const navigate = useNavigate();
    const firebaseApp = useFirebaseApp();
    const auth = getAuth(firebaseApp);

    const isLoggedIn = auth.currentUser !== null;

    useEffect(() => {
        // eslint-disable-next-line no-constant-condition
        if (window.location.pathname === "/" && !isLoggedIn) {
            // If at root page
            navigate("/login");
        }
    });

    return (
        <>
            <AuthProvider sdk={auth}>
                {!isInIframe && <ResponsiveHeader links={links}></ResponsiveHeader>}
                <Flex style={{ width: "100vw", height: "90vh", marginTop: "60px" }}>
                    <Outlet />
                </Flex>
            </AuthProvider>
        </>
    );
}
