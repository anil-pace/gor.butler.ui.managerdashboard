export const BASE_URL = '192.168.9.35';
export const PROTOCOL = 'https://';
export const WS_PROTOCOL ="wss://";
//export const WS_URL = WS_PROTOCOL+BASE_URL+":8888/manager_api/ws";
export const WS_URL = WS_PROTOCOL+BASE_URL+"/manager_api/wss";
//export const API_URL=PROTOCOL+BASE_URL+":5000/api";
export const API_URL=PROTOCOL+BASE_URL+"/api";
export const LOGIN_URL=API_URL+"/auth/token"
export const HEADER_URL=API_URL+"/user";
export const PPS_MODE_CHANGE_URL=API_URL+"/pps/change_mode";
export const PPS_STATUS_CHANGE_URL = API_URL+"/pps/change_status";
export const GET_PPS_MSU = API_URL+"/pps/get_pending_msu";
export const PAGE_SIZE_URL="&PAGE_SIZE=";
export const ROLE_URL=HEADER_URL+'/role';
export const CHECK_USER=HEADER_URL+'?username=';
export const AUDIT_URL=API_URL+"/audit";
export const DELETE_AUDIT_URL=AUDIT_URL+'/delete/';
export const CANCEL_AUDIT_URL=AUDIT_URL + "/cancel/";
export const START_AUDIT_URL=AUDIT_URL+'/start';
export const SEARCH_AUDIT_URL=AUDIT_URL + "/search?";
export const PPSLIST_URL=API_URL+"/audit/pps_info";
export const AUDITDETAIL_URL=API_URL+"/audit/audit_details";

export const ORDER_PAGE="?page=";
export const EXCEPTION_TRUE="exception";
export const WAREHOUSE_STATUS_SINGLE="search=state";
export const WAREHOUSE_STATUS_MULTIPLE="search=state=in";
export const UPDATE_TIME='time=';
export const UPDATE_TIME_UNIT="timeUnit=";
export const PICK_BEFORE_ORDER_URL="&pick_before_time<=";
export const BREACHED_URL="&breached=true&warehouse_status=['pending','fulfillable','temporary_unfulfillable','completed']";
export const TIME_ZONE_URL=API_URL+"/components/get_time_zone"
export const GIVEN_PAGE="page";
export const GIVEN_PAGE_SIZE="PAGE_SIZE";
export const FILTER_ORDER_ID= "&order_id~=";
export const ORDER_ID_FILTER_PARAM_WITHOUT_STATUS= "search=externalServiceRequestId";
export const  ORDER_ID_FILTER_PARAM = "externalServiceRequestId";
export const FILTER_AUDIT_ID="display_id";
export const PENDING_ORDERLINES="/pending_auditlines";
export const AUDIT_ANAMOLY="/anamoly_auditlines";
export const SKU_VALIDATION_URL=API_URL + "/sku/audit_attributes_configured/";
export const VALIDATION_LIST=API_URL + "/system/remove_emergency/validation_list";
export const VALIDATE_SAFETY=API_URL + "/system/validate_and_remove_emergency";
export const GET_SHIFT_START_TIME_URL=API_URL + "/system/shift_start_time";
export const INVENTORY_REPORT_URL=API_URL + "/inventories/get_inventory_report_v2";
export const GET_ITEM_RECALL=API_URL + "/orders/wrapper/generate_orders";
export const GR_REPORT_URL=API_URL + "/components/generate_gr_report";
export const MASTER_UPLOAD_URL=API_URL + "/products/csv";
export const STOCK_LEDGER_REPORT_DOWNLOAD_URL=API_URL + "/api-gateway/inventory-service/platform-inventory/report/agg-stock-ledger"; //Mapping needs to be there in ngnix config
export const STOCK_LEDGER_REPORT_DOWNLOAD_RAW_TRANSACTIONS_URL=API_URL + "/api-gateway/inventory-service/platform-inventory/report/stock-ledger/"; //Mapping needs to be there in ngnix config
export const UPLOAD_HISTORY_URL=API_URL+ "/components/mdm_info";
export const REPORTS_HISTORY_URL=API_URL+"/components/reports_info"
export const GET_MD_CONFIG_URL=API_URL + "/components/get_md_config";
export const GET_MAXSIZE_FILE_URL=API_URL + "/components/get_mdm_file_size";
/*URLs for notification*/
export const WS_NOTIFICATION_URL =  API_URL+"/platform-dashboard/dashboard-stomp";
export const NOTIFICATIONS_URL =  API_URL+"/api-gateway/dashboard-service/platform-dashboard/event";
export const READ_MSG_URL = API_URL+"/api-gateway/dashboard-service/platform-dashboard/event/mark-as-read";
export const WS_NOTIFICATION_SUBSCRIPTION = '/dashboard/notification';

/*URLs for order tile from platform*/
export const WS_PLATFORM_ORDER_URL =  "/dashboard/api/aggregate-data/live";
export const WS_PLATFORM_HEADER_ORDER_URL = "/dashboard/api/header-data/live";
/**
 * URLs or PPS Configurations
 */

export const PPS_LIST_URL=API_URL+"/pps"//TODO: URL need to be changed accrodingly
export const PPS_PROFILE_URL=API_URL+"/pps_profiles/"//TODO: URL need to be changed accrodingly
export const FETCH_TAGS_URL=API_URL+"/components/get_bin_tags"//TODO: URL need to be changed accrodingly
export const SAVE_TAGS_URL=API_URL+"/components/add_bin_tags"//TODO: URL need to be changed accrodingly
export const SAVE_PROFILE_URL=API_URL+"/pps_profiles/"//TODO: URL need to be changed accrodingly

/**
 * URLs for Operations Log Report
 */

export const OPERATIONS_LOG_URL =  API_URL+"/api-gateway/dashboard-service/platform-dashboard/operator/logs/search";
export const WS_OPERATIONS_LOG_SUBSCRIPTION =  "/dashboard/operator/logs/live";//An arbitrary count has to be passed in this API
export const REPORTS_URL = API_URL+"/api-gateway/dashboard-service/platform-dashboard/report/find-by-page";
export const DOWNLOAD_REPORT = API_URL+"/api-gateway/dashboard-service/platform-dashboard/report/download/";
export const REQUEST_REPORT_DOWNLOAD = API_URL+"/api-gateway/dashboard-service/platform-dashboard/operator/logs/generate-report";
export const ORDERS_URL=API_URL+"/api-gateway/dashboard-service/platform-dashboard/api/orders";
export const STORAGE_SPACE_URL=API_URL+"/orders/put/storage_availability";
export const STORAGE_SPACE_REPORT_DOWNLOAD_URL=API_URL+"/orders/put/storage_availability/download";

export const AUDIT_PAUSE_URL=API_URL+"";
export const AUDIT_DUPLICATE_URL=API_URL+"";
export const USERLIST_URL=API_URL+"";
