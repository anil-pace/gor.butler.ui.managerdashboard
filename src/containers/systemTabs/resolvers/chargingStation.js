import gql from 'graphql-tag'
const chargingStationFilterState = {
    defaults: {
        chargingStationFilter: {
            display: false,
            isFilterApplied: false,
            filterState: null,
            __typename: 'ChargingStationFilter'
        },
    },
    resolvers: {
        Mutation: {
            setShowChargingStationFilter: (_, {filter}, {cache}) => {
                let query = gql`
                    query  {
                        chargingStationFilter @client{
                            display
                            isFilterApplied
                            filterState{
                                tokenSelected{
               DOCKING_STATUS
               OPERATING_MODE
               __typename
            }
            searchQuery{
                CHARGING_STATION_ID
                __typename

            }
            defaultToken{
                DOCKING_STATUS
                OPERATING_MODE
                __typename
            }
                            }
                            __typename
                            
                        }
                    }
                `;
                let previous = cache.readQuery({query}).chargingStationFilter
                previous.display = filter
                cache.writeData({data: {chargingStationFilter: previous}});
                return null;

            },
            setChargingStationFilterApplied: (_, {isFilterApplied}, {cache}) => {
                let query = gql`
                    query  {
                        chargingStationFilter @client{
                            display
                            isFilterApplied
                            filterState{
                                 tokenSelected{
               DOCKING_STATUS
               OPERATING_MODE
               __typename
            }
            searchQuery{
                CHARGING_STATION_ID
                __typename

            }
            defaultToken{
                DOCKING_STATUS
                OPERATING_MODE
                __typename
            }
                            }
                            __typename
                            
                        }
                    }
                `;
                let previous = cache.readQuery({query}).chargingStationFilter
                previous.isFilterApplied = isFilterApplied
                cache.writeData({data: {chargingStationFilter: previous}});
                return null;

            },
            setChargingStationFilterState: (_, {state}, {cache}) => {
                let query = gql`
                    query  {
                        chargingStationFilter @client{
                            display
                            isFilterApplied
                            filterState{
                                 tokenSelected{
               DOCKING_STATUS
               OPERATING_MODE
               __typename
            }
            searchQuery{
                CHARGING_STATION_ID
                __typename

            }
            defaultToken{
                DOCKING_STATUS
                OPERATING_MODE
                __typename
            }
                            }
                            __typename
                            
                        }
                    }
                `;
                let previous = cache.readQuery({query}).chargingStationFilter
                previous.filterState = state
                 previous.filterState.__typename="ChargingStationFilterState"
                cache.writeData({data: {chargingStationFilter: previous}});
                return null;

            }


        },
    },
};

export default chargingStationFilterState;