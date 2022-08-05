import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import './App.scss';
import Homepage from './pages/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

class App extends Component {
	state = {
		user: null
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
							</Switch> 
					</div>
					<Footer/>
					{!user && <Login/>}
				</div>
			</Router>
	  );
	}
}

export default App;
