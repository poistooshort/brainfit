import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.scss';
import Homepage from './pages/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';

class App extends Component {
	state = {
		user: null
	}
		
	render() {
		return (
			<div className="app">
				<Navbar/>
				<div className="app__component-card">
					<Router>
						<Switch>
							<Route path='/' exact component={Homepage}/>
						</Switch> 
					</Router>
				</div>
				<Footer/>
				<Login/>
		  	</div>
	  );
	}
}

export default App;
