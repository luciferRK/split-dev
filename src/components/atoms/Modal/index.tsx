import React from "react";
import "./Modal.scss";
import { Show } from "../ShowIf";
import { classNames } from "uixtra/utils";

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
