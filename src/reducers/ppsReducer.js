import {PPS_DATA} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function ppsInfo(state={},action){
  switch (action.type) {
    case PPS_DATA:
         var pick = 0, put = 0, audit = 0, inactive = 0,res;
         res=action.data;
         if(res.data){
          res.data.map(function(key, index){
                            if(key.pps_mode == 'pick'){
                                pick++;
                            }else if(key.pps_mode == 'put'){
                                put++;
                            }else if(key.pps_mode == 'audit'){
                                audit++;
                            }
                            if(key.pps_active == false){
                                inactive++;
                            }
                            var key = {
                                "id" : key.pps_id,
                                "mode" : key.pps_mode
                            }                            
                        })
        }
                        var ppsData= {
                            "pick" : pick,
                            "put": put,
                            "audit" : audit,
                            "inactive" : inactive
                        }
        return Object.assign({}, state, {
            "ppsData" : ppsData
        })

    default:
      return state
  }
}