
import { INVENTORY_DATA_TODAY,DISPLAY_INVENTORY_HISTORY,INVENTORY_DATA_HISTORY,DISPLAY_INVENTORY_SPINNER} from '../constants/frontEndConstants'


export function receiveInventoryTodayData(data){
  return {
    type:INVENTORY_DATA_TODAY,
    data
  }
}
export function receiveInventoryHistoryData(data){
  return {
    type:INVENTORY_DATA_HISTORY,
    data
  }
}
 /**
  * Action to set inventory spinner on/off
  */
 export function setInventorySpinner(data){
  return{
    type:DISPLAY_INVENTORY_SPINNER,
    data
  }
 }
 export function setInventoryDate(data){
  return{
    type:DISPLAY_INVENTORY_HISTORY,
    data
  }
 }
