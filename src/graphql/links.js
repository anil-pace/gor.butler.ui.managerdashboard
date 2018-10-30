/**
 * Created by gaurav.m on 1/11/18.
 */
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';
import {createUploadLink} from 'apollo-upload-client'
import {WS_GRAPHQL_URL} from '../constants/configConstants';

export const errorLink = onError(({ graphQLErrors, networkError }) => {
    /*
     onError receives a callback in the event a GraphQL or network error occurs.
     This example is a bit contrived, but in the real world, you could connect
     a logging service to the errorLink or perform a specific action in response
     to an error.
     */
    if (graphQLErrors)
        graphQLErrors.map(({ message, location, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`
            )
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
});


function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 5000);
    });
}

async function asyncCall() {
    console.log('calling');
    var result = await resolveAfter2Seconds();
    console.log(result)
    return result
    // expected output: "resolved"
}

export const subscriptionLink = (config = {}) =>
    new WebSocketLink({
        uri:`ws://${WS_GRAPHQL_URL}:3020/subscriptions`,
        options: { reconnect: true,connectionParams: () => {
            return { 'auth_token': sessionStorage.getItem("auth_token") }
        } },
        ...config,
    });


export const queryOrMutationLink = (config = {}) =>
    new ApolloLink((operation, forward) => {
        /*
         You can use a simple middleware link like this one to set credentials,
         headers, or whatever else you need on the context.
         All links in the chain will have access to the context.
         */
        const token = sessionStorage.getItem('auth_token');
        operation.setContext({
            credentials: 'same-origin',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authentication-Token': token,

            }
        });

        return forward(operation);
    }).concat(
        createUploadLink({...config})
    );

export const requestLink = ({ queryOrMutationLink, subscriptionLink }) =>
    /*
     This link checks if the operation is a subscription.
     If it is, we use our subscription link to retrieve data over WebSockets.
     If it is a query or mutation, we retrieve data over HTTP.
     */
    ApolloLink.split(
        ({ query }) => {
            const { kind, operation } = getMainDefinition(query);
            return kind === 'OperationDefinition' && operation === 'subscription';
        },
        subscriptionLink,
        queryOrMutationLink
    );
