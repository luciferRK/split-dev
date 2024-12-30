import {
	addDoc,
	CollectionReference,
	deleteDoc,
	DocumentData,
	DocumentReference,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { COLLECTIONS } from ".";

const getGroupFunctions = (
	getCol: (name: string) => CollectionReference<DocumentData, DocumentData>,
	getDocField: (
		collection: string,
		field: string
	) => DocumentReference<DocumentData, DocumentData>
) => {
	const getMyGroups = (myUID: string) =>
		getDocs(query(getCol(COLLECTIONS.GROUPS), where("owner", "==", myUID)));

	const deleteGroup = (id: string) =>
		deleteDoc(getDocField(COLLECTIONS.GROUPS, id));

	const createGroup = (
		info: {
			title: string;
			userIDs: Array<string>;
		},
		myUID: string
	) =>
		addDoc(getCol(COLLECTIONS.GROUPS), {
			...info,
			owner: myUID,
		});

	return { createGroup, getMyGroups, deleteGroup };
};

export default getGroupFunctions;
