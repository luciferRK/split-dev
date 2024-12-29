import { FirebaseApp } from "firebase/app";
import {
	addDoc,
	collection,
	doc,
	getDocs,
	getFirestore,
	or,
	query,
	where,
} from "firebase/firestore";
import { SplitDataType } from "../../components/utils/constants";
import { COLLECTIONS } from ".";
import useSplitActions from "../../context/actions/SplitActions";
import useUserActions from "../../context/actions/UserActions";

const useSplitStore = (app: FirebaseApp) => {
	const db = getFirestore(app);

	const {} = useSplitActions();
	const { userState } = useUserActions();

	const getCol = (name: string) => collection(db, name);

	// const getDocField = (collection: string, field: string) =>
	// 	doc(getCol(collection), field);

	const getAllSplits = () => {
		getDocs(
			query(
				getCol(COLLECTIONS.SPLITS),
				or(
					where("paidByUsers", "array-contains", userState.user.uid),
					where("splitsUsers", "array-contains", userState.user.uid)
				)
			)
		).then((result) => {
			console.log(result.size);
			result.forEach((item) => {
				console.log(item.data(), "getSplits");
			});
		});
	};

	const createSplit = (split: SplitDataType) =>
		addDoc(getCol(COLLECTIONS.SPLITS), {
			title: split.title,
			amount: split.amount,
			paidByUsers: split.paidBy.map((user) => user.uid),
			splitsUsers: split.splits.map((user) => user.uid),
			paidBy: split.paidBy.reduce(
				(prev, curr) => ({
					...prev,
					[curr.uid]: {
						name: curr.name,
						amount: curr.amount,
					},
				}),
				{}
			),
			splits: split.splits.reduce(
				(prev, curr) => ({
					...prev,
					[curr.uid]: {
						name: curr.name,
						amount: curr.amount,
					},
				}),
				{}
			),
		});

	return { createSplit, getAllSplits };
};

export default useSplitStore;
