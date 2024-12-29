import React from "react";
import { SplitContextType, SplitContextStateType } from "./types";

const initialState: SplitContextStateType = {
	peopleSplit: {
		loading: true,
		data: [],
	},
	allSplits: { loading: true, data: [] },
};

export const SplitContext = React.createContext<SplitContextType>({
	state: initialState,
	dispatch: () => {},
});

const SplitContextReducer = (
	state: SplitContextStateType,
	action: {
		type: string;
		payload: any;
	}
) => {
	switch (action.type) {
		case "SET_PEOPLE_SPLIT":
			return {
				...state,
				peopleSplit: {
					loading: false,
					data: action.payload,
				},
			};
		case "SET_ALL_SPLITS":
			return {
				...state,
				allSplits: {
					loading: false,
					data: action.payload,
				},
			};
		default:
			return state;
	}
};

const SplitContextProvider = (props: React.PropsWithChildren) => {
	const { children } = props;

	const [state, dispatch] = React.useReducer(SplitContextReducer, initialState);
	return (
		<SplitContext.Provider value={{ state, dispatch }}>
			{children}
		</SplitContext.Provider>
	);
};

export default SplitContextProvider;
