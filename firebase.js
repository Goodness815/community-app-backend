// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9lWqo6JJn-C7zq1VRY3kXy_B3SejFU-4",
  authDomain: "community-forum-ba0f1.firebaseapp.com",
  projectId: "community-forum-ba0f1",
  storageBucket: "community-forum-ba0f1.appspot.com",
  messagingSenderId: "460168866242",
  appId: "1:460168866242:web:775ef5dc7208a8dc8bce5b",
  measurementId: "G-Z7WCQN0T6L",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
// const analytics = getAnalytics(firebaseApp);

export { storage, ref, uploadBytes, getDownloadURL, deleteObject };
