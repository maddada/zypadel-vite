# Starts the development server.
npm run dev

# Builds the app for production.
npm run build

# Runs the built app in production mode.
npm start

# npm install from lock file
npm ci

# install firebase tools
npm install -g firebase-tools

# initialize firebase
# Fixed issue with old firebase tools version appearing when doing a "firebase -V" by downloading firebase-tools-instant-win.exe
# Then using the cmd window that appears to cd to the project's folder and init from there
firebase init

# Deploy the Firebase Cloud Functions
firebase deploy --only functions