import React from "react";
import "./Section.scss";

interface SectionProps extends React.PropsWithChildren {}

const Section: React.FC<SectionProps> = (props) => {
	const { children } = props;
	return <div className='section'>{children}</div>;
};

export default Section;
