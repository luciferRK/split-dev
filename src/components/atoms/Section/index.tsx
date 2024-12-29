import React from "react";
import "./Section.scss";

interface SectionProps extends React.PropsWithChildren {
	onClick?: Function;
}

const Section: React.FC<SectionProps> = (props) => {
	const { children, onClick = () => {} } = props;
	return (
		<div
			className='section'
			onClick={() => {
				onClick();
			}}>
			{children}
		</div>
	);
};

export default Section;
