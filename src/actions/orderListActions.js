import { DISPLAY_ORDER_LIST_SPINNER } from '../constants/appConstants'

export function setOrderListSpinner(data){
  return {
    type: DISPLAY_ORDER_LIST_SPINNER,
    data
  }
}