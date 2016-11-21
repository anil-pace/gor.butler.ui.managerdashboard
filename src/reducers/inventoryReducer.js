import {INVENTORY_DATA_HISTORY,DISPLAY_INVENTORY_HISTORY,INVENTORY_DATA_TODAY,PARSE_INVENTORY_TODAY,CATEGORY_COLOR_MAP,CATEGORY_DEFAULT,CATEGORY_UNUSED,PARSE_INVENTORY_HISTORY } from '../constants/frontEndConstants';
import * as mockData from '../../mock/mockDBData'


/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
 function parseInvData(state,action){
  //Parsing logic goes here
  var inventoryObj,inventory,currentDate,stateObj,hasDataChanged,isHistory,completeData,categoryData,calculatedInvData={};
  var recreatedData=state.recreatedData ? JSON.parse(JSON.stringify(state.recreatedData)) : {};
  isHistory = (action.type === INVENTORY_DATA_HISTORY ? "inventoryDataHistory" : "inventoryDataToday")
  
  /*Cannot use object.assign as it does not support deep cloning*/
  inventoryObj = JSON.parse(JSON.stringify(action.data));
  stateObj = JSON.parse(JSON.stringify(state));
  hasDataChanged = stateObj.hasDataChanged === 0 ? 1 : 0;
  
  inventory = inventoryObj.complete_data

  for(let i = 0 ,len=inventory.length; i < len ; i++){
    inventory[i]["current_stock"] = (inventory[i]["opening_stock"] + inventory[i]["items_put"])-inventory[i]["items_picked"]
    calculatedInvData.unusedSpace = 100 - inventory[i]["warehouse_utilization"];
    calculatedInvData.colorCode = CATEGORY_COLOR_MAP[CATEGORY_COLOR_MAP.length -1];
    categoryData = inventory[i]["category_data"];
    for(let j = 0,len2=categoryData.length ; j < len2 ; j++){
      categoryData[j].colorCode = CATEGORY_COLOR_MAP[j] || CATEGORY_COLOR_MAP[CATEGORY_COLOR_MAP.length -1]
    }
    categoryData.push(calculatedInvData);
    recreatedData[Date.parse(inventory[i].date)] = inventory[i];
  }
  //Adding the inventory today to inventory history
  if(state.inventoryDataToday && state.inventoryDataToday.length){
      //currentDate = state.inventoryDataToday[0]
      inventory.unshift(state.inventoryDataToday[0]);
      recreatedData[Date.parse(inventory[0].date)] = inventory[0];
      currentDate = state.currentDate;
  }
  else{
    currentDate = Date.parse(inventory[0].date)
  }

  
  return Object.assign({}, state, {

    [isHistory] : inventory || null,
    "recreatedData": recreatedData || null,
    "currentDate" : currentDate || null,
    "hasDataChanged":hasDataChanged

  })

}
function displayHistorySnapShot(state,action){
  var selectedData;
  if(state.currentDate !== action.data){
    selectedData = state.recreatedData[action.data]
  }

  return Object.assign({}, state, {
    "inventoryDataPrevious": selectedData || null,
    "isPrevDateSelected":selectedData ? true : false
  })
}
export  function inventoryInfo(state={},action){
  switch (action.type) {
    case INVENTORY_DATA_HISTORY:
    case INVENTORY_DATA_TODAY:

    return parseInvData(state, action);
    case DISPLAY_INVENTORY_HISTORY:
    return displayHistorySnapShot(state,action)

    default:
    return state
  }
}