/**
 * Created by gaurav.m on 2/28/18.
 */
import gql from 'graphql-tag'
const auditFilterState = {
    defaults: {
        auditFilter: {
            display: false,
            isFilterApplied: false,
            filterState: null,
            isUpdateSubsciption:false,
            isValue:"Raja",
            pageNumber:1,
            listData:null,
            textBoxName:null,
            __typename: 'AuditFilter'
        },
    },
    resolvers: {
        Mutation: {
            setShowAuditFilter: (_, {filter}, {cache}) => {
                let query = gql`
                    query  {
                        auditFilter @client{
                            display
                            isFilterApplied
                            
                            isValue
                            filterState{
                                defaultToken{
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
                let previous = cache.readQuery({query}).auditFilter
                previous.display = filter
                cache.writeData({data: {auditFilter: previous}});
                return null;

            },
            setAuditListData: (_, {listData}, {cache}) => {
                let query = gql`
                    query  {
                        auditFilter @client{
                            display
                            listData
                            isFilterApplied
                            isValue
                            filterState{
                                tokenSelected{
                                    AUDIT_TYPE
                                    STATUS
                                    CREATED_BY
                                    __typename
                                }
                                searchQuery{
                                    AUDIT_TASK_ID
                                    SPECIFIC_PPS_ID
                                    SPECIFIC_SKU_ID
                                    SPECIFIC_LOCATION_ID
                                    FROM_DATE
                                    TO_DATE
                                    __typename
                                }
                                
                                defaultToken{
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
                let previous = cache.readQuery({query}).auditFilter
                previous.listData = listData
                cache.writeData({data: {auditFilter: previous}});
                return null;

            },
            setAuditFilterApplied: (_, {isFilterApplied}, {cache}) => {
                let query = gql`
                    query  {
                        auditFilter @client{
                            display
                            isFilterApplied
                            isValue
                            filterState{
                                tokenSelected{
                                    AUDIT_TYPE
                                    STATUS
                                    CREATED_BY
                                    __typename
                                }
                                searchQuery{
                                    AUDIT_TASK_ID
                                    SPECIFIC_PPS_ID
                                    SPECIFIC_SKU_ID
                                    SPECIFIC_LOCATION_ID
                                    FROM_DATE
                                    TO_DATE
                                    __typename
                                }
                                
                                defaultToken{
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
                let previous = cache.readQuery({query}).auditFilter
                previous.isFilterApplied = isFilterApplied
                cache.writeData({data: {auditFilter: previous}});
                return null;

            },
           
            setAuditUpdateSubscription: (_, {isUpdateSubsciption}, {cache}) => {
                let query = gql`
                    query  {
                        auditFilter @client{
                            display
                            isFilterApplied
                            isUpdateSubsciption
                            isValue
                            filterState{
                                tokenSelected{
                                    AUDIT_TYPE
                                    STATUS
                                    CREATED_BY
                                    __typename
                                }
                                searchQuery{
                                    AUDIT_TASK_ID
                                    SPECIFIC_PPS_ID
                                    SPECIFIC_SKU_ID
                                    SPECIFIC_LOCATION_ID
                                    FROM_DATE
                                    TO_DATE
                                    __typename
                                }
                                
                                defaultToken{
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
                let previous = cache.readQuery({query}).auditFilter
                previous.isUpdateSubsciption = isUpdateSubsciption
                cache.writeData({data: {auditFilter: previous}});
                return null;

            },
            setAuditPageNumber: (_, {pageNumber}, {cache}) => {
                let query = gql`
                    query  {
                        auditFilter @client{
                            pageNumber
                            display
                            isFilterApplied
                            isValue
                            filterState{
                                tokenSelected{
                                    AUDIT_TYPE
                                    STATUS
                                    CREATED_BY
                                    __typename
                                }
                                searchQuery{
                                    AUDIT_TASK_ID
                                    SPECIFIC_PPS_ID
                                    SPECIFIC_SKU_ID
                                    SPECIFIC_LOCATION_ID
                                    FROM_DATE
                                    TO_DATE
                                    __typename
                                }
                                
                                defaultToken{
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
                let previous = cache.readQuery({query}).auditFilter
                previous.pageNumber = pageNumber
                cache.writeData({data: {auditFilter: previous}});
                return null;

            },
            setAuditFilterTextBox: (_, {textBoxName}, {cache}) => {
                let query = gql`
                    query  {
                        auditFilter @client{
                            pageNumber
                            display
                            textBoxName
                            isFilterApplied
                            isValue
                            filterState{
                                tokenSelected{
                                    AUDIT_TYPE
                                    STATUS
                                    CREATED_BY
                                    __typename
                                }
                                searchQuery{
                                    AUDIT_TASK_ID
                                    SPECIFIC_PPS_ID
                                    SPECIFIC_SKU_ID
                                    SPECIFIC_LOCATION_ID
                                    FROM_DATE
                                    TO_DATE
                                    __typename
                                }
                                
                                defaultToken{
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
                let previous = cache.readQuery({query}).auditFilter
                previous.textBoxName = textBoxName;
                
                cache.writeData({data: {auditFilter: previous}});
                return null;

            },
            setIsValueApplied: (_, {isValue}, {cache}) => {
                let query = gql`
                    query  {
                        auditFilter @client{
                            display
                            isFilterApplied
                            isValue
                            filterState{
                                tokenSelected{
                                    AUDIT_TYPE
                                    STATUS
                                    CREATED_BY
                                    __typename
                                }
                                searchQuery{
                                    AUDIT_TASK_ID
                                    SPECIFIC_PPS_ID
                                    SPECIFIC_SKU_ID
                                    SPECIFIC_LOCATION_ID
                                    FROM_DATE
                                    TO_DATE
                                    __typename
                                }
                                
                                defaultToken{
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
                let previous = cache.readQuery({query}).auditFilter
                previous.isValue = isValue
                cache.writeData({data: {auditFilter: previous}});
                return null;

            },
            setAuditFilterState: (_, {state}, {cache}) => {
                let query = gql`
                    query  {
                        auditFilter @client{
                            display
                            isFilterApplied
                            isValue
                            filterState{
                                tokenSelected{
                                    AUDIT_TYPE
                                    STATUS
                                    CREATED_BY
                                    __typename
                                }
                                searchQuery{
                                    AUDIT_TASK_ID
                                    SPECIFIC_PPS_ID
                                    SPECIFIC_SKU_ID
                                    SPECIFIC_LOCATION_ID
                                    FROM_DATE
                                    TO_DATE
                                    __typename
                                }
                                
                                defaultToken{
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
                let previous = cache.readQuery({query}).auditFilter
                previous.filterState = state
                previous.filterState.__typename="AuditFilterState"
                cache.writeData({data: {auditFilter: previous}});
                return null;

            }


        },
    },
};



export default auditFilterState;