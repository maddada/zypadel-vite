import { Flex } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { ResponsiveHeader } from "src/layout/ResponsiveHeader";
import { links } from "src/routes/Routes";

export default function Root() {
    const isInIframe = window.self !== window.top;
    return (
        <>
            <ResponsiveHeader links={links} style={isInIframe ? { display: "none" } : {}}></ResponsiveHeader>
            <Flex style={{ width: "100vw", height: "90vh", marginTop: "60px" }}>
                <Outlet />
            </Flex>
        </>
    );
}
