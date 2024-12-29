import React from "react";
import Header from "../components/atoms/Header";
import SplitPage from "../components/SplitPage";
import Footer from "../components/atoms/Footer";

interface SplitDetailsProps {}

const SplitDetails: React.FC<SplitDetailsProps> = () => {
	return (
		<>
			<Header />
			<SplitPage />
			<Footer />
		</>
	);
};

export default SplitDetails;
