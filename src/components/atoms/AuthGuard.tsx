import React from "react";
import useUserActions from "../../context/actions/UserActions";
import { ifElse } from "../utils";
import { Navigate } from "react-router-dom";

interface AuthGuardProps {
	component: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = (props) => {
	const { component } = props;
	const { userState } = useUserActions();
	const { isLoggedIn } = userState;

	return ifElse(isLoggedIn, component, <Navigate to='/login' />);
};

export default AuthGuard;
