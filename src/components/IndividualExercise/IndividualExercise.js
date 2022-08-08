import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';

import './IndividualExercise.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL
const EXERCISES_URL = SERVER_URL + '/exercises';

const IndividualExercise = (props) =>  {
	const { user } = props;
	const { id } = props.match.params;
	const [ exercise, setExercise ] = useState(null);
	const [ comments, setComments ] = useState([]);
	const [ liked, setLiked ] = useState(false);

	useEffect(() => {
		axios.get(`${EXERCISES_URL}/${id}`)
			.then(res => {
				setExercise(res.data);
			})
			.catch(err => {
				console.log('Unable to fetch exercise');
			});
	}, [id]);

	useEffect(() => {
		axios.get(`${SERVER_URL}/comments/${id}`)
			.then(res => {
				if(comments && res.data.length && res.data.length !== comments.length){
					console.log('setting comments');
					setComments(res.data);
				}
			})
			.catch(err => {
				console.log('Error fetching comments for this exercise');
			});
	}, [comments.length, id]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const comment = e.target.comment.value;
		console.log(e);
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
		console.log("inside handleLike");
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
						<button className="individual__likes-button" onClick={handleLike}>
							{`${exercise.likes} likes`}
						</button> 
						<button className="individual__delete-button">
							delete
						</button> 
					</div>
					<h2>title</h2>
					<h3>{exercise.title}</h3>
					<h2>equipment</h2>
					<h3>{exercise.equipment}</h3>
					<h2>description</h2>
					<p>{exercise.description}</p>
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
							<h3>{`"${comment.comment}" -${comment.username}`}</h3>
						</div>
					);
				})}
			</section>
		</div>
	);
}

export default IndividualExercise;
