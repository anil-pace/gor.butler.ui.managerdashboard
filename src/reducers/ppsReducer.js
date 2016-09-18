import {PPS_DATA} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function ppsInfo(state={},action){
  switch (action.type) {
    case PPS_DATA:
         let ppsData={};
         ppsData.totalPut  = processPPSData(action.data);
         processPPSData(action.data);
        return Object.assign({}, state, {
            "ppsData" : ppsData
        })

    default:
      return state
  }
}

function processPPSData(response){
      var aggData = response["aggregate_data"] || [],
      totalPut = 0;
      for(let i = 0; i < aggData.length ; i++ ){
        if(aggData[i].hasOwnProperty("pps_mode") && aggData[i]["pps_mode"] === "put"){
          totalPut++;
        }
      }
      return totalPut
}