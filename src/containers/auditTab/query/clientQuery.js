import gql from "graphql-tag"
export const auditNeedRefreshFlag = gql`
  query {
    auditNeedRefreshFlag @client {
      auditRefreshFlag
    }
  }
`
export const auditEditDupData = gql`
  query {
    auditEditDupData @client {
      auditEditData
      edit_Dup_Details
      skuAttributes
      edit_Dup_Validate_Details
      hasDataChanged
      skuDataChanged
      auditSpinner
      auditValidationSpinner
      locationAttributes
      locationDataChanged
      auditValidationSpinner
    }
  }
`
export const auditSpinnerState = gql`
  query {
    auditSpinnerstatus @client {
      auditSpinner
    }
  }
`
export const auditClientData = gql`
  query {
    auditFilter @client {
      display
      isFilterApplied
      isUpdateSubsciption
      pageNumber
      listData
      textBoxName
      filterState {
        tokenSelected {
          AUDIT_TYPE
          STATUS
          CREATED_BY
          INVENTORY_FOUND
          SOURCE
        }
        searchQuery {
          AUDIT_TASK_ID
          SPECIFIC_PPS_ID
          SPECIFIC_SKU_ID
          SPECIFIC_LOCATION_ID
          ORDER_NO
          FROM_DATE
          TO_DATE
        }

        defaultToken {
          AUDIT_TYPE
          STATUS
          CREATED_BY
          INVENTORY_FOUND
          SOURCE
        }
      }
    }
  }
`
export const itemSearchClientData = gql`
  query {
    itemSearchFilter @client {
      display
      isFilterApplied
      isUpdateSubsciption
      pageNumber
      listData
      textBoxName
      filterState {
        tokenSelected {
          STATUS
        }
        searchQuery {
          ITEM_SEARCH_TASK_ID
          FROM_DATE
          TO_DATE
        }

        defaultToken {
          STATUS
        }
      }
    }
  }
`

export const auditClientPPSData = gql`
  query {
    ppsCheckedData @client {
      checkedAuditPPSList
      checkedOtherPPSList
      auditDetails
    }
  }
`

export const itemSearchClientPPSData = gql`
  query {
    ppsCheckedData @client {
      checkedItemSearchPPSList
      checkedOtherPPSList
      itemSearchDetails
    }
  }
`
export const auditResolveData = gql`
  query {
    auditResolveData @client {
      auditLines
      audit_param_type
      datachange
    }
  }
`
export const auditResolveSpinnerState = gql`
  query {
    auditSpinnerstatus @client {
      resolveAuditSpinner
    }
  }
`
export const auditViewSpinnerState = gql`
  query {
    auditSpinnerstatus @client {
      auditSpinner
      viewAuditSpinner
    }
  }
`
export const auditSelectedData = gql`
  query {
    ppsCheckedData @client {
      checkedAudit
    }
  }
`
