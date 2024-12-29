import {
	and,
	CollectionReference,
	deleteDoc,
	DocumentData,
	DocumentReference,
	getDoc,
	getDocs,
	or,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import { COLLECTIONS } from ".";

const getFriendsFunction = (
	getCol: (name: string) => CollectionReference<DocumentData, DocumentData>,
	getDocField: (
		collection: string,
		field: string
	) => DocumentReference<DocumentData, DocumentData>
) => {
	const getFriends = async (myUID: string) => {
		const q = query(
			getCol(COLLECTIONS.FRIENDS),
			and(
				or(
					and(
						where("__name__", ">=", myUID),
						where("__name__", "<=", myUID + "\uf8ff")
					),
					where("idSuffix", "==", myUID)
				),
				where("accepted", "==", true)
			)
		);
		const friedsResponse = await getDocs(q);
		const userIDs: Array<string> = [];
		friedsResponse.forEach((item) => {
			const uids = item.id.split("_");
			userIDs.push(...uids.filter((id: string) => id !== myUID));
		});
		if (userIDs.length === 0) {
			throw "CUS:ERR: No Friends Found";
		}
		return getDocs(
			query(getCol(COLLECTIONS.USERS), where("uid", "in", userIDs))
		);
	};

	const getFriendReqs = async (myUID: string) => {
		const q = query(
			getCol(COLLECTIONS.FRIENDS),
			where("idSuffix", "==", myUID),
			where("accepted", "==", false)
		);
		const friedsResponse = await getDocs(q);
		const userIDs: Array<string> = [];
		friedsResponse.forEach((item) => {
			console.log("inside item of query of friend request", item, item.data());
			const uid = item.id.split("_")[0];
			userIDs.push(uid);
		});
		if (userIDs.length === 0) {
			throw "CUS:ERR: No Friends Found";
		}
		return getDocs(
			query(getCol(COLLECTIONS.USERS), where("uid", "in", userIDs))
		);
	};

	const sendFriendReq = async (myUID: string, targetUID: string) => {
		const frReq = await getDoc(
			getDocField(COLLECTIONS.FRIENDS, `${targetUID}_${myUID}`)
		);
		if (frReq.exists()) {
			throw "Check Friend Requests";
		}
		return setDoc(getDocField(COLLECTIONS.FRIENDS, `${myUID}_${targetUID}`), {
			accepted: false,
			idSuffix: targetUID,
		});
	};

	const resolveFriendReq = (fieldID: string, accept: boolean = true) => {
		if (accept) {
			return setDoc(getDocField(COLLECTIONS.FRIENDS, fieldID), {
				accepted: true,
				idSuffix: fieldID.split("_")[1],
			});
		} else {
			return deleteDoc(getDocField(COLLECTIONS.FRIENDS, fieldID));
		}
	};

	const removeFriend = async (myUID: string, targetUID: string) => {
		const friendQuery = query(
			getCol(COLLECTIONS.FRIENDS),
			or(
				and(
					where("idSuffix", "==", myUID),
					where("__name__", ">=", targetUID),
					where("__name__", "<=", targetUID + "\uf8ff")
				),
				and(
					where("idSuffix", "==", targetUID),
					where("__name__", ">=", myUID),
					where("__name__", "<=", myUID + "\uf8ff")
				)
			)
		);
		const friendEntry = await getDocs(friendQuery);
		let friendId = undefined;
		friendEntry.forEach((item) => {
			friendId = item.id;
		});
		if (friendId) {
			return deleteDoc(getDocField(COLLECTIONS.FRIENDS, friendId));
		} else {
			throw "Friend not found";
		}
	};

	return {
		sendFriendReq,
		getFriends,
		getFriendReqs,
		resolveFriendReq,
		removeFriend,
	};
};

export default getFriendsFunction;
