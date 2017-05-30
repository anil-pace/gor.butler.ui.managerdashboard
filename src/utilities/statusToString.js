import React  from 'react';
import { FormattedMessage } from 'react-intl'; 
import {AUDIT_RESOLVED, AUDIT_LINE_REJECTED, SUCCESS, ERROR, AUDIT_BY_PDFA,ITEM_RECALLED_DATA} from '../constants/frontEndConstants';
import {ERR_RES} from '../constants/messageConstants';

export function statusToString(res){
          var stringInfo, auditType, auditTypeValue, auditId;
          switch(res.status)
          {
            case AUDIT_RESOLVED:
              auditId=res.audit_display_id;
               auditType=res.audit_type;
               auditTypeValue=res.audit_type_value;
               if(auditType=== AUDIT_BY_PDFA) {
                auditType="SKU";
                auditTypeValue=res.audit_type_value.product_sku;
              }
              stringInfo={
                type:SUCCESS,
                msg:(<FormattedMessage id="audit.resolve.success" description='Text for resolved audit lines' 
                                       defaultMessage='Audit task {auditId} with {auditType} - {auditTypeValue} has been approved' 
                                       values={{auditId:res.audit_display_id, auditType:res.audit_type, auditTypeValue:res.audit_type_value}}
                    />)   
              }
              break;
            
            case AUDIT_LINE_REJECTED:
              auditId=res.audit_display_id;
              auditType=res.audit_type;
              auditTypeValue=res.audit_type_value;
              if(auditType=== AUDIT_BY_PDFA) {
                auditType="SKU";
                auditTypeValue=res.audit_type_value.product_sku;
              }
              stringInfo={
                type:SUCCESS,
                msg:(<FormattedMessage id="audit.resolve.rejected" description='Text for rejected audit lines' 
                                       defaultMessage='Audit task {auditId} with {auditType} - {auditTypeValue} has been rejected' 
                                       values={{auditId:res.audit_display_id, auditType:res.audit_type, auditTypeValue:res.audit_type_value}}
                    />)   
              }
              break;

            case ITEM_RECALLED_DATA:
              var itemCount=res.item_count?res.item_count:0;
              stringInfo={
                type:SUCCESS,
                msg:(<FormattedMessage id="utility.item.recall" description='Item recall message' 
                                       defaultMessage='{itemCount} expired items recalled' 
                                       values={{itemCount:itemCount?itemCount:"0"}}
                    />)   
              }
              break;

            default:
              stringInfo={
                type:ERROR,
                msg:ERR_RES
              }
          }
          return stringInfo;
}