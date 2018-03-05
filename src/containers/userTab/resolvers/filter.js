/**
 * Created by gaurav.m on 2/28/18.
 */
import gql from 'graphql-tag'
const userFilterState = {
    defaults: {
        userFilter: {
            display: false,
            isFilterApplied: false,
            filterState: null,
            __typename: 'UserFilter'
        },
    },
    resolvers: {
        Mutation: {
            setShowUserFilter: (_, {filter}, {cache}) => {
                let query = gql`
                    query  {
                        userFilter @client{
                            display
                            isFilterApplied
                            filterState
                            __typename
                        }
                    }
                `;
                let previous = cache.readQuery({query}).userFilter
                previous.display = filter
                cache.writeData({data: {userFilter: previous}});
                return null;

            },
            setFilterApplied: (_, {isFilterApplied}, {cache}) => {
                let query = gql`
                    query  {
                        userFilter @client{
                            display
                            isFilterApplied
                            filterState
                            __typename
                        }
                    }
                `;
                let previous = cache.readQuery({query}).userFilter
                previous.isFilterApplied = isFilterApplied
                cache.writeData({data: {userFilter: previous}});
                return null;

            },
            setUserFilterState: (_, {state}, {cache}) => {
                let query = gql`
                    query  {
                        userFilter @client{
                            display
                            isFilterApplied
                            filterState
                            __typename
                        }
                    }
                `;
                let previous = cache.readQuery({query}).userFilter
                previous.filterState = state
                previous.filterState.__typename="UserFilterState"
                cache.writeData({data: {userFilter: previous}});
                return null;

            }


        },
    },
};

export default userFilterState;