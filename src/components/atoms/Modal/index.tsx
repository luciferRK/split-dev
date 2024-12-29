import React from "react";
import "./Modal.scss";
import classNames from "../../utils";
import { Show } from "../ShowIf";

interface ModalProps extends React.PropsWithChildren {
	className?: string;
	open: boolean;
	handleClose: Function;
}

const Modal: React.FC<ModalProps> = (props) => {
	const { className = "", children, open, handleClose } = props;

	return (
		<Show if={open}>
			<div className={classNames("modal", className)}>
				<div
					className='modal-overlay'
					onClick={() => {
						handleClose();
					}}
				/>
				<div className='modal-content'>{children}</div>
			</div>
		</Show>
	);
};

export default Modal;
