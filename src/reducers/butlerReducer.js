import {BUTLERS_DATA, PARSE_BUTLERS} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function butlersInfo(state={},action){
	switch (action.type) {
	  case BUTLERS_DATA:
         var count_active= 0,res;
         res=action.data;
         var butlersKey = {"active" : 0, "inactive": 0};
            if(res.aggregate_data) {  
              butlersKey = {
               "active" : action.data.aggregate_data.count_active,
               "inactive": action.data.aggregate_data.count_inactive
             
           }
         }
           return Object.assign({}, state, {
               "butlersData" : butlersKey
          })

	  default:
	    return state
  }
}


