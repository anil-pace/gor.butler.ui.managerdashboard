import React  from 'react';
import { FormattedMessage,FormattedPlural } from 'react-intl'; 
import {AUDIT_RESOLVED, AUDIT_LINE_REJECTED, SUCCESS, ERROR} from '../constants/frontEndConstants';
import {ERR_RES} from '../constants/messageConstants';

export function statusToString(res){
          let stringInfo;
          switch(res.status)
          {
            case AUDIT_RESOLVED:
              stringInfo={
                type:SUCCESS,
                msg:(<FormattedMessage id="audit.resolve.success" description='Text for resolved audit lines' 
                                       defaultMessage='Audit task {auditId} with {auditType} - {auditTypeValue} has been approved' 
                                       values={{auditId:res.audit_display_id, auditType:res.audit_type, auditTypeValue:res.audit_type_value}}
                    />)   
              }
              break;
            
            case AUDIT_LINE_REJECTED:
              stringInfo={
                type:SUCCESS,
                msg:(<FormattedMessage id="audit.resolve.rejected" description='Text for rejected audit lines' 
                                       defaultMessage='Audit task {auditId} with {auditType} - {auditTypeValue} has been rejected' 
                                       values={{auditId:res.audit_display_id, auditType:res.audit_type, auditTypeValue:res.audit_type_value}}
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