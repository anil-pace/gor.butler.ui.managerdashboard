import {HISTOGRAM_DATA} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
function processHistogramData(data) {
var graphData = [],getData = {},j = 0;
var startIndex = data[0].start_time - 9;
var endIndex  = data[data.length - 1].start_time - 9;
for (var i = 0; i < startIndex; i++) {
  getData.timeInterval = (9 + i)%24
  getData.put = 0;
  getData.pick = 0;
  getData.audit = 0;
  graphData.push(getData);
  getData = {};
}
for (var i = startIndex; i < endIndex; i++) {
  getData.timeInterval = (9 + i)%24
  getData.put = data[j].items_put || 0;
  getData.pick = data[j].orders_completed;
  getData.audit = data[j].items_audited;
  graphData.push(getData);
  j++; 
  getData = {};
}
for (var i = endIndex; i < 24; i++) {
  getData.timeInterval = (9 + i)%24
  getData.put = 0;
  getData.pick = 0;
  getData.audit = 0;
  graphData.push(getData);
  getData = {};
}
  return graphData;
}

export  function histogramData(state={},action){
	switch (action.type) {
	  case HISTOGRAM_DATA:
         var res;
         res=action.data;
         if(res.aggregate_data){
          var histData = processHistogramData(res.aggregate_data)
          }
           return Object.assign({}, state, {
               "histData" : histData
          })

	  default:
	    return state
  }
}