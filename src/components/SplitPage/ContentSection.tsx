import React from "react";
import { Show } from "../atoms/ShowIf";
import classNames, { ifElse, or } from "../utils";
import Input from "../atoms/Input";
import Dropdown from "../atoms/Dropdown";
import { Option } from "../utils/constants";
import Modal from "../atoms/Modal";
import useUserActions from "../../context/actions/UserActions";
import Section from "../atoms/Section";
import toast from "../atoms/Toaster";
import useFirebase from "../../services/Firebase";

interface ContentSectionProps {
	className?: string;
	titleLeft: string;
	titleRight: string;
	isAdd: boolean;
	addNewText?: string;
	peopleInfo: Array<any>;
	addNewEvent?: Function;
	options: Array<{ label: string; value: any }>;
	isError?: boolean;
	handleChange: (
		fieldName: string,
		index: number,
		value: any,
		ifNoDuplicate?: Function
	) => void;
	type: string;
}

const ContentSection: React.FC<ContentSectionProps> = (props) => {
	const {
		className = "",
		titleLeft,
		titleRight,
		isAdd,
		peopleInfo,
		addNewText = "Add",
		addNewEvent = () => {},
		options = [],
		handleChange = () => {},
		isError = false,
		type = "",
	} = props;

	const [selectGroupModal, setSelectGroupModal] = React.useState(false);
	const { getMyGroups } = useFirebase();
	const { userState } = useUserActions();
	const { groups } = userState;

	return (
		<div className={classNames("content-section paid-section", className)}>
			<div className='heading'>
				<span>{titleLeft}</span>
				<span>{titleRight}</span>
			</div>
			<hr />
			<div className='people'>
				{peopleInfo.map((info: any, index: number) => (
					<div
						className='user'
						key={info.uid}>
						<Dropdown
							options={options}
							extraOption={ifElse(
								titleLeft === "People Included",
								{
									label: "Add a Group",
									onClick: () => {
										getMyGroups();
										setSelectGroupModal(true);
									},
								},
								undefined
							)}
							value={ifElse(isAdd, info.uid, info.name)}
							disabled={!isAdd}
							optionOnSelect
							onlyOnValuePropChange
							onSelect={(option) => {
								handleChange("uid", index, (option as Option).value, () => {
									handleChange("name", index, (option as Option).label);
								});
							}}
						/>
						<Input
							type='number'
							value={info.amount}
							placeholder='amount'
							disabled={or(!isAdd, type === "EQUAL")}
							onChange={(value) => {
								handleChange("amount", index, value);
							}}
						/>
					</div>
				))}
			</div>
			<Show if={isAdd}>
				<div
					className='add-new'
					onClick={() => addNewEvent()}>
					{addNewText}
				</div>
			</Show>
			<Show if={isError}>
				<div className='error-msg'>Cannot be Empty</div>
			</Show>
			<Modal
				className='select-group-modal'
				open={selectGroupModal}
				handleClose={() => {
					setSelectGroupModal(false);
				}}>
				<div className='title'>Select Group</div>
				<div className='group-list'>
					{groups.data.map((group) => (
						<Section
							onClick={() => {
								const set2 = new Set(group.userIDs);
								const intersection = peopleInfo
									.map((info) => info.uid)
									.filter((email) => set2.has(email));
								if ([...new Set(intersection)].length === 0) {
									const names: { [key: string]: string } = options.reduce(
										(prev, curr) => ({
											...prev,
											[curr.value]: curr.label,
										}),
										{}
									);
									const groupUserLength = group.userIDs.length;
									let previousLength = peopleInfo.length - 1;
									group.userIDs.forEach((user, index) => {
										handleChange("uid", previousLength, user, () => {
											handleChange("name", previousLength, names[user]);
										});
										previousLength += 1;
										if (groupUserLength - 1 !== index) {
											addNewEvent();
										}
									});
									setSelectGroupModal(false);
								} else {
									toast.error({ msg: "Users in group are already added" });
								}
							}}
							key={group.title}>
							{group.title}
						</Section>
					))}
				</div>
			</Modal>
		</div>
	);
};

export default ContentSection;
