
import { DISPLAY_SPINNER,DISPLAY_WAVES_SPINNER,DISPLAY_BUTLER_SPINNER,DISPLAY_PPS_SPINNER,
	DISPLAY_CHARGING_STATION_SPINNER,DISPAY_RESOLVE_AUDIT_SPINNER,DISPLAY_SAFETY_SPINNER,DISPAY_USER_SPINNER,DISPLAY_CHARGING_STATION_FILTER_SPINNER,
DISPLAY_PPS_FILTER_SPINNER,DISPLAY_BOT_FILTER_SPINNER,DISPLAY_WAVES_FILTER_SPINNER,DISPLAY_INVENTORY_REPORT_SPINNER,DISPLAY_STOCK_LEDGER_SPINNER,DISPLAY_STOCK_LEDGER_RAW_TRANSACTIONS_SPINNER,
DISPLAY_MSU_CONFIG_SPINNER, DISPLAY_MSU_CONFIG_FILTER_SPINNER} from '../constants/frontEndConstants';

export function userFilterApplySpinner(data){
	
	return {
		type: DISPLAY_SPINNER,
		data
  	}
}

export function setWavesSpinner(data) {
	return {
		type: DISPLAY_WAVES_SPINNER,
		data
  	}
}

export function setWavesFilterSpinner(data) {
	return {
		type: DISPLAY_WAVES_FILTER_SPINNER,
		data
  	}
}

export function setButlerFilterSpinner(data) {
	return {
		type: DISPLAY_BOT_FILTER_SPINNER,
		data
  	}
}

export function setButlerSpinner(data) {
	return {
		type: DISPLAY_BUTLER_SPINNER,
		data
  	}
}

export function setPpsFilterSpinner(data) {
	return {
		type: DISPLAY_PPS_FILTER_SPINNER,
		data
  	}
}


export function setPpsSpinner(data) {
	return {
		type: DISPLAY_PPS_SPINNER,
		data
  	}
}


export function setCsSpinner(data) {
	return {
		type: DISPLAY_CHARGING_STATION_SPINNER,
		data
  	}
}
export function setCsFilterSpinner(data) {
	return {
		type: DISPLAY_CHARGING_STATION_FILTER_SPINNER,
		data
  	}
}

export function setResolveAuditSpinner(data) {
	return {
		type: DISPAY_RESOLVE_AUDIT_SPINNER,
		data
	}
}

export function setUserSpinner(data) {
	return {
		type: DISPAY_USER_SPINNER,
		data
	}
}


export function setSafetySpinner(data){
	return {
		type: DISPLAY_SAFETY_SPINNER,
		data
	}
}

export function setInventoryReportSpinner(data){
	return {
		type: DISPLAY_INVENTORY_REPORT_SPINNER,
		data
	}
}
export function setStockLedgerSpinner(data){
	return {
		type: DISPLAY_STOCK_LEDGER_SPINNER,
		data
	}
}
export function setStockLedgerRawTransactionsSpinner(data){
	return {
		type: DISPLAY_STOCK_LEDGER_RAW_TRANSACTIONS_SPINNER,
		data
	}
}

export function setMsuConfigSpinner(data) {
	return {
		type: DISPLAY_MSU_CONFIG_SPINNER,
		data
  	}
}


export function setMsuConfigFilterSpinner(data) {
	return {
		type: DISPLAY_MSU_CONFIG_FILTER_SPINNER,
		data
  	}
}