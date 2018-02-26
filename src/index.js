/**
 * Importing required modules
 */

// Importing third party libraries

import React  from 'react';
import ReactDOM  from 'react-dom';
import {Provider} from 'react-redux';


import {IntlProvider} from 'react-intl-redux';


// Import redux modal
import ReduxModal from 'react-redux-modal';

// Importing our own libraries

import configureStore from './store';
import socketMiddleware from './middleware/socketMiddleware';
import Routes from './components/Router';
import {preloadedState} from './utilities/intialData';

import './assets/css/main.scss';

import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {ApolloLink} from 'apollo-link';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {
    errorLink,
    queryOrMutationLink,
    subscriptionLink,
    requestLink,
} from './graphql/links';

let client = new ApolloClient({
    ssrForceFetchDelay: 100,
    link: ApolloLink.from([
        errorLink,
        requestLink({
            queryOrMutationLink: queryOrMutationLink({
                fetch: require('node-fetch'),
                uri: "http://localhost:3010/graphql",
                credentials: 'same-origin'

            }),
             subscriptionLink: subscriptionLink(),
        }),
    ]),
    additionalProperty:"additionalValue",
    // here we're initializing the cache with the data from the server's cache
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

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
