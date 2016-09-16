import {THROUGHPUT_DATA} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function throughputInfo(state={},action){
  switch (action.type) {
    case THROUGHPUT_DATA:
          var put_thoughput=0,pick_thoughput=0,audit_thoughput=0,res,throughput_data={};
          res=action.data;
          if(res.aggregate_data){
            if(res.aggregate_data.put_thoughput)
              put_thoughput=parseInt(res.aggregate_data.put_thoughput);
            if(res.aggregate_data.pick_thoughput)
              pick_thoughput=parseInt(res.aggregate_data.pick_thoughput);
            if(res.aggregate_data.audit_thoughpu)
              audit_thoughput=parseInt(res.aggregate_data.audit_thoughput);
          }
          throughput_data={
            put_thoughput:put_thoughput,
            pick_thoughput:pick_thoughput,
            audit_thoughput:audit_thoughput
          }
          return Object.assign({}, state, {
            "throughput" : throughput_data
          })

    default:
      return state
  }
}