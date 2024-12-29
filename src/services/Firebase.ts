import env from "./env";
import useFirebaseAuth from "./FirebaseAuth";
import { initializeApp } from "firebase/app";
import useFirestore from "./Firestore";
import useSplitStore from "./Firestore/Split";

const firebaseConfig = {
	apiKey: env.FIREBASE.API_KEY,
	authDomain: env.FIREBASE.AUTH_DOMAIN,
	projectId: env.FIREBASE.PROJECT_ID,
	storageBucket: env.FIREBASE.STORAGE_BUCKET,
	messagingSenderId: env.FIREBASE.MESSAGIN_SENDER_ID,
	appId: env.FIREBASE.APP_ID,
	measurementId: env.FIREBASE.MEASUREMENT_ID,
};

const useFirebase = () => {
	const app = initializeApp(firebaseConfig);

	const {
		getUser,
		createUser,
		getAllUsers,
		sendFriendRequest,
		getFriendRequests,
		getFriends,
		resolveFriendRequest,
		deleteFriend,
	} = useFirestore(app);

	const { login, logout } = useFirebaseAuth(app, {
		getUser,
		createUser,
	});

	const { createSplit, getAllSplits } = useSplitStore(app);

	return {
		login,
		logout,
		getAllUsers,
		sendFriendRequest,
		getFriendRequests,
		getFriends,
		resolveFriendRequest,
		deleteFriend,
		createSplit,
		getAllSplits,
	};
};

export default useFirebase;
