/**
 * Importing required modules
 */

// Importing third party libraries

import React  from 'react';
import ReactDOM  from 'react-dom';
import { Provider,connect } from 'react-redux';
/**
 * Had to comment out intl code as 
 * it was giving iterator error in web pack
 * Need to work on this
 */
//import {IntlProvider} from 'react-intl-redux';
//import { translationMessages } from './i18n';
//import {addLocaleData} from 'react-intl';


// Importing our own libraries

import configureStore from './store';
import socketMiddleware from './middleware/socketMiddleware';
import enTranslations from './translations/en.json';
import Routes from './components/Router';



/**
 * Creating a store and passing it to provider
 */
const store = configureStore(); 

/**
 * Configuring Router based on path 
 */

ReactDOM.render(
	<Provider store={store}>
	<Routes />
	</Provider>
,document.getElementById('container'))



