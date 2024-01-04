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
8. Firebase Firestore
9. Google Cloud Storage
    - Converts the videos hosted on Google Cloud Storage.
    - Two buckets for raw video and processed video.
        - Raw video bucket has a notification that sends the file name as a json, so the program knows the file to process.
10. Google Cloud Pub/Sub
    - Directly push a request to the Cloud Run service.
11. Google Cloud Run
    - Host Video Processing Service on Google Cloud Run.
        - Push docker image into Google Cloud.

## Steps
1. A user uploads a video to Google Cloud Storage.
2. The video processing service will be notified of the upload via Cloud Pub/Sub.
3. The video processing service will download the video from Google Cloud Storage.
4. The video processing service will process the video.
5. The video processing service will upload the processed video to Google Cloud Storage.

### Notes

Run docker image.\
docker run -p 3000:3000 -d video-processing-service
