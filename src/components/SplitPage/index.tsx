import React from "react";
import "./SplitPage.scss";
import Input from "../atoms/Input";
import Dropdown from "../atoms/Dropdown";
import ReverseRender from "../atoms/ReverseRender";
import { Show } from "../atoms/ShowIf";
import ContentSection from "./ContentSection";
import useUserActions from "../../context/actions/UserActions";
import { getProperty, ifElse, isEmpty, or } from "../utils";
import { SplitDataType } from "../utils/constants";
import useFirebase from "../../services/Firebase";
import toast from "../atoms/Toaster";

interface SplitPageProps {
	isAddNew?: boolean;
	id?: string;
}

const SPLIT_TYPES = [
	"Equal",
	"Unequal",
	// "Percentage"
];

const EMPTY_SPLI_DATA: SplitDataType = {
	title: "",
	amount: undefined,
	type: "UNEQUAL",
	paidBy: [
		{
			uid: "",
			name: "",
			amount: undefined,
		},
	],
	splits: [
		{
			uid: "",
			name: "",
			amount: undefined,
		},
	],
	splitsMap: {},
	paidByMap: {},
};

const SplitPage: React.FC<SplitPageProps> = (props) => {
	const { isAddNew = false, id = null } = props;

	const { createSplit } = useFirebase();

	const { userState } = useUserActions();
	const { friends } = userState;

	const [errors, setErrors] = React.useState<Array<string>>([]);
	const [splitData, setSplitData] =
		React.useState<SplitDataType>(EMPTY_SPLI_DATA);

	React.useEffect(() => {}, [id]);

	const handleSplitAmountChangeForEqual = (type?: string) => {
		if (or(type && type === "EQUAL", splitData.type === "EQUAL")) {
			const equalAmount: any = (
				or(splitData.amount, 0) / splitData.splits.length
			).toFixed(2);
			setSplitData((prev) => ({
				...prev,
				splits: prev.splits.map((split) => ({
					...split,
					amount: equalAmount,
				})),
			}));
		}
	};

	const handleSubmit = () => {
		if (
			splitData.paidBy.reduce(
				(prev, curr) => Number(prev) + Number(curr.amount),
				0
			) !== splitData.amount
		) {
			toast.error({ msg: "PaidBy is not same as amount" });
			return;
		} else if (
			splitData.splits.reduce(
				(prev, curr) => Number(prev) + Number(curr.amount),
				0
			) !== splitData.amount
		) {
			toast.error({ msg: "Splits is not same as amount" });
			return;
		}
		const errs = Object.keys(splitData).filter((key) => {
			if (["paidBy", "splits"].includes(key)) {
				if (getProperty(splitData, [key]).length === 0) {
					return true;
				} else if (
					getProperty(splitData, [key]).filter((item: any) =>
						or(item.name === "", item.amount === 0)
					).length > 0
				) {
					return true;
				}
				return false;
			} else {
				return isEmpty(getProperty(splitData, [key]));
			}
		});
		setErrors(errs);
		if (errs.length === 0) {
			createSplit(splitData)
				.then(() => {
					toast.success({ msg: "Added", desc: "Split Added successfully" });
					setSplitData(EMPTY_SPLI_DATA);
				})
				.catch((err) => {
					toast.error({ msg: "Failed", desc: err });
				});
		}
	};

	return (
		<div className='main-content split-page'>
			<div className='split-title'>
				<Input
					placeholder='Split Title'
					value={splitData.title}
					onChange={(value) => {
						setSplitData((prev) => ({
							...prev,
							title: value,
						}));
					}}
				/>
				<Show if={errors.includes("title")}>
					<div className='error-msg'>Title cannot be empty</div>
				</Show>
			</div>
			<div className='subHeading-for-amount-type'>How to Split</div>
			<div className='amount-type'>
				<Input
					value={splitData.amount}
					type='number'
					onChange={(value) => {
						setSplitData((prev) => ({
							...prev,
							amount: Number(value),
						}));
					}}
					onBlur={() => {
						handleSplitAmountChangeForEqual();
					}}
					placeholder='Split Amount'
				/>
				<Dropdown
					className='split-type'
					iconBefore
					options={SPLIT_TYPES.map((type: string) => ({
						label: type,
						value: type.toUpperCase(),
					}))}
					showSearch={false}
					value={splitData.type}
					onSelect={(value: any) => {
						setSplitData((prev) => ({
							...prev,
							type: value,
						}));
						handleSplitAmountChangeForEqual(value);
					}}
				/>
			</div>

			<Show if={errors.includes("amount")}>
				<div className='amount-type error-msg'>Amount cannot be empty</div>
			</Show>
			<ReverseRender reverse={false}>
				<ContentSection
					className='paid-section'
					titleLeft='Paid By'
					titleRight='Their Split'
					peopleInfo={splitData.paidBy}
					isAdd={isAddNew}
					isError={errors.includes("paidBy")}
					type={splitData.type}
					options={[
						...friends.data.map((friend) => ({
							label: friend.name,
							value: friend.uid,
						})),
						{
							label: userState.user.name,
							value: userState.user.uid,
						},
					]}
					addNewEvent={() => {
						setSplitData((prev) => ({
							...prev,
							paidBy: [
								...prev.paidBy,
								{ uid: "", name: "", amount: undefined },
							],
						}));
					}}
					handleChange={(field, index, value, ifNoDuplicate = () => {}) => {
						if (field === "uid" && splitData.paidByMap[value]) {
							toast.error({ msg: "User Already added" });
							return;
						}
						ifNoDuplicate();
						setSplitData((prev) => {
							const prevPaidBy = { ...prev.paidBy[index] };
							prevPaidBy[field] = value;
							return {
								...prev,
								...ifElse(
									field === "uid",
									{
										paidByMap: {
											...prev.paidByMap,
											[value]: true,
										},
									},
									{}
								),
								paidBy: [
									...prev.paidBy.slice(0, index),
									prevPaidBy,
									...prev.paidBy.slice(index + 1),
								],
							};
						});
					}}
				/>
				<ContentSection
					className='division-section'
					titleLeft='People Included'
					titleRight='Their Split'
					isAdd={isAddNew}
					isError={errors.includes("splits")}
					addNewText='Add a New Person'
					options={[
						...friends.data.map((friend) => ({
							label: friend.name,
							value: friend.uid,
						})),
						{
							label: userState.user.name,
							value: userState.user.uid,
						},
					]}
					type={splitData.type}
					addNewEvent={() => {
						setSplitData((prev) => ({
							...prev,
							splits: [
								...prev.splits,
								{ uid: "", name: "", amount: undefined },
							],
						}));
					}}
					peopleInfo={splitData.splits}
					handleChange={(field, index, value, ifNoDuplicate = () => {}) => {
						if (field === "uid" && splitData.splitsMap[value]) {
							toast.error({ msg: "User Already added" });
							return;
						}
						ifNoDuplicate();
						console.log("line after ifNoDuplicate");
						setSplitData((prev) => {
							const prevSplit = { ...prev.splits[index] };
							prevSplit[field] = value;
							return {
								...prev,
								...ifElse(
									field === "uid",
									{
										splitsMap: {
											...prev.splitsMap,
											[value]: true,
										},
									},
									{}
								),
								splits: [
									...prev.splits.slice(0, index),
									prevSplit,
									...prev.splits.slice(index + 1),
								],
							};
						});
					}}
				/>
			</ReverseRender>
			<Show if={isAddNew}>
				<div className='submit-button'>
					<button
						type='button'
						onClick={() => {
							handleSubmit();
						}}>
						Create
					</button>
				</div>
			</Show>
		</div>
	);
};

export default SplitPage;
