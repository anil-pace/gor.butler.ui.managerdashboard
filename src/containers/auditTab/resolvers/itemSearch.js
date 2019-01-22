/**
 * Created by gaurav.m on 2/28/18.
 */
import gql from 'graphql-tag';
const itemSearchFilterState = {
  defaults: {
    itemSearchFilter: {
      display: false,
      isFilterApplied: false,
      filterState: null,
      isUpdateSubsciption: false,
      isValue: 'Anil',
      pageNumber: 1,
      listData: null,
      textBoxName: null,
      __typename: 'ItemSearchFilter'
    }
  },
  resolvers: {
    Mutation: {
      setShowItemSearchFilter: (_, { filter }, { cache }) => {
        let query = gql`
          query {
            itemSearchFilter @client {
              display
              isFilterApplied

              isValue
              filterState {
                defaultToken {
                  AUDIT_TYPE
                  STATUS
                  CREATED_BY
                  __typename
                }
              }
              __typename
            }
          }
        `;
        let previous = cache.readQuery({ query }).itemSearchFilter;
        previous.display = filter;
        cache.writeData({ data: { itemSearchFilter: previous } });
        return null;
      },
      //   setAuditListData: (_, { listData }, { cache }) => {
      //     let query = gql`
      //       query {
      //         auditFilter @client {
      //           display
      //           listData
      //           isFilterApplied
      //           isValue
      //           filterState {
      //             tokenSelected {
      //               AUDIT_TYPE
      //               STATUS
      //               CREATED_BY
      //               __typename
      //             }
      //             searchQuery {
      //               AUDIT_TASK_ID
      //               SPECIFIC_PPS_ID
      //               SPECIFIC_SKU_ID
      //               SPECIFIC_LOCATION_ID
      //               FROM_DATE
      //               TO_DATE
      //               __typename
      //             }

      //             defaultToken {
      //               AUDIT_TYPE
      //               STATUS
      //               CREATED_BY
      //               __typename
      //             }
      //           }
      //           __typename
      //         }
      //       }
      //     `;
      //     let previous = cache.readQuery({ query }).auditFilter;
      //     previous.listData = listData;
      //     cache.writeData({ data: { auditFilter: previous } });
      //     return null;
      //   },
      setItemSearchFilterApplied: (_, { isFilterApplied }, { cache }) => {
        let query = gql`
          query {
            itemSearchFilter @client {
              display
              isFilterApplied
              isValue
              filterState {
                tokenSelected {
                  AUDIT_TYPE
                  STATUS
                  CREATED_BY
                  __typename
                }
                searchQuery {
                  AUDIT_TASK_ID
                  SPECIFIC_PPS_ID
                  SPECIFIC_SKU_ID
                  SPECIFIC_LOCATION_ID
                  FROM_DATE
                  TO_DATE
                  __typename
                }

                defaultToken {
                  AUDIT_TYPE
                  STATUS
                  CREATED_BY
                  __typename
                }
              }
              __typename
            }
          }
        `;
        let previous = cache.readQuery({ query }).itemSearchFilter;
        previous.isFilterApplied = isFilterApplied;
        cache.writeData({ data: { itemSearchFilter: previous } });
        return null;
      },

      //   setAuditUpdateSubscription: (_, { isUpdateSubsciption }, { cache }) => {
      //     let query = gql`
      //       query {
      //         auditFilter @client {
      //           display
      //           isFilterApplied
      //           isUpdateSubsciption
      //           isValue
      //           filterState {
      //             tokenSelected {
      //               AUDIT_TYPE
      //               STATUS
      //               CREATED_BY
      //               __typename
      //             }
      //             searchQuery {
      //               AUDIT_TASK_ID
      //               SPECIFIC_PPS_ID
      //               SPECIFIC_SKU_ID
      //               SPECIFIC_LOCATION_ID
      //               FROM_DATE
      //               TO_DATE
      //               __typename
      //             }

      //             defaultToken {
      //               AUDIT_TYPE
      //               STATUS
      //               CREATED_BY
      //               __typename
      //             }
      //           }
      //           __typename
      //         }
      //       }
      //     `;
      //     let previous = cache.readQuery({ query }).auditFilter;
      //     previous.isUpdateSubsciption = isUpdateSubsciption;
      //     cache.writeData({ data: { auditFilter: previous } });
      //     return null;
      //   },
      //   setAuditPageNumber: (_, { pageNumber }, { cache }) => {
      //     let query = gql`
      //       query {
      //         auditFilter @client {
      //           pageNumber
      //           display
      //           isFilterApplied
      //           isValue
      //           filterState {
      //             tokenSelected {
      //               AUDIT_TYPE
      //               STATUS
      //               CREATED_BY
      //               __typename
      //             }
      //             searchQuery {
      //               AUDIT_TASK_ID
      //               SPECIFIC_PPS_ID
      //               SPECIFIC_SKU_ID
      //               SPECIFIC_LOCATION_ID
      //               FROM_DATE
      //               TO_DATE
      //               __typename
      //             }

      //             defaultToken {
      //               AUDIT_TYPE
      //               STATUS
      //               CREATED_BY
      //               __typename
      //             }
      //           }
      //           __typename
      //         }
      //       }
      //     `;
      //     let previous = cache.readQuery({ query }).auditFilter;
      //     previous.pageNumber = pageNumber;
      //     cache.writeData({ data: { auditFilter: previous } });
      //     return null;
      //   },
      //   setAuditFilterTextBox: (_, { textBoxName }, { cache }) => {
      //     let query = gql`
      //       query {
      //         auditFilter @client {
      //           pageNumber
      //           display
      //           textBoxName
      //           isFilterApplied
      //           isValue
      //           filterState {
      //             tokenSelected {
      //               AUDIT_TYPE
      //               STATUS
      //               CREATED_BY
      //               __typename
      //             }
      //             searchQuery {
      //               AUDIT_TASK_ID
      //               SPECIFIC_PPS_ID
      //               SPECIFIC_SKU_ID
      //               SPECIFIC_LOCATION_ID
      //               FROM_DATE
      //               TO_DATE
      //               __typename
      //             }

      //             defaultToken {
      //               AUDIT_TYPE
      //               STATUS
      //               CREATED_BY
      //               __typename
      //             }
      //           }
      //           __typename
      //         }
      //       }
      //     `;
      //     let previous = cache.readQuery({ query }).auditFilter;
      //     previous.textBoxName = textBoxName;

      //     cache.writeData({ data: { auditFilter: previous } });
      //     return null;
      //   },
      //   setIsValueApplied: (_, { isValue }, { cache }) => {
      //     let query = gql`
      //       query {
      //         auditFilter @client {
      //           display
      //           isFilterApplied
      //           isValue
      //           filterState {
      //             tokenSelected {
      //               AUDIT_TYPE
      //               STATUS
      //               CREATED_BY
      //               __typename
      //             }
      //             searchQuery {
      //               AUDIT_TASK_ID
      //               SPECIFIC_PPS_ID
      //               SPECIFIC_SKU_ID
      //               SPECIFIC_LOCATION_ID
      //               FROM_DATE
      //               TO_DATE
      //               __typename
      //             }

      //             defaultToken {
      //               AUDIT_TYPE
      //               STATUS
      //               CREATED_BY
      //               __typename
      //             }
      //           }
      //           __typename
      //         }
      //       }
      //     `;
      //     let previous = cache.readQuery({ query }).auditFilter;
      //     previous.isValue = isValue;
      //     cache.writeData({ data: { auditFilter: previous } });
      //     return null;
      //   },
      setItemSearchFilterState: (_, { state }, { cache }) => {
        let query = gql`
          query {
            itemSearchFilter @client {
              display
              isFilterApplied
              isValue
              filterState {
                tokenSelected {
                  AUDIT_TYPE
                  STATUS
                  CREATED_BY
                  __typename
                }
                searchQuery {
                  AUDIT_TASK_ID
                  SPECIFIC_PPS_ID
                  SPECIFIC_SKU_ID
                  SPECIFIC_LOCATION_ID
                  FROM_DATE
                  TO_DATE
                  __typename
                }

                defaultToken {
                  AUDIT_TYPE
                  STATUS
                  CREATED_BY
                  __typename
                }
              }
              __typename
            }
          }
        `;
        let previous = cache.readQuery({ query }).itemSearchFilter;
        previous.filterState = state;
        previous.filterState.__typename = 'AuditFilterState';
        cache.writeData({ data: { itemSearchFilter: previous } });
        return null;
      }
    }
  }
};

export default itemSearchFilterState;
