/**
 * Created by gaurav.m on 2/28/18.
 */
import gql from 'graphql-tag'
const msuListFilterState = {
    defaults: {
        msuListFilter: {
            display: false,
            isFilterApplied: false,
            filterState: null,
            __typename: 'MsuListFilter'
        },
    },
    resolvers: {
        Mutation: {
            showMsuListFilter: (_, {filter}, {cache}) => {
                let query = gql`
                    query  {
                        msuListFilter @client{
                            display
                            isFilterApplied
                            filterState
                            __typename
                        }
                    }
                `;
                let previous = cache.readQuery({query}).msuListFilter
                previous.display = filter
                cache.writeData({data: {msuListFilter: previous}});
                return null;

            },
            setFilterApplied: (_, {isFilterApplied}, {cache}) => {
                let query = gql`
                    query  {
                        msuListFilter @client{
                            display
                            isFilterApplied
                            filterState
                            __typename
                        }
                    }
                `;
                let previous = cache.readQuery({query}).msuListFilter
                previous.isFilterApplied = isFilterApplied
                cache.writeData({data: {msuListFilter: previous}});
                return null;

            },
            setMsuFilterState: (_, {state}, {cache}) => {
                let query = gql`
                    query  {
                        msuListFilter @client{
                            display
                            isFilterApplied
                            filterState
                            __typename
                        }
                    }
                `;
                let previous = cache.readQuery({query}).msuListFilter
                previous.filterState = state
                previous.filterState.__typename="MsuListFilterState"
                cache.writeData({data: {msuListFilter: previous}});
                return null;

            }


        },
    },
};

export default msuListFilterState;