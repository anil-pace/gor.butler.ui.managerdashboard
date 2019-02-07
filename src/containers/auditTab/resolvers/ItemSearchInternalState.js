/**
 * Created by raja.d on 2/28/18.
 */
import gql from 'graphql-tag'
const itemSearchInternalState = {
    defaults: {
        ppsCheckedData: {
            checkedAuditPPSList: [],
            checkedOtherPPSList: [],
            checkedAudit: [],
            auditDetails: [],
            __typename: 'IntenalState'
        },
        auditEditDupData: {
            auditEditData: null,
            edit_Dup_Details: null,
            edit_Dup_Validate_Details: null,
            skuAttributes: null,
            hasDataChanged: null,
            skuDataChanged: null,
            auditSpinner: false,
            auditValidationSpinner: false,
            locationAttributes: null,
            locationDataChanged: null,
            auditValidationSpinner: false,
            __typename: 'AuditEditDupIntenalState'
        },
        auditResolveData: {
            auditLines: null,
            audit_param_type: null,
            datachange: false,
            __typename: 'AuditResolveIntenalState'
        },
        auditSpinnerstatus: {
            auditSpinner: false,
            viewAuditSpinner: true,
            __typename: 'AuditSpinnerStatus'
        },
        auditNeedRefreshFlag: {
            auditRefreshFlag: false,
            __typename: 'AuditNeedRefreshFlag'
        }

    },
    resolvers: {
        Mutation: {
            setCheckedAuditpps: (_, { checkedAuditPPSList }, { cache }) => {
                let query = gql`
                    query  {
                        ppsCheckedData @client{
                            checkedAuditPPSList
                            __typename
                            }
                        }
                `;
                let previous = cache.readQuery({ query }).ppsCheckedData
                previous.checkedAuditPPSList = checkedAuditPPSList
                cache.writeData({ data: { ppsCheckedData: previous } });
                return null;

            },
            setCheckedOtherpps: (_, { checkedOtherPPSList }, { cache }) => {
                let query = gql`
                    query  {
                        ppsCheckedData @client{
                            checkedOtherPPSList
                            __typename
                            }
                        }
                `;
                let previous = cache.readQuery({ query }).ppsCheckedData
                previous.checkedOtherPPSList = checkedOtherPPSList
                cache.writeData({ data: { ppsCheckedData: previous } });
                return null;

            },
            setCheckedAudit: (_, { checkedAudit }, { cache }) => {
                let query = gql`
                    query  {
                        ppsCheckedData @client{
                            checkedAudit
                            auditDetails
                            __typename
                            }
                        }
                `;
                let previous = cache.readQuery({ query }).ppsCheckedData
                previous.checkedAudit = checkedAudit
                cache.writeData({ data: { ppsCheckedData: previous } });
                return null;

            },
            setAuditDetails: (_, { auditDetails }, { cache }) => {
                let query = gql`
                    query  {
                        ppsCheckedData @client{
                            checkedAudit
                            auditDetails
                            __typename
                            }
                        }
                `;
                let previous = cache.readQuery({ query }).ppsCheckedData
                previous.auditDetails = JSON.stringify(auditDetails);
                cache.writeData({ data: { ppsCheckedData: previous } });
                return null;

            },

            setAuditEditDupDetails: (_, { edit_Dup_Details }, { cache }) => {
                let query = gql`
                query  {
                  auditEditDupData @client{
                        auditEditData  
                        edit_Dup_Details 
                        skuAttributes          
                        hasDataChanged
                        skuDataChanged
                        auditSpinner
                        auditValidationSpinner
                        locationAttributes
                        locationDataChanged
                        auditValidationSpinner
                        __typename
                    }
                } 
            `;
                let previous = cache.readQuery({ query }).auditEditDupData;
                previous.skuAttributes = null;
                previous.auditEditData = JSON.stringify(edit_Dup_Details.auditEditData);
                previous.auditSpinner = edit_Dup_Details.auditSpinner;
                previous.auditValidationSpinner = edit_Dup_Details.auditValidationSpinner;
                previous.hasDataChanged = edit_Dup_Details.hasDataChanged;
                previous.locationAttributes = JSON.stringify(edit_Dup_Details.locationAttributes);
                previous.skuDataChanged = edit_Dup_Details.skuDataChanged;
                cache.writeData({ data: { auditEditDupData: previous } });
                return null;

            },

            setAuditEditDupValidateDetails: (_, { edit_Dup_Validate_Details }, { cache }) => {
                let query = gql`
                query  {
                  auditEditDupData @client{
                        auditEditData  
                        edit_Dup_Details  
                        edit_Dup_Validate_Details  
                        skuAttributes       
                        hasDataChanged
                        skuDataChanged
                        auditSpinner
                        auditValidationSpinner
                        locationAttributes
                        locationDataChanged
                        auditValidationSpinner
                        __typename
                    }
                } 
            `;
                let previous = cache.readQuery({ query }).auditEditDupData
                previous.skuAttributes = JSON.stringify(edit_Dup_Validate_Details.skuAttributes);
                previous.auditValidationSpinner = edit_Dup_Validate_Details.auditValidationSpinner;
                previous.hasDataChanged = edit_Dup_Validate_Details.hasDataChanged;
                previous.locationAttributes = edit_Dup_Validate_Details.locationAttributes ? JSON.stringify(edit_Dup_Validate_Details.locationAttributes) : null;
                previous.skuDataChanged = edit_Dup_Validate_Details.skuDataChanged;
                previous.locationDataChanged = edit_Dup_Validate_Details.locationDataChanged;
                cache.writeData({ data: { auditEditDupData: previous } });
                return null;

            },

            setHasDataChanged: (_, { hasDataChanged }, { cache }) => {
                let query = gql`
                query  {
                  auditEditDupData @client{
                    auditEditData             
                        hasDataChanged
                        skuDataChanged
                        auditSpinner
                        auditValidationSpinner
                        locationAttributes
                        locationDataChanged
                        auditValidationSpinner
                        __typename
                    }
                } 
            `;
                let previous = cache.readQuery({ query }).auditEditDupData
                previous.hasDataChanged = !previous.hasDataChanged
                cache.writeData({ data: { auditEditDupData: previous } });
                return null;

            },
            setAuditPendingLines: (_, { auditPendingLines }, { cache }) => {
                let query = gql`
                query  {
                    auditResolveData @client{
                        auditLines
                        audit_param_type
                        datachange
                        __typename
                    }
                } 
            `;
                let previous = cache.readQuery({ query }).auditResolveData
                previous.auditLines = JSON.stringify(auditPendingLines.audiltLine)
                previous.audit_param_type = auditPendingLines.audit_param_type
                previous.datachange = !previous.datachange
                cache.writeData({ data: { auditResolveData: previous } });
                return null;

            },
            setAuditSpinnerState: (_, { auditSpinner }, { cache }) => {
                let query = gql`
                query  {
                    auditSpinnerstatus @client{
                        auditSpinner
                        viewAuditSpinner
                        __typename
                    }
                } 
            `;
                let previous = cache.readQuery({ query }).auditSpinnerstatus
                previous.auditSpinner = auditSpinner
                cache.writeData({ data: { auditSpinnerstatus: previous } });
                return null;

            },
            setViewAuditSpinnerState: (_, { viewAuditSpinner }, { cache }) => {
                let query = gql`
                query  {
                    auditSpinnerstatus @client{
                        auditSpinner
                        viewAuditSpinner
                        __typename
                    }
                } 
            `;
                let previous = cache.readQuery({ query }).auditSpinnerstatus
                previous.viewAuditSpinner = viewAuditSpinner
                cache.writeData({ data: { auditSpinnerstatus: previous } });
                return null;

            },
            setResolveAuditSpinner: (_, { resolveAuditSpinner }, { cache }) => {
                let query = gql`
                query  {
                    auditSpinnerstatus @client{
                        auditSpinner
                        viewAuditSpinner
                        resolveAuditSpinner
                        __typename
                    }
                } 
            `;
                let previous = cache.readQuery({ query }).auditSpinnerstatus
                previous.resolveAuditSpinner = resolveAuditSpinner
                cache.writeData({ data: { auditSpinnerstatus: previous } });
                return null;

            },

            setValidAuditSpinnerState: (_, { validAuditSpinner }, { cache }) => {
                let query = gql`
                query  {
                  auditEditDupData @client{
                    auditEditData             
                        hasDataChanged
                        skuDataChanged
                        auditSpinner
                        locationAttributes
                        locationDataChanged
                        auditValidationSpinner
                        __typename
                    }
                } 
            `;
                let previous = cache.readQuery({ query }).auditEditDupData
                previous.auditValidationSpinner = validAuditSpinner
                cache.writeData({ data: { auditEditDupData: previous } });
                return null;

            },
            setAuditListRefreshState: (_, { auditRefreshFlag }, { cache }) => {
                let query = gql`
                query  {
                  auditNeedRefreshFlag @client{
                    auditRefreshFlag
                    }
                } 
                `;
                let previous = cache.readQuery({ query }).auditNeedRefreshFlag
                previous.auditRefreshFlag = !previous.auditRefreshFlag
                cache.writeData({ data: { auditNeedRefreshFlag: previous } });
                return null;

            },




        },
    },
};



export default itemSearchInternalState;