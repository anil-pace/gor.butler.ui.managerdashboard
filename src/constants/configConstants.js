
export const BASE_URL = '192.168.8.120';
export const PORT = '8888';
export const PROTOCOL = 'https://';
export const WS_PROTOCOL ="wss://";
export const WS_URL = WS_PROTOCOL+BASE_URL+"/manager_api/wss"
export const LOGIN_URL=PROTOCOL+BASE_URL+"/api/auth/token"
export const API_URL=PROTOCOL+BASE_URL+"/api"
export const HEADER_URL = PROTOCOL+BASE_URL+"/api/user"
export const ORDERS_URL="/orders/md"
export const PPS_MODE_CHANGE_URL = "pps/";
export const PAGE_SIZE_URL = "&PAGE_SIZE=";
export const ROLE_URL=API_URL+'/role';
export const CHECK_USER=HEADER_URL+'?username=';
export const AUDIT_URL = PROTOCOL+BASE_URL+"/api/audit"
export const PPSLIST_URL = API_URL+"/pps/pps_mode"


