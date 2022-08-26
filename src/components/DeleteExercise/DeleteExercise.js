import trash from '../../assets/icons/trash.png';
import './DeleteExercise.scss';

const DeleteExercise = ({ handleDelete, cancelDelete, exerciseTitle }) => {

	return(
		<div className="delete-exercise">
			<div className="delete-exercise__modal">
				<img src={trash} alt="trash can"/>
				<h1 className="delete-exercise__confirmation-title">Are you sure?</h1>
				<p className="delete-exercise__confirmation-text">{`Do you really want to delete the exercise : ${exerciseTitle}`}</p>
				<div className="delete-exercise__button-row">
					<button 
						className="delete-exercise__cancel-button"
						onClick={cancelDelete}
					>
						cancel
					</button>
					<button 
						className="delete-exercise__delete-button"
						onClick={handleDelete}
					>
						delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default DeleteExercise;
