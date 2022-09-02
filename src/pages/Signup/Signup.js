import './Signup.scss';

const Signup = (props) => {
	return(
		<div class="signup">
			<div class="signup__card">
				<h1 class="signup__title">sign up page</h1>
				<form class="signup__entry-form" action="">
					<label class="signup__label" for="">username:</label> 
					<input class="signup__input" type="text"/>
					<label class="signup__label" for="password">password:</label>
					<input class="signup__input" type="password"/>
					<label class="signup__label" for="passwordRepeat">repeat password:</label>
					<input class="signup__input" type="password"/>
					<label class="signup__avatar-upload" for="avatar">upload avatar img:</label>
					<input class="signup__input-avatar" type="file"/>
					<div class="signup__button-row">
						<button class="signup__cancel-button">cancel</button>
						<button class="signup__signup-button">sign up</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Signup;
