/*Constants for login module*/
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_REDIRECT = "LOGIN_REDIRECT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const AJAX_CALL = "AJAX_CALL";
export const MOCK_LOGIN = "MOCK_LOGIN";
export const SET_USERNAME = "SET_USERNAME";
export const SET_TIME_OFFSET = "SET_TIME_OFFSET";
export const RECIEVE_TIME_OFFSET = "RECIEVE_TIME_OFFSET";

/*Constants for Web Sockets*/
export const WS_CONNECT = "WS_CONNECT";
export const WS_CONNECTED = "WS_CONNECTED";
export const WS_DISCONNECT = "WS_DISCONNECT";
export const WS_ONMESSAGE = "WS_ONMESSAGE";
export const WS_ONSEND = "WS_ONSEND";
export const WS_INIT = "WS_INIT";
export const WS_SUCCESS="Sucessfully logged in";
export const WS_END="WS_END";
export const WS_MOCK="WS_MOCK";
/* Header constants */

/* Constants for fixed-data-table */
export const TABLE_STATE = "TABLE_STATE";

export const REQUEST_HEADER = "REQUEST_HEADER";
export const RECIEVE_HEADER = "RECIEVE_HEADER";



/*Constants for performance widget*/
export const RENDER_WIDGET = "RENDER_WIDGET";
export const TAB_SELECTED = "TAB_SELECTED";
export const PREV_TAB_SELECTED = "PREV_TAB_SELECTED";
export const SUB_TAB_SELECTED = "SUB_TAB_SELECTED";

/*Parsing Constants*/
export const PARSE_PPS = "pps";
export const PARSE_BUTLERS = "butlers";
export const PARSE_CHARGERS = "chargers";
export const PARSE_ORDERS = "orders";
export const PARSE_INVENTORY_TODAY = "inventory_today";
export const PARSE_INVENTORY_HISTORY = "inventory_history";
export const PARSE_PUT = "put";
export const PARSE_PICK = "pick";
export const PARSE_PPA_THROUGHPUT = "put_pick_audit_throughput";
export const PARSE_AUDIT = "audit";
export const SYSTEM_CHARGERS_DETAILS = "chargers";
export const NOTIFICATION = "NOTIFICATION";
export const BUTLERBOTS = "butlerbots";
export const CHARGING = "chargingstation";
export const PPS = "pps";
export const PPS_PERFORMANCE = "PPS_PERFORMANCE";
export const USER_DETAILS = "USER_DETAILS";
export const ORDER_RECIEVED = "ORDER_RECIEVED";

/*Constants for stats widget*/
export const RENDER_STATSWIDGET = "RENDER_STATSWIDGET";
export const BAR_D3_COMPONENT = "BAR_D3_COMPONENT";

/*Constants for main tab*/
export const OVERVIEW = "OVERVIEW";
export const SYSTEM = "SYSTEM";
export const ORDERS = "ORDERS";
export const INVENTORY = "INVENTORY";
export const USERS = "USERS";
export const AUDIT = "AUDIT";
export const NOTIFICATION_TAB = "Notification";
export const BUTLERBOTS_TAB = "Butler Bots";
export const CHARGING_TAB = "Charging Station";
export const PPS_TAB = "Pick Put Stations";
export const ORDER_LIST = "Order List";
export const WAVES = "Waves";
export const TAB_CLASS = {
	overview:"gorMainBlock", 
	system:"gorMainBlock",
	orders:"gorMainBlock", 
	inventory:"gorMainBlock", 
	users:"gorMainBlock"
};


/*Constants for response type */
export const PPS_DATA = "pps";
export const BUTLERS_DATA = "BUTLERS_DATA";
export const AUDIT_DATA = "AUDIT_DATA";
export const PUT_DATA = "PUT_DATA";
export const ORDERS_DATA = "ORDERS_DATA";
export const INVENTORY_DATA = "INVENTORY_DATA";
export const CHARGERS_DATA = "CHARGERS_DATA";
export const THROUGHPUT_DATA="THROUGHPUT_DATA";
export const HISTOGRAM_DATA = "HISTOGRAM_DATA";
export const CHARGERS_DETAIL = "CHARGERS_DETAIL";
export const BUTLERS_DETAIL = "BUTLERS_DETAIL";
export const PPS_DETAIL  = "pps";
export const SYSTEM_PPS_DETAILS = "system_pps_details";
export const SYSTEM_BUTLERS_DETAILS = "butlers";
export const HISTOGRAM_DETAILS = "histogram";
export const USER_DATA = "users";


/*Constants for type of AJAX call*/
export const AUTH_LOGIN = "AUTH_LOGIN";
export const ORDERS_RETRIEVE = "ORDERS_RETRIEVE";
export const ADD_USER='ADD_USER';
export const CHECK_ID='CHECK_ID';
export const DELETE_USER='DELETE_USER';
export const GET_ROLES='GET_ROLES';
export const PPS_MODE_CHANGE = 'PPS_MODE_CHANGE';
export const GET_HEADER_INFO = 'GET_HEADER_INFO';
export const EDIT_USER='EDIT_USER';

export const AUDIT_RETRIEVE = "AUDIT_RETRIEVE";
export const RECIEVE_AUDIT_DATA = "RECIEVE_AUDIT_DATA";
export const CREATE_AUDIT='CREATE_AUDIT';
export const DELETE_AUDIT='DELETE_AUDIT';
export const GET_PPSLIST='GET_PPSLIST';


/*Constants for app info checking*/
export const ID_DATA = "ID_DATA";
export const ID_BACKEND = "ID_BACKEND";
export const NAME_DATA = "NAME_DATA";
export const PASSWORD_DATA = "PASSWORD_DATA";
export const PASS_DATA = "PASS_DATA";
export const INFO_RESET = "ERROR_RESET";
export const ERROR=0;
export const SUCCESS=1;
export const INFO=2;
export const HIDE=3;
export const NOTIFY_PASS='NOTIFY_PASS';
export const NOTIFY_FAIL='NOTIFY_FAIL';
export const NOTIFY_HIDE='NOTIFY_HIDE';
export const MD_ID='MD_ID';
export const SET_ROLE='SET_ROLE';
export const SKU_INFO='SKU_INFO';


/*Constants for pagination*/
export const PAGE_DATA = "PAGE_DATA";
export const STATUS_FILTER = "STATUS_FILTER";
export const TIME_FILTER = "TIME_FILTER"
export const GET_PAGE_SIZE_ORDERS = "GET_PAGE_SIZE_ORDERS";
export const DEFAULT_PAGE_SIZE = "25";
export const PAGE_FIELD = "?page=";
export const GET_CURRENT_PAGE_ORDERS = "GET_CURRENT_PAGE_ORDERS";
export const GET_LAST_REFRESH_TIME = "GET_LAST_REFRESH_TIME";

export const GET_PAGE_SIZE_AUDIT = "GET_PAGE_SIZE_AUDIT";
export const GET_CURRENT_PAGE_AUDIT = "GET_CURRENT_PAGE_AUDIT";


/*Constants for Spinner*/
export const DISPLAY_SPINNER = "DISPLAY_SPINNER";
export const DISPLAY_LOGIN_SPINNER = "DISPLAY_LOGIN_SPINNER";

/*Map for routes of tab*/

export const TAB_ROUTE_MAP = {
		[OVERVIEW] : "overview",
		[SYSTEM] : "system",
		[ORDERS] : "orders",
		[INVENTORY] : "inventory",
		[USERS] : "users",
		[AUDIT] : "audit"
	}
export const SYS_SUB_TAB_ROUTE_MAP={
	[NOTIFICATION] : "notification",
	[BUTLERBOTS]:"butlerbots",
	[PPS]:"pps",
	[CHARGING]:"chargingstation",
	[WAVES]:"waves",
	[ORDER_LIST]:"orderlist"

}
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

/*Constant for time on header*/
export const HEADER_START_TIME = '09:00 AM'


/*Constants for Audit tab */
export const SET_AUDIT='SET_AUDIT';
export const RESET_AUDIT='RESET_AUDIT';
export const SKU='sku';
export const LOCATION='location';
export const SETAUDIT_PPS='SETAUDIT_PPS';
  

/*Inventory parsing constants*/
export const INVENTORY_DATA_TODAY = 'INVENTORY_DATA_TODAY'
export const INVENTORY_DATA_HISTORY = 'INVENTORY_DATA_HISTORY'
export const CATEGORY_APPAREL ='apparel' 
export const CATEGORY_OTHERS ='others'
export const CATEGORY_SHOES ='shoes' 
export const CATEGORY_ELECTRONICS ='electronics'
export const CATEGORY_DEFAULT ='default'
export const CATEGORY_UNUSED ='unused'
export const CATEGORY_COLOR_MAP = {
	[CATEGORY_APPAREL] : "#7893EC",
	[CATEGORY_OTHERS] : "#C1C1C1",
	[CATEGORY_SHOES] : "#89AE51",
	[CATEGORY_UNUSED] : "#F7F7F7",
	[CATEGORY_DEFAULT] : "#A44550",
	[CATEGORY_ELECTRONICS] : "#8F39EC"
}
export const INVENTORY_HISTORY_DAYS_COUNT = 30;
export const INVENTORY_HISTOGRAM_CONFIG = {
	height:200,
	width:(70/100) * screen.width,
	margin:{top: 20, right: 20, bottom: 30, left: 60},
	bandPadding:0.05,
	outerTickSize:0,
	defaultMaxYAxis:100000,
	ticks:3,
	showMonthBreak:true
}
export const DISPLAY_INVENTORY_SPINNER = 'DISPLAY_INVENTORY_SPINNER';
export const DISPLAY_INVENTORY_HISTORY = 'DISPLAY_INVENTORY_HISTORY';

export const SCH_CONFIG ={
"svgInfo":{
	"height":"100",
	"width":"100%",
	"x":0,
	"y":20,
	"lineInfo":{
		"y1":"-8",
		"y2":"50",
		"stroke":"#BFBFBF",
		"stroke-width":"1"
	},
	"textInfo":{
		"message":"{utilisedSpace}% space utilized",
		"y":"-8"
	},
	"rectInfo":{
		"y":"20",
		"height":"50"
	}
}
	
}

/*Constants for Legends*/

export const LEGEND_ROUND= "ROUND";
export const LEGEND_RECT= "RECTANGLE";
export const LEGEND_DEFAULT = LEGEND_RECT;

