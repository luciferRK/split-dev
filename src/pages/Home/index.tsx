import Footer from "../../components/atoms/Footer";
import Header from "../../components/atoms/Header";
import Section from "../../components/atoms/Section";
import classNames from "../../components/utils";
import "./Home.scss";

const Home = () => {
	const activeSplits = [
		{
			name: "John Doe 1",
			amount: 1287.79,
		},
		{
			name: "John Doe 2",
			amount: -200,
		},
		{
			name: "John Doe 3",
			amount: 3500,
		},
	];

	return (
		<>
			<Header />
			<div className='main-content home'>
				<div className='heading'>
					People with Active Splits ({activeSplits.length})
				</div>
				<div className='splits'>
					{activeSplits.map((info) => (
						<Section>
							<div>{info.name}</div>
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

export default Home;
