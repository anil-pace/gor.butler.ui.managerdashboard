import { 
    FETCH_MSU_CONFIG_LIST, 
    GET_PENDING_MSU, 
    MSU_CONFIGURATION_REFRESHED} 
from '../constants/frontEndConstants';

/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */

export  function msuInfo(state={},action){
  
  switch (action.type) {
    case FETCH_MSU_CONFIG_LIST:
        console.log("==========================>");
        console.log("=======REDUCERS ===========>");
        console.log("FETCH_MSU_CONFIG_LIST" + action.data);
         //let msuData={},totalCount;
         //totalCount=processPPSData(action.data);
         // msuData.totalPut=totalCount.totalPut;
         // msuData.totalAudit=totalCount.totalAudit;
         // msuData.totalPick=totalCount.totalPick;

        return Object.assign({}, state, {
            "msuList" : action.data
        });
        break; 

    case MSU_CONFIGURATION_REFRESHED:
        return Object.assign({}, state, {
            "msuRefreshed": action.data
        });
        break;
    
    default:
      return state
  }
}
