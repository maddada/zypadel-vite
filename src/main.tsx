import { MantineProvider } from "@mantine/core";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "src/routes/Routes";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                colorScheme: "dark",
                colors: {
                    deepBlue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */], // Add your color
                    blue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */], // or replace default theme color
                },
                shadows: {
                    md: "1px 1px 3px rgba(0, 0, 0, .25)",
                    xl: "5px 5px 3px rgba(0, 0, 0, .25)",
                },
                headings: {
                    fontFamily: "Roboto, sans-serif",
                    sizes: {
                        h1: { fontSize: "4rem" },
                    },
                },
            }}
        >
            <RouterProvider router={router} />
        </MantineProvider>
    </React.StrictMode>
);
