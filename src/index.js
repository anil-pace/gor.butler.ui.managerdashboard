// Importign third party libraries
import React  from 'react';
import ReactDOM  from 'react-dom';
import { Provider,connect } from 'react-redux';
import {IntlProvider} from 'react-intl-redux';
import {addLocaleData} from 'react-intl';
import { Router, Route, hashHistory } from 'react-router';

// Importing our own libraries
import Login from './components/Login/login';
import App from './App';
import configureStore from './store';
import socketMiddleware from './middleware/socketMiddleware';

import enTranslations from './translations/en.json'

addLocaleData(enTranslations);

const store = configureStore(); 

ReactDOM.render(
	<Provider store={store}>
	<IntlProvider locale="en">
		<Router history={hashHistory}>
		
		<Route name="app" path="/"  component={Login} />
		<Route name="app" path="md"  component={App} />
	
		</Router>
	</IntlProvider>
	</Provider>,
	document.getElementById('container')
	);
