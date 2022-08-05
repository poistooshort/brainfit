import { NavLink, useLocation } from 'react-router-dom';

import './Navbar.scss';
import defaultAvatar from '../../assets/images/avatar-default.png';

const Navbar = ({ user }) => {

	const { pathname } = useLocation();

	return(
		<div className="navbar">

			<h2 className="navbar__logo">brainfit</h2>

			<NavLink to="/exercises" 
				className="navbar__exercises"
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
