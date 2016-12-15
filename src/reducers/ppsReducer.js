import {PPS_DATA} from '../constants/frontEndConstants';
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
         ppsData.totalPick =totalCount.totalPick;

        return Object.assign({}, state, {
            "ppsData" : ppsData
        })

    default:
      return state
  }
}

function processPPSData(response){
      var aggData = response["aggregate_data"] || [],
      totalPut = 0,totalAudit = 0,totalPick=0;
      for(let i = 0; i < aggData.length ; i++ ){
        if(aggData[i].hasOwnProperty("pps_mode") && aggData[i]["pps_mode"] === "put" && aggData[i]["active"]){
              totalPut++;
        }
        else if(aggData[i].hasOwnProperty("pps_mode") && aggData[i]["pps_mode"] === "audit" && aggData[i]["active"]){
            totalAudit++;
        }
        else if(aggData[i].hasOwnProperty("pps_mode") && aggData[i]["pps_mode"] === "pick" && aggData[i]["active"]){
            totalPick++;
        }        
      }
      return {
        "totalPut":totalPut,
        "totalAudit" : totalAudit,
        "totalPick": totalPick
      }
}