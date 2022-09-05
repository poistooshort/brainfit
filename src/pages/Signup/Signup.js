import { useRef } from 'react';
import { useHistory } from 'react-router-dom';

import './Signup.scss';

const Signup = (props) => {
	const history = useHistory(); 
	const errorRefs = { username: useRef(), password: useRef(), passwordRepeat: useRef(), avatar: useRef() };

	const handleCancel = (e) => {
		e.preventDefault();

		history.push('/profile');
	}

	const handleSignup = (e) => {
		e.preventDefault();
		const errorKeys = Object.keys(errorRefs);
		errorKeys.forEach(key => errorRefs[key].current.textContent = '');

		const { username, password, passwordRepeat } = e.target;

		// check if there are blank inputs, if there are then prompt error message to fill in
		if(username.value === '' || password.value === '' || !passwordRepeat.value === ''){
			(username.value === '') && (errorRefs.username.current.textContent = 'username field cannot be empty');
			(password.value === '') && (errorRefs.password.current.textContent = 'password field cannot be empty');
			(passwordRepeat.value === '') && (errorRefs.passwordRepeat.current.textContent = 'repeat password field cannot be empty');
			return();
		}
		// check if username is used in database already
		// check if password and repeat password matches
		// upload avatar to public static folder on server
		// create new user with link to avatar on server 
		// add new user to db
	}

	return(
		<div className="signup">
			<div className="signup__card">
				<h1 className="signup__title">sign up page</h1>
				<form className="signup__entry-form" onSubmit={handleSignup}>
					<label className="signup__label" htmlFor="username">username:</label> 
					<input className="signup__input" name="username" id="username" placeholder="choose username" autoComplete="username" type="text"/>
					<p className="signup__error-message-username" ref={errorRefs.username}></p>
					<label className="signup__label" htmlFor="password">password:</label>
					<input className="signup__input" name="password" id="password" placeholder="choose password" autoComplete="new-password" type="password"/>
					<p className="signup__error-message-password" ref={errorRefs.password}></p>
					<label className="signup__label" htmlFor="passwordRepeat">repeat password:</label>
					<input className="signup__input" name="passwordRepeat" id="passwordRepeat" placeholder="repeat chosen password" autoComplete="new-password" type="password"/>
					<p className="signup__error-message-password-repeat" ref={errorRefs.passwordRepeat}></p>
					<label className="signup__avatar-upload" htmlFor="avatar">upload avatar img:</label>
					<input className="signup__input-avatar" name="avatar" id="avatar" type="file"/>
					<p className="signup__error-message-avatar" ref={errorRefs.avatar}></p>
					<div className="signup__button-row">
						<button className="signup__cancel-button" onClick={handleCancel}>cancel</button>
						<button className="signup__signup-button">sign up</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Signup;
