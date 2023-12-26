import { Flex } from "@mantine/core";
import { getAuth } from "firebase/auth";
import { Outlet, useLocation } from "react-router-dom";
import { AuthProvider, useFirebaseApp } from "reactfire";
import { ResponsiveHeader } from "src/layout/ResponsiveHeader";
import { links } from "src/routes/Routes";
import { motion } from "framer-motion";

declare global {
    interface Date {
        addDays(days: number): Date;
    }
}

const pageVariants = {
    initial: {
        opacity: 0,
    },
    in: {
        opacity: 1,
    },
    out: {
        opacity: 0,
    },
};

// const pageTransition = {
//     type: "tween",
//     ease: "anticipate",
//     duration: 0.6,
// };

const pageTransition = {
    type: "spring",
    damping: 10,
    stiffness: 100,
};

export default function Root() {
    const isInIframe = window.self !== window.top;
    const firebaseApp = useFirebaseApp();
    const auth = getAuth(firebaseApp);
    const { pathname } = useLocation();

    Date.prototype.addDays = function (days: number) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };

    return (
        <>
            <AuthProvider sdk={auth}>
                {!isInIframe && <ResponsiveHeader links={links}></ResponsiveHeader>}
                <motion.div key={pathname} initial="initial" animate="in" variants={pageVariants} transition={pageTransition}>
                    <Flex style={{ width: "100vw", height: "100vh", marginTop: "60px" }}>
                        <Outlet />
                    </Flex>
                </motion.div>
            </AuthProvider>
        </>
    );
}
