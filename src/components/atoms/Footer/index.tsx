import React from "react";
import "./Footer.scss";
import { Back, PlusMinus } from "../Icons";
import { useNavigate } from "react-router-dom";
import { ShowIfElse } from "../ShowIf";
import useSplitActions from "../../../context/actions/SplitActions";
import { classNames } from "uixtra/utils";

interface FooterProps {
	isAddNewPage?: boolean;
}

const Footer: React.FC<FooterProps> = (props) => {
	const { isAddNewPage = false } = props;
	const navigate = useNavigate();

	const { splitState } = useSplitActions();
	const { totalAmountOwed } = splitState;

	return (
		<footer className='footer'>
			<div className='total'>
				Total Money:&nbsp;
				<span className={classNames("amount", { less: totalAmountOwed < 0 })}>
					{Math.abs(totalAmountOwed)}
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
