import {MSU_DATA,GET_PENDING_MSU, MSU_CONFIGURATION_REFRESHED} from '../constants/frontEndConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function msuInfo(state={},action){
  switch (action.type) {
    
    case MSU_DATA:
         let msuData={},totalCount;
         //totalCount=processPPSData(action.data);
         // msuData.totalPut=totalCount.totalPut;
         // msuData.totalAudit=totalCount.totalAudit;
         // msuData.totalPick=totalCount.totalPick;

        return Object.assign({}, state, {
            "msuData" : msuData
        });
        break; 

    // case MSU_CONFIGURATION_REFRESHED:
    //     return Object.assign({}, state, {
    //         "msuRefreshed": action.data
    //     });
    //     break;
    
    default:
      return state
  }
}

// function processPPSData(response){
//       var aggData=response["aggregate_data"] || [],
//       totalPut=0,totalAudit=0,totalPick=0;
//       for(let i=0; i < aggData.length ; i++ ){
//         if(aggData[i].hasOwnProperty("pps_mode") && aggData[i]["pps_mode"]=== "put" && aggData[i]["active"]){
//               totalPut++;
//         }
//         else if(aggData[i].hasOwnProperty("pps_mode") && aggData[i]["pps_mode"]=== "audit" && aggData[i]["active"]){
//             totalAudit++;
//         }
//         else if(aggData[i].hasOwnProperty("pps_mode") && aggData[i]["pps_mode"]=== "pick" && aggData[i]["active"]){
//             totalPick++;
//         }        
//       }
//       return {
//         "totalPut":totalPut,
//         "totalAudit" : totalAudit,
//         "totalPick": totalPick
//       }
// }