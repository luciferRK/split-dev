import React from "react";
import Header from "../components/atoms/Header";
import SplitPage from "../components/SplitPage";
import Footer from "../components/atoms/Footer";
import useFirebase from "../services/Firebase";

interface AddNewSplitProps {}

const AddNewSplit: React.FC<AddNewSplitProps> = () => {
	const { getFriends } = useFirebase();

	React.useEffect(() => {
		getFriends();
	}, []);

	return (
		<>
			<Header isAddNew />
			<SplitPage isAddNew />
			<Footer isAddNewPage />
		</>
	);
};

export default AddNewSplit;
