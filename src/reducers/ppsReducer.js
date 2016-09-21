import {PPS_DATA} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function ppsInfo(state={},action){
  switch (action.type) {
    case PPS_DATA:

         let ppsData={},totalCount;
         totalCount = processPPSData(action.data);
         ppsData.totalPut  = totalCount.totalPut;
         ppsData.totalAudit  = totalCount.totalAudit;
         

        return Object.assign({}, state, {
            "ppsData" : ppsData
        })

    default:
      return state
  }
}

function processPPSData(response){
      var aggData = response["aggregate_data"] || [],
      totalPut = 0,totalAudit = 0;
      for(let i = 0; i < aggData.length ; i++ ){
        if(aggData[i].hasOwnProperty("pps_mode") && aggData[i]["pps_mode"] === "put"){
          totalPut++;
        }
        else if(aggData[i].hasOwnProperty("pps_mode") && aggData[i]["pps_mode"] === "audit"){
            totalAudit++;
        }
      }
      return {
        "totalPut":totalPut,
        "totalAudit" : totalAudit
      }
}