import React from "react";
import "../Home/Home.scss";
import Header from "../../components/atoms/Header";
import Footer from "../../components/atoms/Footer";
import Section from "../../components/atoms/Section";
import classNames from "../../components/utils";
import useSplitActions from "../../context/actions/SplitActions";
import useFirebase from "../../services/Firebase";
import { useNavigate } from "react-router-dom";
import { ShowIfElse } from "../../components/atoms/ShowIf";

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
					<ShowIfElse if={allSplits.loading}>
						<Section>Loading!!</Section>
						<ShowIfElse if={Object.values(allSplits.data).length === 0}>
							<Section>No Splits Found</Section>
							<>
								{Object.values(allSplits.data).map((info: any) => (
									<Section
										onClick={() => {
											navigate(`/split/${info.id}`);
										}}>
										<div>{info.title}</div>
										<div
											className={classNames("amount", {
												less: info.amount < 0,
											})}>
											{Math.abs(info.amount)}
										</div>
									</Section>
								))}
							</>
						</ShowIfElse>
					</ShowIfElse>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default AllSplits;
