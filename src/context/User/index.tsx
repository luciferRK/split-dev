import React from "react";
import { UserContextStateType, UserContextType } from "./types";

const initialState: UserContextStateType = {
	isLoggedIn: false,
	loginInProgress: false,
	themeMode: "dark-theme",
	loading: true,
	user: {
		uid: "",
		name: "",
		email: "",
		picture: "",
		accessToken: "",
		idToken: "",
	},
	friends: { loading: true, data: [] },
	allUsers: { loading: true, data: [] },
	friendRequests: { loading: true, data: [] },
};

export const UserContext = React.createContext<UserContextType>({
	state: initialState,
	dispatch: () => {},
});

const userContextReducer = (
	state: UserContextStateType,
	action: {
		type: string;
		payload: any;
	}
) => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		case "LOGGED_IN":
			return {
				...state,
				isLoggedIn: action.payload,
			};
		case "SET_THEME":
			return {
				...state,
				themeMode: action.payload,
			};
		case "SET_LOGIN_IN_PROGRESS":
			return {
				...state,
				loginInProgress: action.payload,
			};
		case "SET_USER":
			return {
				...state,
				isLoggedIn: true,
				user: action.payload,
				loading: false,
			};
		case "SET_FRIENDS":
			return {
				...state,
				friends: {
					loading: false,
					data: action.payload,
				},
			};
		case "SET_ALL_USERS":
			return {
				...state,
				allUsers: {
					loading: false,
					data: action.payload,
				},
			};
		case "SET_FRIEND_REQUESTS":
			return {
				...state,
				friendRequests: {
					loading: false,
					data: action.payload,
				},
			};
		default:
			return state;
	}
};

const UserContextProvider = (props: React.PropsWithChildren) => {
	const { children } = props;

	const [state, dispatch] = React.useReducer(userContextReducer, initialState);

	return (
		<UserContext.Provider
			value={{
				state,
				dispatch,
			}}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
