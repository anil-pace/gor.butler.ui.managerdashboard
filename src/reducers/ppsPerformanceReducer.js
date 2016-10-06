import {PPS_DATA} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */


export  function PPSperformance(state={},action){
	switch (action.type) {
	  case PPS_DATA:
         var res;
         res=action.data;
         if(res.aggregate_data){
          
          }
          console.log("pps detail")
          console.log(action.data)
           return Object.assign({}, state, {
               "ppsPerformance" : action.data
          })

	  default:
	    return state
  }
}