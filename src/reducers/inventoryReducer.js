
import {INVENTORY_DATA_HISTORY,INVENTORY_HISTORY_DAYS_COUNT,
  DISPLAY_INVENTORY_HISTORY,INVENTORY_DATA_TODAY,
  CATEGORY_COLOR_MAP,
  INVENTORY_REFRESHED} from '../constants/frontEndConstants';




/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
 function parseInvData(state,action){
  //Parsing logic goes here
  var inventoryObj,invObj,parsedDate,historyClosingStock=0,dateToday,noData,dataObj={},inventory,dateTodayState,stateObj,hasDataChanged,isHistory,categoryData;
  var recreatedData;
  isHistory=(action.type=== INVENTORY_DATA_HISTORY ? "inventoryDataHistory" : "inventoryDataToday")
  
  /*Cannot use object.assign as it does not support deep cloning*/
  inventoryObj=JSON.parse(JSON.stringify(action.data));
  stateObj=JSON.parse(JSON.stringify(state));
  hasDataChanged=stateObj.hasDataChanged ? false : true;
  noData=stateObj.noData ;
  recreatedData=stateObj.recreatedData?JSON.parse(JSON.stringify(stateObj.recreatedData)):{};
  dateTodayState=stateObj.dateTodayState || null;
  inventory=inventoryObj.complete_data;

  if(isHistory=== "inventoryDataToday" ){
    invObj=inventory[0];
    invObj["current_stock"]=(invObj["opening_stock"] + invObj["items_put"])-invObj["items_picked"]
    invObj.unusedSpace=100 - invObj["warehouse_utilization"];
    invObj.colorCode=CATEGORY_COLOR_MAP[CATEGORY_COLOR_MAP.length -1];
    categoryData=invObj["category_data"];
    for(let j=0,len2=categoryData.length ; j < len2 ; j++){
      categoryData[j].colorCode=CATEGORY_COLOR_MAP[j] || CATEGORY_COLOR_MAP[CATEGORY_COLOR_MAP.length -1];
      
    }

    
    let parseDtInMS ;

    parsedDate=new Date(invObj.date);
    invObj.date=parsedDate.getFullYear() +"-"+(parsedDate.getMonth()+1)+"-"+("0" + parsedDate.getDate()).slice(-2);
    parseDtInMS=new Date(invObj.date).getTime();
    recreatedData[parseDtInMS]={};
    recreatedData[parseDtInMS].otherInfo=invObj;
    dateToday=parsedDate;
    dateTodayState=parseDtInMS

    dataObj.xAxisData=Math.random()+"_"+parsedDate.getDate();
    dataObj.yAxisData=invObj.current_stock ;
    dataObj.items_picked=invObj.items_picked;
    dataObj.items_put=invObj.items_put;
    dataObj.date=parsedDate;
    dataObj.customData=parseDtInMS;
    recreatedData[parseDtInMS].graphInfo=dataObj;
    noData=invObj.current_stock ? false : true;

  }
  else if(isHistory !== "inventoryDataToday"){
    dateToday=new Date(stateObj.dateTodayState) ;
    for(let i=0,k=0; k < INVENTORY_HISTORY_DAYS_COUNT ; k++){
      dateToday=new Date(dateToday.setDate(dateToday.getDate()-1));
      invObj=inventory[i] ? inventory[i] : {};
      let emptyData=(new Date(invObj.date).getDate() === dateToday.getDate() ? false : true);//Object.keys(invObj).length ? false : true;
      let histDate=!emptyData ? Date.parse(invObj.date) : dateToday.getTime();
      invObj["current_stock"]=!emptyData ? (invObj["opening_stock"] + invObj["items_put"])-invObj["items_picked"] : 0;
      invObj.unusedSpace=!emptyData ? (100 - invObj["warehouse_utilization"]) : 100;
      invObj.colorCode=CATEGORY_COLOR_MAP[CATEGORY_COLOR_MAP.length -1];
      categoryData=!emptyData ? invObj["category_data"] : [];

      for(let j=0,len2=categoryData.length ; j < len2 ; j++){
        categoryData[j].colorCode=CATEGORY_COLOR_MAP[j] || CATEGORY_COLOR_MAP[CATEGORY_COLOR_MAP.length -1];
        
      }
      recreatedData[histDate]={};
      recreatedData[histDate].otherInfo=invObj;
      dataObj={};
      let currentDate=new Date(histDate);
        dataObj.xAxisData=Math.random()+"_"+currentDate.getDate();
        dataObj.items_picked=!emptyData ? invObj.items_picked : 0;
        dataObj.items_put=!emptyData ? invObj.items_put : 0;
        dataObj.yAxisData=!emptyData ? (invObj.current_stock || 0) : 0;
        dataObj.date=currentDate;
        dataObj.customData=histDate ;
        recreatedData[histDate].graphInfo=dataObj;
        historyClosingStock+= invObj.current_stock 
        
        !emptyData ? i++ : i
    }
    noData=historyClosingStock ? false : true;
  }




  return Object.assign({}, state, {
    "recreatedData": recreatedData || null,
    "dateTodayState" : dateTodayState || null,
    "hasDataChanged":hasDataChanged,
    noData

  })

}
function displayHistorySnapShot(state,action){
  var selectedData,hasDataChanged=state.hasDataChanged;
    selectedData=state.recreatedData[action.data] ? state.recreatedData[action.data].otherInfo : {};
    hasDataChanged=state.hasDataChanged=== 0 ? 1 : 0;

  return Object.assign({}, state, {
    "inventoryDataPrevious": selectedData || null,
    "isPrevDateSelected":selectedData ? true : false,
    "hasDataChanged":hasDataChanged
  })
}
export  function inventoryInfo(state={},action){
  switch (action.type) {
    case INVENTORY_DATA_HISTORY:
    case INVENTORY_DATA_TODAY:

    return parseInvData(state, action);
    case DISPLAY_INVENTORY_HISTORY:
    return displayHistorySnapShot(state,action)

      case INVENTORY_REFRESHED:
          return Object.assign({}, state, {
              "inventoryRefreshed" : new Date()
          })

    default:
    return state
  }
}