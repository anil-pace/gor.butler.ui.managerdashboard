import {PPS_DATA,PARSE_PPS} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */


export  function PPSperformance(state={},action){
  
	switch (action.type) {
	  case PARSE_PPS:
         var res;
         res=action.data;
         if(res.aggregate_data){
          
          }
          
           return Object.assign({}, state, {
               "ppsPerformance" : action.data
          })

	  default:
	    return state
  }
}