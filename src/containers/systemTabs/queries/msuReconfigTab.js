import gql from 'graphql-tag';

export const SUBSCRIPTION_QUERY = gql`
    subscription MSULIST_CHANNEL($input: MsuListFilterParams){
        MsuFilterList(input:$input){
            list {
            id
            racktype
            } 
        }
    }
`;


export const MSU_LIST_QUERY = gql`
    query MsuList($input:MsuListParams){
        MsuList(input:$input){
             list{
                  rack_id
                  source_type
                  destination_type
                  status
            }
        }
    }
`;

export const MSU_LIST_POST_FILTER_QUERY = gql`
    query MsuFilterList($input:MsuFilterListParams){
        MsuFilterList(input:$input){
            list {
              id
              racktype
            } 
        }
    }
`;

export const MSU_SOURCE_TYPE_QUERY = gql`
    query($input:MsuSourceTypeListParams){
        MsuSourceTypeList(input:$input){
             list
            }
    }
`;

export const MSU_RACK_STRUCTURE_QUERY = gql`
    query($input:MsuRackJsonListParams){
        MsuRackJsonList(input:$input){
            list {
                face_zero{
                rack_width
                    rack_json{
                    barcodes
                    length
                    height
                    type
                    orig_coordinates
                }  
                }
            face_one{
                rack_width
                    rack_json{
                    barcodes
                    length
                    height
                    type
                    orig_coordinates
                }  
                }
            
            }
            
            }
    }
`;


export const MSU_RECONFIG_BLOCK_PUT_CHANGE_TYPE_POST = gql`
    query($input:MsuBlockPutChangeTypeParams){
        MsuBlockPutChangeType(input:$input){
            status
        }
    }
`;


export const MSU_START_RECONFIG_QUERY = gql`
    query($input:MsuStartReconfigParams){
            MsuStartReconfig(input:$input) {
                list
            }
        }
`;

export const MSU_STOP_RECONFIG_QUERY = gql`
    query($input:MsuStopReconfigParams){
            MsuStopReconfig(input:$input) {
                list
            }
        }
`;

export const MSU_RELEASE_QUERY = gql`
    query($input:MsuReleaseParams){
            MsuRelease(input:$input) {
                list
            }
        }
`;


export const SET_VISIBILITY = gql`
    mutation setMsuListFilter($filter: String!) {
        setShowMsuListFilter(filter: $filter) @client
    }
`;

export const SET_FILTER_APPLIED = gql`
    mutation setFilterApplied($isFilterApplied: String!) {
        setMsuListFilterApplied(isFilterApplied: $isFilterApplied) @client
    }
`;
export const SET_FILTER_STATE = gql`
    mutation setFilterState($state: String!) {
        setMsuFilterState(state: $state) @client
    }
`;

export const msuListClientData = gql`
    query  {
        msuListFilter @client{
            display
            isFilterApplied
            filterState{
                tokenSelected{
                    STATUS
                }
                searchQuery{
                    MSU_ID
                }
                
                defaultToken{
                    STATUS
                }
            }
        }
    }
`;