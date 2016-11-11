import { TABLE_STATE } from '../constants/appConstants'

export function currentTableState(data){
	return {
		type: TABLE_STATE,
		data
  	}
}
