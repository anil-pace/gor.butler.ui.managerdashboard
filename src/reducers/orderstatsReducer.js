import {HISTOGRAM_DATA} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
function processHistogramData(data) {
var graphData = [],barData = {},j = 0;
var startIndex = data[0].start_time;
var endIndex  = data[data.length - 1].end_time;
for (var i = 0; i < startIndex; i++) {
  barData.timeInterval = (i)%24
  barData.put = 0;
  barData.pick = 0;
  barData.audit = 0;
  graphData.push(barData);
  barData = {};
}
for (var i = startIndex; i < endIndex; i++) {
  barData.timeInterval = (i)%24
  barData.put = data[j].items_put || 0;
  barData.pick = data[j].items_picked || 0;
  barData.audit = data[j].items_audited || 0;
  graphData.push(barData);
  j++; 
  barData = {};
}
for (var i = endIndex ; i < 24; i++) {
  barData.timeInterval = (i)%24
  barData.put = 0;
  barData.pick = 0;
  barData.audit = 0;
  graphData.push(barData);
  barData = {};
}
  return graphData;
}

export  function histogramData(state={},action){
	switch (action.type) {
	  case HISTOGRAM_DATA:
         var res, histData;
         res=action.data;
         if(res.aggregate_data){
         histData = processHistogramData(res.aggregate_data)
          }
           return Object.assign({}, state, {
               "histData" : histData
          })

	  default:
	    return state
  }
}