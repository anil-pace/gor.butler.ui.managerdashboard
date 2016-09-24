import { TAB_SELECTED } from '../constants/appConstants'

export function tabSelected(data){
	return {
		type: TAB_SELECTED,
		data
  	}
}

