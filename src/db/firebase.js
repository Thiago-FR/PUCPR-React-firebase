import Firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBjdbFAITFX7-gi5hCK8LRFtilxWvkDJTk",
    authDomain: "pucpr-14855.firebaseapp.com",
    projectId: "pucpr-14855",
    storageBucket: "pucpr-14855.appspot.com",
    messagingSenderId: "761295444397",
    appId: "1:761295444397:web:53871b665de21c4ca96924"
};

if (!Firebase.apps.length)
    Firebase.initializeApp(firebaseConfig);

export default Firebase;