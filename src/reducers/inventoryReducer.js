import {INVENTORY_DATA_HISTORY,INVENTORY_DATA_TODAY,PARSE_INVENTORY_TODAY,CATEGORY_COLOR_MAP,CATEGORY_DEFAULT,CATEGORY_UNUSED,PARSE_INVENTORY_HISTORY } from '../constants/appConstants';


/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
 function parseInvData(state,action){
  //Parsing logic goes here
  var inventoryObj,inventory,isHistory,invToday,completeData,categoryData,invHistory,calculatedInvData={};

  isHistory = (action.type === INVENTORY_DATA_HISTORY ? "inventoryDataHistory" : "inventoryDataToday")
  
  /*Cannot use object.assign as it does not support deep cloning*/
  inventoryObj = JSON.parse(JSON.stringify(action.data));
  inventory = inventoryObj.complete_data

  for(let i = 0 ,len=inventory.length; i < len ; i++){
    inventory[i]["current_stock"] = (inventory[i]["opening_stock"] + inventory[i]["items_put"])-inventory[i]["items_picked"]
    calculatedInvData.unusedSpace = 100 - inventory[i]["warehouse_utilization"];
    calculatedInvData.colorCode = CATEGORY_COLOR_MAP[CATEGORY_UNUSED];
    categoryData = inventory[i]["category_data"];
    for(let j = 0,len2=categoryData.length ; j < len2 ; j++){
      categoryData[j].colorCode = CATEGORY_COLOR_MAP[categoryData[j]["category_type"]] || CATEGORY_COLOR_MAP[CATEGORY_DEFAULT]
    }
    categoryData.push(calculatedInvData)
  }
  return Object.assign({}, state, {
    [isHistory] : inventory || null
  })

}
export  function inventoryInfo(state={},action){
  switch (action.type) {
    case INVENTORY_DATA_HISTORY:
    case INVENTORY_DATA_TODAY:
    return parseInvData(state,action);

    default:
    return state
  }
}