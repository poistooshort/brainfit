import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { NavLink, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './Exercises.scss';

const EXERCISES_URL = process.env.REACT_APP_SERVER_URL + '/exercises';
const GIFS_URL = process.env.REACT_APP_SERVER_URL + '/gifs';

const Exercises = ({ user }) => {
	const [sortOption, setSortOption] = useState('likes');
	const [exerciseList, setExerciseList] = useState(null);	
	const history = useHistory();

	useEffect(() => {
		//axios get list of all exercises
		if(!exerciseList){
			axios.get(EXERCISES_URL)
				.then(res => {
					setExerciseList(res.data);
				})
				.catch(err => {
					console.log(`Error trying to fetch all exercises`);
				});
		}
	}, []);

	const handleExerciseSelect = (e) => {
		const { id } = e.target.parentElement;
		
		history.push(`/exercises/${id}`);
	}

	const handleSort = (e) => {
		const option = e.target.value;
		const sortingList = exerciseList;

		(option === "likes" && sortingList.sort((a, b) => b.likes - a.likes));
		(option === "newest" && sortingList.sort((a, b) => (new Date(b.created)).getTime() - (new Date(a.created)).getTime()));
		(option === "oldest" && sortingList.sort((a, b) => (new Date(a.created)).getTime() - (new Date(b.created)).getTime()));
		setExerciseList(sortingList);
		setSortOption(option);
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
							<h2 className="exercises__title">{exercise.title}</h2>
						</div>
					);
				})}
			</div>
			<div className="exercises__button-container">
				<form className="exercises__sort">
					<h2 className="exercises__sort-title">sort by :</h2>
					<div className="exercises__sort-input">
						<input type="radio" name="sort" className="exercises__sort-radio" value="likes" defaultChecked onClick={handleSort}/>
						<label className="exercises__sort-label" htmlFor="sort">likes</label>
					</div>
					<div className="exercises__sort-input"> 
						<input type="radio" name="sort" className="exercises__sort-radio" value="newest" onClick={handleSort}/>
						<label className="exercises__sort-label" htmlFor="sort">newest</label>
					</div>
					<div className="exercises__sort-input">
						<input type="radio" name="sort"  className="exercises__sort-radio" value="oldest" onClick={handleSort}/>
						<label className="exercises__sort-label" htmlFor="sort">oldest</label>
					</div>
				</form>
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
