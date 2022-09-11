import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import bcrypt from 'bcryptjs'; 
import axios from 'axios';

import './Signup.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Signup = (props) => {
	const history = useHistory(); 
	const [file, setFile] = useState(null);
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
		if(username.value === '' || password.value === '' || !passwordRepeat.value === '' || !file){
			(username.value === '') && (errorRefs.username.current.textContent = 'username field cannot be empty');
			(password.value === '') && (errorRefs.password.current.textContent = 'password field cannot be empty');
			(passwordRepeat.value === '') && (errorRefs.passwordRepeat.current.textContent = 'repeat password field cannot be empty');
			return;
		}
		// check if username is used in database already
		axios.get(`${SERVER_URL}/signup/checkUsername/${username.value}`)
			.then(res => {
				const { available } = res.data;

				// if username is not available or password does not match the repeated password, prompt the user to change 
				if(!available || password.value !== passwordRepeat.value){
					(!available) && (errorRefs.username.current.textContent = 'username has already been taken. please choose another username.');
					(password.value !== passwordRepeat.value) && (errorRefs.passwordRepeat.current.textContent = 'passwords must match');
					return;
				}
				// check if there is an avatar uploaded
				if(file){
					// post call to server to add avatar image to public folder
					const data = new FormData();
					data.append('file', file);
					axios.post(`${SERVER_URL}/signup`, data)
						.then(res => {
							const filename = JSON.parse(res.data).filename;
							const avatarUrl = `${SERVER_URL}/public/avatars/${filename}`;
							const passwordHash = bcrypt.hashSync(password.value, 12);
							const userData = {
								username: username.value, 
								password: passwordHash,
								avatarUrl: avatarUrl
							};
								// need to implement post request
						})
				}
			})
			.catch(err => {
				console.log(`There was an error trying to check availability of the chosen username. Please try again later`);
			});
		// create new user with link to avatar on server 
		// add new user to db
	}

	const handleImageSelect = (e) => {
		setFile(e.target.files[0]);
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
					<input 
						className="signup__input-avatar" 
						onChange={handleImageSelect}
						name="avatar" 
						id="avatar" 
						type="file"
						accept="image/*"
					/>
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
