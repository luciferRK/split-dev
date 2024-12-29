import "./Login.scss";
import useUserActions from "../../context/actions/UserActions";
import React from "react";

interface LoginProps {
	login: Function;
}

const Login: React.FC<LoginProps> = (props) => {
	const { login } = props;
	const { toggleTheme } = useUserActions();

	return (
		<div className='login-container'>
			<div className='app-name'>S</div>
			<div className='app-name'>P</div>
			<button
				className='login-button'
				onClick={() => {
					login();
				}}>
				<svg
					width='20'
					height='20'
					viewBox='0 0 20 20'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M19.0625 10.2266C19.0625 15.7539 15.2773 19.6875 9.6875 19.6875C4.32812 19.6875 0 15.3594 0 10C0 4.64062 4.32812 0.3125 9.6875 0.3125C12.2969 0.3125 14.4922 1.26953 16.1836 2.84766L13.5469 5.38281C10.0977 2.05469 3.68359 4.55469 3.68359 10C3.68359 13.3789 6.38281 16.1172 9.6875 16.1172C13.5234 16.1172 14.9609 13.3672 15.1875 11.9414H9.6875V8.60938H18.9102C19 9.10547 19.0625 9.58203 19.0625 10.2266Z'
						fill='black'
					/>
				</svg>
				<span>Continue with Google</span>
			</button>
			<div className='app-name'>L</div>
			<div className='app-name'>I</div>
			<div
				className='app-name'
				onClick={() => {
					toggleTheme();
				}}>
				T
			</div>
		</div>
	);
};

export default Login;