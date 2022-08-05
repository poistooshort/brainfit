import { NavLink } from 'react-router-dom';

import './Exercises.scss';

const Exercises = ({ user }) => {
	return(
		<div className="exercises">

			<div className="exercises__animation">
			</div>

			<NavLink
				to="/upload"
				className="exercises__upload-button"
			>
				upload
			</NavLink>

		</div>
	);
}

export default Exercises;
