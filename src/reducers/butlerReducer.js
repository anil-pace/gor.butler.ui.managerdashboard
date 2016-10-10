import {BUTLERS_DATA} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function butlersInfo(state={},action){
	switch (action.type) {
	  case BUTLERS_DATA:
          console.log("butelr----")
          console.log(action.data)
         var count_active= 0,res;
         res=action.data;
         var butlersKey = {"active" : 0, "inactive": 0};
              
              butlersKey = {
               "active" : action.data.aggregate_data.active_butlers,
               "inactive": action.data.aggregate_data.inactive_butlers
             
           }
           return Object.assign({}, state, {
               "butlersData" : butlersKey
          })

	  default:
	    return state
  }
}