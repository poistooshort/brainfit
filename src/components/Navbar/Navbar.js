import logo from '../../assets/images/logo.png';
import { NavLink, Link, useLocation } from 'react-router-dom';

import './Navbar.scss';
import defaultAvatar from '../../assets/images/avatar-default.png';

const Navbar = ({ user }) => {

	const { pathname } = useLocation();

	return(
		<div className="navbar">

			<Link to="/" className="navbar__logo">brainFit
				<img src={logo} className="navbar__logo-image"/>
			</Link>

			<NavLink 
				to="/exercises" 
				className="navbar__exercises"
				activeClassName="navbar__exercises--active"
				isActive={() => ["/exercises"].includes(pathname)}
			>
				exercises
			</NavLink>

			<NavLink 
				to="/profile"
				className="navbar__avatar-container"
				activeClassName="navbar__avatar-container--active"
				isActive={() => ["/profile"].includes(pathname)}
			>
				<img className="navbar__avatar" 
					src={user ? user.avatar_url : defaultAvatar} 
					alt="avatar"
				/>
			</NavLink> 

		</div>
	);
}

export default Navbar;
