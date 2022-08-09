import './Homepage.scss';
import exercise from '../../assets/images/exercise.gif';

const Homepage = () => {
	return(
		<div className="homepage">
			<div className="homepage__title-greeting-container">
				<h1 className="homepage__title">brainFit</h1>	
				<p className="homepage__greeting">{`"Exercise not only changes your body, it changes your mind"`}</p>
			</div>
			<img src={exercise} className="homepage__image" alt="animated exercising person"/>
		</div>
	);
}

export default Homepage;
