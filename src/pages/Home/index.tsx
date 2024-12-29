import React from "react";
import Footer from "../../components/atoms/Footer";
import Header from "../../components/atoms/Header";
import Section from "../../components/atoms/Section";
import classNames from "../../components/utils";
import useFirebase from "../../services/Firebase";
import "./Home.scss";
import useSplitActions from "../../context/actions/SplitActions";
import { ShowIfElse } from "../../components/atoms/ShowIf";

const Home = () => {
	const { getAllSplits } = useFirebase();
	const { splitState } = useSplitActions();
	const { peopleSplit } = splitState;

	React.useEffect(() => {
		getAllSplits(true, true);
	}, []);

	return (
		<>
			<Header />
			<div className='main-content home'>
				<div className='heading'>
					People with Active Splits ({peopleSplit.data.length})
				</div>
				<div className='splits'>
					<ShowIfElse if={peopleSplit.loading}>
						<Section>Loading !!!</Section>
						<>
							{peopleSplit.data.map((info) => (
								<Section key={info.name}>
									<div>{info.name}</div>
									<div
										className={classNames("amount", { less: info.amount > 0 })}>
										{Math.abs(info.amount)}
									</div>
								</Section>
							))}
						</>
					</ShowIfElse>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Home;
