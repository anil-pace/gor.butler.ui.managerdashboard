/**
 * Importing required modules
 */

// Importing third party libraries

import React  from 'react';
import ReactDOM  from 'react-dom';
import {Provider} from 'react-redux';


import {IntlProvider} from 'react-intl';


// Import redux modal
import ReduxModal from 'react-redux-modal';

// Importing our own libraries

import configureStore from './store';
import socketMiddleware from './middleware/socketMiddleware';
import Routes from './components/Router';
import {preloadedState} from './utilities/intialData';

import './assets/css/main.scss';


import {ApolloProvider} from 'react-apollo';
import client from './graphql/client'
/**
 * Creating a store and passing it to provider
 */
const initState = preloadedState;
const store = configureStore(initState);

ReactDOM.render(
    <ApolloProvider client={client}>
         <Provider store={store}>
            <IntlProvider messages={ initState.intl.messages } locale={navigator.language}>
                <div>
                    <Routes />
                    <ReduxModal />
                </div>
            </IntlProvider>

        </Provider>
    </ApolloProvider>

    , document.getElementById('container'))
