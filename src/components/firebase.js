import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzi03gK8P1plIuMRlmZldm5rZWUk0IQ7w",
  authDomain: "todo-12ed2.firebaseapp.com",
  projectId: "todo-12ed2",
  storageBucket: "todo-12ed2.appspot.com",
  messagingSenderId: "794738441702",
  appId: "1:794738441702:web:baec63d714b466be70ea27",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
