import {BUTLERS_DATA} from '../constants/frontEndConstants';
import {PARSE_BUTLERS} from '../constants/backEndConstants'
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function butlersInfo(state={},action){
	switch (action.type) {
	  case BUTLERS_DATA:
         var res;
         res=action.data;
         var butlersKey = {"active" : 0, "inactive": 0};
            if(res.aggregate_data) {  
              butlersKey = {
               "active" : Number(action.data.aggregate_data.active_butlers),
               "inactive": Number(action.data.aggregate_data.inactive_butlers)
             
           }
         }
           return Object.assign({}, state, {
               "butlersData" : butlersKey
          })

	  default:
	    return state
  }
}


