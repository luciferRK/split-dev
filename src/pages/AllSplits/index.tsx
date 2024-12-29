import React from "react";
import "../Home/Home.scss";
import Header from "../../components/atoms/Header";
import Footer from "../../components/atoms/Footer";
import Section from "../../components/atoms/Section";
import classNames from "../../components/utils";
import useSplitActions from "../../context/actions/SplitActions";
import useFirebase from "../../services/Firebase";
import { useNavigate } from "react-router-dom";

interface AllSplitsProps {}

const AllSplits: React.FC<AllSplitsProps> = () => {
	const { splitState } = useSplitActions();
	const { allSplits } = splitState;

	const navigate = useNavigate();

	const { getAllSplits } = useFirebase();

	React.useEffect(() => {
		getAllSplits();
	}, []);

	return (
		<>
			<Header />
			<div className='main-content all-splits'>
				<div className='heading'>All Splits</div>
				<div className='splits'>
					{Object.values(allSplits.data).map((info: any) => (
						<Section
							onClick={() => {
								navigate(`/split/${info.id}`);
							}}>
							<div>{info.title}</div>
							<div className={classNames("amount", { less: info.amount < 0 })}>
								{Math.abs(info.amount)}
							</div>
						</Section>
					))}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default AllSplits;
