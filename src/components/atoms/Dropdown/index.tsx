import React, { useState } from "react";
import { Show, ShowIfElse } from "../ShowIf";
import "./Dropdown.scss";
import { ChevronDown, ChevronUp } from "../Icons";
import classNames, {
	and,
	ifElse,
	isEmpty,
	isNullOrUndefined,
	or,
} from "../../utils";
import Input from "../Input";
import ReverseRender from "../ReverseRender";
import { Option } from "../../utils/constants";

interface DropdownProps {
	className?: string;
	options: Array<Option>;
	optionOnSelect?: boolean;
	onSelect: (option: string | Option) => void;
	value?: any;
	iconBefore?: boolean;
	showSearch?: boolean;
	disabled?: boolean;
	loading?: boolean;
	onlyOnValuePropChange?: boolean;
	extraOption?: {
		label: string;
		onClick: Function;
	};
}

const Dropdown: React.FC<DropdownProps> = (props) => {
	const {
		className = "",
		options,
		onSelect,
		value = null,
		iconBefore = false,
		showSearch = true,
		disabled = false,
		loading = false,
		optionOnSelect = false,
		onlyOnValuePropChange = false,
		extraOption = undefined,
	} = props;
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState<any>(value);
	const [inputFieldValue, setInputFieldValue] = useState("");

	const [mouseDownEvent, setMouseDownEvent] = useState<any>(null);
	const [userDropdownInFocus, setUserDropdownInFocus] = useState(false);

	const [search, setSearch] = useState<any>("");

	React.useEffect(() => {
		if (!isNullOrUndefined(value)) {
			setSelected(value);
		}
	}, [value]);

	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	const handleOptionClick = (option: Option) => {
		if (!onlyOnValuePropChange) {
			setSelected(option.value);
		}
		onSelect(ifElse(optionOnSelect, option, option.value));
		setSearch("");
		setIsOpen(false);
	};

	React.useEffect(() => {
		if (isEmpty(search) && !userDropdownInFocus) {
			setInputFieldValue(
				or(options.find((item) => item.value === selected)?.label, "")
			);
		} else {
			setInputFieldValue(search);
		}
	}, [search, selected]);

	React.useEffect(() => {
		if (!isOpen) {
			setMouseDownEvent(null);
		}
	}, [isOpen]);

	return (
		<div className={classNames("dropdown", className)}>
			<div className={classNames("dropdown-header", { disabled })}>
				<ShowIfElse if={disabled}>
					<>
						<span>{value}</span>
					</>
					<ReverseRender reverse={iconBefore}>
						<ShowIfElse if={showSearch}>
							<Input
								value={inputFieldValue}
								onChange={(value) => setSearch(value)}
								placeholder='Select an option'
								onFocus={() => {
									setIsOpen(true);
									setUserDropdownInFocus(true);
								}}
								onBlur={() => {
									if (mouseDownEvent === null) {
										if (isEmpty(search)) {
											setInputFieldValue(
												or(
													options.find((item) => item.value === selected)
														?.label,
													""
												)
											);
										}
										setIsOpen(false);
									}
									setUserDropdownInFocus(false);
								}}
							/>
							<span
								style={{ textAlign: ifElse(iconBefore, "right", "left") }}
								onClick={toggleDropdown}>
								{or(
									options.find((item) => item.value === selected)?.label,
									"Select"
								)}
							</span>
						</ShowIfElse>
						<ShowIfElse if={isOpen}>
							<ChevronUp onClick={toggleDropdown} />
							<ChevronDown onClick={toggleDropdown} />
						</ShowIfElse>
					</ReverseRender>
				</ShowIfElse>
			</div>
			<Show if={isOpen}>
				<div className='dropdown-list'>
					<ShowIfElse if={loading}>
						<div
							className={classNames("dropdown-option")}
							style={{ textAlign: "center" }}>
							Loading!!
						</div>
						<>
							{options
								.filter((item) => {
									if (!isEmpty(search)) {
										return or(
											item.label.toLowerCase().includes(search.toLowerCase()),
											item.value
												.toString()
												.toLowerCase()
												.includes(search.toLowerCase())
										);
									}
									return true;
								})
								.map((option) => (
									<div
										key={option.value}
										onMouseDown={(e) => {
											setMouseDownEvent(e.target);
										}}
										className={classNames("dropdown-option", {
											right: iconBefore,
										})}
										onClick={() => {
											handleOptionClick(option);
										}}>
										{option.label}
									</div>
								))}
							{and(
								!isNullOrUndefined(extraOption),
								<div
									onMouseDown={(e) => {
										setMouseDownEvent(e.target);
									}}
									className={classNames("dropdown-option", {
										right: iconBefore,
									})}
									onClick={() => {
										extraOption?.onClick();
										setIsOpen(false);
									}}>
									{extraOption?.label}
								</div>
							)}
						</>
					</ShowIfElse>
				</div>
			</Show>
		</div>
	);
};

export default Dropdown;
