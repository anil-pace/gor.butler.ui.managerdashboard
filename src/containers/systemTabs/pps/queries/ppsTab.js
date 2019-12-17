import gql from "graphql-tag"

export const PPS_LIST_SUBSCRIPTION = gql`
  subscription PPSListSystem($input: PPSListSystemParams) {
    PPSListSystem(input: $input) {
      list {
        pps_id
        allowed_modes
        status
        requested_status
        requested_mode
        mode
        performance
        user_name
        pps_tags
        active_bins
        total_bins
        pps_profiles {
          applied
          profile_name
          requested
        }
      }
    }
  }
`

export const GET_PENDING_MSU_QUERY = gql`
  query PendingMSUList($input: PendingMSUListParams) {
    PendingMSUList(input: $input) {
      list
    }
  }
`

export const CHANGE_PPS_STATUS_QUERY = gql`
  query ChangePPSStatus($input: ChangePPSStatusParams) {
    ChangePPSStatus(input: $input) {
      list
    }
  }
`
export const CHANGE_PPS_MODE_QUERY = gql`
  query ChangePPSMode($input: ChangePPSModeParams) {
    ChangePPSMode(input: $input) {
      list
    }
  }
`

export const CHANGE_PPS_PROFILE_QUERY = gql`
  query ChangePPSProfile($input: ChangePPSProfileParams) {
    ChangePPSProfile(input: $input) {
      list
    }
  }
`

export const PPS_LIST_QUERY = gql`
  query {
    PPSListSystem {
      list {
        pps_id
        allowed_modes
        status
        requested_status
        requested_mode
        mode
        user_name
        pps_tags
        active_bins
        total_bins
      }
    }
  }
`

export const SET_VISIBILITY = gql`
  mutation setPPSFilter($filter: String!) {
    setShowPPSFilter(filter: $filter) @client
  }
`
export const SET_CHECKED_PPS = gql`
  mutation setCheckedPPS($checkedPPSList: String!) {
    setShowCheckedPPS(checkedPPSList: $checkedPPSList) @client
  }
`

export const SET_FILTER_APPLIED = gql`
  mutation setFilterApplied($isFilterApplied: String!) {
    setPPSFilterApplied(isFilterApplied: $isFilterApplied) @client
  }
`
export const SET_FILTER_STATE = gql`
  mutation setFilterState($state: String!) {
    setPPSFilterState(state: $state) @client
  }
`

export const ppsClientData = gql`
  query {
    checkedPPS @client {
      checkedPPSList
    }
    ppsFilter @client {
      display
      isFilterApplied
      filterState {
        tokenSelected {
          STATUS
          MODE
        }
        searchQuery {
          PPS_ID
          OPERATOR_ASSIGNED
        }
        defaultToken {
          STATUS
          MODE
        }
      }
    }
  }
`
