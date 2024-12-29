export interface PeopleSplitType {
	name: string;
	amount: number;
}

export interface SplitContextStateType {
	peopleSplit: {
		loading: boolean;
		data: Array<PeopleSplitType>;
	};
	allSplits: {
		loading: boolean;
		data: Array<any>;
	};
}

export interface SplitContextType {
	state: SplitContextStateType;
	dispatch: React.Dispatch<{
		type: string;
		payload: any;
	}>;
}
