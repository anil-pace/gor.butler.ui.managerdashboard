import React  from 'react';
import ReactDOM  from 'react-dom';
import App from './App';
import configureStore from './store';
import { Provider,connect } from 'react-redux';
import socketMiddleware from './middleware/socketMiddleware'


const store = configureStore();
//console.log(socketMiddleware);
//socketMiddleware(store)(null)({"type":"CONNECT"});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('container'));




