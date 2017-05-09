import { AJAX_CALL ,ORDER_RECIEVED, STATUS_FILTER, TIME_FILTER, GET_PAGE_SIZE_ORDERS,GET_CURRENT_PAGE_ORDERS,GET_PAGE_SIZE_AUDIT,GET_CURRENT_PAGE_AUDIT,GET_LAST_REFRESH_TIME, SET_CURRENT_PAGE_SIZE} from '../constants/frontEndConstants'

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

export function getPageSizeOrders(data) {
  return {
    type: GET_PAGE_SIZE_ORDERS,
    data
  }
}

export function currentPageOrders(data) {
  return {
    type: GET_CURRENT_PAGE_ORDERS,
    data
  }
}


export function lastRefreshTime(data) {
  return {
    type: GET_LAST_REFRESH_TIME,
    data
  }
}



