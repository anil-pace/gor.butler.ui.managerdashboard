import {HISTOGRAM_DATA} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
function processHistogramData(data) {
  console.log(data);
  var histData=[{
    "timeInterval": "09:00 10:00",
    "put": 0, "pick" : 0, "audit" : 0
}, {
    "timeInterval": "10:00 11:00",
  "put": 0, "pick" : 0, "audit" : 0
}, {
  "timeInterval": "11:00 12:00",
  "put": 0, "pick" : 0, "audit" : 0
}, {
  "timeInterval": "12:00 13:00",
  "put": 0, "pick" : 0, "audit" : 0
}, {
  "timeInterval": "13:00 14:00",
  "put": 0, "pick" : 0, "audit" : 0
}, {
  "timeInterval": "14:00 15:00",
  "put": 0, "pick" : 0, "audit" : 0
}, {
  "timeInterval": "15:00 16:00",
  "put": 0, "pick" : 0, "audit" : 0
}, {
  "timeInterval": "16:00 17:00",
  "put": 0, "pick" : 0, "audit" : 0
}, {
  "timeInterval": "17:00 18:00",
  "put": 0, "pick" : 0, "audit" : 0
}, {
  "timeInterval": "18:00 19:00",
  "put": 0, "pick" : 0, "audit" : 0
}, {
  "timeInterval": "19:00 20:00",
  "put": 0, "pick" : 0, "audit" : 0
}, {
  "timeInterval": "20:00 21:00",
  "put": 0, "pick" : 0, "audit" : 0
}, {
  "timeInterval": "21:00 22:00",
  "put": 0, "pick" : 0, "audit" : 0
}, {
  "timeInterval": "22:00 23:00",
  "put": 0, "pick" : 0, "audit" : 0
}, {
  "timeInterval": "23:00 00:00",
  "put": 0, "pick" : 0, "audit" : 0
}, {
  "timeInterval": "00:00 01:00",
  "put": 0, "pick" : 0, "audit" : 0
}, {
  "timeInterval": "01:00 02:00",
  "put": 0, "pick" : 0, "audit" : 0
}, {
  "timeInterval": "02:00 03:00",
  "put": 0, "pick" : 0, "audit" : 0
}, {
  "timeInterval": "03:00 04:00",
  "put": 0, "pick" : 0, "audit" : 0
}, {
  "timeInterval": "04:00 05:00",
  "put": 0, "pick" : 0, "audit" : 0
}, {
  "timeInterval": "05:00 06:00",
  "put": 0, "pick" : 0, "audit" : 0
}, {
  "timeInterval": "06:00 07:00",
  "put": 0, "pick" : 0, "audit" : 0
}, {
  "timeInterval": "07:00 08:00",
  "put": 0, "pick" : 0, "audit" : 0
}, {
  "timeInterval": "08:00 09:00",
  "put": 0, "pick" : 0, "audit" : 0
}];
for (var i = data.length - 1; i >= 0; i--) {
  var index = data[i].start_time - 9;
  histData[index].put = data[i].items_put;
  histData[index].pick = data[i].orders_completed;
  histData[index].audit = data[i].items_audited;
}
  return histData;
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