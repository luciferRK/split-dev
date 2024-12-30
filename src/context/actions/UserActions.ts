import { useContext } from "react";
import { UserContext } from "../User";
import { ifElse } from "../../components/utils";
import { UserTypeInContext } from "../User/types";

const useUserActions = () => {
	const { state: userState, dispatch } = useContext(UserContext);

	const setUser = (info: UserTypeInContext) => {
		dispatch({ type: "SET_USER", payload: info });
	};

	const setLoggedIn = (value: boolean) => {
		dispatch({ type: "LOGGED_IN", payload: value });
	};

	const setTheme = (value: "dark-theme" | "light-theme") => {
		dispatch({ type: "SET_THEME", payload: value });
	};

	const setLoginInProgress = (value: boolean) => {
		dispatch({ type: "SET_LOGIN_IN_PROGRESS", payload: value });
	};

	const setLoading = (value: boolean) => {
		dispatch({ type: "SET_LOADING", payload: value });
	};

	const toggleTheme = () => {
		setTheme(
			ifElse(userState.themeMode === "dark-theme", "light-theme", "dark-theme")
		);
	};

	const setFriends = (value: any) => {
		dispatch({ type: "SET_FRIENDS", payload: value });
	};

	const setAllUsers = (value: Array<any>) => {
		dispatch({ type: "SET_ALL_USERS", payload: value });
	};

	const setFriendRequests = (value: Array<any>) => {
		dispatch({ type: "SET_FRIEND_REQUESTS", payload: value });
	};

	const setGroups = (value: Array<any>) => {
		dispatch({ type: "SET_GROUPS", payload: value });
	};

	return {
		userState,
		setLoggedIn,
		toggleTheme,
		setLoginInProgress,
		setUser,
		setLoading,
		setFriends,
		setAllUsers,
		setFriendRequests,
		setGroups,
	};
};

export default useUserActions;
