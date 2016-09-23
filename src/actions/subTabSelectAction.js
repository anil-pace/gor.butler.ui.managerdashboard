import { SUB_TAB_SELECTED } from '../constants/appConstants'

export function subTabSelected(data){
	return {
		type: SUB_TAB_SELECTED,
		data
  	}
}

