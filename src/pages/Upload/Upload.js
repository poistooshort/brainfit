import { useRef, useState } from 'react';
import axios from 'axios';

import './Upload.scss';

const Upload = ({ user }) => {
	const [file, setFile] = useState('');
	const [progress, setProgress] = useState(0);
	const progressBar = useRef();
	const uploadButton = useRef();

	const handleUpload = (e) => {
		e.preventDefault();

		const { title, description, image } = e.target;
		
		/* TEST BLOCK
		console.log("@handleUpload"); 
		console.log(e); 
		console.log('title :', title.value);
		console.log('description :', description.value);
		progressBar.current.style.width = '50%';
		uploadButton.current.style.visibility = 'hidden';
		*/
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

				<button type="submit" ref={uploadButton}>upload</button>
			</form>			
			<div className="upload__progress">
				<div className="upload__progress-bar" ref={progressBar}>
					{progress === 100 ? 'done' : ''}
				</div>
			</div>
		</div>
	);
}

export default Upload;
