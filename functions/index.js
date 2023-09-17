/* eslint-disable @typescript-eslint/no-var-requires */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.createUserDocument = functions.auth.user().onCreate(async (user) => {
    const newUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        providerData: user.providerData,
    };

    admin.firestore().collection("users").doc(user.uid).set(newUser);
});

exports.deleteUserDocuments = functions.auth.user().onDelete(async (user) => {
    const userId = user.uid;
    const userDocumentsRef = admin.firestore().collection("users").doc(userId).collection("documents");

    const snapshot = await userDocumentsRef.get();
    const batch = admin.firestore().batch();

    snapshot.forEach((doc) => {
        batch.delete(doc.ref);
    });

    return batch.commit();
});
