import React from "react";

interface ShowProps extends React.PropsWithChildren {
	if: boolean;
}

export const Show: React.FC<ShowProps> = (props) => {
	const { if: ifProp = false, children } = props;

	return <>{ifProp && children}</>;
};

export const ShowIfElse: React.FC<ShowProps> = (props) => {
	const { if: ifProp = false, children } = props;
	const childrenArray = React.Children.toArray(children);

	return (
		<>
			{childrenArray.length === 2 &&
				(ifProp ? childrenArray[0] : childrenArray[1])}
		</>
	);
};
