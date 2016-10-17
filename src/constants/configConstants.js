
const BASE_URL = '192.168.8.118';
const PORT = '8888';
const PROTOCOL = 'https://';
const WS_PROTOCOL ="ws://";
export const WS_URL = WS_PROTOCOL+BASE_URL+":"+PORT+"/manager_api/ws"
export const LOGIN_URL=PROTOCOL+BASE_URL+"/api/auth/token"
export const API_URL=PROTOCOL+BASE_URL+"/api/"
export const HEADER_URL = PROTOCOL+BASE_URL+"/api/user"
export const ORDERS_URL="orders/md"
export const PPS_MODE_CHANGE_URL = "pps/";


