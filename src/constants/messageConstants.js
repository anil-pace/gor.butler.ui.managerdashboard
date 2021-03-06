import React  from 'react';
import { FormattedMessage,FormattedPlural } from 'react-intl'; 

//Login page
export const ENG=(<FormattedMessage id='login.lang.english' defaultMessage="English (United States)" description="English option in the language drop down"/>);
export const JAP=(<FormattedMessage id='login.lang.japanese' defaultMessage="日本語" description="Japanese option in the language drop down"/>);
export const SPANISH=(<FormattedMessage id='login.lang.spanish' defaultMessage="Español" description="SPANISH option in the language drop down"/>);
export const CHINESE=(<FormattedMessage id='login.lang.chinese' defaultMessage="中文" description="Chinese option in the language drop down"/>);
export const GERMAN=(<FormattedMessage id='login.lang.german' defaultMessage="Deutsche" description="German option in the language drop down"/>);
export const FRENCH=(<FormattedMessage id='login.lang.french' defaultMessage="Français" description="French option in the language drop down"/>);


export const AUTO_LOGOUT=(<FormattedMessage id= 'login.autologout.message' defaultMessage="Due to session expiry, Auto Logout has been triggered!"
      description="Auto logout message"/>);
export const WRONG_CRED=(<FormattedMessage id='login.butler.fail' 
                        defaultMessage="Invalid username and/or password, please try again" description="Text for login failure"/>);
export const NO_NET=(<FormattedMessage id='login.butler.connection.fail' 
                        defaultMessage="Connection failure" description="Text for connection failure"/>);
export const UNAUTH=(<FormattedMessage id='login.butler.unauthorized' 
                        defaultMessage="You are not authorized" description="Text for unauthorized login"/>)
//success codes related to user management

export const US004=(<FormattedMessage id="notify.success.edit" description='Text for successfully editing user' 
      defaultMessage="User details updated successfully"/>);
//error codes related to user management

//success realted to pps mode change
export const MODE_REQUESTED=(<FormattedMessage id="ppsDetail.modeChange.success" description="Success Message for PPS mode" 
      defaultMessage="PPS Mode Change Request Processed"/>);

//error related to pps mode change
export const E028=(<FormattedMessage id="ppsDetail.modeChange.isAlreadyRequested" description="PPS is already in requested mode"
      defaultMessage="PPS is already in requested mode"/>);
export const E029=(<FormattedMessage id="ppsDetail.modeChange.tryLater" description="Previous Change request is pending"
      defaultMessage="Previous request of changing mode is already pending, Please try later!"/>);

export const UE002=(<FormattedMessage id="notify.error.usernameExists" description='Text for already registered username' 
      defaultMessage="An account has already been created with this User ID"/>);

export const UE003= (<FormattedMessage id="notify.error.passwordMissing" description='Text for passwords missing' 
      defaultMessage="Password not provided!"/>);

export const UE004= (<FormattedMessage id="notify.error.passwordMatch" description='Text for passwords not matching' 
      defaultMessage="Passwords do not match!"/>);

export const UE005= (<FormattedMessage id="notify.error.username" description='Text for missing username' 
      defaultMessage="Username is a required field!"/>);

export const UE006= (<FormattedMessage id="notify.error.role" description='Text for missing roles' 
      defaultMessage="Role is a required field!"/>);

//errors for info reducer
export const TYPE_SUCCESS= (<FormattedMessage id="appInfo.success" description='Text for success' 
      defaultMessage="Successfull"/>);

export const INVALID_ID= (<FormattedMessage id="user.invalid.id" description='Text for invalid user ID' 
      defaultMessage="Please enter a valid User ID"/>);

export const INVALID_FORMAT= (<FormattedMessage id="user.invalid.format" description='Text for invalid user ID format' 
      defaultMessage="Please use only letters (a-z), numbers, and periods"/>);

export const EMPTY_PWD= (<FormattedMessage id="login.empty.password" description='Text for empty password' 
      defaultMessage="Please enter a password"/>);

export const EMPTY_NAME= (<FormattedMessage id="user.empty.name" description='Text for empty user name' 
      defaultMessage="Please enter a user name"/>);

export const INVALID_NAME= (<FormattedMessage id="user.invalid.name" description='Text for invalid user name' 
      defaultMessage='Special characters like "~","@","%" are not allowed'/>);

export const INVALID_PWD_OP= (<FormattedMessage id="user.invalid.password.operator" description='Text for invalid password for operator' 
      defaultMessage="Please enter a password of at least 6 alphanumeric characters"/>);

export const INVALID_PWD_MG= (<FormattedMessage id="user.invalid.password.manager" description='Text for invalid password for manager' 
      defaultMessage="Please enter a password of at least 8 alphanumeric characters"/>);

export const MATCH_PWD= (<FormattedMessage id="user.match.password" description='Text for passwords not matching' 
      defaultMessage="Both password entered do not match. Please try again"/>);



export const MSU=(<FormattedMessage id="msu.name.prefix" description='prefix for msu name' 
      defaultMessage="MSU"/>);

export const CS=(<FormattedMessage id="chargingStation.name.prefix" description='prefix for charging station name' 
      defaultMessage="CS"/>);

export const PPS=(<FormattedMessage id="pps.name.prefix" description='prefix for pps name' 
      defaultMessage="PPS"/>);





export const INVALID_SKUID= (<FormattedMessage id="audit.invalid.sku" description='Text for invalid SKU ID' 
      defaultMessage="Invalid SKU"/>);

export const INVALID_LOCID= (<FormattedMessage id="audit.invalid.location" description='Text for invalid location ID' 
      defaultMessage="Invalid Location"/>);



// Codes for audit management
export const E026=(<FormattedMessage id="notify.error.audit.location" description='Text for invalid location' 
      defaultMessage="Location does not exist"/>);
export const E027=(<FormattedMessage id="notify.error.audit.sku" description='Text for invalid sku' 
      defaultMessage="SKU does not exist"/>);
export const G016=(<FormattedMessage id="notify.error.audit.g016" description='Text for unsuccessful audit deletion' 
      defaultMessage="Given audit does not exists"/>);
export const AE001=(<FormattedMessage id="notify.error.audit.AE001" description='Text for invalid audit ID' 
      defaultMessage="Audit Id does not exists"/>);
export const AE002=(<FormattedMessage id="notify.error.audit.AE002" description='Text for invalid PPS' 
      defaultMessage="Valid PPS not found for Audit"/>);
export const AE004=(<FormattedMessage id="notify.error.audit.AE004" description='Text for already processed location' 
      defaultMessage="Audit of location already under process"/>);
export const AE005=(<FormattedMessage id="notify.error.audit.AE005" description='Text for already processed sku' 
      defaultMessage="Audit of sku already under process"/>);
export const AE006=(<FormattedMessage id="notify.error.audit.AE006" description='Text for already processed audit' 
      defaultMessage="Audit ID already processed"/>);
export const AS001=(<FormattedMessage id="notify.create.audit.success" description='Text for successfull audit creation' 
      defaultMessage="New audit task created successfully"/>);
export const AS00A=(<FormattedMessage id="notify.start.audit.success" description='Text for successfull audit creation' 
      defaultMessage="PPS assigned successfully. Audit task started"/>);
export const AS003=(<FormattedMessage id="notify.delete.audit.processed" description='Text for already processed audit' 
      defaultMessage="Audit already processed. Cannot delete"/>);
export const AE007=(<FormattedMessage id="notify.Location.audit.pending" description='Text for Location of audit pending for approval' 
      defaultMessage="Location of audit pending for approval"/>);
export const AE008=(<FormattedMessage id="notify.Location.currently.processed" description='Text for Location of audit currently being processed' 
      defaultMessage="Location of audit currently being processed"/>);


//Codes for Ajax Parser
export const ERR_USR=(<FormattedMessage id="notify.error.user.fail" description='Text for error in updating user' 
      defaultMessage="Error in updating user"/>);
export const ERR_RES=(<FormattedMessage id="notify.error.user.response" description='Text for error in response' 
      defaultMessage="Error in response"/>);
export const ERR_AUDIT=(<FormattedMessage id="notify.error.audit.create" description='Text for error in creating audit' 
      defaultMessage="Error in creating audit"/>);
export const ERR_API=(<FormattedMessage id="notify.error.api" description='Text for unregistered API response' 
      defaultMessage="API response not registered"/>);
export const ERR_CONNECT=(<FormattedMessage id="notify.error.connection" description='Text for connection refused' 
      defaultMessage="Network Failure"/>);

export const ERR_400=(<FormattedMessage id="notify.error.400" description='Text for bad request' 
      defaultMessage="Network error: 400 Bad Request"/>);
export const ERR_401=(<FormattedMessage id="notify.error.401" description='Text for Unauthorizedun' 
      defaultMessage="Network error: 401 Unauthorized"/>);
export const ERR_403=(<FormattedMessage id="notify.error.403" description='Text for Forbidden' 
      defaultMessage="Network error: 403 Forbidden"/>);
export const ERR_405=(<FormattedMessage id="notify.error.405" description='Text for method not allowed' 
      defaultMessage="Network error: 405 Method Not Allowed"/>);
export const ERR_408=(<FormattedMessage id="notify.error.408" description='Text for request timeout' 
      defaultMessage="Network error: 408 Request Time-out"/>);
export const ERR_409=(<FormattedMessage id="notify.error.409" description='Text for conflict' 
      defaultMessage="Network error: 409 Conflict"/>);
export const ERR_500=(<FormattedMessage id="notify.error.500" description='Text for internal server error' 
      defaultMessage="Network error: 500 Internal Servor Error"/>);
export const ERR_502=(<FormattedMessage id="notify.error.502" description='Text for bad gateway' 
      defaultMessage="Network error: 502 Bad Gateway"/>);
//Inventory Tab messages
export const HISTOGRAM_NO_DATA_TEXT=(<FormattedMessage id="inventory.histogram.noDataText" description="Inventory Histogram No Data Text" 
    defaultMessage="No Stock Found"/>);


//Messages for user forms
export const MG_PWD=(<FormattedMessage id="users.add.password.subheading.manager" description='Subheading for create password' 
      defaultMessage='A password of at least 8 alphanumeric characters will be required for logging into the Management Interface and Operator Interface'/>);
export const OP_PWD=(<FormattedMessage id="users.add.password.subheading.operator" description='Subheading for create password operator' 
      defaultMessage='A password of 6 digits will be required for logging into the Operator Interface.'/>);

//Messages for emergency
export const E051=(<FormattedMessage id="emergency.resume.coreerror" description='Error while resuming operation' 
      defaultMessage='Cannot connect to butler core'/>);
export const E052=(<FormattedMessage id="emergency.resume.statuserror" description='Error while resuming operation' 
      defaultMessage='Emergency status not soft_manual'/>);
export const E135=(<FormattedMessage id="emergency.resume.Softemergency" description='Soft emergency still there' 
      defaultMessage='Soft emergency still there'/>);

export const ES=(<FormattedMessage id="emergency.resume.success" description='Operations resumed' 
      defaultMessage='Operation resumed'/>);

//Message for Master File upload
export const fileUploadMessages={
      "utility002":(<FormattedMessage id="masterdata.maxlimit.records" description='Records in file should not be greater than' 
      defaultMessage='Records in file should not be greater than'/>),
      "utility001":(<FormattedMessage id="masterdata.maxlimit.filesize" description='File size should not be greater than' 
      defaultMessage='File size should not be greater than'/>)
      
}
//AUDITRAJACANCEL
export const g020=(<FormattedMessage id="audit.cancellation.error.g020" description='Internal server error while requesting for audit cancel'
                                   defaultMessage='Internal server error while requesting for audit cancel'/>);
export const g021=(<FormattedMessage id="audit.cancellation.error.g021" description='Audit Id already sent for cancellation'
                                   defaultMessage='Audit Id already sent for cancellation'/>);
export const g023=(<FormattedMessage id="audit.cancellation.error.g023" description='Audit Id already successfully cancelled'
                                   defaultMessage='Audit Id already successfully cancelled'/>);
export const g024=(<FormattedMessage id="audit.cancellation.error.g024" description='Audit cancellation request denied'
                                   defaultMessage='Audit cancellation request denied'/>);

                                   /*Message for status change notification*/
export const allStatusSuccess = (<FormattedMessage id="pps.statusChange.allStatusSuccess" description='Records in file should not be greater than' 
      defaultMessage='Status change request successful'/>)

export const allModeSuccess =(<FormattedMessage id="pps.modeChange.allModeSuccess" description='Records in file should not be greater than' 
      defaultMessage='Mode change request successful'/>)
export const ppsModeFailure = "{unsuccessful}/{totalCount} mode change requests rejected";
export const ppsStatusFailure = "{unsuccessful}/{totalCount} status change requests rejected";
export const ppsModeSuccess ="Mode change request successful";
export const ppsStatusSuccess ="Status change request successful";

//Message for system emergency audit
export const SYTEM_GENERATED_TEXT=(<FormattedMessage id="audit.subheading" description='System Generated' defaultMessage='System Generated'/>);   


/*Zoning messages*/
export const ZONE_STATUS_INTL_MESSAGE ={
      operation_normal:(<FormattedMessage id="zoning.status.normal" description='Status text for zone' 
      defaultMessage='OPERATING'/>),
      zone_pause_initiated:(<FormattedMessage id="zoning.status.pauseInit" description='Status text for zone' 
      defaultMessage='PAUSE INITIATED'/>),
      zone_pause_activated:(<FormattedMessage id="zoning.status.pauseActivated" description='Status text for zone' 
      defaultMessage='PAUSE ACTIVATED'/>),
      zone_pause_deactivated:(<FormattedMessage id="zoning.status.pauseDeactive" description='Status text for zone' 
      defaultMessage='PAUSE DEACTIVATED'/>),
      zone_clear_initiated:(<FormattedMessage id="zoning.status.clearInit" description='Status text for zone' 
      defaultMessage='CLEAR INITIATED'/>),
      zone_clear_activated:(<FormattedMessage id="zoning.status.clearActive" description='Status text for zone' 
      defaultMessage='CLEAR ACTIVATED'/>),
      zone_clear_deactivated:(<FormattedMessage id="zoning.status.clearDeactivated" description='Status text for zone' 
      defaultMessage='CLEAR DEACTIVATED'/>),
      emergency_stop:(<FormattedMessage id="zoning.status.emergencyStop" description='Status text for zone' 
      defaultMessage='SYSTEM STOP ACTIVATED'/>),
      emergency_pause:(<FormattedMessage id="zoning.status.emergencyPause" description='Status text for zone' 
      defaultMessage='SYSTEM PAUSE'/>),
      stopped:(<FormattedMessage id="zoning.status.stopped" description='Status text for zone' 
      defaultMessage='STOPPED'/>),
      paused:(<FormattedMessage id="zoning.status.paused" description='Status text for zone' 
      defaultMessage='PAUSED'/>)
}

export const CONTROLLER_ACTION_TRIGGERED_MESSAGES={
      zone_pause:(<FormattedMessage id="zoning.action.zone_pause" description='Status text for zone' 
      defaultMessage='Zone pause activated'/>),
      zone_clear:(<FormattedMessage id="zoning.action.zone_clear" description='Status text for zone' 
      defaultMessage='Zone clear activated'/>),
      emergency_stop:(<FormattedMessage id="zoning.action.emergency_stop" description='Status text for zone' 
      defaultMessage='System stop activated'/>),
      emergency_pause:(<FormattedMessage id="zoning.action.emergency_pause" description='Status text for zone' 
      defaultMessage='System pause activated'/>),
      none:(<FormattedMessage id="zoning.action.none" description='Status text for zone' 
      defaultMessage='Standard'/>)
}
export const CONTROLLER_SENSOR_TRIGGERED_MESSAGES={
      button_press:(<FormattedMessage id="zoning.action.button_press" description='Status text for zone' 
      defaultMessage='Button pressed'/>),
      emergency_stop_button_press:(<FormattedMessage id="zoning.action.emergency_stop_button_press" description='Status text for zone' 
      defaultMessage='System stop button pressed'/>),
      emergency_pause_button_press:(<FormattedMessage id="zoning.action.emergency_pause_button_press" description='Status text for zone' 
      defaultMessage='System pause button pressed'/>),
      latch_gate:(<FormattedMessage id="zoning.action.latch_gate" description='Status text for zone' 
      defaultMessage='Entry gate breached'/>),
      light_curtain:(<FormattedMessage id="zoning.action.light_curtain" description='Status text for zone' 
      defaultMessage='Light curtains breached'/>),
      none:(<FormattedMessage id="zoning.action.noneSensor" description='Status text for zone' 
      defaultMessage='Standard'/>)
}
/*Messages for operations logs*/
export const REQUEST_REPORT_SUCCESS = (<FormattedMessage id="operationsLog.reportRequest.success" description='Status text for zone' 
      defaultMessage='Request successfully generated. Kindly check the Download Tab'/>)
export const REQUEST_REPORT_FAILURE = (<FormattedMessage id="operationsLog.reportRequest.failure" description='Status text for zone' 
      defaultMessage='Error creating request'/>)

export const ZONE_SUB_STATUS_INTL_MESSAGE={
      zone_pause:(<FormattedMessage id="zoning.substatus.action.zone_pause" description='Status text for zone' 
      defaultMessage='Zone pause activated'/>),
      zone_clear:(<FormattedMessage id="zoning.substatus.action.zone_clear" description='Status text for zone' 
      defaultMessage='Zone clear activated'/>),
      emergency_stop:(<FormattedMessage id="zoning.substatus.action.emergency_stop" description='Status text for zone' 
      defaultMessage='System stop activated'/>),
      emergency_pause:(<FormattedMessage id="zoning.substatus.action.emergency_pause" description='Status text for zone' 
      defaultMessage='System pause activated'/>)
}

export const ENTITY_BREACHED = {
      light_curtain:(<FormattedMessage id="zoning.entity.lightCurtains" description='Status text for zone' 
      defaultMessage='Light Curtain'/>),
      latch_gate:(<FormattedMessage id="zoning.entity.latchGate" description='Status text for zone' 
      defaultMessage='Latch Gate'/>)
}

export const ITEM_RECALL_SUCCESS = (<FormattedMessage id="itemRecall.message.success" description='Status text for zone' 
      defaultMessage='Items recalled successfully'/>)

export const ITEM_RECALL_FAILURE = {
      "DUPLICATE_KEY":(<FormattedMessage id="itemRecall.message.failure.duplicate_key" description='Message for duplicate order id' 
      defaultMessage='Order id already exists'/>),
      "NO_ITEM_EXIST":(<FormattedMessage id="itemRecall.message.failure.no_item" description='Message for duplicate order id' 
      defaultMessage='No Item Exists'/>)
}





