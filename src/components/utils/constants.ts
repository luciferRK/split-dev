export interface SplitDataType {
	title: string;
	amount?: number;
	type: "EQUAL" | "UNEQUAL" | "PERCENTAGE";
	paidBy: Array<any>;
	splits: Array<any>;
	paidByMap: { [key: string]: boolean };
	splitsMap: { [key: string]: boolean };
}

export interface Option {
	label: string;
	value: any;
}
