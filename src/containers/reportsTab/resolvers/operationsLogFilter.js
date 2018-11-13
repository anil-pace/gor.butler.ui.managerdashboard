/**
 * Created by gaurav.m on 4/12/18.
 */
import gql from 'graphql-tag'
var formatData = function (obj) {
    if (!obj) {
        return obj
    }
    let self = JSON.parse(JSON.stringify(obj))
    Object.keys(obj).forEach(function (key) {
        if (obj.hasOwnProperty(key) && typeof key === 'object') {
            obj[key].__typename = key
            formatData(obj[key])
        }
    })
    return self
}
const operationsLogFilterState = {
    defaults: {
        operationsLogFilter: {
            display: false,
            isFilterApplied: false,
            filterState: {
                tokenSelected: {
                    "status": ["any"],
                    "timeperiod": ['realtime'],
                    "operatingMode": ['any'],
                    __typename: "OperationsLogFilterTokenSelected"
                },
                searchQuery: {
                    "request_id": null,
                    "sku_id": null,
                    "pps_id": null,
                    "user_id": null,
                    __typename: "OperationsLogFilterSearchQuery"
                },
                defaultToken: {
                    "status": ["any"],
                    "operatingMode": ["any"],
                    "timeperiod": ["realtime"],
                    __typename: "OperationsLogDefaultToken"
                },
                __typename: "OperationsLogFilterState"
            },
            __typename: 'OperationsLogFilter'
        },
    },
    resolvers: {
        Mutation: {
            setShowOperationsLogFilter: (_, {filter}, {cache}) => {
                let query = gql`
                    query  {
                        operationsLogFilter @client{
                            display
                            isFilterApplied
                            filterState{
                                tokenSelected{
                                    status
                                    timeperiod
                                    operatingMode
                                    __typename
                                }
                                searchQuery{
                                    request_id
                                    sku_id
                                    pps_id
                                    user_id
                                    __typename
                                }
                                defaultToken{
                                    status
                                    timeperiod
                                    operatingMode
                                    __typename
                                }
                                __typename
                            }
                            __typename
                        }
                    }
                `;
                let previous = cache.readQuery({query}).operationsLogFilter
                previous.display = filter
                cache.writeData({data: {operationsLogFilter: previous}});
                return null;

            },
            setFilterApplied: (_, {isFilterApplied}, {cache}) => {
                let query = gql`
                    query  {
                        operationsLogFilter @client{
                            display
                            isFilterApplied
                            filterState{
                                tokenSelected{
                                    status
                                    timeperiod
                                    operatingMode
                                    __typename
                                }
                                searchQuery{
                                    request_id
                                    sku_id
                                    pps_id
                                    user_id
                                    __typename
                                }
                                defaultToken{
                                    status
                                    timeperiod
                                    operatingMode
                                    __typename
                                }
                                __typename
                            }
                            __typename
                        }
                    }
                `;
                let previous = cache.readQuery({query}).operationsLogFilter
                previous.isFilterApplied = isFilterApplied
                cache.writeData({data: {operationsLogFilter: previous}});
                return null;

            },
            setOperationsLogFilterState: (_, {state}, {cache}) => {
                let query = gql`
                    query  {
                        operationsLogFilter @client{
                            display
                            isFilterApplied
                            filterState

                        }
                    }
                `;
                let previous = cache.readQuery({query}).operationsLogFilter
                previous.filterState = state
                previous.filterState.__typename = "OperationsLogFilterState"
                cache.writeData({data: {operationsLogFilter: previous}});
                return null;

            }


        },
    },
};

export default operationsLogFilterState;