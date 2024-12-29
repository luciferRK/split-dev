import React from "react";
import Menu from "./Menu";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
import { Show } from "../ShowIf";
import useUserActions from "../../../context/actions/UserActions";

interface HeaderProps {
	isAddNew?: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
	const { isAddNew = false } = props;
	const navigate = useNavigate();
	const { toggleTheme } = useUserActions();

	return (
		<header className='header'>
			<span
				onClick={() => {
					navigate("/");
				}}>
				<Show if={isAddNew}>Add New </Show>S<span onClick={toggleTheme}>p</span>
				lit
			</span>
			<Menu />
		</header>
	);
};

export default Header;
