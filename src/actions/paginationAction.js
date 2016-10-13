import { AJAX_CALL ,ORDER_RECIEVED, STATUS_FILTER, TIME_FILTER} from '../constants/appConstants'

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


export function getStatusFilter(data) {
	return {
    type: STATUS_FILTER,
    data
  }

}


export function getTimeFilter(data) {
	return {
    type: TIME_FILTER,
    data
  }

}

