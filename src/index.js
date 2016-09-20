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
import {IntlProvider} from 'react-intl-redux';
import { translationMessages } from './utilities/i18n';


import { Router, Route, hashHistory, IndexRoute} from 'react-router';


// Importing our own libraries

import configureStore from './store';
import socketMiddleware from './middleware/socketMiddleware';
import enTranslations from './translations/en.json'
import ButlerBot from './containers/systemTabs/butlerbotTab'
import Notifications from './containers/systemTabs/notificationTab'
import PPS from './containers/systemTabs/ppsTab'
import ChargingStations from './containers/systemTabs/chargingStationsTab'
import {loginRequest} from './actions/loginAction';
import Routes from './components/Router';

/**
 * Creating a store and passing it to provider
 */
const store = configureStore(); 
/**
 * Configuring Router based on path 
 */
function requireAuth(nextState, replaceState ) {
  if (sessionStorage.getItem('auth_token')) 
  {
  	let state = store.getState()
  	store.dispatch(loginRequest());
    replaceState({ nextPathname: nextState.location.pathname }, '/overview',nextState.location.query)
  }
  
  
}

ReactDOM.render(
	
	<Provider store={store}>
	<IntlProvider messages={ translationMessages.en }>
		<Router history={ hashHistory }>
		<Route name="default" path="/"  component={App}  />
		<Route name="login" path="/login"  component={Login}  onEnter={requireAuth}/>
		<Route name="app" path="/md"  component={App} >
			<IndexRoute component={ Overview } />
			<Route name="system" path="/system"  component={SystemTab}>
				<IndexRoute component={ Notifications } />
				<Route name="butlerbots" path="/butlerbots"  component={ButlerBot}/>
				<Route name="pps" path="/pps"  component={PPS}/>
				<Route name="chargingstations" path="/chargingstations"  component={ChargingStations}/>
				<Route name="notification" path="/notification"  component={Notifications}/>
			</Route>
			<Route name="orders" path="/orders"  component={OrdersTab} />
			<Route name="inventory" path="/inventory"  component={InventoryTab} />
			<Route name="users" path="/users"  component={UsersTab} />
			<Route name="overview" path="/overview"  component={Overview} />
		</Route>
		
		</Router>
    </IntlProvider>
	</Provider>,
	document.getElementById('container')
);



