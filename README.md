# Youtube Clone
Creating a youtube clone to familarize myself with front-end development tools such as 
1. TypeScript
2. Next.js
3. Express.js
    - Using an express server.
4. Docker
    - Containerize Video Processing Service.
5. FFmpeg
    - Process Videos in 360p.
6. Firebase Auth
    - Add Firebase SDK with Auth Handlers
7. Firebase Functions
    -  Create a function that will be triggered whenever a new user is created in Firebase Auth.
        - This additional information about each user will be pushed in the Firestore database.
8. Firebase Firestore
    - Stores aditional infomation about the user, such as username, profile picture, etc.
    - Programmatically add data to database via Ui.
9. Google Cloud Storage
    - Converts the videos hosted on Google Cloud Storage.
    - Two buckets for raw video and processed video.
        - Raw video bucket has a notification that sends the file name as a json, so the program knows the file to process.
10. Google Cloud Pub/Sub
    - Directly push a request to the Cloud Run service.
11. Google Cloud Run
    - Host Video Processing Service on Google Cloud Run.
        - Push docker image into Google Cloud.

## Video Storage Steps
1. A user uploads a video to Google Cloud Storage.
2. The video processing service will be notified of the upload via Cloud Pub/Sub.
3. The video processing service will download the video from Google Cloud Storage.
4. The video processing service will process the video.
5. The video processing service will upload the processed video to Google Cloud Storage.

### Uploading Video to Cloud Storage Steps
1. Click the upload button in UI.
    - Have to be an authenticated user.
2. OnClick, will invoke a function (generateUploadUrl) that create a signedURL which will upload to Cloud Storage.
    - Needed to grant Firebase Functions' Service Account access to raw videos bucket.
    - Needed to add Token Creator Role to generateUploadUrl Function.

## User Auth. Steps
1. Sign in or sign out using Firebase auth.
2. There is a firebase function that is trigged on user.onCreate() which will put user's data into Firebase database.


### Notes

Run docker image.\
docker run -p 3000:3000 -d video-processing-service
