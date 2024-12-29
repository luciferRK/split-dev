import React from "react";
import "./Groups.scss";
import Header from "../../components/atoms/Header";

interface GroupsProps {}

const Groups: React.FC<GroupsProps> = () => {
	return (
		<>
			<Header />
			<div className='main-content groups'>Groups</div>
		</>
	);
};

export default Groups;
