/**
 * msu Reconfig Resolver
 */
import gql from 'graphql-tag'
const msuReconfigFilterState = {
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
            setShowMsuListFilter: (_, { filter }, { cache }) => {
                let query = gql`
                    query  {
                        msuListFilter @client{
                            display
                            isFilterApplied
                            filterState{
                                tokenSelected{
                                    STATUS
                                    __typename
                                }
                                searchQuery{
                                    MSU_ID
                                    __typename
                    
                                }
                                defaultToken{
                                    STATUS
                                    __typename
                                }
                                __typename
                            }
                                                __typename
                                            }
                                        }
                                    `;

                let previous = cache.readQuery({ query }).msuListFilter
                previous.display = filter
                cache.writeData({ data: { msuListFilter: previous } });
                return null;

            },
            setMsuListFilterApplied: (_, { isFilterApplied }, { cache }) => {
                let query = gql`
                    query  {
                        msuListFilter @client{
                            display
                            isFilterApplied
                            filterState{
                                tokenSelected{
                                    STATUS
                                    __typename
                                }
                                searchQuery{
                                    MSU_ID
                                    __typename
                    
                                }
                                defaultToken{
                                    STATUS
                                    __typename
                                }
                                __typename
                            }
                                                __typename
                                            }
                                        }
                                    `;
                let previous = cache.readQuery({ query }).msuListFilter
                previous.isFilterApplied = isFilterApplied
                cache.writeData({ data: { msuListFilter: previous } });
                return null;

            },
            setMsuFilterState: (_, { state }, { cache }) => {
                let query = gql`
                    query  {
                        msuListFilter @client{
                            display
                            isFilterApplied
                            filterState{
                                tokenSelected{
                                    STATUS
                                    __typename
                                }
                                searchQuery{
                                    MSU_ID
                                    __typename
                    
                                }
                                defaultToken{
                                    STATUS
                                    __typename
                                }
                                __typename
                            }
                                                __typename
                                            }
                                        }
                                    `;
                let previous = cache.readQuery({ query }).msuListFilter
                previous.filterState = state
                previous.filterState.__typename = "MsuListFilterState"
                cache.writeData({ data: { msuListFilter: previous } });
                return null;

            }


        },
    },
};

export default msuReconfigFilterState;