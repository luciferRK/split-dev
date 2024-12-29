import {
	CollectionReference,
	DocumentData,
	DocumentReference,
	getDoc,
	getDocs,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import { COLLECTIONS } from ".";
import { handleError } from "../../components/utils";
import { BasicUserType } from "../../context/User/types";

const getUserFunctions = (
	getCol: (name: string) => CollectionReference<DocumentData, DocumentData>,
	getDocField: (
		collection: string,
		field: string
	) => DocumentReference<DocumentData, DocumentData>
) => {
	const getUser = (
		email: string,
		options: {
			onFound: Function;
			onNotFound: Function;
			onError: Function;
		} = {
			onFound: () => {},
			onNotFound: () => {},
			onError: (err: any) => {
				handleError(err);
			},
		}
	) => {
		const { onFound, onNotFound, onError } = options;
		getDoc(getDocField(COLLECTIONS.USERS, email))
			.then((d) => {
				if (d.exists()) {
					onFound(d.data());
				} else {
					onNotFound();
				}
			})
			.catch((error) => {
				onError(error);
			});
	};

	const createUser = (info: BasicUserType) =>
		setDoc(getDocField(COLLECTIONS.USERS, info.email), info);

	const getAllUsers = (friends: Array<string>) => {
		if (friends.length === 0) {
			return getDocs(getCol(COLLECTIONS.USERS));
		} else {
			return getDocs(
				query(getCol(COLLECTIONS.USERS), where("uid", "not-in", friends))
			);
		}
	};

	return {
		getUser,
		createUser,
		getAllUsers,
	};
};

export default getUserFunctions;
