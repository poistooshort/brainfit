import { Link } from 'react-router-dom';

import './Login.scss';
import githubIcon from '../../assets/icons/github-icon.png';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Login = () => {
	return(
		<div className="login">
			<div className="login__card">
				<h1 className="login__title">login page</h1>
				<form className="login__sign-in">
						<label className="login__username-input" htmlFor="">username :</label>
						<input className="login__username-input" name="username" id="username" type="text" />
						<label className="login__password-label" htmlFor="">password :</label>
						<input className="login__password-input" name="password" id="password" type="password" />
						<button className="login__submit-button">log in</button>
				</form>
				<p className="login__signup-text">{`Don't have an account yet? `}
					<Link to="/signup" className="login__signup">Sign up!</Link>
				</p>
				<p className="login__text">please log in to view profile page</p>
				<a className="login__github" href={`${SERVER_URL}/auth/github`}>
					<img src={githubIcon} alt="github logo"/>
					github
				</a> 
			</div>
		</div>
	);
}

export default Login;
