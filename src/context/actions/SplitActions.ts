import React from "react";
import { SplitContext } from "../Split";
import { PeopleSplitType } from "../Split/types";

const useSplitActions = () => {
	const { state, dispatch } = React.useContext(SplitContext);

	const setAllSplits = (value: any) => {
		dispatch({ type: "SET_ALL_SPLITS", payload: value });
	};

	const setPeopleSplits = (value: Array<PeopleSplitType>) => {
		dispatch({ type: "SET_PEOPLE_SPLITS", payload: value });
	};

	return {
		splitState: state,
		setAllSplits,
		setPeopleSplits,
	};
};

export default useSplitActions;
