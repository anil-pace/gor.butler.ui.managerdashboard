import {PPS_PERFORMANCE} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
function processHistogramData(data) {
var graphData = [],barData = {},j = 0;
var startIndex = data[0].start_time - 9;
var endIndex  = data[data.length - 1].start_time - 9;
for (var i = 0; i < startIndex; i++) {
  barData.timeInterval = (9 + i)%24
  barData.put = 0;
  barData.pick = 0;
  barData.audit = 0;
  graphData.push(barData);
  barData = {};
}
for (var i = startIndex; i < endIndex; i++) {
  barData.timeInterval = (9 + i)%24
  barData.put = data[j].items_put || 0;
  barData.pick = data[j].orders_completed;
  barData.audit = data[j].items_audited;
  graphData.push(barData);
  j++; 
  barData = {};
}
for (var i = endIndex; i < 24; i++) {
  barData.timeInterval = (9 + i)%24
  barData.put = 0;
  barData.pick = 0;
  barData.audit = 0;
  graphData.push(barData);
  barData = {};
}
  return graphData;
}

export  function PPSperformance(state={},action){
	switch (action.type) {
	  case PPS_PERFORMANCE:
         var res;
         res=action.data;
         if(res.aggregate_data){
          //var histData = processHistogramData(res.aggregate_data)
          }
           return Object.assign({}, state, {
               "ppsPerformance" : action.data
          })

	  default:
	    return state
  }
}