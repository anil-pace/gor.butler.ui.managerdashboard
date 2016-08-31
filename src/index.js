import React  from 'react';
import ReactDOM  from 'react-dom';
import Login from './components/Login/login';
import App from './App';
import configureStore from './store';
import { Provider,connect } from 'react-redux';
import socketMiddleware from './middleware/socketMiddleware';
import { Router, Route, hashHistory } from 'react-router'



const store = configureStore(); 

ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>
		<Route name="app" path="/"  component={Login} />
		<Route name="app" path="md"  component={App} />
	
		</Router>
	</Provider>,
	document.getElementById('container')
	);
