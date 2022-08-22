import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import './App.scss';
import Homepage from './pages/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Exercises from './pages/Exercises/Exercises';
import Upload from './pages/Upload/Upload';
import IndividualExercise from './components/IndividualExercise/IndividualExercise';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

class App extends Component {
	state = {
		user: null,
		showLogin: false
	}

	componentDidMount(){
		axios.get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
			.then(res => {
				this.setState({
					user: res.data
				});
			})
			.catch(err => {
				if(err.response.status === 401){
					this.setState({ user: null });
				}
				else{
					console.log('There was an error authenticating. Code;', err);
				}
			});
	}
		
	handleShowLogin = () => {
		this.setState({ showLogin: true });
	}

	render() {
		
		const { user } = this.state;

		return (
			<Router>
				<div className="app">
					<Navbar user={user}/>
					<div className="app__component-card">
							<Switch>
								<Route path='/' exact component={Homepage}/>
								<Route path='/profile' 
									component={(routerProps) => {
										return(
											<Profile 
												user={user}
												{...routerProps}
											/>
										);
									}}
								/>
								<Route path='/exercises' exact
									component={(routerProps) => {
										return(
											<Exercises
												user={user}
												handleShowLogin={() => {this.handleShowLogin();}}
												{...routerProps}
											/>
										);
									}}
								/> 
								<Route path='/exercises/:id' 
									component={(routerProps) => {
										return(
											<IndividualExercise
												user={user}
												{...routerProps}
											/>
										);
									}}
								/> 
								<Route path='/upload' exact
									component={(routerProps) => {
										return(
											<Upload
												user={user}
												{...routerProps}
											/>
										);
									}}
								/> 
							</Switch> 
					</div>
					<Footer/>
					{this.state.showLogin && <Login/>}
				</div>
			</Router>
	  );
	}
}

export default App;
