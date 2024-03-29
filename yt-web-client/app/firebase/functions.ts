import { httpsCallable } from 'firebase/functions';
import { initializeApp } from "firebase/app";
import { functions } from './firebase'; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMLMHTl5WAKDf1Jnrw59WW0d6y2Q65bss",
  authDomain: "yt-clone-ebb95.firebaseapp.com",
  projectId: "yt-clone-ebb95",
  appId: "1:645884942329:web:882ff661ef5e0b974f4f28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const generateUploadUrlFunction = httpsCallable(functions, 'generateUploadUrl');
const getVideosFunction = httpsCallable(functions, 'getVideos');

export interface Video {
  id?: string,
  uid?: string,
  filename?: string,
  status?: 'processing' | 'processed',
  title?: string,
  description?: string
}

export async function uploadVideo(file: File) {
  const response: any = await generateUploadUrlFunction({
    fileExtension: file.name.split('.').pop()
  });

  // Upload the file to the signed URL
  const uploadResult = await fetch(response?.data?.url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  return uploadResult;
}

export async function getVideos() {
  const response = await getVideosFunction();
  return response.data as Video[];
}