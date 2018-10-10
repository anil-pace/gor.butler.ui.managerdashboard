/**
 * Created by gaurav.m on 2/28/18.
 */
import gql from 'graphql-tag'
const butlerFilterState = {
    defaults: {
        botsFilter: {
            display: false,
            isFilterApplied: false,
            filterState: null,
            __typename: 'BotsFilter'
        },
    },
    resolvers: {
        Mutation: {
            setShowBotsFilter: (_, {filter}, {cache}) => {
                let query = gql`
                    query  {
                        botsFilter @client{
                            display
                            isFilterApplied
                            filterState
                            __typename
                        }
                    }
                `;
                let previous = cache.readQuery({query}).botsFilter
                previous.display = filter
                cache.writeData({data: {botsFilter: previous}});
                return null;

            },
            setFilterApplied: (_, {isFilterApplied}, {cache}) => {
                let query = gql`
                    query  {
                        botsFilter @client{
                            display
                            isFilterApplied
                            filterState
                            __typename
                        }
                    }
                `;
                let previous = cache.readQuery({query}).botsFilter
                previous.isFilterApplied = isFilterApplied
                cache.writeData({data: {botsFilter: previous}});
                return null;

            },
            setBotsFilterState: (_, {state}, {cache}) => {
                let query = gql`
                    query  {
                        botsFilter @client{
                            display
                            isFilterApplied
                            filterState
                            __typename
                        }
                    }
                `;
                let previous = cache.readQuery({query}).botsFilter
                previous.filterState = state
                previous.filterState.__typename="BotsFilterState"
                cache.writeData({data: {botsFilter: previous}});
                return null;

            }


        },
    },
};

export default butlerFilterState;