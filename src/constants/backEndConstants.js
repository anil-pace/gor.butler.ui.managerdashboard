import React  from 'react';
import { defineMessages } from 'react-intl';




//WS constants
export const WS_SUCCESS="Sucessfully logged in";

/*Parsing Constants*/
export const PARSE_PPS = "pps";
export const PARSE_BUTLERS = "butlers";
export const PARSE_CHARGERS = "chargers";
export const PARSE_ORDERS = "orders";
export const PARSE_OVERVIEW="overview";
export const PARSE_SYSTEM="system";
export const PARSE_INVENTORY= "inventory";
export const PARSE_INVENTORY_TODAY = "inventory_today";
export const PARSE_INVENTORY_HISTORY = "inventory_history";
export const PARSE_PUT = "put";
export const PARSE_PICK = "pick";
export const PARSE_PPA_THROUGHPUT = "put_pick_audit_throughput";
export const PARSE_AUDIT = "audit_agg";
export const PARSE_STATUS = "status";
export const SYSTEM_CHARGERS_DETAILS = "chargers";
export const BUTLERBOTS = "butlerbots";
export const CHARGING = "chargingstation";
export const PPS = "pps";

/*Constants for response type */
export const PPS_DETAIL  = "pps";
export const SYSTEM_PPS_DETAILS = "system_pps_details";
export const SYSTEM_BUTLERS_DETAILS = "butlers";
export const HISTOGRAM_DETAILS = "histogram";
export const USER_DATA = "users";

/*Constants for api response codes*/
export const CODE_US001='us001';
export const CODE_US002='us002';
export const CODE_US004='us004';
export const CODE_UE001='ue001';
export const CODE_UE002='ue002';
export const CODE_UE003='ue003';
export const CODE_UE004='ue004';
export const CODE_UE005='ue005';
export const CODE_UE006='ue006';
export const CODE_E026='e026';
export const CODE_E027='e027';
export const CODE_G015='g015';
export const CODE_AE001='ae001';
export const CODE_AE002='ae002';
export const CODE_AE004='ae004';
export const CODE_AE005='ae005';
export const CODE_AE006='ae006';
export const CODE_AS002='as002';
export const CODE_AS003='as003';
export const CODE_G016='g016';

/*User roles map*/
export const BUTLER_SUPERVISOR = 'butler_supervisor';
export const BUTLER_UI = 'butler_ui';
export const USER_ROLE_MAP ={
	[BUTLER_SUPERVISOR] : "Manager",
	[BUTLER_UI] : "Operator"

}
/*String config codes*/


export const  stringConfig= defineMessages({
    on: {
        id: 'stringConfig.on',
        description: 'Text to display on',
        defaultMessage: 'on'
    },
    off: {
        id: 'stringConfig.off',
        description: 'Text to show off',
        defaultMessage: "off"
    },
    per_hour:{
        id: 'stringConfig.per_hour',
        description: 'Text to show per_hour',
        defaultMessage: "per_hour"
    },
    pick:{
        id: 'stringConfig.pick',
        description: 'Text to show pick',
        defaultMessage: "pick"
    },
    put:{
        id: 'stringConfig.put',
        description: 'Text to show put',
        defaultMessage: "put"
    },
    audit:{
        id: 'stringConfig.audit',
        description: 'Text to show audit',
        defaultMessage: "audit"
    },
    soft:{
        id: 'stringConfig.soft',
        description: 'Text to show soft',
        defaultMessage: "soft"
    },
    hard:{
        id: 'stringConfig.hard',
        description: 'Text to show hard',
        defaultMessage: "hard"
    },
    soft_manual:{
        id: 'stringConfig.soft_manual',
        description: 'Text to show soft_manual',
        defaultMessage: "soft_manual"
    },
    pending:{
        id: 'stringConfig.pending',
        description: 'Text to show pending',
        defaultMessage: "In Progress"
    },
    disconnected:{
        id: 'stringConfig.disconnected',
        description: 'Text to show disconnected',
        defaultMessage: "Disconnected"
    },
    connected:{
        id: 'stringConfig.connected',
        description: 'Text to show connected',
        defaultMessage: "Connected"
    },
    completed:{
        id: 'stringConfig.completed',
        description: 'Text to show completed',
        defaultMessage: "Completed"
    },
    Completed:{
        id: 'stringConfig.Completed',
        description: 'Text to show Completed',
        defaultMessage: "completed"
    },
    in_progress:{
        id: 'stringConfig.in_progress',
        description: 'Text to show In Progress',
        defaultMessage: "In Progress"
    },
    breached:{
        id: 'stringConfig.breached',
        description: 'Text to show breached',
        defaultMessage: "Breached"
    },
    fulfillable:{
        id: 'stringConfig.fulfillable',
        description: 'Text to show fulfillable',
        defaultMessage: "In Progress"
    },
    abandoned:{
        id: 'stringConfig.abandoned',
        description: 'Text to show abandoned',
        defaultMessage: "Abandoned"
    },
    manual:{
        id: 'stringConfig.manual',
        description: 'Text to show manual',
        defaultMessage: "Manual"
    },
    auto:{
        id: 'stringConfig.auto',
        description: 'Text to show auto',
        defaultMessage: "Auto"
    },
    not_fulfillable:{
        id: 'stringConfig.notFulfillable',
        description: 'Text to show In progress',
        defaultMessage: "Unfulfillable"
    },
    exception:{
        id: 'stringConfig.exception',
        description: 'Text to show exception',
        defaultMessage: "Exception"
    },
    online:{
        id: 'stringConfig.online',
        description: 'Text to show Online',
        defaultMessage: "online"
    },
    offline:{
        id: 'stringConfig.offline',
        description: 'Text to show Offline',
        defaultMessage: "offline"
    },
    received:{
        id: 'stringConfig.received',
        description: 'Text to show received',
        defaultMessage: "In Progress"
    },
    cancelled:{
        id: 'stringConfig.cancelled',
        description: 'Text to show cancelled',
        defaultMessage: "Cancelled"  

    },
    butler_supervisor:{
        id: 'stringConfig.butler_supervisor',
        description: 'Text to show Manager',
        defaultMessage: "Manager"  
    },
    butler_ui:{
        id: 'stringConfig.butler_ui',
        description: 'Text to show Operator',
        defaultMessage: "Operator"  
    },
    admin:{
        id: 'stringConfig.admin',
        description: 'Text to show admin',
        defaultMessage: "Admin" 
    },
    temporary_unfulfillable:{
        "id": "stringConfig.temporary_unfulfillable",
        "description": "Text for temporary unfulfillable status",
        "defaultMessage": "Temporary Unfulfillable"
    }
    
});

