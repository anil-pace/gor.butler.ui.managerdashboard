/*Constants for login module*/
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_REDIRECT = "LOGIN_REDIRECT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const AJAX_CALL = "AJAX_CALL";
export const CONNECTION_FAILURE="CONNECTION_FAILURE";
export const MOCK_LOGIN = "MOCK_LOGIN";
export const SET_USERNAME = "SET_USERNAME";
export const SET_TIME_OFFSET = "SET_TIME_OFFSET";
export const RECIEVE_TIME_OFFSET = "RECIEVE_TIME_OFFSET";
export const LOGIN_ERROR = "LOGIN_ERROR";
/*Constants for Web Sockets*/
export const WS_CONNECT = "WS_CONNECT";
export const WS_CONNECTED = "WS_CONNECTED";
export const WS_DISCONNECT = "WS_DISCONNECT";
export const WS_ONMESSAGE = "WS_ONMESSAGE";
export const WS_ONSEND = "WS_ONSEND";
export const WS_INIT = "WS_INIT";
export const WS_END="WS_END";
export const WS_MOCK="WS_MOCK";

/* Header constants */
export const GET_OVERVIEW="get_overview";
export const GET_SYSTEM="get_system";
export const GET_ORDERS="get_orders";
export const GET_AUDIT="get_audit";
export const GET_USERS="get_users";
export const GET_INVENTORY="get_inventory";
export const GET_STATUS="get_status";
export const FULFILLING_ORDERS="fulfilling_orders";

/* Constants for fixed-data-table */
export const TABLE_STATE = "TABLE_STATE";
export const REQUEST_HEADER = "REQUEST_HEADER";
export const RECIEVE_HEADER = "RECIEVE_HEADER";
export const GOR_TABLE_HEADER_HEIGHT = 71;
export const GOR_USER_TABLE_HEADER_HEIGHT = 50;
export const GOR_AUDIT_RESOLVE_MIN_HEIGHT = 400;
export const GOR_AUDIT_RESOLVE_WIDTH = 1100;

/*Constants for performance widget*/
export const RENDER_WIDGET = "RENDER_WIDGET";
export const TAB_SELECTED = "TAB_SELECTED";
export const PREV_TAB_SELECTED = "PREV_TAB_SELECTED";
export const SUB_TAB_SELECTED = "SUB_TAB_SELECTED";
export const GOR_ORDER_PICKED = "items_picked";
export const GOR_ITEMS_PUT = "items_put";
export const GOR_ITEMS_AUDITED = "items_audited";
export const PICK_PPS_PERFORMANCE = "PICK_PPS_PERFORMANCE";
export const PUT_PPS_PERFORMANCE = "PUT_PPS_PERFORMANCE";
export const AUDIT_PPS_PERFORMANCE = "AUDIT_PPS_PERFORMANCE";

/* config constant for (first + last) name if true*/
export const GOR_FIRST_LAST = true;

/*FE constants for parsing*/
export const PPS_PERFORMANCE = "PPS_PERFORMANCE";
export const USER_DETAILS = "USER_DETAILS";
export const ORDER_RECIEVED = "ORDER_RECIEVED";
export const NOTIFICATION = "NOTIFICATION";

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
export const BUTLERBOTS = "butlerbots";
export const CHARGING = "chargingstation";
export const PPS = "pps";
export const ORDERLIST = "ORDERLIST";
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
export const DEBOUNCE_TIMER=1000;
export const AUDIT_RESOLVE_CONFIRMED = "AUDIT_RESOLVE_CONFIRMED";
export const VALIDATE_SKU_ID = "VALIDATE_SKU_ID";

export const AUDIT_RETRIEVE = "AUDIT_RETRIEVE";
export const RECIEVE_AUDIT_DATA = "RECIEVE_AUDIT_DATA";
export const CREATE_AUDIT='CREATE_AUDIT';
export const DELETE_AUDIT='DELETE_AUDIT';
export const GET_PPSLIST='GET_PPSLIST';
export const AUDIT_RESOLVE_LINES="AUDIT_RESOLVE_LINES";
export const SET_AUDIT_ORDERLINES="SET_AUDIT_ORDERLINES";

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
export const DELETION=4;
export const NOTIFY_PASS='NOTIFY_PASS';
export const NOTIFY_DELETE='NOTIFY_DELETE';
export const NOTIFY_FAIL='NOTIFY_FAIL';
export const NOTIFY_INFO='NOTIFY_INFO';
export const NOTIFY_HIDE='NOTIFY_HIDE';
export const ID_MAP='ID_MAP';
export const SET_ROLE='SET_ROLE';
export const SKU_INFO='SKU_INFO';
export const SKU_DATA="SKU_DATA";
export const LOC_DATA="LOC_DATA";

/*Constants for pagination*/
export const PAGE_DATA = "PAGE_DATA";
export const STATUS_FILTER = "STATUS_FILTER";
export const TIME_FILTER = "TIME_FILTER"
export const GET_PAGE_SIZE_ORDERS = "GET_PAGE_SIZE_ORDERS";
export const DEFAULT_PAGE_SIZE = "25";
export const PAGE_FIELD = "?page=";
export const GET_CURRENT_PAGE_ORDERS = "GET_CURRENT_PAGE_ORDERS";
export const GET_LAST_REFRESH_TIME = "GET_LAST_REFRESH_TIME";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

/*Constants for Spinner*/
export const DISPLAY_SPINNER = "DISPLAY_SPINNER";
export const DISPLAY_LOGIN_SPINNER = "DISPLAY_LOGIN_SPINNER";
export const DISPLAY_AUDIT_SPINNER = "DISPLAY_AUDIT_SPINNER";
export const DISPLAY_ORDER_LIST_SPINNER = "DISPLAY_ORDER_LIST_SPINNER";
export const DISPLAY_WAVES_SPINNER = "DISPLAY_WAVES_SPINNER";
export const DISPLAY_BUTLER_SPINNER = "DISPLAY_BUTLER_SPINNER";
export const DISPLAY_PPS_SPINNER = "DISPLAY_PPS_SPINNER";
export const DISPLAY_CHARGING_STATION_SPINNER = "DISPLAY_CHARGING_STATION_SPINNER";
export const DISPLAY_USERS_SPINNER ="DISPLAY_USERS_SPINNER";
export const DISPAY_RESOLVE_AUDIT_SPINNER = "DISPAY_RESOLVE_AUDIT_SPINNER";
export const VALIDATE_SKU_SPINNER = "VALIDATE_SKU_SPINNER";

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

/*Constant for time on header*/
export const HEADER_START_TIME = '09:00 AM IST'

/*Constants for Audit tab */
export const SET_AUDIT='SET_AUDIT';
export const RESET_AUDIT='RESET_AUDIT';
export const SKU='sku';
export const LOCATION='location';
export const SETAUDIT_PPS='SETAUDIT_PPS';
export const REFRESH_AUDIT='REFRESH_AUDIT';
export const APPROVE_AUDIT = "APPROVE_AUDIT";
export const VIEW_AUDIT_ISSUES = "VIEW_AUDIT_ISSUES";
export const VALIDATED_ATTIBUTES_DATA = "VALIDATED_ATTIBUTES_DATA";
export const VALIDATED_SKU_CODE = "VALIDATED_SKU_CODE";
export const VALID_SKU = "VALID_SKU";
export const NO_ATTRIBUTE_SKU = "NO_ATTRIBUTE_SKU";
export const SKU_NOT_EXISTS = "INVALID_SKU";
export const NO_SKU_VALIDATION = "NO_SKU_VALIDATION";
export const WATING_FOR_VALIDATION = "WATING_FOR_VALIDATION";
export const AUDIT_ISSUES_STATUS = "Issues found";
export const AUDIT_BY_PDFA = "pdfa";
/*Inventory parsing constants*/
export const INVENTORY_DATA_TODAY = 'INVENTORY_DATA_TODAY'
export const INVENTORY_DATA_HISTORY = 'INVENTORY_DATA_HISTORY'
export const CATEGORY_APPAREL ='apparel' 
export const CATEGORY_OTHERS ='others'
export const CATEGORY_SHOES ='shoes' 
export const CATEGORY_ELECTRONICS ='electronics'
export const CATEGORY_DEFAULT ='default'
export const CATEGORY_UNUSED ='unused'
export const CATEGORY_COLOR_MAP = [
	"#7893EC",
	"#C1C1C1",
	"#89AE51",
	"#F7F7F7",
	"#A44550",
	"#8F39EC",
	"#EEEEEE",
	"#F9F9F9"
]
export const INV_HIST_LEGEND_COLOR = "#D3D3D3";
export const INV_LINE_LEGEND_IPICKED_COLOR = "#1976D2";
export const INV_LINE_LEGEND_IPUT_COLOR = "#F5A623";
export const INV_HIST_LEGEND_DATA = [{
	color:INV_HIST_LEGEND_COLOR,
	name:'Items Stocked'
}]
export const INV_LINE_LEGEND_DATA = [{
	color:INV_LINE_LEGEND_IPICKED_COLOR,
	name:'Items Picked'
},
{
	color:INV_LINE_LEGEND_IPUT_COLOR,
	name:'Items Put'
}
]
export const INV_HIST_LEGEND_CONFIG = {
				xpos:0,
				xIncrement:20,
				ypos:20,
				containerWidth:"55%",
				containerHeight:"60px"
			}
export const INV_LINE_LEGEND_CONFIG = {
				xpos:0,
				xIncrement:115,
				ypos:25,
				containerWidth:"95%",
				containerHeight:"60px"
			}

export const INVENTORY_HISTORY_DAYS_COUNT = 29;
export const INVENTORY_HISTOGRAM_CONFIG = {
	height:250,
	width:(70/100) * screen.width,
	margin:{top: 20, right: 20, bottom: 60, left: 60},
	bandPadding:0.05,
	outerTickSize:0,
	defaultMaxYAxis:100000,
	ticks:4,
	showMonthBreak:true,
	noDataText:'No Stock Found'
}
export const INVENTORY_LINE_CONFIG = {
	height:250,
	width:(70/100) * screen.width,
	margin:{top: 20, right: 20, bottom: 60, left: 60},
	bandPadding:0.05,
	outerTickSize:0,
	defaultMaxYAxis:100000,
	padding:18,
	ticks:4,
	showMonthBreak:true,
	noDataText:'No Item Movement'
}
export const DISPLAY_INVENTORY_SPINNER = 'DISPLAY_INVENTORY_SPINNER';
export const DISPLAY_INVENTORY_HISTORY = 'DISPLAY_INVENTORY_HISTORY';

export const SCH_CONFIG ={
"svgInfo":{
	"height":"100",
	"width":(28/100 * screen.width),
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

export const EN='en';
export const JA='ja';
export const ES='es'; 
export const ZH='zh'; 
export const DE='de'; 
export const FR='fr'; 
export const HR='h ';
export const MM='m ';
export const SS='s ';
// Style class constants
export const TYPING='gor-login-field gor-input-ok gor-input-typing';
export const FILL_BACK='gor-fill-back';
export const GET='GET';
export const POST='POST';
export const PUT='PUT';
export const DELETE='DELETE';
export const APP_JSON='application/json';
export const GOR_RISK='gor-risk';
export const GOR_NONE='gor-none';
export const GOR_SUCCESS='gor-success';
export const GOR_PENDING="pending";
export const GOR_PROGRESS="progress";
export const GOR_BREACHED="breached";
export const GOR_EXCEPTION="gor-exception";
export const GOR_OFFLINE='gor-offline';
export const GOR_ONLINE='gor-online';
export const GOR_NORMAL_TAB='gor-normal-tab';
export const GOR_PASS='gor-pass';
export const GOR_FAIL='gor-fail';
export const GOR_INFO='gor-info';
export const GOR_STATUS = "status";
export const GOR_STATUS_PRIORITY = "statusPriority";
export const GOR_PERIPHERAL_ONLINE = "online";
export const GOR_PERIPHERAL_OFFLINE = "offline";
export const GOR_ON_STATUS = "on";
export const GOR_CONNECTED_STATUS = "Connected";
export const GOR_COMPLETED_STATUS = "Completed";
export const GOR_BREACHED_LINES = "gor-breached-lines";
export const AUDIT_CREATED = "audit_created";
export const AUDIT_PENDING_APPROVAL = "audit_pending_approval";
export const AUDIT_RESOLVED = "audit_resolved"; 
export const AUDIT_UNRESOLVED = "Unresolved";
export const AUDIT_LINE_REJECTED  = "audit_rejected";
export const AUDIT_REJECTED_STATUS = "Rejected";
export const AUDIT_RESOLVED_STATUS = "Resolved";
//Icons
export const PICK_ICON=' iPick';
export const STOCK_ICON="iStock";
export const AUDIT_ICON="iAudit";
export const TILE_ONTIME='overview-tile-ontime-icon';
export const TILE_ALERT='header-yellow-alert-icon';
export const TICK_WHITE='gor-tick-white';
export const REMOVE_ICON='gor-remove-white';
export const ERROR_WHITE='gor-error-white';

//Sort header constants
export const INITIAL_HEADER_SORT = "status";
export const INITIAL_HEADER_ORDER = "ASC";
export const BUTLER_HEADER_SORT = "BUTLER_HEADER_SORT";
export const BUTLER_HEADER_SORT_ORDER = "BUTLER_HEADER_SORT_ORDER";
export const PPS_CHECKED = "PPS_CHECKED";
export const PPS_HEADER_SORT = "PPS_HEADER_SORT";
export const PPS_HEADER_SORT_ORDER = "PPS_HEADER_SORT_ORDER";
export const USER_HEADER_SORT = "USER_HEADER_SORT";
export const USER_HEADER_SORT_ORDER = "USER_HEADER_SORT_ORDER";
export const WAVE_HEADER_SORT = "WAVE_HEADER_SORT";
export const WAVE_HEADER_SORT_ORDER = "WAVE_HEADER_SORT_ORDER";
export const CS_HEADER_SORT = "CS_HEADER_SORT";
export const CS_HEADER_SORT_ORDER = "CS_HEADER_SORT_ORDER";
export const DROP_RENDER_DISPLAY = "DROP_RENDER_DISPLAY";
export const SET_CHECK_ALL = "SET_CHECK_ALL";
export const SET_USER_FILTER = "SET_USER_FILTER";
export const ORDER_HEADER_SORT_ORDER = "ORDER_HEADER_SORT_ORDER";
export const ORDER_HEADER_SORT = "ORDER_HEADER_SORT";
export const AUDIT_HEADER_SORT = "AUDIT_HEADER_SORT";
export const AUDIT_HEADER_SORT_ORDER = "AUDIT_HEADER_SORT_ORDER";
export const SET_ORDER_FILTER = "SET_ORDER_FILTER";
export const SET_AUDIT_FILTER = "SET_AUDIT_FILTER";
export const SET_BUTLER_FILTER = "SET_BUTLER_FILTER";
export const SET_PPS_FILTER = "SET_PPS_FILTER";
export const SET_CS_FILTER = "SET_CS_FILTER";
export const SET_WAVE_FILTER = "SET_WAVE_FILTER"
export const AUDIT_APPROVED = "auditline_approved";
export const AUDIT_REJECTED = "auditline_rejected";

//search dropdown constants
export const SHOW_ALL_ENTRIES = "available";
export const SHOW_SELECTED_ENTRIES = "checked";

//table filter
export const SHOW_FILTER = "SHOW_FILTER";
export const IS_FILTER_APPLIED = "IS_FILTER_APPLIED";