import { TABLE_STATE } from '../constants/frontEndConstants'

export function currentTableState(data){
	return {
		type: TABLE_STATE,
		data
  	}
}
