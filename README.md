# Youtube Clone
# Project Link: https://yt-web-client-hcu7cia6ea-uc.a.run.app/
Creating a youtube clone to familarize myself with front-end development tools such as 
1. TypeScript
2. Next.js
3. Express.js
    - Using an express server.
4. Docker
    - Containerize Video Processing Service.
    - Containerize Web Client.
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
    - Host Web Client on Google Cloud Run.
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

Deploy
npm run deploy




#### TODO
##### Features
1. Add Customizable Thumbnails.
2. Ability for User to Delete Videos.
    - Users can only delete their own videos.
    - Admin can delete any video.
3. Add user's profile picture and email to Web Client.
4. Allow users to upload thumbnails for their videos.
5. Allow user's to add a title and description to their videos.
6. Show the uploader of a video.
7. Allow user's to subscribe to other user's channels.

##### Code Optimization
1. Refactor code.
    - Reusing video interface alot in different files.
    - video-service index.ts is getting a little long, add functions.
 2. Shorten the time limit for the signed URL to 1 minute.   
    - The signed URL is only used to authenticate the upload request. After the upload request is authenticated, the upload will continue until it is completed.
    - Therefore, it doesn't need it's 15 minute time limit.
3.  Look into different video streaming soultions such as DASH or HLS.
4.  Clean up raw videos in Cloud Storage after processing.
5.  Use a CDN to serve videos.
6.  Add unit and integration tests.

##### Bugs
1. Sometimes it adds videos that are not working and seen as undefined.
2. Prevent processing videos from showing up in UI.
3. If video takes 600 seconds or longer to process, it won't finish.
    - Pub/Sub max ack deadline is 600 seconds so it will close the HTTP connection.
    - Therefore, Cloud Run with a max request processing time of 3600 seconds will finish processing, but can't send ack to Pub/Sub.
    - Refer to article for potential fix.
4. Allow users to upload multiple videos without refreshing the page.

