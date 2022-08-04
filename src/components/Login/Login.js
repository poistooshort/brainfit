import './Login.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Login = () => {
	return(
		<div className="login">
			<div className="login__card">
				<h1 className="login__title">login page</h1>
				<p className="login__text">please log in below:</p>
				<a className="login__github" href={`${SERVER_URL}/auth/github`}>
					<img src="http://picsum.photos/20/20" alt="github logo"/>
					github
				</a> 
			</div>
		</div>
	);
}

export default Login;
