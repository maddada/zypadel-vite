import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        checker({ // vite-plugin-checker, shows ts errors in vscode and the browser
            typescript: true,
            eslint: {
                // for example, lint .ts and .tsx
                lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
            },
        }),
    ],
});
