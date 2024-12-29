import React from "react";
import Menu from "./Menu";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
import { Show } from "../ShowIf";

interface HeaderProps {
	isAddNew?: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
	const { isAddNew = false } = props;
	const navigate = useNavigate();

	return (
		<header className='header'>
			<span
				onClick={() => {
					navigate("/");
				}}>
				<Show if={isAddNew}>Add New </Show>Split
			</span>
			<Menu />
		</header>
	);
};

export default Header;
