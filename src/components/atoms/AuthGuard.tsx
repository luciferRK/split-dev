import React from "react";
import useUserActions from "../../context/actions/UserActions";
import { Navigate } from "react-router-dom";
import { ifElse } from "uixtra/utils";

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
