/**
 * Created by himanshu.s on 23/10/2018.
 */
import gql from 'graphql-tag'
const ppsFilterState = {
    defaults: {
        ppsFilter: {
            display: false,
            isFilterApplied: false,
            filterState:{
            tokenSelected:{
                STATUS:["all"],
                MODE:["all"],
                __typename:"tokenSelected"
            },
            searchQuery:{
                PPS_ID:null,
                OPERATOR_ASSIGNED:null,
                __typename:'searchQuery'

            },
            defaultToken:{
                STATUS:["all"],
                MODE:["all"],
                __typename:'defaultToken'
            },
            __typename:'filterState'
            },
            __typename: 'PPSFilter'
        },
        checkedPPS:{
            checkedPPSList:null,
            __typename:'checkedPPS'
        }
    },
    resolvers: {
        Mutation: {
            setShowCheckedPPS:(_, {checkedPPSList}, {cache}) => {
                let query = gql`
                    query  {
                        checkedPPS @client{
                            checkedPPSList
                            __typename
                        }
                        ppsFilter @client{
                            display
                            isFilterApplied
                                filterState{
            tokenSelected{
                STATUS
                MODE
                __typename
            }
            searchQuery{
                PPS_ID
                OPERATOR_ASSIGNED
                __typename

            }
            defaultToken{
                STATUS
                MODE
                __typename
            }
            __typename
        }
                            __typename
                        }
                    }
                `;
                let previous = cache.readQuery({query}).checkedPPS
                previous.checkedPPSList = checkedPPSList
                cache.writeData({data: {checkedPPS: previous}});
                return null;

            },
            setShowPPSFilter: (_, {filter}, {cache}) => {
                let query = gql`
                    query  {
                        ppsFilter @client{
                            display
                            isFilterApplied
                                filterState{
            tokenSelected{
                STATUS
                MODE
                __typename
            }
            searchQuery{
                PPS_ID
                OPERATOR_ASSIGNED
                __typename

            }
            defaultToken{
                STATUS
                MODE
                __typename
            }
            __typename
        }
                            __typename
                        }
                    }
                `;
                let previous = cache.readQuery({query}).ppsFilter
                previous.display = filter
                cache.writeData({data: {ppsFilter: previous}});
                return null;

            },
            setPPSFilterApplied: (_, {isFilterApplied}, {cache}) => {
                let query = gql`
                    query  {
                        ppsFilter @client{
                            display
                            isFilterApplied
                                filterState{
            tokenSelected{
                STATUS
                MODE
                __typename
            }
            searchQuery{
                PPS_ID
                OPERATOR_ASSIGNED
                __typename

            }
            defaultToken{
                STATUS
                MODE
                __typename
            }
            __typename
        }
                            __typename
                        }
                    }
                `;
                let previous = cache.readQuery({query}).ppsFilter
                previous.isFilterApplied = isFilterApplied
                cache.writeData({data: {ppsFilter: previous}});
                return null;

            },
            setPPSFilterState: (_, {state}, {cache}) => {
                let query = gql`
                    query  {
                        ppsFilter @client{
                            display
                            isFilterApplied
                                filterState{
            tokenSelected{
                STATUS
                MODE
                __typename
            }
            searchQuery{
                PPS_ID
                OPERATOR_ASSIGNED
                __typename

            }
            defaultToken{
                STATUS
                MODE
                __typename
            }
            __typename
        }
                            __typename
                        }
                    }
                `;
                let previous = cache.readQuery({query}).ppsFilter
                previous.filterState = state
                previous.filterState.__typename="PPSFilterState"
                cache.writeData({data: {ppsFilter: previous}});
                return null;

            }


        },
    },
};

export default ppsFilterState;