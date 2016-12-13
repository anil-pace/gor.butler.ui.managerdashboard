import {THROUGHPUT_DATA} from '../constants/frontEndConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function throughputInfo(state={},action){
  switch (action.type) {
    case THROUGHPUT_DATA:
          var put_throughput,pick_throughput,audit_throughput,res,throughput_data={};
          res=action.data;
          if(res.aggregate_data){
              put_throughput=res.aggregate_data.put_throughput ? Math.round(parseFloat(res.aggregate_data.put_throughput)) : 0;
              pick_throughput=res.aggregate_data.pick_throughput ? Math.round(parseFloat(res.aggregate_data.pick_throughput)) : 0;
              audit_throughput= res.aggregate_data.audit_throughput ? Math.round(parseFloat(res.aggregate_data.audit_throughput)) : 0;
          }
          throughput_data={
            put_throughput:put_throughput,
            pick_throughput:pick_throughput,
            audit_throughput:audit_throughput
          }
          return Object.assign({}, state, {
            "throughputData" : throughput_data
          })

    default:
      return state
  }
}