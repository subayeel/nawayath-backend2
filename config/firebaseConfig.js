import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyA--rxZTHTpQeCe5Z0n407kSFjnIwGcZPU",
	authDomain: "nawayath-foundation-2c872.firebaseapp.com",
	projectId: "nawayath-foundation-2c872",
	storageBucket: "nawayath-foundation-2c872.appspot.com",
	messagingSenderId: "131961899038",
	appId: "1:131961899038:web:3f73efa188b79bc31a060f",
};
// Use this to initialize the firebase App
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);