import { SHOW_FILTER } from '../constants/frontEndConstants'

export function showTableFilter(data){
	return {
		type: SHOW_FILTER,
		data
  	}
}

