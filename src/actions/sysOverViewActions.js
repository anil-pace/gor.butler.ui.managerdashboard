import { ZONE_DATA } from '../constants/frontEndConstants'

export function recieveSysOverViewData(data){
	return {
		type: ZONE_DATA,
		data
  	}
}