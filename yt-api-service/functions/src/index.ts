import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import {Firestore} from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";
import {Storage} from "@google-cloud/storage";
import {onCall} from "firebase-functions/v2/https";

initializeApp();

const firestore = new Firestore();
const storage = new Storage();

const rawVideoBucketName = "user-yt-raw-videos914";

// Event Driven Function when user is created in firebase auth.
export const createUser = functions.auth.user().onCreate((user) => {
  const userInfo = {
    uid: user.uid,
    email: user.email,
    photoUrl: user.photoURL,
  };

  firestore.collection("users").doc(user.uid).set(userInfo);
  logger.info(`User Created: ${JSON.stringify(userInfo)}`);
  return;
});

/**
 * Generates an signedURL which will upload to Cloud Storage.
 * This is required because our bucket is private, so we need
 * to authenticate the user before they can upload a video.
 */
export const generateUploadUrl = onCall({maxInstances: 1}, async (request) => {
  // Check if the user is authentication.
  if (!request.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }

  const auth = request.auth;
  const data = request.data;
  const bucket = storage.bucket(rawVideoBucketName);

  // Generate a unique filename for upload.
  const fileName = `${auth.uid}-${Date.now()}.${data.fileExtension}`;

  // Get a v4 signed URL for uploading file.
  const [url] = await bucket.file(fileName).getSignedUrl({
    version: "v4",
    action: "write", // Write is for upload.
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes.
  });

  return {url, fileName};
});
