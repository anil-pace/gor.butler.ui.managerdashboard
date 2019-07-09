
import {codeToString} from "./codeToString";
import {
    START_AUDIT,
    DELETE_AUDIT,
    CHANGE_PPS_TASK,
    AUDIT_RESOLVE_CONFIRMED,
    CANCEL_AUDIT
} from "../constants/frontEndConstants";
import {ShowError} from "./showError";
import {statusToString} from "./statusToString";
import {getFormattedMessages} from "../utilities/getFormattedMessages";

export function AuditParse(res, cause,_this) {
   
    switch (cause) {
      case 'edit':
        var values={},stringInfo={},msg={};
        if(cause=="edit"){
         if (res.display_id) {
          values={id:res.display_id},
          msg = getFormattedMessages("EDITED", values);  
          _this.props.notifyfeedback(msg)
          _this.props.setAuditListRefresh('flag');
         
          return;
        } 
        else {
        stringInfo = codeToString(res.alert_data[0]);
        _this.props.setNotification(stringInfo)
 
        return;
        }
        }
        break;
       case 'duplicate':
        if (res.display_id) {
          values={id:res.display_id},
          msg = getFormattedMessages("DUPLICATED", values);
          _this.props.notifyfeedback(msg)
          _this.props.setAuditListRefresh('flag');
          
          return;
        }
        else{
          stringInfo = codeToString(res.alert_data[0]);
          _this.props.setNotification(stringInfo)
          return;
        }
      
    break;
    case 'create':
    if (res.display_id) {
        values={id:res.display_id}
         msg = getFormattedMessages("CREATEAUDIT", values);  
         _this.props.notifyfeedback(msg)
        _this.props.setAuditListRefresh('flag');
        //_this.props.setAuditSpinner(false);
         return;
   
   } 
   else {
    stringInfo = codeToString(res.alert_data[0]);
   _this.props.setNotification(stringInfo);
   //_this.props.setAuditSpinner(false);
   return;
   }
break;
case 'pause':
if (res.alert_data[0].code=="as006") {
    values={id:res.alert_data[0].details.display_id},
    msg = getFormattedMessages("PAUSEAUDIT", values);
    _this.props.notifyfeedback(msg)
    _this.props.setAuditListRefresh('flag');
    //_this.props.setAuditSpinner(false);
   // store.dispatch(setCheckedAudit([]));
    }
    else{
        values={id:res.alert_data[0].details.display_id},
        stringInfo = codeToString(res.alert_data[0]);
        _this.props.setNotification(stringInfo);
       // _this.props.setAuditSpinner(false);
   
    }
    break;

    case 'START_AUDIT_TASK':
    if((res.successful && res.successful.length>=1) || (res.unsuccessful && res.unsuccessful.length>=1) || ((res.successful && res.successful.length===1) && (res.unsuccessful && res.unsuccessful.length===1)))
    {
       var successCount = res.successful.length,
            unsuccessfulCount = Object.keys(res.unsuccessful).length,
            values = {
                successful: successCount,
                totalCount: successCount + unsuccessfulCount,
                fail:unsuccessfulCount
               
            };
            if(successCount>=1){
            msg = getFormattedMessages("BulkAudit", values);
            _this.props.notifyfeedback(msg);
         
            }
            if(res.unsuccessful.length>=1){
                stringInfo = getFormattedMessages("STARTFAIL", values);
              
                _this.props.setNotification(stringInfo);
            }
       
           _this.props.setAuditListRefresh('flag');
    }
    else if(res.alert_data[0].code== "as007"){//to do
            stringInfo = codeToString(res.alert_data[0]);
            _this.props.notifyfeedback(stringInfo.msg)
    }
         
    else if(res.alert_data[0].code== "g028"){
        stringInfo = codeToString(res.alert_data[0]);
        _this.props.setNotification(stringInfo);
[]
    }
    else
    {
        stringInfo = getFormattedMessages("STARTFAILALL", values);
        _this.props.setNotification(stringInfo);

    }
    //_this.props.setAuditSpinner(false);
    break;
case DELETE_AUDIT:
   
    if(res.alert_data[0].code!=="as002")
    {
            values={id:res.alert_data[0].details.display_id},
            stringInfo = codeToString(res.alert_data[0]);
           // _this.props.setAuditSpinner(false);

            _this.props.setNotification(stringInfo);
            _this.props.setAuditListRefresh('flag');
        }
        else{
            values={id:res.alert_data[0].details.display_id};
            msg = getFormattedMessages("DELETEAUDIT", values);
           _this.props.notifyfeedback(msg);
           //_this.props.setAuditSpinner(false);
           _this.props.setAuditListRefresh('flag'); //reset refresh flag

        }
      break;

      case CANCEL_AUDIT:
        if (res.alert_data[0].code=="g027") {
          values={id:res.alert_data[0].details.display_id};
          stringInfo = codeToString(res.alert_data[0]);
          _this.props.setNotification(stringInfo);
          _this.props.setAuditListRefresh('flag'); //set refresh flag
          _this.props.setAuditSpinner(false);
      }
      else{
          values={id:res.alert_data[0].details.display_id},
          msg = getFormattedMessages("CANCELLED", values);
          _this.props.notifyfeedback(msg);

         _this.props.setAuditSpinner(false);
      }
      break;
      case AUDIT_RESOLVE_CONFIRMED:
      if (res.successful.status) {
          stringInfo = statusToString(res.successful);
          _this.props.notifyfeedback(stringInfo.msg);
         _this.props.setAuditListRefresh('flag');
        // _this.props.setAuditSpinner(false);
      } else {
          stringInfo = getFormattedMessages("RESOLVEFAIL", values);
          _this.props.setNotification(stringInfo);
          _this.props.setAuditListRefresh('flag');
        //  _this.props.setAuditSpinner(false);
      }
      break;
      case CHANGE_PPS_TASK:
   
    if(res.code!=="as007")
    {
            values={id:res.details.audit_id},
            stringInfo = codeToString(res);
            _this.props.setNotification(stringInfo);
            _this.props.setAuditListRefresh('flag');
        }
        else{
            values={id:res.details.audit_id};
            msg = getFormattedMessages("CHANGEPPS", values);
           _this.props.notifyfeedback(msg);
           _this.props.setAuditListRefresh('flag'); //reset refresh flag

        }
      break;

        default:
           console.log('New Type');
            break;
    }
}
