import { MantineProvider } from "@mantine/core";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { FirebaseAppProvider } from 'reactfire';
import { router } from "src/routes/Routes";
import { firebaseConfig } from "./firebaseConfig.js";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <React.StrictMode>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    colorScheme: "light",
                    colors: {
                        // deepBlue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */], // Add your color
                        // blue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */], // or replace default theme color
                    },
                    shadows: {
                        md: "1px 1px 3px rgba(0, 0, 0, .25)",
                        xl: "5px 5px 3px rgba(0, 0, 0, .25)",
                    },
                    headings: {
                        fontFamily: "Roboto, sans-serif",
                        sizes: {
                            h1: { fontSize: "3rem" },
                        },
                    },
                }}
            >
                <RouterProvider router={router} />
            </MantineProvider>
        </React.StrictMode>
    </FirebaseAppProvider>
);
