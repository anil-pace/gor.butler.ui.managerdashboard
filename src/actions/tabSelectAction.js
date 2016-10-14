import { TAB_SELECTED ,PREV_TAB_SELECTED,SUB_TAB_SELECTED} from '../constants/appConstants'

export function tabSelected(data){
	return {
		type: TAB_SELECTED,
		data
  	}
}

export function prevTabSelected(data){
	return {
		type: PREV_TAB_SELECTED,
		data
  	}
}



export function subTabSelected(data){
	return {
		type: SUB_TAB_SELECTED,
		data
  	}
}

