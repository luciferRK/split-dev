import React from "react";
import { SplitContext } from "../Split";
import { PeopleSplitType } from "../Split/types";
import { getProperty } from "../../components/utils";

const useSplitActions = () => {
	const { state, dispatch } = React.useContext(SplitContext);

	const setAllSplits = (value: any) => {
		dispatch({ type: "SET_ALL_SPLITS", payload: value });
	};

	const setTotalMoneyOwed = (value: number) => {
		dispatch({ type: "SET_TOTAL_OWED", payload: value });
	};

	const setPeopleSplits = (value: Array<PeopleSplitType>) => {
		dispatch({ type: "SET_PEOPLE_SPLIT", payload: value });
	};

	const calculatePeopleSplit = (
		splitDataObj: { [key: string]: any },
		myUID: string,
		returnCalculations: boolean = false
	) => {
		const splits = Object.values(splitDataObj);
		const calculations: {
			[key: string]: {
				amount: number;
				name: string;
			};
		} = {};
		splits.forEach((split) => {
			split.paidBy.forEach((info: any) => {
				calculations[info.uid] = {
					amount: Number(
						Number(
							getProperty(calculations, [info.uid, "amount"], 0) + info.amount
						).toFixed(2)
					),
					name: info.name,
				};
			});
			split.splits.forEach((info: any) => {
				calculations[info.uid] = {
					amount: Number(
						Number(
							getProperty(calculations, [info.uid, "amount"], 0) - info.amount
						).toFixed(2)
					),
					name: info.name,
				};
			});
		});
		setTotalMoneyOwed(calculations[myUID].amount);
		if (!returnCalculations) {
			delete calculations[myUID];
			setPeopleSplits(Object.values(calculations));
		} else {
			return calculations;
		}
	};

	return {
		splitState: state,
		setAllSplits,
		setPeopleSplits,
		setTotalMoneyOwed,
		calculatePeopleSplit,
	};
};

export default useSplitActions;
