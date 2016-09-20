import {PUT_DATA} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function putInfo(state={},action){
  switch (action.type) {
    case PUT_DATA:
          let putObj={},
          res = action.data,
          totalPut = 5;//state.ppsInfo.ppsData.totalPut;
          
          if(res.aggregate_data){

              if(!res.aggregate_data.items_put){
                putObj.value = "None";
                putObj.heading = "Items to Stock"
                putObj.low="Offline"
              }
              else{
                putObj.value = res.aggregate_data.items_put;
                putObj.low= totalPut ? totalPut+ "PPS stocking 342 items/hr" : "Starting...";
              }
              putObj.count_complete=res.aggregate_data.count_complete;
              putObj.heading = "Items to Stock";
              putObj.logo = "iStock";
            

          }
          return Object.assign({}, state, {
            "putData" : putObj
          })

    default:
      return state
  }
}