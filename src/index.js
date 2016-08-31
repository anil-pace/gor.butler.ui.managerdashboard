import React  from 'react';
import ReactDOM  from 'react-dom';
import Login from './components/Login/login';
import configureStore from './store';
import { Provider,connect } from 'react-redux';
import socketMiddleware from './middleware/socketMiddleware'


const store = configureStore();
ReactDOM.render(
	<Provider store={store}>
		<Login />
	</Provider>,
	document.getElementById('container')
	);
