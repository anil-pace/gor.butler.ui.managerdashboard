import {PPS_DATA} from '../constants/frontEndConstants';
import {PARSE_PPS} from '../constants/backEndConstants'
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
          return Object.assign({}, state, {
               "ppsPerformance" : action.data
          })

          
          }
          
           
	  default:
	    return state
  }
}