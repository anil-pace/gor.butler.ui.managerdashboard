/**
 * Created by gaurav.m on 2/28/18.
 */
import ApolloClient from 'apollo-client';
import {ApolloLink} from 'apollo-link';
import {withClientState} from 'apollo-link-state';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {
    errorLink,
    queryOrMutationLink,
    subscriptionLink,
    requestLink,
} from './links';
import resolvers from './resolvers'
const cache = new InMemoryCache();
console.log(resolvers)
let state_link = withClientState({...resolvers, cache})
let client = new ApolloClient({
    ssrForceFetchDelay: 100,
    link: ApolloLink.from([
        errorLink, state_link,
        requestLink({
            queryOrMutationLink: queryOrMutationLink({
                fetch: require('node-fetch'),
                uri: "http://localhost:3010/graphql",
                credentials: 'same-origin'

            }),
            subscriptionLink: subscriptionLink(),
        })


    ]),
    cache
});

export {client as default}

