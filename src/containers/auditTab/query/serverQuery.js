import gql from 'graphql-tag';
export const AUDIT_VALIDATE_QUERY = gql`query AuditSKUList($sku:dataListParams){
  AuditSKUList(input:$sku){
     list
    }
      }
  `;
export const AUDIT_EDIT_DUPLICATE_QUERY = gql`query EditAuditDetails($data:EditAuditParams){
    EditAuditDetails(input:$data){
     list
    }
      }
  `;
export const AUDIT_REQUEST_QUERY = gql`query AuditRequestSubmit($input: AuditRequestSubmitParams){
    
    AuditRequestSubmit(input:$input){
      list
    }
  }
  `;

export const AUDIT_USER_FETCH_QUERY = gql`query AuditFetchUser{
  AuditFetchUser{
   list{
    users
  }
  }
}`;
export const AUDIT_PPS_FETCH_QUERY = gql`query AuditPPSDetails  {
    
  AuditPPSDetails{
    list {
      pps_list{
        auditlines_pending
      audits_pending
      operator_assigned
      pps_id
      pps_mode
      }
          }
  }}`;
export const AUDIT_START = gql`
    query AuditChangePPS($params:ChangePPSParams){
      AuditChangePPS(input:$params){
        list{
        pps_list{
		    code
        description
        level
      }
    }
		}
}
 `;
export const AUDIT_RESOLVE_QUERY = gql`
query AuditResolve($input: AuditResolveParams){
    
  AuditResolve(input:$input){
    list {
    audit_param_type
    auditlines{
      auditline_id
      k_deep_audit
      pdfa_audit_attributes{
        pdfa_values
      }
      anamoly_info{
        actual_quantity
        expected_quantity
        name
        type
      }
    slot_id
    status
    }    
 }

  }
}
`;

export const AUDIT_RESOLVE_SUBMIT_QUERY = gql`
query AuditResolveSubmit($input: AuditResolveSubmitParams){
  AuditResolveSubmit(input:$input){
    list
  }
}
`;

export const AUDIT_DETAILS_QUERY = gql`query AuditDetails($input: AuditDetailsParams){
    
  AuditDetails(input:$input){
    list {
      audit_creator_name
      audit_id
      audit_name
      audit_param_type
      change_pps_button
      completion_time
      kq
      operator_assigned
      reminder
      start_request_time
      pps_id
            entity_list{
               attributes_list
      id
      name
      operator_assigned
      result{
         actual_quantity
      expected_quantity
      }
            }
      progress{
        completed
      total
      }
            
          }

  }
}
`;

export const AUDIT_DETAILS_SUBSCRIPTION_QUERY = gql`
  subscription AUDIT_DETAILS_CHANNEL($input: AuditDetailsParams){   
    AuditDetails(input:$input){
      list {
        audit_creator_name
        audit_id
        audit_name
        audit_param_type
        change_pps_button
        completion_time
        kq
        operator_assigned
        reminder
        start_request_time
        pps_id
              entity_list{
                 attributes_list
        id
        name
        operator_assigned
        result{
           actual_quantity
        expected_quantity
        }
              }
        progress{
          completed
        total
        }
              
            }
          }
}
`;
export const AUDIT_QUERY = gql`query AuditList($input: AuditListParams){
    
  AuditList(input:$input){
      
      list {
          create_time
          approved
          rejected
          actual_quantity
          audit_created_by
          audit_id
          audit_name
          audit_creator_name
          audit_info
          audit_param_name
          audit_param_type
          audit_param_value
          audit_status
          audit_type
          cancel_request
          completed_quantity
          completion_time
          description
          display_id
          expected_quantity
          pps_id
          resolved
          start_actual_time
          start_request_time
          unresolved
          kq
          
          audit_button_data {
            audit_cancel_button
            audit_delete_button
            audit_duplicate_button
            audit_edit_button
            audit_pause_button
            audit_reaudit_button
            audit_resolve_button
            audit_start_button
            
          }
          audit_progress {
            completed
            total
            
          }
          __typename
        }
        page
        page_results
        total_pages
        total_results

  }
}
`;



export const AUDIT_SUBSCRIPTION_QUERY = gql`
  subscription AUDIT_CHANNEL($input: AuditListParams){   
     
      AuditList(input:$input){
     
      list {
        approved
        rejected
          create_time
          actual_quantity
          audit_created_by
          audit_id
          audit_name
          audit_creator_name
          audit_info
          audit_param_name
          audit_param_type
          audit_param_value
          audit_status
          audit_type
          cancel_request
          completed_quantity
          completion_time
          description
          display_id
          expected_quantity
          pps_id
          resolved
          start_actual_time
          start_request_time
          unresolved
          kq
        
          audit_button_data {
            audit_cancel_button
            audit_delete_button
            audit_duplicate_button
            audit_edit_button
            audit_pause_button
            audit_reaudit_button
            audit_resolve_button
            audit_start_button
            
          }
          audit_progress {
            completed
            total
            
          }
          __typename
        }
        page
        page_results
        total_pages
        total_results
  }
}
`;

export const ITEM_SEARCH_DETAILS_QUERY = gql`
  query ItemSearchDetailsList($input: ItemSearchDetailsListParams) {
    ItemSearchDetailsList(input: $input) {
      list {
        externalServiceRequestId
        createdOn
        attributes {
          ppsIdList
        }
        actuals {
          containers
        }
      }
    }
  }
`;
export const ITEM_SEARCH_QUERY = gql`
  query ItemSearchList($input: ItemSearchListParams) {
    ItemSearchList(input: $input) {
      list {
        serviceRequests {
          type
          status
          state
          externalServiceRequestId
          createdOn
          updatedOn
          attributes {
            ppsIdList
          }
          expectations {
            containers {
              products {
                productAttributes {
                  pdfa_values {
                    product_sku
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const ITEM_SEARCH_START_QUERY = gql`
  query ItemSearchStart($input: ItemSearchStartParams) {
    ItemSearchStart(input: $input) {
      list
    }
  }
`;
