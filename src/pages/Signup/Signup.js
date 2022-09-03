import './Signup.scss';

const Signup = (props) => {

	const handleCancel = (e) => {
		e.preventDefault();

		//return the user back to the login page
	}

	return(
		<div className="signup">
			<div className="signup__card">
				<h1 className="signup__title">sign up page</h1>
				<form className="signup__entry-form" action="">
					<label className="signup__label" htmlFor="username">username:</label> 
					<input className="signup__input" name="username" id="username" placeholder="choose username" autocomplete="username" type="text"/>
					<label className="signup__label" htmlFor="password">password:</label>
					<input className="signup__input" name="password" id="password" placeholder="choose password" autocomplete="new-password" type="password"/>
					<label className="signup__label" htmlFor="passwordRepeat">repeat password:</label>
					<input className="signup__input" name="passwordRepeat" id="passwordRepeat" placeholder="repeat chosen password" auto-complete="new-password" type="password"/>
					<label className="signup__avatar-upload" htmlFor="avatar">upload avatar img:</label>
					<input className="signup__input-avatar" name="avatar" id="avatar" type="file"/>
					<div className="signup__button-row">
						<button className="signup__cancel-button">cancel</button>
						<button className="signup__signup-button">sign up</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Signup;
