export const BASE_URL = '192.168.12.118:5000';
export const PORT = '8888';
export const PROTOCOL = 'http://';
export const WS_PROTOCOL ="ws://";
export const WS_URL = WS_PROTOCOL+BASE_URL+"/manager_api/wss"
export const LOGIN_URL=PROTOCOL+BASE_URL+"/api/auth/token"
export const API_URL=PROTOCOL+BASE_URL+"/api"
export const HEADER_URL = PROTOCOL+BASE_URL+"/api/user"
export const ORDERS_URL="/orders/md"
export const PPS_MODE_CHANGE_URL = "/pps/";
export const PAGE_SIZE_URL = "&PAGE_SIZE=";
export const ROLE_URL=HEADER_URL+'/role';
export const CHECK_USER=HEADER_URL+'?username=';
export const AUDIT_URL = PROTOCOL+BASE_URL+"/api/audit";
export const DELETE_AUDIT_URL=AUDIT_URL+'/delete/';
export const START_AUDIT_URL=AUDIT_URL+'/start';
export const SEARCH_AUDIT_URL=AUDIT_URL + "/search?start_time=";
export const PPSLIST_URL = API_URL+"/pps/pps_mode"
export const ORDER_PAGE = "?page=";
export const EXCEPTION_TRUE="&exception=true";
export const WAREHOUSE_STATUS="&warehouse_status=";
export const UPDATE_TIME_LOW='&update_time<=';
export const UPDATE_TIME_HIGH='&update_time>=';
export const PICK_BEFORE_ORDER_URL = "&pick_before_time<=";
export const BREACHED_URL = "&breached=true&warehouse_status=['pending','fulfillable','temporary_unfulfillable']";
export const TIME_ZONE_URL = PROTOCOL+BASE_URL+"/api/components/get_time_zone"
export const GIVEN_PAGE="&page=";
export const GIVEN_PAGE_SIZE="&PAGE_SIZE=20";
export const FILTER_ORDER_ID =  "&order_id~=";
export const FILTER_AUDIT_ID = "&display_id=";
export const PENDING_ORDERLINES = "/pending_auditlines";
export const AUDIT_ANAMOLY  = "/anamoly_auditlines";
export const SKU_VALIDATION_URL = API_URL + "/sku/audit_attributes_configured/";

