// Updated with Firebase Analytics integration

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM client for React 18
import { Helmet } from 'react-helmet';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getAnalytics, logEvent } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBBKEtKhQxLHqW2_0EdsEVTuLt7Lv4CfUw",
  authDomain: "tubesitekjr.firebaseapp.com",
  projectId: "tubesitekjr",
  storageBucket: "tubesitekjr.appspot.com",
  messagingSenderId: "473479812718",
  appId: "1:473479812718:web:c624f35de40266c3e4f87f",
  measurementId: "G-2C4MC1HN74"
};

const ADMIN_UID = "kyleforotherstuff123@gmail.com";

const App = () => {
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [storage, setStorage] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isAgeVerified, setIsAgeVerified] = useState(() => localStorage.getItem('isAgeVerified') === 'true');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadCategory, setUploadCategory] = useState('');
  const [uploadTags, setUploadTags] = useState('');
  const [uploadVideoFile, setUploadVideoFile] = useState(null);
  const [uploadThumbnailFile, setUploadThumbnailFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [adminVideos, setAdminVideos] = useState([]);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const firebaseAuth = getAuth(app);
    const firebaseStorage = getStorage(app);
    const firebaseAnalytics = getAnalytics(app);

    setDb(firestore);
    setAuth(firebaseAuth);
    setStorage(firebaseStorage);
    setAnalytics(firebaseAnalytics);

    logEvent(firebaseAnalytics, 'site_visited');

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        setUserId(user.uid);
        logEvent(firebaseAnalytics, 'login', { method: 'anonymous' });
      } else {
        try {
          await signInAnonymously(firebaseAuth);
        } catch (error) {
          console.error('Auth error:', error);
        }
      }
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center">
      <Helmet>
        <title>Intimate Videos</title>
      </Helmet>
      <header className="w-full p-4 bg-zinc-800 shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-bold">Intimate Videos</h1>
        {/* Placeholder for navigation/buttons */}
        <button className="px-4 py-2 bg-blue-600 rounded-md">Upload</button>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {/* Placeholder for video list or content */}
        <p className="text-lg">Content will appear here.</p>
        {isAuthReady && userId && <p className="text-sm">User ID: {userId}</p>}
        }
      </main>
      <footer className="w-full p-4 bg-zinc-800 shadow-md text-center text-sm">
        &copy; 2025 Intimate Videos
      </footer>
    </div>
  );
};

export default App;

// Render the App component using React 18's createRoot
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found!');
}