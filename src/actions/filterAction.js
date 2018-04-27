import { SHOW_FILTER ,IS_FILTER_APPLIED,BUTLER_FILTER_STATE,CHARGINGSTATION_FILTER_STATE,PPS_FILTER_STATE,WAVE_FILTER_STATE,
	USER_FILTER_STATE,TOGGLE_BUTTON_BOT,PPS_FILTER_VALUE,CHARGING_FILTER_VALUE,WAVE_FILTER_VALUE,
	USER_FILTER_VALUE,AUDIT_FILTER_STATE,AUDIT_FILTER_VALUE,ORDER_FILTER_STATE,ORDER_FILTER_VALUE,BOT_TOGGLE_FILTER,
	PPS_TOGGLE_FILTER,CS_TOGGLE_FILTER,WAVES_TOGGLE_FILTER,ORDERS_TOGGLE_FILTER,AUDIT_TOGGLE_FILTER,USER_TOGGLE_FILTER,
FILTER_APPLY_FLAG,MSU_CONFIG_FILTER_STATE} from '../constants/frontEndConstants'

//This action is use to update the filter state
export function showTableFilter(data){
	return {
		type: SHOW_FILTER,
		data
  	}
}
//Based on this action we show hide the filter for in ButlerBot tab
export function BotFilterToggle(data){
	return {
		type: BOT_TOGGLE_FILTER,
		data
  	}
}
//Based on this action we show hide the filter for in PPS tab
export function PPSFilterToggle(data){
	return {
		type: PPS_TOGGLE_FILTER,
		data
  	}
}
//Based on this action we show hide the filter for in ChargingStation tab
export function CSFilterToggle(data){
	return {
		type: CS_TOGGLE_FILTER,
		data
  	}
}
//Based on this action we show hide the filter for in Waves tab
export function wavesFilterToggle(data){
	return {
		type: WAVES_TOGGLE_FILTER,
		data
  	}
}
//Based on this action we show hide the filter for in Order tab
export function ordersFilterToggle(data){
	return {
		type: ORDERS_TOGGLE_FILTER,
		data
  	}
}
//Based on this action we show hide the filter for in audit tab
export function auditFilterToggle(data){
	return {
		type: AUDIT_TOGGLE_FILTER,
		data
  	}
}
//Based on this action we show hide the filter for in User tab
export function userFilterToggle(data){
	return {
		type: USER_TOGGLE_FILTER,
		data
  	}
}

//This action is to update the props value so that componentWillReceiveProps in app.js can catch the changes
export function filterApplied(data){
	return {
		type: IS_FILTER_APPLIED,
		data
  	}
}
export function setDefaultRange(data){
	return {
		type: 'SET_DEFAULT_RANGE',
		data
  	}
}


//This action is use to keep the updated flag value so that we can get to know the filter is applied for butletBot tab.
export function toggleBotButton(data){
	return {
		type: TOGGLE_BUTTON_BOT,
		data
  	}
}

//This action is use to keep the updated flag value so that we can get to know the filter is applied for PPS tab
export function togglePPSFilter(data){
	return {
		type: PPS_FILTER_VALUE,
		data
  	}
}
//This action is use to keep the updated flag value so that we can get to know the filter is applied for Audit tab
export function toggleAuditFilter(data){
	return {
		type: AUDIT_FILTER_VALUE,
		data
  	}
}
//This action is use to keep the updated flag value so that we can get to know the filter is applied for Order tab
export function toggleOrderFilter(data){
	return {
		type: ORDER_FILTER_VALUE,
		data
  	}
}

//This action is use to keep the updated flag value so that we can get to know the filter is applied for Wave tab
export function toggleWaveFilter(data){
	return {
		type: WAVE_FILTER_VALUE,
		data
  	}
}

//This action is use to keep the updated flag value so that we can get to know the filter is applied for User tab
export function toggleUserFilter(data){
	return {
		type: USER_FILTER_VALUE,
		data
  	}
}

//This action is use to keep the updated flag value so that we can get to know the filter is applied for Charging tab
export function toggleChargingFilter(data){
	return {
		type: CHARGING_FILTER_VALUE,
		data
  	}
}

//This action is use to keep the current filter state for Butler tab
export function butlerfilterState(data){
	return {
		type: BUTLER_FILTER_STATE,
		data
  	}
}
//This action is use to keep the current filter state for Audit tab
export function auditfilterState(data){
	return {
		type: AUDIT_FILTER_STATE,
		data
  	}
}
//This action is use to keep the current filter state for Order tab
export function orderfilterState(data){
	return {
		type: ORDER_FILTER_STATE,
		data
  	}
}

export function msuConfigFilterState(data){
	return {
		type: MSU_CONFIG_FILTER_STATE,
		data
  	}
}

//This action is use to keep the current filter state for ChargingStation tab
export function chargingstationfilterState(data){
	return {
		type: CHARGINGSTATION_FILTER_STATE,
		data
  	}
  }

 //This action is use to keep the current filter state for PPS tab
export function ppsfilterState(data){
	return {
		type: PPS_FILTER_STATE,
		data
  	}

}

//This action is use to keep the current filter state for Wave tab
export function wavefilterState(data){
	return {
		type: WAVE_FILTER_STATE,
		data
  	}

}

//This action is use to keep the current filter state for User tab
export function userfilterState(data){
	return {
		type: USER_FILTER_STATE,
		data
  	}

}

//This action is use to set the bool value so that we can show/hide the filter after clicking on apply button (if data available)
export function setFilterApplyFlag(data){
	return {
		type: FILTER_APPLY_FLAG,
		data
  	}

}

export function setClearIntervalFlag(data){
		return {
		type: "SET_CLEAR_INTERVAL_FLAG",
		data
	 	}
		}


