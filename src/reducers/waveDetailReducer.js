import {ORDERS_DATA} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */

function processWaveData(data) {
  var waveData = [], waveDetail = {};
  if(data) {
     for (var i =data.length - 1; i >= 0; i--) {
      waveDetail = {};
      waveDetail.waves = "WAVE-" + data[i].wave_id;
      waveDetail.status = data[i].status;
      if(data[i].start_time === "") {
        waveDetail.startTime = "--";
      }
      else {
        waveDetail.startTime = data[i].start_time;
      }

      if(data[i].cut_off_time === "") {
        waveDetail.cutOffTime = "--";
      }
      else {
        waveDetail.cutOffTime = data[i].cut_off_time;
      }
      waveDetail.cutOffTime = data[i].cut_off_time;
      waveDetail.ordersToFulfill = data[i].orders_to_fulfill;
      waveDetail.totalOrders = data[i].total_orders;
      if(waveDetail.totalOrders) {
        waveDetail.progress = parseInt(((waveDetail.totalOrders-waveDetail.ordersToFulfill)/waveDetail.totalOrders)*100);
      }
      else {
        waveDetail.progress = 0;
      }
      waveData.push(waveDetail);
     }
  }
  return waveData;
}

export  function waveInfo(state={},action){
  switch (action.type) {
    case ORDERS_DATA:
          var res=action.data, waveData;
          if(res.complete_data){
            waveData = processWaveData(res.complete_data)
            console.log(waveData);
            return Object.assign({}, state, {
            "waveData" : waveData
            })
          }

    default:
      return state
  }
} 


