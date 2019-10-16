/**
 * Created by gaurav.m on 2/28/18.
 */
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import {
  errorLink,
  queryOrMutationLink,
  subscriptionLink,
  requestLink
} from './links'
import resolvers from './resolvers'
import { GRAPHQL_URL } from '../constants/configConstants'
/**
 * Refer https://github.com/apollographql/react-apollo/issues/1558
 * @type {InMemoryCache}
 */
const cache = new InMemoryCache({
  dataIdFromObject: o => {
    o.id ? `${o.__typename}-${o.id}` : `${o.__typename}-${o.cursor}`
  }
})

let state_link = withClientState({ ...resolvers, cache })
let client = new ApolloClient({
  ssrForceFetchDelay: 100,
  link: ApolloLink.from([
    errorLink,
    state_link,
    requestLink({
      queryOrMutationLink: queryOrMutationLink({
        fetch: require('cross-fetch'),
        uri: GRAPHQL_URL,
        credentials: 'same-origin'
      }),
      subscriptionLink: subscriptionLink()
    })
  ]),
  cache
})

export { client as default }
