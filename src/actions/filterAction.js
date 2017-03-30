import { SHOW_FILTER ,IS_FILTER_APPLIED,BUTLER_FILTER_STATE,CHARGINGSTATION_FILTER_STATE,PPS_FILTER_STATE,WAVE_FILTER_STATE,USER_FILTER_STATE,TOGGLE_BUTTON,TOGGLE_BUTTON_BOT,PPS_FILTER_VALUE,CHARGING_FILTER_VALUE,WAVE_FILTER_VALUE,USER_FILTER_VALUE} from '../constants/frontEndConstants'

//This action is use to update the filter state
export function showTableFilter(data){
	return {
		type: SHOW_FILTER,
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
