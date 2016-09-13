/**
 * Importing required modules
 */

// Importing third party libraries

import React  from 'react';
import ReactDOM  from 'react-dom';
import { Provider,connect } from 'react-redux';
import { IntlProvider } from 'react-intl-redux';
import { Router, Route, hashHistory, IndexRoute} from 'react-router';

// Importing our own libraries
import Login from './components/Login/login';
import App from './App';
import Overview from './containers/OverviewTab';
import SystemTab from './containers/systemTab';
import OrdersTab from './containers/ordersTab';
import InventoryTab from './containers/inventoryTab';
import UsersTab from './containers/usersTab';
import configureStore from './store';
import socketMiddleware from './middleware/socketMiddleware';
import { translationMessages } from './utilities/i18n';


/**
 * Creating a store and passing it to provider
 */
const store = configureStore(); 
/**
 * Configuring Router based on path 
 */
ReactDOM.render(
	<Provider store={store}>
	<IntlProvider locale="en" messages={ translationMessages.en }>
		<Router history={hashHistory}>
		<Route name="default" path="/"  component={App} />
		<Route name="login" path="/login"  component={Login} />
		<Route name="app" path="/md"  component={App} >
			<IndexRoute component={ Overview } />
			<Route name="system" path="/system"  component={SystemTab} />
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



