import React from "react";
import { Show } from "../atoms/ShowIf";
import classNames, { ifElse, or } from "../utils";
import Input from "../atoms/Input";
import Dropdown from "../atoms/Dropdown";
import { Option } from "../utils/constants";

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

	return (
		<div className={classNames("content-section paid-section", className)}>
			<div className='heading'>
				<span>{titleLeft}</span>
				<span>{titleRight}</span>
			</div>
			<div className='people'>
				{peopleInfo.map((info: any, index: number) => (
					<div
						className='user'
						key={info.uid}>
						<Dropdown
							options={options}
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
		</div>
	);
};

export default ContentSection;
