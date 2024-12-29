import React from "react";
import "./Footer.scss";
import classNames from "../../utils";
import { Back, PlusMinus } from "../Icons";
import { useNavigate } from "react-router-dom";
import { ShowIfElse } from "../ShowIf";

interface FooterProps {
	isAddNewPage?: boolean;
}

const Footer: React.FC<FooterProps> = (props) => {
	const { isAddNewPage = false } = props;
	const navigate = useNavigate();

	const totalAmount = 4587.79;

	return (
		<footer className='footer'>
			<div className='total'>
				Total Money:{" "}
				<span className={classNames("amount", { less: totalAmount < 0 })}>
					{totalAmount}
				</span>
			</div>
			<div
				className='add-expense'
				onClick={() => {
					if (isAddNewPage) {
						navigate(-1);
					} else {
						navigate("/add-new-split");
					}
				}}>
				<ShowIfElse if={isAddNewPage}>
					<Back />
					<PlusMinus />
				</ShowIfElse>
			</div>
		</footer>
	);
};

export default Footer;
