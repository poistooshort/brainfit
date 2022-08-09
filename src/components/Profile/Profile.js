import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import './Profile.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const GIFS_URL = SERVER_URL + '/gifs';

const Profile = ({ user }) => {
	const [userExercises, setUserExercises] = useState(null);
	const history = useHistory();

	useEffect(() =>  {
		axios.get(`${SERVER_URL}/exercises/user/${user.id}`)
			.then(res => {
				setUserExercises(res.data);
			})
			.catch(err => {
				console.log(`Error trying to fetch exercises from user with id: ${user.id}`);
			});
	},[]);

	const handleExerciseSelect = (e) => {
		const { id } = e.target.parentElement;
		
		history.push(`/exercises/${id}`);
	}


	return(
		<div className="profile">
			<h1 className="profile__title">account</h1>
			<div className="profile__account">
				<div className="profile__account-info">
					<img src={user.avatar_url} className="profile__avatar" alt={`avatar of ${user.username}`}/>
					<div className="profile__username">
						<h2 className="profile__username-label">username</h2>
						<p className="profile__username-text">{user.username}</p>
					</div>
				</div>
				<a href={`${SERVER_URL}/auth/logout`} className="profile__logout-button">
					logout
				</a>
			</div>
			<div className="profile__user-videos">
				{userExercises && userExercises.map(exercise => {
					return(
						<div 
							key={uuid()} 
							id={exercise.id}
							className="profile__card"
							onClick={handleExerciseSelect}
						>
							<img 
								crossOrigin="anonymous" 
								className="profile__image"
								src={`${GIFS_URL}/${exercise.filename}`} 
								alt={exercise.title}
							/>
							<h2 className="exercises__title">{exercise.title}</h2>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Profile;
