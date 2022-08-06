import { useState } from 'react';
import axios from 'axios';

import './Upload.scss';

const Upload = ({ user }) => {
	const [file, setFile] = useState('');
	const [progress, setProgress] = useState(0);

	const handleUpload = (e) => {
		e.preventDefault();

		const { title, description, image } = e.target;
		console.log("@handleUpload"); //TEST
		console.log(e); //TEST
		console.log('title :', title.value);
		console.log('description :', description.value);
	}

	return(
		<div className="upload">
			<form className="upload__form" onSubmit={handleUpload}>

				<label htmlFor="image">exercise gif: 
					<input 
						className="upload__choose-file"
						id="image"
						name="image"
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

				<button type="submit">upload</button>
			</form>			
		</div>
	);
}

export default Upload;
