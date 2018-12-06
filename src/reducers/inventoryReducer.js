
import {INVENTORY_DATA_HISTORY,INVENTORY_HISTORY_DAYS_COUNT,
  DISPLAY_INVENTORY_HISTORY,INVENTORY_DATA_TODAY,
  CATEGORY_COLOR_MAP,
  INVENTORY_REFRESHED} from '../constants/frontEndConstants';
import moment from 'moment-timezone';


/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
 function parseInvData(state,action){
  //Parsing logic goes here
  var inventoryObj,invObj,parsedDate,historyClosingStock,
  dateToday,noData,todayCurrentStock,dataObj={},
  inventory,dateTodayState,stateObj,hasDataChanged,
  isHistory,categoryData,recreatedData,timeZone;
  
  isHistory=(action.type=== INVENTORY_DATA_HISTORY ? "inventoryDataHistory" : "inventoryDataToday")
  
  /*Cannot use object.assign as it does not support deep cloning*/
  inventoryObj=JSON.parse(JSON.stringify(action.data));
  stateObj=JSON.parse(JSON.stringify(state));
  hasDataChanged=stateObj.hasDataChanged ? false : true;
  noData=stateObj.noData ;
  historyClosingStock = stateObj.historyClosingStock || 0;
  todayCurrentStock =  stateObj.todayCurrentStock || 0;
  recreatedData=stateObj.recreatedData?JSON.parse(JSON.stringify(stateObj.recreatedData)):{};
  dateTodayState=stateObj.dateTodayState || null;
  inventory=inventoryObj.complete_data;
  timeZone = sessionStorage.getItem("timeOffset");

  if(isHistory=== "inventoryDataToday" ){
    invObj=inventory[0];
    invObj["current_stock"]=(invObj["opening_stock"] + invObj["items_put"])-invObj["items_picked"] - (invObj["exception_qty"] || 0);
    invObj.unusedSpace=100 - invObj["warehouse_utilization"];
    invObj.colorCode=CATEGORY_COLOR_MAP[CATEGORY_COLOR_MAP.length -1];
    categoryData=invObj["category_data"];
    for(let j=0,len2=categoryData.length ; j < len2 ; j++){
      categoryData[j].colorCode=CATEGORY_COLOR_MAP[j] || CATEGORY_COLOR_MAP[CATEGORY_COLOR_MAP.length -1];
      
    }

    
    let parseDtInMS,invDate,actualDate ;
    actualDate = invObj.date;
    invDate = moment(invObj.date).tz(timeZone).format("YYYY-MM-DD");
    invObj.date=invDate;
    invObj.dateinMS = moment(actualDate).tz(timeZone).valueOf();
    parsedDate=invDate;
    parseDtInMS=moment(actualDate).tz(timeZone).valueOf();
    recreatedData[parseDtInMS]={};
    recreatedData[parseDtInMS].otherInfo=invObj;
    dateToday=parsedDate;
    dateTodayState=parseDtInMS

    dataObj.xAxisData=Math.random()+"_"+moment(actualDate).tz(timeZone).format("DD");
    dataObj.yAxisData=invObj.current_stock ;
    dataObj.items_picked=invObj.items_picked;
    dataObj.items_put=invObj.items_put;
    dataObj.date=parsedDate;
    dataObj.customData=parseDtInMS;
    recreatedData[parseDtInMS].graphInfo=dataObj;
    todayCurrentStock = invObj.current_stock;

  }
  else if(isHistory !== "inventoryDataToday"){
    dateToday = moment(stateObj.dateTodayState).tz(timeZone).format("YYYY-MM-DD");
    
    for(let i=0,k=0; k < INVENTORY_HISTORY_DAYS_COUNT ; k++){
      dateToday=moment(dateToday).subtract(1,"days").format("YYYY-MM-DD")
      invObj=inventory[i] ? inventory[i] : {};
      
      let invDate = moment(invObj.date).tz(timeZone).format("YYYY-MM-DD");
      let emptyData=(invDate === dateToday ? false : true);
      let histDate=!emptyData ? moment(invDate).tz(timeZone).valueOf() : moment(dateToday).tz(timeZone).valueOf();
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
        dataObj.xAxisData=!emptyData ? Math.random()+"_"+invDate.split("-")[2] : Math.random()+"_"+dateToday.split("-")[2];
        dataObj.items_picked=!emptyData ? invObj.items_picked : 0;
        dataObj.items_put=!emptyData ? invObj.items_put : 0;
        dataObj.yAxisData=!emptyData ? (invObj.current_stock || 0) : 0;
        dataObj.date=!emptyData ? invDate : dateToday;
        dataObj.customData=histDate ;
        recreatedData[histDate].graphInfo=dataObj;
        historyClosingStock+= invObj.current_stock 
        
        !emptyData ? i++ : i
    }
    
  }
  noData=((historyClosingStock + todayCurrentStock) > 0 ? false :true) ;



  return Object.assign({}, state, {
    "recreatedData": recreatedData || null,
    "dateTodayState" : dateTodayState || null,
    "hasDataChanged":hasDataChanged,
    historyClosingStock,
    todayCurrentStock,
    noData

  })

}
function displayHistorySnapShot(state,action){
  var selectedData,hasDataChanged=state.hasDataChanged;
    selectedData=state.recreatedData[action.data] ? state.recreatedData[action.data].otherInfo : {};
    hasDataChanged=state.hasDataChanged? false : true;

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