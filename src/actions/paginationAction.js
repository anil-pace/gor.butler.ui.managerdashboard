import { AJAX_CALL ,ORDER_RECIEVED} from '../constants/appConstants'

export function getPageData(params){
	return {
    type: AJAX_CALL,
    params
  }
}


export function recieveOrdersData(data) {
	return {
    type: ORDER_RECIEVED,
    data
  }

}

