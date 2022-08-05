import './Profile.scss';

const Profile = ({ user }) => {

	const SERVER_URL = process.env.REACT_APP_SERVER_URL;

	return(
		<div className="profile">
			<h1 className="profile__title">account</h1>
			<img src={user.avatar_url} alt={`avatar of ${user.username}`}/>
			<div className="profile__username">
				<h2 className="profile__username-label">username :</h2>
				<p className="profile__username-text">{user.username}</p>
			</div>
			<a href={`${SERVER_URL}/auth/logout`} className="profile__logout-button">
				logout
			</a>
		</div>
	);
}

export default Profile;
