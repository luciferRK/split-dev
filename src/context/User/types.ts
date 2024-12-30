export interface BasicUserType {
	uid: string;
	name: string;
	email: string;
}

export interface UserContextStateType {
	loginInProgress: boolean;
	isLoggedIn: boolean;
	themeMode: string;
	user: UserTypeInContext;
	loading: boolean;
	friends: {
		loading: boolean;
		data: Array<BasicUserType>;
	};
	groups: {
		loading: boolean;
		data: Array<{
			id: string;
			title: string;
			owner: string;
			userIDs: Array<string>;
		}>;
	};
	friendRequests: {
		loading: boolean;
		data: Array<BasicUserType>;
	};
	allUsers: {
		loading: boolean;
		data: Array<BasicUserType>;
	};
}

export interface UserContextType {
	state: UserContextStateType;
	dispatch: React.Dispatch<{
		type: string;
		payload: any;
	}>;
}

export interface UserTypeInContext {
	accessToken: string;
	idToken: string;
	name: string;
	email: string;
	picture: string;
	uid: string;
}
