import React from "react";
import "./AllSplits.scss";
import Header from "../../components/atoms/Header";
import Footer from "../../components/atoms/Footer";

interface AllSplitsProps {}

const AllSplits: React.FC<AllSplitsProps> = () => {
	return (
		<>
			<Header />
			<div className='main-content all-splits'>All Splits</div>
			<Footer />
		</>
	);
};

export default AllSplits;
