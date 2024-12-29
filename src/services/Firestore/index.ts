import { FirebaseApp } from "firebase/app";
import {
	collection,
	doc,
	DocumentData,
	getFirestore,
	QuerySnapshot,
} from "firebase/firestore";
import { handleError, or } from "../../components/utils";
import getUserFunctions from "./Users";
import useUserActions from "../../context/actions/UserActions";
import { BasicUserType } from "../../context/User/types";
import getFriendsFunction from "./Friends";

export const COLLECTIONS = {
	USERS: "users",
	FRIENDS: "friends",
	SPLITS: "splits",
};

const useFirestore = (app: FirebaseApp) => {
	const db = getFirestore(app);

	const { userState, setAllUsers, setFriends, setFriendRequests } =
		useUserActions();

	const getCol = (name: string) => collection(db, name);

	const getDocField = (collection: string, field: string) =>
		doc(getCol(collection), field);

	//helper functions start
	const resolveFriendsArrayResponse = (
		result: QuerySnapshot<DocumentData, DocumentData>
	) => {
		const friends: Array<BasicUserType> = [];
		result.forEach((item) => {
			friends.push(item.data() as BasicUserType);
		});
		return friends;
	};
	//helper functions end

	const {
		getUser,
		createUser,
		getAllUsers: getAllUsersFirestore,
	} = getUserFunctions(getCol, getDocField);

	const {
		sendFriendReq,
		getFriendReqs,
		getFriends: getAllFriends,
		resolveFriendReq,
		removeFriend,
	} = getFriendsFunction(getCol, getDocField);

	const getAllUsers = (refetch: boolean = false) => {
		if (or(refetch, userState.allUsers.loading)) {
			getAllUsersFirestore(userState.friends.data.map((user) => user.uid))
				.then((result) => {
					const users: Array<any> = [];
					result.forEach((doc) => {
						users.push(doc.data());
					});
					setAllUsers(users.filter((user) => user.uid !== userState.user.uid));
				})
				.catch((err) => {
					handleError(err);
					setAllUsers([]);
				});
		}
	};

	const sendFriendRequest = (
		targetUID: string,
		onComplete = (_?: any) => {}
	) => {
		sendFriendReq(userState.user.uid, targetUID)
			.then(() => {
				onComplete();
			})
			.catch((error) => {
				onComplete(error);
			});
	};

	const getFriendRequests = (refetch: boolean = false) => {
		if (or(refetch, userState.friendRequests.loading)) {
			getFriendReqs(userState.user.uid)
				.then((result) => {
					setFriendRequests(resolveFriendsArrayResponse(result));
				})
				.catch((err) => {
					handleError(err);
					setFriendRequests([]);
				});
		}
	};

	const getFriends = (refetch: boolean = false) => {
		if (or(refetch, userState.friends.loading)) {
			getAllFriends(userState.user.uid)
				.then((result) => {
					setFriends(resolveFriendsArrayResponse(result));
				})
				.catch((err) => {
					handleError(err);
					setFriends([]);
				});
		}
	};

	const resolveFriendRequest = (
		targetUID: string,
		accept: boolean,
		onComplete: Function = (_: any) => {}
	) => {
		resolveFriendReq(`${targetUID}_${userState.user.uid}`, accept)
			.then(() => {
				onComplete();
			})
			.catch((err) => {
				onComplete(err);
			});
	};

	const deleteFriend = (
		targetUID: string,
		onComplete: Function = (_: any) => {}
	) => {
		removeFriend(userState.user.uid, targetUID)
			.then(() => {
				onComplete();
			})
			.catch((err) => {
				onComplete(err);
			});
	};

	return {
		getUser,
		createUser,
		getAllUsers,
		sendFriendRequest,
		getFriendRequests,
		getFriends,
		resolveFriendRequest,
		deleteFriend,
	};
};

export default useFirestore;
