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
export const PARSE_AUDIT = "audit";
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
