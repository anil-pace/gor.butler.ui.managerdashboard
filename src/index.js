/**
 * Importing required modules
 */

// Importing third party libraries

import React  from 'react';
import ReactDOM  from 'react-dom';
import { Provider,connect } from 'react-redux';
import {IntlProvider} from 'react-intl-redux';
import {addLocaleData} from 'react-intl';
import { Router, Route, hashHistory } from 'react-router';

// Importing our own libraries
import Login from './components/Login/login';
import App from './App';
import Overview from './containers/Overview';
import configureStore from './store';
import socketMiddleware from './middleware/socketMiddleware';

import enTranslations from './translations/en.json'


addLocaleData(enTranslations);

/**
 * Creating a store and passing it to provider
 */
const store = configureStore(); 
/**
 * Configuring Router based on path 
 */
ReactDOM.render(
	<Provider store={store}>
	<IntlProvider locale="en">
		<Router history={hashHistory}>
		<Route name="default" path="/"  component={App} />
		<Route name="login" path="/login"  component={Login} />
		<Route name="app" path="/md"  component={App} >
			<IndexRoute component={ Overview } />
			<Route name="overview" path="/overview"  component={Overview} />
			<Route name="system" path="/system"  component={Login} />
		</Route>
		<Route name="app" path="/"  component={Login} />
		<Route name="app" path="md"  component={App} />
		</Router>
	</IntlProvider>
	</Provider>,
	document.getElementById('container')
);



