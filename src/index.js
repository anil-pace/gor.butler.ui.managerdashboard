import React  from 'react';
import ReactDOM  from 'react-dom';
import Login from './components/Login/login';
import App from './App';
import configureStore from './store';
import { Provider,connect } from 'react-redux';
import socketMiddleware from './middleware/socketMiddleware';
import { Router, Route,browserHistory } from 'react-router';



const store = configureStore(); 

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
		<Route path="gor.butler.ui.managerdashboard_backup/src/"  component={Login} >
			<Route path="gor.butler.ui.managerdashboard_backup/src/md"  component={App} />
		</Route>
		</Router>
	</Provider>,
	document.getElementById('container')
	);
