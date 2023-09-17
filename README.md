# ZY Padel Scheduling App using React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh  

&nbsp;
# Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

&nbsp;

# Commands
### Start the development server
`npm run dev`
&nbsp;
### Builds the app for production.
`npm run build`
&nbsp;
### Run the built app in production mode
`npm start`
&nbsp;
### npm install from lock file
`npm ci`
&nbsp;
### install firebase tools
`npm install -g firebase-tools`
&nbsp;
### initialize firebase
Fixed an issue with old firebase tools version appearing when doing a "firebase -V" by downloading firebase-tools-instant-win.exe
Then using the cmd window that appears to cd to the project's folder and init from there `firebase init`

### Deploy the Firebase Cloud Functions
`firebase deploy --only functions`