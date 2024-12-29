import { FirebaseApp } from "firebase/app";
import {
	addDoc,
	collection,
	// doc,
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
import { handleError } from "../../components/utils";

const useSplitStore = (app: FirebaseApp) => {
	const db = getFirestore(app);

	const { setAllSplits, splitState, calculatePeopleSplit } = useSplitActions();
	const { userState } = useUserActions();

	const getCol = (name: string) => collection(db, name);

	// const getDocField = (collection: string, field: string) =>
	// 	doc(getCol(collection), field);

	const getAllSplits = (refetch = false, doPeopleSplit: boolean = false) => {
		if (refetch || splitState.allSplits.loading) {
			getDocs(
				query(
					getCol(COLLECTIONS.SPLITS),
					or(
						where("paidByUsers", "array-contains", userState.user.uid),
						where("splitsUsers", "array-contains", userState.user.uid)
					)
				)
			)
				.then((result) => {
					const allSplits: { [key: string]: any } = {};
					result.forEach((item) => {
						const data = item.data();
						allSplits[item.id] = {
							id: item.id,
							amount: data.amount,
							paidBy: Object.keys(data.paidBy).map((key) => ({
								uid: key,
								...data.paidBy[key],
							})),
							splits: Object.keys(data.splits).map((key) => ({
								uid: key,
								...data.splits[key],
							})),
							title: data.title,
						};
					});
					setAllSplits(allSplits);
					if (doPeopleSplit) {
						calculatePeopleSplit(allSplits, userState.user.uid);
					}
				})
				.catch((err) => {
					setAllSplits({});
					handleError(err);
				});
		}
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
