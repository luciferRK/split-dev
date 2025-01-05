import React from "react";
import classNames from "../../utils";
import { ShowIfElse } from "../ShowIf";
import { Link } from "react-router-dom";
import useFirebase from "../../../services/Firebase";

interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
	const [menuOpen, setMenuOpen] = React.useState(false);
	const { logout } = useFirebase();

	const getHamburger = () => (
		<div
			className={classNames("menu", {
				open: menuOpen,
			})}
			onClick={() => {
				setMenuOpen((prev) => !prev);
			}}>
			<div className='line' />
			<div className='line' />
			<div className='line' />
			<div className='line' />
		</div>
	);

	return (
		<ShowIfElse if={menuOpen}>
			<div className='expanded-menu'>
				<div className='menu-row'>
					{getHamburger()}
					<span className='heading'>Menu</span>
				</div>
				<div className='menu-content'>
					<Link to='/all-splits'>All Splits</Link>
					<Link to='/friends'>Friends</Link>
					<Link to='/groups'>Groups</Link>
				</div>
				<div className='logout'>
					<span
						onClick={() => {
							logout();
						}}>
						Logout
					</span>
				</div>
			</div>
			<>{getHamburger()}</>
		</ShowIfElse>
	);
};

export default Menu;
