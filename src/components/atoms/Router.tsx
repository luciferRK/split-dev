import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import AuthGuard from "./AuthGuard";
import Login from "../../pages/Login";
import useFirebase from "../../services/Firebase";
import useUserActions from "../../context/actions/UserActions";
import React from "react";
import { Show } from "./ShowIf";
import Friends from "../../pages/Friends";
import Groups from "../../pages/Groups";
import AllSplits from "../../pages/AllSplits";
import AddNewSplit from "../../pages/AddNewSplit";
import SplitDetails from "../../pages/SplitDetails";

const Router = () => {
	const { login } = useFirebase();
	const { userState } = useUserActions();
	const { themeMode, loading } = userState;

	React.useEffect(() => {
		document.getElementById("root")?.setAttribute("data-theme", themeMode);
	}, [themeMode]);

	return (
		<Show if={!loading}>
			<Routes>
				<Route
					path='/'
					element={<AuthGuard component={<Home />} />}
				/>
				<Route
					path='/login'
					element={<Login login={login} />}
				/>
				<Route
					path='/friends'
					element={<AuthGuard component={<Friends />} />}
				/>
				<Route
					path='/add-new-split'
					element={<AuthGuard component={<AddNewSplit />} />}
				/>
				<Route
					path='/split/:id'
					element={<AuthGuard component={<SplitDetails />} />}
				/>
				<Route
					path='/groups'
					element={<AuthGuard component={<Groups />} />}
				/>
				<Route
					path='/all-splits'
					element={<AuthGuard component={<AllSplits />} />}
				/>
			</Routes>
		</Show>
	);
};

export default Router;
