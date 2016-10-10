import {PPS_DATA,PARSE_PPS} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */


export  function PPSperformance(state={},action){
  
	switch (action.type) {
	  case PARSE_PPS:
    console.log("pps detail")
          console.log(action.data)
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