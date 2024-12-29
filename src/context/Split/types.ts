export interface PeopleSplitType {
	name: string;
	amount: number;
}

export interface SplitContextStateType {
	totalAmountOwed: number;
	peopleSplit: {
		loading: boolean;
		data: Array<PeopleSplitType>;
	};
	allSplits: {
		loading: boolean;
		data: { [key: string]: any };
	};
}

export interface SplitContextType {
	state: SplitContextStateType;
	dispatch: React.Dispatch<{
		type: string;
		payload: any;
	}>;
}
