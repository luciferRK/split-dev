import React, { HTMLInputTypeAttribute } from "react";
import "./Input.scss";

interface InputProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		keyof {
			onChange: unknown;
		}
	> {
	value?: any;
	onChange?: (value: string) => void;
	type?: HTMLInputTypeAttribute;
	disabled?: boolean;
}

const Input: React.FC<InputProps> = (props) => {
	const {
		value = "",
		onChange = () => {},
		type = "text",
		disabled = false,
		...restProps
	} = props;

	const [input, setInput] = React.useState<any>(value);

	React.useEffect(() => {
		setInput(value);
	}, [value]);

	return (
		<input
			className='input-field'
			onChange={(e) => {
				setInput(e.target.value);
				onChange(e.target.value);
			}}
			value={input}
			type={type}
			disabled={disabled}
			{...restProps}
		/>
	);
};

export default Input;
