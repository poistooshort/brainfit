import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './Exercises.scss';

const EXERCISES_URL = process.env.REACT_APP_SERVER_URL + '/exercises';
const GIFS_URL = process.env.REACT_APP_SERVER_URL + '/gifs';

const Exercises = ({ user }) => {
	const [exerciseList, setExerciseList] = useState(null);	

	useEffect(() => {
		//axios get list of all exercises
		axios.get(EXERCISES_URL)
			.then(res => {
				setExerciseList(res.data);
			})
	}, []);

	const handleExerciseSelect = (e) => {
		console.log(e.target.parentElement.id);	
	}

	return(
		<div className="exercises">
			<div className="exercises__list">
				{exerciseList && exerciseList.map(exercise => {
					return(
						<div 
							key={uuid()} 
							id={exercise.id}
							className="exercises__card"
							onClick={handleExerciseSelect}
						>
							<img 
								crossOrigin="anonymous" 
								className="exercises__image"
								src={`${GIFS_URL}/${exercise.filename}`} 
								alt={exercise.title}
							/>
							<h2>{exercise.title}</h2>
						</div>
					);
				})}
			</div>
			<div className="exercises__button-container">
				<NavLink
					to="/upload"
					className="exercises__upload-button"
				>
					upload
				</NavLink>
			</div>
		</div>
	);
}

export default Exercises;
