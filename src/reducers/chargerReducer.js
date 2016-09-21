import {CHARGERS_DATA} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function chargerInfo(state={},action){
	switch (action.type) {
	  case CHARGERS_DATA:
              var connected = 0, disconnected = 0,res;
              res=action.data;
              if(res.data){
                        res.data.map(function(key, index){
                            if(key.charger_status == 'disconnected' ){
                                disconnected = disconnected + 1;
                            }else if(key.charger_status == 'connected'){
                                connected = connected + 1;
                            }
                        })
              }
                        var chargersKey = {
                            "Connected" : connected,
                            "Disconnected": disconnected
                        }
            return Object.assign({}, state, {
            "chargersData" : chargersKey
         })

	  default:
	    return state
  }
}