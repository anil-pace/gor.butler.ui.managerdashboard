/*Constants for login module*/
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_REDIRECT = "LOGIN_REDIRECT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const AJAX_CALL = "AJAX_CALL";
export const CONNECTION_FAILURE = "CONNECTION_FAILURE";
export const MOCK_LOGIN = "MOCK_LOGIN";
export const SET_USERNAME = "SET_USERNAME";
export const SET_TIME_OFFSET = "SET_TIME_OFFSET";
export const RECIEVE_TIME_OFFSET = "RECIEVE_TIME_OFFSET";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SETAUDIT_CHECKED = "SETAUDIT_CHECKED";
/*Constants for Web Sockets*/
export const WS_CONNECT = "WS_CONNECT";
export const WS_CONNECTED = "WS_CONNECTED";
export const WS_DISCONNECT = "WS_DISCONNECT";
export const WS_ONMESSAGE = "WS_ONMESSAGE";
export const WS_ONSEND = "WS_ONSEND";
export const WS_INIT = "WS_INIT";
export const WS_END = "WS_END";
export const WS_MOCK = "WS_MOCK";
export const DATA_SUBSCRIPTION_PACKET = "DATA_SUBSCRIPTION_PACKET";
export const SET_DEFAULT_RANGE = "SET_DEFAULT_RANGE";
export const TEXTBOX_STATUS = "TEXTBOX_STATUS";
export const HARD_EMERGENCY = "hard_emergency";
export const FAILED = "failed";
export const CLEARED = "cleared";
export const PROGRESS = "progress";
export const NOT_FOUND = "not_found";
export const IN_PROGRESS = "in_progress";
export const SYSTEM_GENERATED = "system";
export const SETAUDIT_PPS_CHECKED = "SETAUDIT_PPS_CHECKED";
export const SETOTHER_PPS_CHECKED = "SETOTHER_PPS_CHECKED";










/*Constants for Notification Web Sockets*/
export const WS_NOTIFICATION_CONNECT = "WS_NOTIFICATION_CONNECT";
export const WS_NOTIFICATION_CONNECTED = "WS_NOTIFICATION_CONNECTED";
export const WS_NOTIFICATION_DISCONNECT = "WS_NOTIFICATION_DISCONNECT";
export const WS_NOTIFICATION_ONMESSAGE = "WS_NOTIFICATION_ONMESSAGE";
export const WS_NOTIFICATION_ONSEND = "WS_NOTIFICATION_ONSEND";
export const WS_NOTIFICATION_INIT = "WS_NOTIFICATION_INIT";
export const WS_NOTIFICATION_END = "WS_NOTIFICATION_END";
export const WS_NOTIFICATION_SUBSCRIBE = "WS_NOTIFICATION_SUBSCRIBE";

/*Constants for Orders from platform*/
export const WS_ORDERS_PLATFORM_SUBSCRIBE = "WS_ORDERS_PLATFORM_SUBSCRIBE";
export const WS_ORDERS_PLATFORM_UNSUBSCRIBE = "WS_ORDERS_PLATFORM_UNSUBSCRIBE";
export const WS_ORDERS_HEADER_SUBSCRIBE = "WS_ORDERS_HEADER_SUBSCRIBE";
export const WS_ORDERS_HEADER_UNSUBSCRIBE = "WS_ORDERS_HEADER_UNSUBSCRIBE";
/* Header constants */
export const GET_OVERVIEW = "get_overview";
export const GET_SYSTEM = "get_system";
export const GET_ORDERS = "get_orders";
export const GET_AUDIT = "get_audit";
export const GET_USERS = "get_users";
export const GET_INVENTORY = "get_inventory";
export const GET_STATUS = "get_status";
export const FULFILLING_ORDERS = "fulfilling_orders";

/* Constants for fixed-data-table */
export const TABLE_STATE = "TABLE_STATE";
export const REQUEST_HEADER = "REQUEST_HEADER";
export const RECIEVE_HEADER = "RECIEVE_HEADER";
export const GOR_TABLE_HEADER_HEIGHT = 71;
export const GOR_USER_TABLE_HEADER_HEIGHT = 50;
export const GOR_AUDIT_RESOLVE_MIN_HEIGHT = 400;
export const GOR_AUDIT_RESOLVE_WIDTH = 1100;
export const GOR_AUDIT_TABLE_HEIGHT_CORRECTION = 300;

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
export const UTILITY002 = "utility002";
export const UTILITY001 = "utility001";
export const MB = 1000000;
export const KB = 1024;


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
export const AUDITLISTING = "AUDITLISTING";
export const INVENTORY = "INVENTORY";
export const USERS = "USERS";
export const AUDIT = "AUDIT";
export const REPORTS = "REPORTS";
export const UTILITIES = "UTILITIES";
export const NOTIFICATION_TAB = "Notification";
export const BUTLERBOTS_TAB = "Butler Bots";
export const CHARGING_TAB = "Charging Station";
export const PPS_TAB = "Pick Put Stations";
export const ORDER_LIST = "Order List";
export const PPS_CONFIGURATION = "PPS Configuration";
export const MSU_CONFIGURATION = "MSU Configuration";
export const WAVES = "Waves";
export const OPERATIONS_LOG = "operationsLog";
export const BUTLERBOTS = "butlerbots";
export const CHARGING = "chargingstation";
export const PPS = "pps";
export const ORDERLIST = "ORDERLIST";
export const DOWNLOAD_REPORT = "downloadReport";
export const STORAGE_SPACE = "storageSpace";
export const MISC = "misc";
export const TAB_CLASS = {
	overview: "gorMainBlock",
	system: "gorMainBlock",
	orders: "gorMainBlock",
	inventory: "gorMainBlock",
	users: "gorMainBlock"
};

export const PENDING = "audit_accepted__audit_pending__audit_waiting__audit_conflicting";
export const INPROGRESS = "audit_started__audit_tasked";
export const RESOLVED = "audit_resolved";
export const REJECTED = "audit_rejected";

/*Constants for Order Tab*/
export const ORDER_UNFULFILLABLE = "not_fulfillable";
export const ORDER_ONHOLD = "temporary_unfulfillable";
export const ORDER_CANCELLED = "cancelled";
export const ORDER_INPROGRESS = "pending__fulfillable";
export const ORDER_COMPLETED = "complete";
export const ORDER_BREACHED = "breached";
export const ORDER_EXCEPTION = "exception";
export const EVALUATED_STATUS = {
	"requestToButlerSuccess": "ACCEPTED",
	"requestToButlerFailed": "INTERNAL_SERVER_ERROR",
	"requestToButlerRetry": "CREATED",
	"BAD_REQUEST": "rejected"
}



/*Constants for response type */
export const PPS_DATA = "pps";
export const MSU_DATA = "msu";
export const BUTLERS_DATA = "BUTLERS_DATA";
export const AUDIT_DATA = "AUDIT_DATA";
export const PUT_DATA = "PUT_DATA";
export const ORDERS_DATA = "ORDERS_DATA";
export const INVENTORY_DATA = "INVENTORY_DATA";
export const CHARGERS_DATA = "CHARGERS_DATA";
export const THROUGHPUT_DATA = "THROUGHPUT_DATA";
export const HISTOGRAM_DATA = "HISTOGRAM_DATA";
export const CHARGERS_DETAIL = "CHARGERS_DETAIL";
export const BUTLERS_DETAIL = "BUTLERS_DETAIL";
export const FIRE_EMERGENCY = "FIRE_EMERGENCY";
export const EMERGENCY_FIRE = "fire_emergency";
export const EMERGENCY = "emergency";
export const NOTIFY_EMERGENCY_END = "NOTIFY_EMERGENCY_END";
export const SYSTEM_EMERGENCY = "system_emergency";
export const SET_EMERGENCY_MODAL_STATUS = "SET_EMERGENCY_MODAL_STATUS";




/*Constants for type of AJAX call*/
export const AUTH_LOGIN = "AUTH_LOGIN";
export const ORDERS_RETRIEVE = "ORDERS_RETRIEVE";
export const ADD_USER = 'ADD_USER';
export const CHECK_ID = 'CHECK_ID';
export const DELETE_USER = 'DELETE_USER';
export const GET_ROLES = 'GET_ROLES';
export const PPS_MODE_CHANGE = 'PPS_MODE_CHANGE';
export const PPS_STATUS_CHANGE = "PPS_STATUS_CHANGE";
export const GET_HEADER_INFO = 'GET_HEADER_INFO';
export const EDIT_USER = 'EDIT_USER';
export const DEBOUNCE_TIMER = 1000;
export const AUDIT_RESOLVE_CONFIRMED = "AUDIT_RESOLVE_CONFIRMED";
export const VALIDATE_SKU_ID = "VALIDATE_SKU_ID";
export const VALIDATE_LOCATION_ID = "VALIDATE_LOCATION_ID";
export const CREATE_AUDIT_REQUEST = "CREATE_AUDIT_REQUEST";
export const VALIDATE_LOCATION_ID_CSV = "VALIDATE_LOCATION_ID_CSV";
export const PAUSE_OPERATION = "PAUSE_OPERATION";
export const RESUME_OPERATION = "RESUME_OPERATION";
export const CHECK_SAFETY = "CHECK_SAFETY";
export const CONFIRM_SAFETY = "CONFIRM_SAFETY";
export const AUTH_USER = "AUTH_USER";
export const SAFETY_MAP = "SAFETY_MAP";
export const SAFETY_ERROR_MAP = "SAFETY_ERROR_MAP";
export const SAFETY_ERROR_BOT = "SAFETY_ERROR_BOT";
export const ITEM_RECALLED = "ITEM_RECALLED";
export const GR_REPORT_RESPONSE = "GR_REPORT_RESPONSE";
export const INVENTORY_REPORT_RESPONSE = "INVENTORY_REPORT_RESPONSE";
export const DOWNLOAD_STOCK_LEDGER_REPORT = "DOWNLOAD_STOCK_LEDGER_REPORT";
export const DOWNLOAD_STOCK_LEDGER_RAW_TRANSACTIONS_REPORT = "DOWNLOAD_STOCK_LEDGER_RAW_TRANSACTIONS_REPORT";
/*Constants for Master Upload (CSV)*/
export const MASTER_FILE_UPLOAD = "MASTER_FILE_UPLOAD";
export const GET_MAX_FILE_SIZE = "GET_MAX_FILE_SIZE";
export const MASTER_UPLOAD_PROCESSING = "MASTER_UPLOAD_PROCESSING";
export const MASTER_UPLOAD_SUCCESS = "MASTER_UPLOAD_SUCCESS";
export const UPLOAD_HISTORY = "UPLOAD_HISTORY";
export const REPORTS_HISTORY = "REPORTS_HISTORY";
export const GRN_HISTORY = "GRN_HISTORY";
export const UPDATE_FILE_SIZE = "UPDATE_FILE_SIZE";
export const MASTER_FILE_FORMATS = [".csv"];
export const REPORTS_HISTORY_UPDATE = "REPORTS_HISTORY_UPDATE";
export const PASSWORD_BUTTON_RESET = "PASSWORD_BUTTON_RESET";

export const AUDIT_RETRIEVE = "AUDIT_RETRIEVE";
export const CANCEL_AUDIT = "CANCEL_AUDIT";
export const RECIEVE_AUDIT_DATA = "RECIEVE_AUDIT_DATA";
export const CREATE_AUDIT = 'CREATE_AUDIT';
export const DELETE_AUDIT = 'DELETE_AUDIT';
export const GET_PPSLIST = 'GET_PPSLIST';
export const AUDIT_RESOLVE_LINES = "AUDIT_RESOLVE_LINES";
export const SET_AUDIT_ORDERLINES = "SET_AUDIT_ORDERLINES";
export const INVOICE_VALIDATION = "INVOICE_VALIDATION";
export const STOCK_LEDGER_SKU_VALIDATION = "STOCK_LEDGER_SKU_VALIDATION";
export const CLEAR_STOCK_LEDGER_SKU_VALIDATION = "CLEAR_STOCK_LEDGER_SKU_VALIDATION";
export const ITEM_RECALLED_DATA = "ITEM_RECALLED_DATA";

/*Constants for app info checking*/
export const ID_DATA = "ID_DATA";
export const ID_BACKEND = "ID_BACKEND";
export const NAME_DATA = "NAME_DATA";
export const PASSWORD_DATA = "PASSWORD_DATA";
export const PASS_DATA = "PASS_DATA";
export const INFO_RESET = "ERROR_RESET";
export const ERROR = 0;
export const SUCCESS = 1;
export const INFO = 2;
export const HIDE = 3;
export const DELETION = 4;
export const NOTIFY_PASS = 'NOTIFY_PASS';
export const NOTIFY_DELETE = 'NOTIFY_DELETE';
export const NOTIFY_FAIL = 'NOTIFY_FAIL';
export const NOTIFY_INFO = 'NOTIFY_INFO';
export const NOTIFY_HIDE = 'NOTIFY_HIDE';
export const ID_MAP = 'ID_MAP';
export const SET_ROLE = 'SET_ROLE';
export const SKU_INFO = 'SKU_INFO';
export const SKU_DATA = "SKU_DATA";
export const LOC_DATA = "LOC_DATA";
export const WHITELISTED_ROLES = {
	"butler_supervisor": "Manager",
	"admin": "Admin"
}

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
export const DISPLAY_MSU_SPINNER = "DISPLAY_MSU_SPINNER";
export const DISPLAY_CHARGING_STATION_SPINNER = "DISPLAY_CHARGING_STATION_SPINNER";
export const DISPLAY_USERS_SPINNER = "DISPLAY_USERS_SPINNER";
export const DISPAY_RESOLVE_AUDIT_SPINNER = "DISPAY_RESOLVE_AUDIT_SPINNER";
export const VALIDATE_SKU_SPINNER = "VALIDATE_SKU_SPINNER";
export const VALIDATE_LOCATION_SPINNER = "VALIDATE_LOCATION_SPINNER";
export const VALIDATE_LOCATION_SPINNER_CSV = "VALIDATE_LOCATION_SPINNER_CSV";
export const DISPLAY_SAFETY_SPINNER = "DISPLAY_SAFETY_SPINNER";
export const DISPLAY_BOT_FILTER_SPINNER = "DISPLAY_BOT_FILTER_SPINNER";
export const DISPLAY_WAVES_FILTER_SPINNER = "DISPLAY_WAVES_FILTER_SPINNER";
export const DISPAY_USER_SPINNER = "DISPAY_USER_SPINNER";
export const DISPLAY_PPS_FILTER_SPINNER = "DISPLAY_PPS_FILTER_SPINNER";
export const DISPLAY_CHARGING_STATION_FILTER_SPINNER = "DISPLAY_CHARGING_STATION_FILTER_SPINNER";
export const DISPLAY_INVENTORY_REPORT_SPINNER = "DISPLAY_INVENTORY_REPORT_SPINNER";
export const DISPLAY_STOCK_LEDGER_SPINNER = "DISPLAY_STOCK_LEDGER_SPINNER";
export const DISPLAY_STOCK_LEDGER_RAW_TRANSACTIONS_SPINNER = "DISPLAY_STOCK_LEDGER_RAW_TRANSACTIONS_SPINNER";
export const FIRE_EMERGENCY_POPUP_FLAG = "FIRE_EMERGENCY_POPUP"
export const DISPLAY_PPS_CONFIGURATION_SPINNER = "DISPLAY_PPS_CONFIGURATION_SPINNER";
export const DISPLAY_MSU_CONFIG_SPINNER = "DISPLAY_MSU_CONFIG_SPINNER";
export const DISPLAY_MSU_CONFIG_FILTER_SPINNER = "DISPLAY_MSU_CONFIG_FILTER_SPINNER";
export const ITEM_SEARCH = "itemSearch";
export const AUDIT_LISTING = "auditlisting";



/*Map for routes of tab*/

export const TAB_ROUTE_MAP = {
	[OVERVIEW]: "overview",
	[SYSTEM]: "system",
	[ORDERS]: "orders",
	[INVENTORY]: "inventory",
	[USERS]: "users",
	[AUDIT]: "audit",
	[UTILITIES]: "utilities"
}
export const SYS_SUB_TAB_ROUTE_MAP = {
	[NOTIFICATION]: "notification",
	[BUTLERBOTS]: "butlerbots",
	[PPS]: "pps",
	[CHARGING]: "chargingstation",
	[WAVES]: "waves",
	[ORDER_LIST]: "orderlist",
	[PPS_CONFIGURATION]: "ppsConfiguration",
	[MSU_CONFIGURATION]: "msuConfiguration"
}
export const REPORTS_SUB_TAB_ROUTE_MAP = {
	[OPERATIONS_LOG]: "operationsLog",
	[DOWNLOAD_REPORT]: "downloadReport",
	[STORAGE_SPACE]: "storageSpace"


}
export const AUDIT_SUB_TAB_ROUTE_MAP = {
	[ITEM_SEARCH]: "itemSearch",
	[AUDIT_LISTING]: "auditListing"
}
export const SHOW_UTILITY_TAB = true;
/*Constant for time on header*/
export const HEADER_START_TIME = ' 09:00:15 (IST)'

/*Constants for Audit tab */
export const SET_AUDIT = 'SET_AUDIT';
export const RESET_AUDIT = 'RESET_AUDIT';
export const SKU = 'sku';
export const LOCATION = 'location';
export const AUDIT_COMPLETED = "audit_aborted__audit_reaudited__audit_completed";
export const AUDIT_CANCELLED = "audit_cancelled";
export const SETAUDIT_PPS = 'SETAUDIT_PPS';
export const REFRESH_AUDIT = 'REFRESH_AUDIT';
export const APPROVE_AUDIT = "APPROVE_AUDIT";
export const VIEW_AUDIT_ISSUES = "VIEW_AUDIT_ISSUES";
export const VALIDATED_ATTIBUTES_DATA = "VALIDATED_ATTIBUTES_DATA";
export const VALIDATED_ATTIBUTES_DATA_LOCATION = "VALIDATED_ATTIBUTES_DATA_LOCATION";
export const VALIDATED_ATTIBUTES_DATA_SKU = "VALIDATED_ATTIBUTES_DATA_SKU";
export const VALIDATED_ATTIBUTES_DATA_SKU_CSV = "VALIDATED_ATTIBUTES_DATA_SKU_CSV";
export const VALIDATED_ATTIBUTES_DATA_LOCATION_CSV = "VALIDATED_ATTIBUTES_DATA_LOCATION_CSV";
export const VALIDATED_SKU_CODE = "VALIDATED_SKU_CODE";
export const VALID_SKU = "VALID_SKU";
export const VALID_LOCATION = "VALID_LOCATION";
export const NO_ATTRIBUTE_SKU = "NO_ATTRIBUTE_SKU";
export const SKU_NOT_EXISTS = "INVALID_SKU";
export const LOCATION_NOT_EXISTS = "INVALID_LOCATION";

export const NO_SKU_VALIDATION = "NO_SKU_VALIDATION";
export const NO_LOCATION_VALIDATION = "NO_LOCATION_VALIDATION";
export const WATING_FOR_VALIDATION = "WATING_FOR_VALIDATION";
export const AUDIT_ISSUES_STATUS = "Issues found";
export const AUDIT_BY_PDFA = "pdfa";
export const AUDIT_BY_LOCATION = "location";
export const AUDIT_BY_SKU = "sku";
export const BREACHED = "breached"
/*Inventory parsing constants*/
export const INVENTORY_DATA_TODAY = 'INVENTORY_DATA_TODAY'
export const INVENTORY_DATA_HISTORY = 'INVENTORY_DATA_HISTORY'
export const CATEGORY_APPAREL = 'apparel'
export const CATEGORY_OTHERS = 'others'
export const CATEGORY_SHOES = 'shoes'
export const CATEGORY_ELECTRONICS = 'electronics'
export const CATEGORY_DEFAULT = 'default'
export const CATEGORY_UNUSED = 'unused'
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
	color: INV_HIST_LEGEND_COLOR,
	name: 'Items Stocked'
}]
export const INV_LINE_LEGEND_DATA = [{
	color: INV_LINE_LEGEND_IPICKED_COLOR,
	name: 'Items Picked'
},
{
	color: INV_LINE_LEGEND_IPUT_COLOR,
	name: 'Items Put'
}
]
export const INV_HIST_LEGEND_CONFIG = {
	xpos: 0,
	xIncrement: 20,
	ypos: 20,
	containerWidth: "55%",
	containerHeight: "60px"
}
export const INV_LINE_LEGEND_CONFIG = {
	xpos: 0,
	xIncrement: 115,
	ypos: 25,
	containerWidth: "95%",
	containerHeight: "60px"
}

export const INVENTORY_HISTORY_DAYS_COUNT = 29;
export const INVENTORY_HISTOGRAM_CONFIG = {
	height: 250,
	width: (70 / 100) * screen.width,
	margin: { top: 20, right: 20, bottom: 60, left: 60 },
	bandPadding: 0.05,
	outerTickSize: 0,
	defaultMaxYAxis: 100000,
	ticks: 4,
	showMonthBreak: true,
	noDataText: 'No Stock Found'
}
export const INVENTORY_LINE_CONFIG = {
	height: 250,
	width: (70 / 100) * screen.width,
	margin: { top: 20, right: 20, bottom: 60, left: 60 },
	bandPadding: 0.05,
	outerTickSize: 0,
	defaultMaxYAxis: 100000,
	padding: 18,
	ticks: 4,
	showMonthBreak: true,
	noDataText: 'No Item Movement'
}
export const DISPLAY_INVENTORY_SPINNER = 'DISPLAY_INVENTORY_SPINNER';
export const DISPLAY_INVENTORY_HISTORY = 'DISPLAY_INVENTORY_HISTORY';

export const SCH_CONFIG = {
	"svgInfo": {
		"height": "100",
		"width": (28 / 100 * screen.width),
		"x": 0,
		"y": 20,
		"lineInfo": {
			"y1": "-8",
			"y2": "50",
			"stroke": "#BFBFBF",
			"stroke-width": "1"
		},
		"textInfo": {
			"message": "{utilisedSpace}% space utilized",
			"y": "-8"
		},
		"rectInfo": {
			"y": "20",
			"height": "50"
		}
	}

}

export function toggleOrder(data) {
	if (data === DESC) { return ASC }
	else if (data === ASC) { return DESC }
}

/*Constants for Legends*/

export const LEGEND_ROUND = "ROUND";
export const LEGEND_RECT = "RECTANGLE";
export const LEGEND_DEFAULT = LEGEND_RECT;
export const ASC = "ASC";
export const DESC = "DESC";

export const EN = 'en';
export const JA = 'ja';
export const ES = 'es';
export const ZH = 'zh';
export const DE = 'de';
export const FR = 'fr';
export const NL = 'nl';
export const HR = 'h ';
export const MM = 'm ';
export const SS = 's ';
// Style class constants
export const TYPING = 'gor-login-field gor-input-ok gor-input-typing';
export const FILL_BACK = 'gor-fill-back';
export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';
export const PATCH = 'PATCH';
export const APP_JSON = 'application/json';
export const APP_EXCEL = 'application/vnd.ms-excel';
export const GOR_RISK = 'gor-risk';
export const GOR_DELAY = 'gor-breach';
export const GOR_NONE = 'gor-none';
export const GOR_SUCCESS = 'gor-success';
export const GOR_PENDING = "pending";
export const GOR_PROGRESS = "progress";
export const GOR_BREACHED = "breached";
export const GOR_EXCEPTION = "gor-exception";
export const GOR_OFFLINE = 'gor-offline';
export const GOR_ONLINE = 'gor-online';
export const GOR_NORMAL_TAB = 'gor-normal-tab';
export const GOR_PASS = 'gor-pass';
export const GOR_FAIL = 'gor-fail';
export const GOR_INFO = 'gor-info';
export const GOR_STATUS = "status";
export const GOR_AUDIT_STATUS_DATA = "status_data";
export const GOR_STATUS_PRIORITY = "statusPriority";
export const GOR_PERIPHERAL_ONLINE = "online";
export const GOR_PERIPHERAL_OFFLINE = "offline";
export const GOR_ON_STATUS = "open";
export const GOR_CONNECTED_STATUS = "connected";
export const GOR_MANUAL_MODE = "manual";
export const GOR_COMPLETED_STATUS = "Completed";
export const GOR_IN_PROGRESS_STATUS = "In Progress";
export const GOR_BREACHED_LINES = "gor-breached-lines";
export const AUDIT_CREATED = "audit_created";
export const AUDIT_PENDING_APPROVAL = "audit_pending_approval";
export const AUDIT_RESOLVED = "audit_resolved";
export const AUDIT_UNRESOLVED = "Unresolved";
export const AUDIT_LINE_REJECTED = "audit_rejected";
export const AUDIT_LINE_REAUDITED = "audit_reaudited";
export const AUDIT_REJECTED_STATUS = "Rejected";
export const AUDIT_REAUDITED_STATUS = "Re-audited";
export const AUDIT_RESOLVED_STATUS = "Resolved";
export const AUDIT_PARAM_TYPE = 'audit_param_type';
export const AUDIT_START_TIME = 'start_time';
export const AUDIT_END_TIME = 'end_time';
export const AUDIT_PARAM_VALUE = 'audit_param_value';
export const AUDIT_STATUS = 'audit_status';
export const AUDIT_TYPE = "AUDIT_TYPE";
export const SPECIFIC_SKU_ID = 'SPECIFIC_SKU_ID';
export const SPECIFIC_LOCATION_ID = 'SPECIFIC_LOCATION_ID';
export const ISSUE_FOUND = 'audit_pending_approval';
export const ITEM_SEARCH_TASK_ID = "ITEM_SEARCH_TASK_ID";
//Icons
export const PICK_ICON = ' iPick';
export const STOCK_ICON = "iStock";
export const AUDIT_ICON = "iAudit";
export const TILE_ONTIME = 'overview-tile-ontime-icon';
export const TILE_ALERT = 'header-yellow-alert-icon';
export const TICK_WHITE = 'gor-tick-white';
export const REMOVE_ICON = 'gor-remove-white';
export const ERROR_WHITE = 'gor-error-white';
export const DELAY_ICON = "gor-delay-icon";

//Sort header constants
export const INITIAL_HEADER_SORT = "status";
export const INITIAL_HEADER_ORDER = "ASC";
export const BUTLER_HEADER_SORT = "BUTLER_HEADER_SORT";
export const BUTLER_HEADER_SORT_ORDER = "BUTLER_HEADER_SORT_ORDER";
export const PPS_CHECKED = "PPS_CHECKED";
export const AUDIT_CHECKED = "AUDIT_CHECKED";
export const AUDIT_RESET = "AUDIT_RESET";
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
export const ALL = 'all';
export const ANY = 'any';
//table filter
export const SHOW_FILTER = "SHOW_FILTER";
export const IS_FILTER_APPLIED = "IS_FILTER_APPLIED";
export const TOGGLE_BUTTON = "TOGGLE_BUTTON";
export const TOGGLE_BUTTON_BOT = "TOGGLE_BUTTON_BOT";
export const PPS_FILTER_VALUE = "PPS_FILTER_VALUE";
export const AUDIT_FILTER_VALUE = "AUDIT_FILTER_VALUE";
export const ORDER_FILTER_VALUE = "ORDER_FILTER_VALUE";
export const CHARGING_FILTER_VALUE = "CHARGING_FILTER_VALUE";
export const WAVE_FILTER_VALUE = "WAVE_FILTER_VALUE";
export const USER_FILTER_VALUE = "USER_FILTER_VALUE";

export const BUTLER_FILTER_STATE = "BUTLER_FILTER_STATE";
export const MSU_FILTER_STATE = "MSU_FILTER_STATE";
export const AUDIT_FILTER_STATE = "AUDIT_FILTER_STATE";
export const ORDER_FILTER_STATE = "ORDER_FILTER_STATE";
export const MSU_CONFIG_FILTER_STATE = "MSU_CONFIG_FILTER_STATE"

export const CHARGINGSTATION_FILTER_STATE = "CHARGINGSTATION_FILTER_STATE";
export const PPS_FILTER_STATE = "PPS_FILTER_STATE";
export const WAVE_FILTER_STATE = "WAVE_FILTER_STATE";
export const USER_FILTER_STATE = "USER_FILTER_STATE";

//Emergency & Pause operation
export const AUDIT_TASK_ID = "AUDIT_TASK_ID"
export const ADD_TOKEN = "add";
export const ADD_DEFAULT = "addDefault";
export const SOFT_MANUAL = "soft_manual";
export const SOFT = "soft";
export const HARD = "hard";
//backend sort
export const sortAuditHead = {
	"startTime": "&order_by=start_actual_time",
	"completedTime": "&order_by=completion_time",
	"display_id": "&order_by=display_id",
	"status": "&order_by=audit_status&order_by_seq=[ 'audit_pending_approval','audit_created','audit_accepted','audit_conflicting','audit_waiting','audit_resolved','audit_pending','audit_reaudited','audit_started','audit_tasked','audit_rejected','audit_resolved','audit_aborted', 'audit_completed']"
};

export const sortOrder = { "DESC": "&order=ASC", "ASC": "&order=DESC" };


export const sortOrderHead = {
	"recievedTime": "&sort=createdOn",
	"pickBy": "&sort=pick_before_time",
	"id": "&sort=id",
	"status": "&sort=state&order_by_seq=['breached','exception','not_fulfillable','abandoned','temporary_unfulfillable','pending','fulfillable','cancelled','completed']"
};

/*Slider default marks we are passing from here*/
export const filterMarks = {
	0: "0",
	100: "100",
	200: "200",
	300: "300",
	400: "400",
	500: "500"
}

//constants for modal handling
export const MODAL_STATUS = "MODAL_STATUS";
export const MODAL_RESET = "MODAL_RESET";
export const CHECKLIST = "CHECKLIST";
export const RECEIVE_SHIFT_START_TIME = "RECEIVE_SHIFT_START_TIME";
export const OVERVIEW_REFRESHED = "OVERVIEW_REFRESHED"
export const BUTLERBOTS_REFRESHED = "BUTLERBOTS_REFRESHED";
export const PPS_LIST_REFRESHED = "PPS_LIST_REFRESHED";
export const CHARGING_STATION_LIST_REFRESHED = "CHARGING_STATION_LIST_REFRESHED";
export const PPS_CONFIGURATION_REFRESHED = "PPS_CONFIGURATION_REFRESHED";
export const MSU_CONFIGURATION_REFRESHED = "MSU_CONFIGURATION_REFRESHED";
export const INVENTORY_REFRESHED = "INVENTORY_REFRESHED"
export const AUDIT_LIST_REFRESHED = "AUDIT_LIST_REFRESHED"
export const ORDER_LIST_REFRESHED = "ORDER_LIST_REFRESHED"
export const WAVES_REFRESHED = "WAVES_REFRESHED"
export const UTILITY_TAB_REFRESHED = "UTILITY_TAB_REFRESHED"
export const SINGLE = "Single"

export const GET_CONFIGS = "GET_CONFIGS"
export const RECEIVE_CONFIGS = "RECEIVE_CONFIGS"


/*Constants for PPS Tab*/
export const PPS_STATUS_CLOSE = "close";
export const PPS_STATUS_FCLOSE = "force_close";
export const PPS_STATUS_OPEN = "open";
export const GET_PENDING_MSU = "GET_PENDING_MSU";
export const RESET_CHECKED_PPS = "RESET_CHECKED_PPS";
/*Constants for Notifications*/
export const SEARCHED_NOTIFICATIONS_DATA = "SEARCHED_NOTIFICATIONS_DATA";
export const WS_NOTIFICATIONS_DATA = "WS_NOTIFICATIONS_DATA";
export const SEND_READ_INTIMATION = "SEND_READ_INTIMATION";
export const RESET_NOTIFICATION_DATA = "RESET_NOTIFICATION_DATA";
export const GET_ALL_NOTIFICATIONS = "GET_ALL_NOTIFICATIONS";
export const RESET_NOTIFICATION_TABLE_DATA = "RESET_NOTIFICATION_TABLE_DATA";
export const SET_NOTIFICATION_SPINNER = "SET_NOTIFICATION_SPINNER";
export const SET_INFINITE_SPINNER = "SET_INFINITE_SPINNER";
export const SEARCHED_NOTIFICATIONS_DATA_ALL = "SEARCHED_NOTIFICATIONS_DATA_ALL";
export const DEFAULT_NOTIFICATION_ROW_LENGTH = 15;

/*Zoning COnstants*/
export const ZONE_DATA = "ZONE_DATA";
export const RECIEVE_ZONE_DATA = "RECIEVE_ZONE_DATA";
export const CONTROLLER_DATA = "CONTROLLER_DATA";
export const ZONE_STATUS_CLASS = {
	operation_normal: "operating",
	zone_pause_initiated: "zonePauseInit",
	zone_pause_activated: "zonePauseActive",
	zone_pause_deactivated: "zonePauseDeactivated",
	zone_clear_initiated: "zoneClearInit",
	zone_clear_activated: "zoneClearActive",
	zone_clear_deactivated: "zoneClearDeactivated",
	emergency_stop: "emergencyStop",
	emergency_pause: "emergencyPause"
}

/**
 * Constants for PPS Configuration Tabs
 */
export const FETCH_PPS_PROFILES = "FETCH_PPS_PROFILES"
export const FETCH_PROFILE_FOR_PPS = "FETCH_PROFILE_FOR_PPS"
export const RECEIVE_PPS_PROFILES = "RECEIVE_PPS_PROFILES"
export const SELECT_PPS_PROFILE_FOR_CONFIGURATION = "SELECT_PPS_PROFILE_FOR_CONFIGURATION"
export const SELECT_PPS_BIN = "SELECT_PPS_BIN"
export const SELECT_PPS_BIN_GROUP = "SELECT_PPS_BIN_GROUP"
export const CLEAR_SELECTION_PPS_BIN = "CLEAR_SELECTION_PPS_BIN"
export const CHANGE_PPS_BIN_STATUS = "CHANGE_PPS_BIN_STATUS"
export const CHANGE_PPS_BIN_GROUP_STATUS = "CHANGE_PPS_BIN_GROUP_STATUS"
export const ADD_TAG_TO_BIN = "ADD_TAG_TO_BIN"
export const ADD_TAG_TO_LIST = "ADD_TAG_TO_LIST"
export const FETCH_TAGS = "FETCH_TAGS"
export const RECEIVE_TAGS = "RECEIVE_TAGS"
export const CANCEL_PROFILE_CHANGES = "CANCEL_PROFILE_CHANGES"
export const CREATE_NEW_PROFILE = "CREATE_NEW_PROFILE"
export const CHANGE_PPS_PROFILE = "CHANGE_PPS_PROFILE"
export const SAVE_PPS_PROFILE = "SAVE_PPS_PROFILE"
export const PPS_PROFILE_SAVED = "PPS_PROFILE_SAVED"
export const PPS_PROFILE_CREATED = "PPS_PROFILE_CREATED"
export const PPS_PROFILE_REQUESTED = "PPS_PROFILE_REQUESTED"
export const TAG_ADDED_TO_LIST = "TAG_ADDED_TO_LIST"

/**
 * Constants for MSU Configuration Tab
 */
export const MSU_CONFIG_POLLING_INTERVAL = 3600000;
export const FETCH_MSU_CONFIG_LIST = "FETCH_MSU_CONFIG_LIST"
export const FETCH_MSU_CONFIG_DEST_TYPE_LIST = "FETCH_MSU_CONFIG_DEST_TYPE_LIST"
export const FETCH_MSU_CONFIG_LIST_VIA_FILTER = "FETCH_MSU_CONFIG_LIST_VIA_FILTER"
export const FETCH_MSU_CONFIG_RACK_STRUCTURE = "FETCH_MSU_CONFIG_RACK_STRUCTURE"
export const FETCH_MSU_CONFIG_BLOCK_PUT_CHANGE_TYPE = "FETCH_MSU_CONFIG_BLOCK_PUT_CHANGE_TYPE"
export const FETCH_MSU_CONFIG_START_RECONFIG = "FETCH_MSU_CONFIG_START_RECONFIG"
export const FETCH_MSU_CONFIG_STOP_RECONFIG = "FETCH_MSU_CONFIG_STOP_RECONFIG"
export const FETCH_MSU_CONFIG_RELEASE_MSU = "FETCH_MSU_CONFIG_RELEASE_MSU"

/**
 * Constants for Operations log
 */
export const OPERATION_LOG_FETCH = "OPERATION_LOG_FETCH";
export const OPERATIONS_LOG_REQUEST_PARAMS = {
	"operatingMode": "",
	"requestId": "",
	"skuId": "",
	"userId": "",
	"page": {
		"size": 10,
		"from": 1
	},
	"timeRange": {
		"from": "",
		"to": ""
	},
	"source": {
		"id": "",
		"type": ""
	},
	"destination": {
		"id": "",
		"type": ""
	}
}
export const OPERATIONS_LOG_MODE_MAP = {
	"put_front": "Put Front",
	"pick_front": "Pick Front",
	"put_back": "Put Back",
	"pick_back": "Pick Back",
	"audit": "Audit"
}

export const APPLY_OL_FILTER_FLAG = "APPLY_OL_FILTER_FLAG";
export const REPORT_NAME_OPERATOR_LOGS = "OPERATOR_LOGS";
export const WS_OPERATOR_LOG_SUBSCRIBE = "WS_OPERATOR_LOG_SUBSCRIBE";
export const WS_OPERATOR_LOG_UNSUBSCRIBE = "WS_OPERATOR_LOG_UNSUBSCRIBE";
export const WS_OPERATOR_LOG_FLUSH = "WS_OPERATOR_LOG_FLUSH";
export const SET_REPORTS_SPINNER = "SET_REPORTS_SPINNER";
export const RECIEVE_WS_OL_DATA = "RECIEVE_WS_OL_DATA";
export const DEFAULT_PAGE_SIZE_OL = "25";
export const REALTIME = "realtime";
export const REPORTS_FETCH = "REPORTS_FETCH";
export const GET_REPORT = "GET_REPORT";
export const DOWNLOAD_REPORT_REQUEST = "DOWNLOAD_REPORT_REQUEST";
export const SET_DOWNLOAD_REPORT_SPINNER = "SET_DOWNLOAD_REPORT_SPINNER";

/**
 * Constants for STORAGE SPACE
 */
export const STORAGE_SPACE_FETCH = "STORAGE_SPACE_FETCH";

/*COnstants for audit query*/
export const SET_ORDER_QUERY = "SET_ORDER_QUERY";
export const SET_AUDIT_QUERY = "SET_AUDIT_QUERY";
export const GET_AUDIT_DETAILS = "GET_AUDIT_DETAILS";
export const SETAUDIT_DETAILS = "SETAUDIT_DETAILS";
export const AUDITDETAIL_URL = "AUDITDETAIL_URL";
export const UPDATE_STATUS = "UPDATE_STATUS";
export const PAUSE_AUDIT = "PAUSE_AUDIT";
export const AUDIT_DUPLICATE = "AUDIT_DUPLICATE";
export const FROM_DATE = "FROM_DATE";
export const TO_DATE = "TO_DATE";
export const NOT_YET_STARTED = "audit_created";
export const TO_BE_RESOLVED = "to_be_resolved";//pending
export const AUDIT_PAUSED = "audit_paused";
export const AUDIT_DUPLICATED = "duplicated";
export const AUDIT_DELETED = "audit_deleted";
export const SPECIFIC_PPS_ID = "SPECIFIC_PPS_ID";
export const AUDIT_USERLIST = "AUDIT_USERLIST";
export const SETAUDIT_USER = "SETAUDIT_USER";
export const FILTER_PPS_ID = "pps_id";
export const AUDIT_CREATEDBY = 'audit_created_by';
export const AUDIT_CREATOR_NAME = 'audit_creator_name';
export const AUDIT_EDIT = 'AUDIT_EDIT';
export const SET_AUDIT_EDIT_DATA = 'SET_AUDIT_EDIT_DATA';
export const START_AUDIT_TASK = 'START_AUDIT_TASK';
export const CHANGE_PPS_TASK = 'CHANGE_PPS_TASK';
//FeedBack Notification
export const NOTIFY_FEEDBACK = 'NOTIFY_FEEDBACK';
export const AUDIT_EDIT_REQUEST = 'AUDIT_EDIT_REQUEST';
export const CREATE_DUPLICATE_REQUEST = 'CREATE_DUPLICATE_REQUEST';
export const WARNING = 'WARNING';
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const SET_NOTIFICATION_NULL = 'SET_NOTIFICATION_NULL';
export const NOTIFY_MSG_HIDE = 'NOTIFY_MSG_HIDE';





/*Constants for seller recall*/

export const SELLER_RECALL = "SELLER_RECALL";
export const VALIDATE_SKU_ITEM_RECALL = "VALIDATE_SKU_ITEM_RECALL";



export const POLLING_INTERVAL = 60000;
export const PAGE_DEFAULT_LIMIT = 10;

export const ORDERS_FULFIL_FETCH = "ORDERS_FULFIL_FETCH";
export const ORDERS_SUMMARY_FETCH = "ORDERS_SUMMARY_FETCH";
export const ORDERS_CUT_OFF_TIME_FETCH = "ORDERS_CUT_OFF_TIME_FETCH";
export const ORDERS_PER_PBT_FETCH = "ORDERS_PER_PBT_FETCH";
export const SET_ORDER_PRIORITY = "SET_ORDER_PRIORITY";
export const ORDERLINES_PER_ORDER_FETCH = "ORDERLINES_PER_ORDER_FETCH";
export const ORDERS_REPORT_DOWNLOAD_REQUEST = "ORDERS_REPORT_DOWNLOAD_REQUEST";
export const TOGGLE_ACTIVE_PBT = "TOGGLE_ACTIVE_PBT";
export const UNSET_ALL_ACTIVE_PBT = "UNSET_ALL_ACTIVE_PBT"
export const PICK_BEFORE_TIME = "PICK_BEFORE_TIME";
export const ORDER_ID = "ORDER ID";
export const PPS_ID = "PPS ID";
export const SKU_ID = "SKU ID";
export const FROM_TIME = "FROM TIME";
export const TO_TIME = "TO TIME";
export const URGENT_ORDER_TAG = "URGENT";
export const EXPRESS_ORDER_TAG = "EXPRESS";
export const PENDING_STATUS = "PENDING";
export const BREACH_RISK_STATUS = "BREACH_RISK";
export const BREACHED_STATUS = "BREACHED";
export const BREACHED_COMPLETED_STATUS = "BREACHED COMPLETED";
export const PRODUCT_SHORT_STATUS = "PRODUCT SHORT";
export const OUT_OF_STOCK_STATUS = "OUT OF STOCK";
export const REJECTED_STATUS = "REJECTED";
export const ORDER_TAGS = "ORDER TAGS";
export const STATUS = "STATUS";
export const CREATED_STATUS = "CREATED";
export const PROCESSING_STATUS = "PROCESSING";
export const PROCESSED_STATUS = "PROCESSED";
export const FAILED_STATUS = "FAILED";
export const CANCELLED_STATUS = "CANCELLED";
export const WAITING_STATUS = "WAITING";
export const ORDERS_POLLING_INTERVAL = 60000;
//Wall to wall audit
export const WALL_TO_WALL = "Wall-to-Wall";










