import React from "react";
import "./Toaster.scss";
import { ToasterProps } from "./types";
import { X } from "../Icons";
import { and, classNames } from "uixtra/utils";

const Toaster: React.FC<ToasterProps> = (props) => {
	const {
		msg,
		desc,
		type,
		showClose,
		action,
		duration = 3000,
		destroy = () => {},
	} = props;

	const ref = React.useRef<HTMLDivElement>(null);

	const close = () => {
		ref.current?.classList.add("closing");
		setTimeout(() => {
			destroy();
		}, 700);
	};

	React.useEffect(() => {
		const timer = setTimeout(() => {
			close();
		}, duration);
		return () => clearTimeout(timer);
	});

	const getAction = () => action as { onClick: Function; title: string };

	return (
		<div
			className={classNames("toaster", `toast-${type}`)}
			ref={ref}>
			<div className='toast-content'>
				<div className='toast-title'>{msg}</div>
				<div className='toast-content'>{desc}</div>
			</div>
			<div className='toast-actions'>
				{and(
					Boolean(action),
					<>
						<span
							className={classNames("toast-action", { divider: showClose })}
							onClick={() => {
								getAction().onClick();
								close();
							}}>
							{getAction()?.title}
						</span>
					</>
				)}
				{and(
					showClose,
					<div
						className='toast-cancel'
						onClick={close}>
						<X />
					</div>
				)}
			</div>
		</div>
	);
};

export default Toaster;
