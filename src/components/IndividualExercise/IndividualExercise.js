import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './IndividualExercise.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL
const EXERCISES_URL = SERVER_URL + '/exercises';

const IndividualExercise = (props) =>  {
	const { user } = props;
	const { id } = props.match.params;
	const [ exercise, setExercise ] = useState(null);
	const [ comments, setComments ] = useState([]);
	const [ liked, setLiked ] = useState(false);
	const [ canDelete, setCanDelete ] = useState(false);
	
	const history = useHistory();

	useEffect(() => {
		axios.get(`${EXERCISES_URL}/${id}`)
			.then(res => {
				setExercise(res.data);
				if(exercise && user && exercise.creatorId === user.id){
					setCanDelete(true);
				}
			})
			.catch(err => {
				console.log('Unable to fetch exercise');
			});
	}, [id, exercise, user]);

	useEffect(() => {
		axios.get(`${SERVER_URL}/comments/${id}`)
			.then(res => {
				if(comments && res.data.length && res.data.length !== comments.length){
					setComments(res.data);
				}
			})
			.catch(err => {
				console.log('Error fetching comments for this exercise');
			});
	}, [comments, id]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const comment = e.target.comment.value;
		e.target.comment.value = '';

		const commentData = {
			comment: comment, 
			exerciseId: id,
			username: user.username
		};

		axios.post(`${SERVER_URL}/comments`, commentData)
			.then(res => {
				axios.get(`${SERVER_URL}/comments/${id}`)
					.then(res => {
						if(res.data.length){
							setComments(res.data);
						}
					})
					.catch(err => {
						console.log(`Error fetching comments after adding comment with error: ${err}`);
					});
			})
			.catch(err => {
				console.log(`Error adding new comment with error: ${err}`);
			});
	}

	const handleLike = (e) => {
		e.preventDefault();
		
		const likeChange = (liked) ? -1 : 1;

		const likesData = { likes: (exercise.likes + likeChange) };
		const newExerciseData = {...exercise, likes: (exercise.likes + likeChange)};

		axios.put(`${EXERCISES_URL}/likes/${id}`, likesData)
			.then(res => {
				setLiked(!liked);
				setExercise(newExerciseData);
			})
			.catch(err => {
				console.log(`Error trying to update likes with error: ${err}`);
			});
	}

	const handleDelete = (e) => {
		e.preventDefault();

		axios.delete(`${EXERCISES_URL}/${id}`)
			.then(res => {
				console.log(`Successfully deleted the exercise with id: ${id}`);
			})
			.catch(err => {
				console.log(`Error trying to delete exercise with id: ${id}`);
			});
		history.push('/exercises');
	}

	if(!exercise){
		return(<div className="individual"></div>);
	}

	return(
		<div className="individual">
			<div className="individual__exercise-container">
				<img 
					src={`${SERVER_URL}/gifs/${exercise.filename}`}
					className="individual__image"
					crossOrigin="anonymous"
					alt={exercise.title}
				/>
				<div className="individual__exercise-details">
					<div className="individual__likes-delete-bar">
						<div className={liked ? "individual__likes-button--liked" : "individual__likes-button"} onClick={handleLike}>
							{`${exercise.likes} likes 💪`}
						</div> 
						<div className={canDelete ? "individual__delete-button" : "individual__delete-button--hidden"} onClick={handleDelete}>
							delete
						</div> 
					</div>
					<h2 className="individual__details-title">title</h2>
					<h3 className="individual__details-data">{exercise.title}</h3>
					<h2 className="individual__details-title">equipment</h2>
					<h3 className="individual__details-data">{exercise.equipment}</h3>
					<h2 className="individual__details-title">description</h2>
					<p className="individual__details-description">{exercise.description}</p>
				</div>
			</div>
			<section className="individual__comments-section">
				<form className="individual__comment-submit" onSubmit={handleSubmit}>
					<textarea id="comment" name="comment" className="individual__comment-input"></textarea>
					<button className="individual__submit-button" type="submit">
						submit
					</button>
				</form>
				{ comments && comments.map(comment => {
					return(
						<div key={uuid()} className="individual__comment">
							<h3>{`"${comment.comment}"`}</h3>
							<p>{`- ${comment.username}`}</p>
						</div>
					);
				})}
			</section>
		</div>
	);
}

export default IndividualExercise;
