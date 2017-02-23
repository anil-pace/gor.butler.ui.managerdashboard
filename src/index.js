/**
 * Importing required modules
 */

// Importing third party libraries

import React  from 'react'; 
import ReactDOM  from 'react-dom';
import { Provider,connect } from 'react-redux'; 


import {IntlProvider} from 'react-intl-redux';
import { Router, Route, hashHistory, IndexRoute} from 'react-router';

// Import redux modal
import ReduxModal from 'react-redux-modal';

// Importing our own libraries

import configureStore from './store';
import socketMiddleware from './middleware/socketMiddleware';
import Routes from './components/Router';
import {preloadedState} from './utilities/intialData';

/**
 * Creating a store and passing it to provider
 */
const initState = preloadedState;
const store = configureStore(initState);

/**
 * Function to initialize App
 */
function initApp(){
	ReactDOM.render(
	<Provider store={store}>
	<IntlProvider messages={ initState.intl.messages } locale={navigator.language} >
	<div>
	<Routes />
		<ReduxModal />
	</div>
	</IntlProvider>

	</Provider>
,document.getElementById('container'))
}

// Check if polyfill required
if (!window.Intl) {
  // Webpack parses the inside of require.ensure at build time to know that intl
  // should be bundled separately. You could get the same effect by passing
  // ['intl'] as the first argument.
  require.ensure(['intl'], (require) => {
    // Ensure only makes sure the module has been downloaded and parsed.
    // Now we actually need to run it to install the polyfill.
     require('intl');
     
 
    // Carry on
    initApp();
  },"IntlBundle");
} else {
  // Polyfill wasn't needed, carry on
  initApp();
}


