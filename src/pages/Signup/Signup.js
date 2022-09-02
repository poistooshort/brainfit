import './Signup.scss';

const Signup = (props) => {
	return(
		<div className="signup">
			<div className="signup__card">
				<h1 className="signup__title">sign up page</h1>
				<form className="signup__entry-form" action="">
					<label className="signup__label" htmlFor="username">username:</label> 
					<input className="signup__input" name="username" id="username" type="text"/>
					<label className="signup__label" htmlFor="password">password:</label>
					<input className="signup__input" name="password" id="password" type="password"/>
					<label className="signup__label" htmlFor="passwordRepeat">repeat password:</label>
					<input className="signup__input" name="passwordRepeat" id="passwordRepeat" type="password"/>
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
