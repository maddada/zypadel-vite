import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "src/firebase.config.js";
import { router } from "src/routes/Routes";
import "./index.css";

export function App() {
    // const location = useLocation();

    return (
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <React.StrictMode>
                <MantineProvider
                    theme={{
                        primaryColor: "blue",
                    }}
                >
                    <RouterProvider router={router} />
                </MantineProvider>
            </React.StrictMode>
        </FirebaseAppProvider>
    );
}

ReactDOM.createRoot(document.getElementById("root") || document.body).render(<App />);
