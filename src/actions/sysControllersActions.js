import { CONTROLLER_DATA } from '../constants/frontEndConstants'

export function recieveControllerData(data){
	return {
		type: CONTROLLER_DATA,
		data
  	}
}