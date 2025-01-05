import {
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { handleError } from "../components/utils";
import useUserActions from "../context/actions/UserActions";
import { FirebaseApp } from "firebase/app";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BasicUserType } from "../context/User/types";
import toast from "../components/atoms/Toaster";

interface fireStoreFunctionsType {
	getUser: (email: string, options: any) => void;
	createUser: (info: BasicUserType) => Promise<any>;
}

const useFirebaseAuth = (
	app: FirebaseApp,
	fireStoreFunctions: fireStoreFunctionsType
) => {
	const { setUser, setLoginInProgress, setLoading } = useUserActions();
	const { getUser, createUser } = fireStoreFunctions;

	const auth = getAuth(app);
	const navigate = useNavigate();
	const location = useLocation();

	const goToLogin = () => {
		if (!location.pathname.includes("login")) {
			navigate("/login");
			setLoading(false);
		} else {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		auth.languageCode = "en";
		onAuthStateChanged(auth, (user) => {
			if (user) {
				user
					.getIdToken()
					.then((accessToken) => {
						setUser({
							uid: user!.uid,
							email: user!.email as string,
							name: user!.displayName as string,
							picture: user!.photoURL || "",
							accessToken: accessToken,
							idToken: "",
						});
						if (location.pathname.includes("login")) {
							navigate("/");
						}
					})
					.catch((error) => {
						handleError(error);
						goToLogin();
					});
			} else {
				goToLogin();
			}
		});
	}, []);

	const googleLogin = () => {
		const provider = new GoogleAuthProvider();
		provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
		provider.addScope("https://www.googleapis.com/auth/userinfo.email");
		setLoginInProgress(true);
		signInWithPopup(auth, provider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				const user = result.user;
				getUser(user.email as string, {
					onNotFound: () => {
						createUser({
							name: user.displayName as string,
							email: user.email as string,
							uid: user.uid,
						}).catch((err: any) => {
							throw err;
						});
					},
				});
				setUser({
					uid: user.uid,
					email: user.email as string,
					name: user.displayName as string,
					picture: user.photoURL || "",
					accessToken: credential?.idToken || "",
					idToken: token || "",
				});
				navigate("/");
			})
			.catch((error) => {
				handleError(error);
			})
			.finally(() => {
				setLoginInProgress(false);
			});
	};

	const logout = () => {
		signOut(auth)
			.then(() => {
				toast.success({ msg: "Logged out successfully" });
				navigate("/login");
			})
			.catch((err) => {
				toast.error({ msg: "Error occured while logging out", desc: err });
			});
	};

	return { login: googleLogin, logout };
};

export default useFirebaseAuth;
