import React from "react";
import { SplitContext } from "../Split";
import { PeopleSplitType } from "../Split/types";
import { getProperty, sortObject } from "../../components/utils";

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
		let eachCalculation: {
			[key: string]: {
				amount: number;
				name: string;
			};
		} = {};
		const paymentsToBeDone: { [key: string]: any } = {};
		splits.forEach((split) => {
			eachCalculation = {};
			split.paidBy.forEach((info: any) => {
				calculations[info.uid] = {
					amount: Number(
						Number(
							getProperty(calculations, [info.uid, "amount"], 0) + info.amount
						).toFixed(2)
					),
					name: info.name,
				};
				eachCalculation[info.uid] = {
					amount: Number(
						Number(
							getProperty(eachCalculation, [info.uid, "amount"], 0) +
								info.amount
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
				eachCalculation[info.uid] = {
					amount: Number(
						Number(
							getProperty(eachCalculation, [info.uid, "amount"], 0) -
								info.amount
						).toFixed(2)
					),
					name: info.name,
				};
			});
			const amountSortedEachCalc = sortObject(eachCalculation, "amount");
			const sortedIds = Object.keys(amountSortedEachCalc);
			const idOfPeopleOwed = sortedIds.filter(
				(key) => eachCalculation[key].amount > 0
			);
			let idOfPeopleOwe = sortedIds.filter(
				(key) => eachCalculation[key].amount < 0
			);
			idOfPeopleOwe = idOfPeopleOwe.reverse();
			let currentIdOfPeopleOwed = 0;
			let currentIdOfPeopleOwe = 0;
			const lengthOfPeopleOwed = idOfPeopleOwed.length;
			const lengthOfPeopleOwe = idOfPeopleOwe.length;
			while (
				currentIdOfPeopleOwed < lengthOfPeopleOwed &&
				currentIdOfPeopleOwe < lengthOfPeopleOwe
			) {
				if (
					getProperty(
						amountSortedEachCalc,
						[idOfPeopleOwed[currentIdOfPeopleOwed], "amount"],
						0
					) >=
					Math.abs(
						getProperty(
							amountSortedEachCalc,
							[idOfPeopleOwe[currentIdOfPeopleOwe], "amount"],
							0
						)
					)
				) {
					paymentsToBeDone[idOfPeopleOwed[currentIdOfPeopleOwed]] = {
						...getProperty(
							paymentsToBeDone,
							[idOfPeopleOwed[currentIdOfPeopleOwed]],
							{}
						),
						name: getProperty(
							amountSortedEachCalc,
							[idOfPeopleOwed[currentIdOfPeopleOwed], "name"],
							""
						),
						[idOfPeopleOwe[currentIdOfPeopleOwe]]: {
							...getProperty(
								paymentsToBeDone,
								[
									idOfPeopleOwed[currentIdOfPeopleOwed],
									idOfPeopleOwe[currentIdOfPeopleOwe],
								],
								amountSortedEachCalc[idOfPeopleOwe[currentIdOfPeopleOwe]]
							),
							amount:
								getProperty(
									paymentsToBeDone,
									[
										idOfPeopleOwed[currentIdOfPeopleOwed],
										idOfPeopleOwe[currentIdOfPeopleOwe],
										"amount",
									],
									0
								) +
								getProperty(amountSortedEachCalc, [
									idOfPeopleOwe[currentIdOfPeopleOwe],
									"amount",
								]),
						},
					};
					amountSortedEachCalc[idOfPeopleOwed[currentIdOfPeopleOwed]] = {
						...amountSortedEachCalc[idOfPeopleOwed[currentIdOfPeopleOwed]],
						amount: Number(
							(
								amountSortedEachCalc[idOfPeopleOwed[currentIdOfPeopleOwed]]
									.amount +
								amountSortedEachCalc[idOfPeopleOwe[currentIdOfPeopleOwe]].amount
							).toFixed(2)
						),
					};
					currentIdOfPeopleOwe += 1;
				} else {
					paymentsToBeDone[idOfPeopleOwed[currentIdOfPeopleOwed]] = {
						...getProperty(
							paymentsToBeDone,
							[idOfPeopleOwed[currentIdOfPeopleOwed]],
							{}
						),
						name: getProperty(
							amountSortedEachCalc,
							[idOfPeopleOwed[currentIdOfPeopleOwed], "name"],
							""
						),
						[idOfPeopleOwe[currentIdOfPeopleOwe]]: {
							...getProperty(
								amountSortedEachCalc,
								[idOfPeopleOwe[currentIdOfPeopleOwe]],
								{}
							),
							amount:
								getProperty(
									paymentsToBeDone,
									[
										idOfPeopleOwed[currentIdOfPeopleOwed],
										idOfPeopleOwe[currentIdOfPeopleOwe],
										"amount",
									],
									0
								) +
								-1 *
									getProperty(amountSortedEachCalc, [
										idOfPeopleOwed[currentIdOfPeopleOwed],
										"amount",
									]),
						},
					};
					amountSortedEachCalc[idOfPeopleOwed[currentIdOfPeopleOwed]] = {
						...amountSortedEachCalc[idOfPeopleOwed[currentIdOfPeopleOwed]],
						amount: 0,
					};
					currentIdOfPeopleOwed += 1;
				}
			}
		});
		setTotalMoneyOwed(getProperty(calculations, [myUID, "amount"], 0));
		if (returnCalculations) {
			return calculations;
		}
		if (getProperty(calculations, [myUID, "amount"], 0) > 0) {
			setPeopleSplits(
				Object.values(
					getProperty(paymentsToBeDone, [myUID], {}).filter(
						(item: any) => item.constructor.name !== "String"
					) as Array<PeopleSplitType>
				)
			);
		} else {
			setPeopleSplits(
				Object.keys(paymentsToBeDone)
					.filter((key: any) =>
						Object.keys(paymentsToBeDone[key]).includes(myUID)
					)
					.map((key) => ({
						name: getProperty(paymentsToBeDone, [key, "name"]),
						amount:
							-1 *
							Number(getProperty(paymentsToBeDone, [key, myUID, "amount"])),
					}))
			);
		}
	};

	return {
		splitState: state,
		setAllSplits,
		setTotalMoneyOwed,
		calculatePeopleSplit,
	};
};

export default useSplitActions;
