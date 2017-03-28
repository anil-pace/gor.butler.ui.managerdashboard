import { SHOW_FILTER ,IS_FILTER_APPLIED,BUTLER_FILTER_STATE,CHARGINGSTATION_FILTER_STATE,PPS_FILTER_STATE,WAVE_FILTER_STATE,USER_FILTER_STATE,TOGGLE_BUTTON,TOGGLE_BUTTON_BOT,PPS_FILTER_VALUE,CHARGING_FILTER_VALUE,WAVE_FILTER_VALUE,USER_FILTER_VALUE} from '../constants/frontEndConstants'

export function showTableFilter(data){
	return {
		type: SHOW_FILTER,
		data
  	}
}

export function filterApplied(data){
	return {
		type: IS_FILTER_APPLIED,
		data
  	}
}
export function toggleBotButton(data){
	return {
		type: TOGGLE_BUTTON_BOT,
		data
  	}
}
export function togglePPSFilter(data){
	return {
		type: PPS_FILTER_VALUE,
		data
  	}
}

export function toggleWaveFilter(data){
	return {
		type: WAVE_FILTER_VALUE,
		data
  	}
}

export function toggleUesrFilter(data){
	return {
		type: USER_FILTER_VALUE,
		data
  	}
}

export function toggleChargingFilter(data){
	return {
		type: CHARGING_FILTER_VALUE,
		data
  	}
}

export function butlerfilterState(data){
	return {
		type: BUTLER_FILTER_STATE,
		data
  	}
}

export function chargingstationfilterState(data){
	return {
		type: CHARGINGSTATION_FILTER_STATE,
		data
  	}
  }
export function ppsfilterState(data){
	return {
		type: PPS_FILTER_STATE,
		data
  	}

}
export function wavefilterState(data){
	return {
		type: WAVE_FILTER_STATE,
		data
  	}

}

export function userfilterState(data){
	return {
		type: USER_FILTER_STATE,
		data
  	}

}
