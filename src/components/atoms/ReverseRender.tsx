import React from "react";

interface ReverseRenderProps {
	reverse?: boolean;
	children: React.ReactNode;
}

const ReverseRender: React.FC<ReverseRenderProps> = (props) => {
	const { reverse = false, children } = props;
	const childrenArray = React.Children.toArray(children);

	return reverse ? childrenArray.reverse() : childrenArray;
};

export default ReverseRender;
