/**
 * Importing required modules
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import Login from './components/Login/login';
import App from './App';
import Overview from './containers/Overview';
import configureStore from './store';
import { Provider,connect } from 'react-redux';
import { Router, Route, hashHistory,IndexRoute } from 'react-router'


/**
 * Creating a store and passing it to provider
 */
const store = configureStore(); 
/**
 * Configuring Router based on path 
 */
ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>
		<Route name="default" path="/"  component={App} />
		<Route name="login" path="/login"  component={Login} />
		<Route name="app" path="/md"  component={App} >
			<IndexRoute component={ Overview } />
			<Route name="overview" path="/overview"  component={Overview} />
			<Route name="system" path="/system"  component={Login} />
		</Route>
		
		</Router>
	</Provider>,
	document.getElementById('container')
);



