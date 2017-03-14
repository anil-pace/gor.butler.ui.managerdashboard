
import { DISPLAY_SPINNER,DISPLAY_WAVES_SPINNER,DISPLAY_BUTLER_SPINNER,DISPLAY_PPS_SPINNER,
	DISPLAY_CHARGING_STATION_SPINNER,DISPAY_RESOLVE_AUDIT_SPINNER,DISPLAY_SAFETY_SPINNER} from '../constants/frontEndConstants';

export function displaySpinner(data){
	
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

export function setButlerSpinner(data) {
	return {
		type: DISPLAY_BUTLER_SPINNER,
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

export function setResolveAuditSpinner(data) {
	return {
		type: DISPAY_RESOLVE_AUDIT_SPINNER,
		data
	}
}

export function setSafetySpinner(data){
	return {
		type: DISPLAY_SAFETY_SPINNER,
		data
	}
}