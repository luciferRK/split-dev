import React from "react";
import Header from "../components/atoms/Header";
import SplitPage from "../components/SplitPage";
import Footer from "../components/atoms/Footer";
import { useParams } from "react-router-dom";
import useFirebase from "../services/Firebase";
import useSplitActions from "../context/actions/SplitActions";

interface SplitDetailsProps {}

const SplitDetails: React.FC<SplitDetailsProps> = () => {
	const { id = null } = useParams();

	const { getAllSplits } = useFirebase();
	const { splitState } = useSplitActions();
	const { allSplits } = splitState;

	React.useEffect(() => {
		getAllSplits();
	}, []);

	return (
		<>
			<Header />
			{allSplits.loading ? (
				<div className='main-content split-page'>Loading!!</div>
			) : (
				<SplitPage id={id} />
			)}
			<Footer />
		</>
	);
};

export default SplitDetails;
