import { Flex } from "@mantine/core";
import { getAuth } from "firebase/auth";
import { Outlet } from "react-router-dom";
import { AuthProvider, useFirebaseApp } from "reactfire";
import { ResponsiveHeader } from "src/layout/ResponsiveHeader";
import { links } from "src/routes/Routes";

declare global {
    interface Date {
        addDays(days: number): Date;
    }
}

export default function Root() {
    const isInIframe = window.self !== window.top;
    const firebaseApp = useFirebaseApp();
    const auth = getAuth(firebaseApp);

    Date.prototype.addDays = function (days: number) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };

    return (
        <>
            <AuthProvider sdk={auth}>
                {!isInIframe && <ResponsiveHeader links={links}></ResponsiveHeader>}
                <Flex style={{ width: "100vw", height: "100vh", marginTop: "60px" }}>
                    <Outlet />
                </Flex>
            </AuthProvider>
        </>
    );
}
