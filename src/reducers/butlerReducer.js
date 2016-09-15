import {BUTLERS_DATA} from '../constants/appConstants';
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
         if(res.aggregate_data){
          count_active=res.aggregate_data.count_active;
          }
                        var botKey = {
                            "count_active" : count_active
                        }
           return Object.assign({}, state, {
               "butlersData" : botKey
          })

	  default:
	    return state
  }
}