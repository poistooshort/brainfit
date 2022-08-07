import { useRef, useState } from 'react';
import axios from 'axios';

import './Upload.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const EXERCISES_URL = `${SERVER_URL}/exercises`;

const Upload = ({ user }) => {
	const [file, setFile] = useState('');
	const [progress, setProgress] = useState(0);
	const progressBar = useRef();
	const uploadButton = useRef();

	const handleFile = (e) => {
		setProgress(0);
		const currFile = e.target.files[0];
		setFile(currFile);
	}

	const handleUpload = (e) => {
		e.preventDefault();

		const { title, description} = e.target;
		
		/* TEST BLOCK
		console.log("@handleUpload"); 
		console.log(e); 
		console.log('title :', title.value);
		console.log('description :', description.value);
		progressBar.current.style.width = '50%';
		uploadButton.current.style.visibility = 'hidden';
		*/

		const formData = new FormData();
		formData.append('file', file);
		formData.append('title', title.value);
		formData.append('description', description.value);

		axios.post(EXERCISES_URL, formData, {
			onUploadProgress: (ProgressEvent) =>  {
				let progress = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100);
				setProgress(progress);
			}
		})
		.then(res => {
			console.log("Successfully created exercise and uploaded file");
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

				<button type="submit" ref={uploadButton}>upload</button>
			</form>			
			<div className="upload__progress">
				<div className="upload__progress-bar" ref={progressBar}>
				</div>
			</div>
		</div>
	);
}

export default Upload;
