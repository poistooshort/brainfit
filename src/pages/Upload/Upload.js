import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Upload.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const EXERCISES_URL = `${SERVER_URL}/exercises`;
const IMAGES_URL = `${SERVER_URL}/exercises/images`;

const Upload = ({ user }) => {
	const [file, setFile] = useState('');
	const [progress, setProgress] = useState(0);
	const progressContainer = useRef();
	const uploadButton = useRef();
	const doneButton = useRef(); 

	const handleFile = (e) => {
		setProgress(0);
		const currFile = e.target.files[0];
		setFile(currFile);
	}

	const handleUpload = (e) => {
		e.preventDefault();
		uploadButton.current.style.visibility = 'hidden';
		progressContainer.current.style.visibility = 'visible';

		const { title, description, equipment } = e.target;

		const formData = new FormData();
		formData.append('file', file);

		axios.post(IMAGES_URL, formData, {
			onUploadProgress: (ProgressEvent) =>  {
				let progress = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100).toString() + '%';
				setProgress(progress);
			}
		})
		.then(res => {
			const filename = JSON.parse(res.data).filename;
			
			const data = {
				filename: filename,
				creatorId: user.id,
				title: title.value,
				description: description.value,
				equipment: equipment.value,
				likes: 0
			};

			return axios.post(EXERCISES_URL, data);
		})
		.then(res => {
			doneButton.current.style.visibility = 'visible';
		})
		.catch(err => {
			console.log("There was an error creating exercise and uploading file. Error :", err);
		});
	}

	return(
		<div className="upload">
			<form className="upload__form" onSubmit={handleUpload}>

				<label htmlFor="image">exercise gif: 
					<input 
						className="upload__choose-file"
						id="image"
						name="image"
						onChange={handleFile}
						type="file">
					</input>
				</label>

				<label htmlFor="title"> exercise title:
					<input 
						id="title" 
						name="title" 
						type="text" 
						placeholder="exercise title">
					</input>
				</label>

				<label htmlFor="description"> exercise description:
					<textarea 
						id="description" 
						name="description" 
						placeholder="exercise description">
					</textarea>
				</label>

				<label htmlFor="equipment"> equipment:
					<select name="equipment" id="equipment" className="upload__equipment-select">
						<option value="none">none</option>
						<option value="dumbbells">dumbbells</option>
						<option value="barbell">barbell</option>
						<option value="kettleBell">kettle bell</option>
					</select>
				</label>

				<button type="submit" ref={uploadButton}>upload</button>
			</form>			
			<div className="upload__progress" ref={progressContainer}>
				<div className="upload__progress-bar" style={{ width: progress}}>
				</div>
			</div>
			<Link to='/exercises' className="upload__done-button" ref={doneButton}>done</Link>
		</div>
	);
}

export default Upload;
