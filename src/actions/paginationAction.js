import { AJAX_CALL ,ORDER_RECIEVED, STATUS_FILTER, TIME_FILTER, GET_PAGE_SIZE,GET_CURRENT_PAGE,GET_LAST_REFRESH_TIME} from '../constants/appConstants'

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

export function getPageSize(data) {
  return {
    type: GET_PAGE_SIZE,
    data
  }
}

export function currentPage(data) {
  return {
    type: GET_CURRENT_PAGE,
    data
  }
}

export function lastRefreshTime(data) {
  return {
    type: GET_LAST_REFRESH_TIME,
    data
  }
}

