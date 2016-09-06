import {WS_CONNECT,WS_DISCONNECT,WS_CONNECTED,WS_ONMESSAGE,WS_ONSEND,WS_URL} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function recieveSocketActions(state={},action){
	switch (action.type) {
	  
	  case WS_CONNECTED:
      return Object.assign({}, state, {
        	"socketConnected": true
        	
      })
    case WS_ONMESSAGE:
      if(action.data.resource_type){
        if(action.data.resource_type === "pps"){
         var pick = 0, put = 0, audit = 0, inactive = 0;
         if(action.data.hasOwnProperty('data')){
            console.log('Data found');
         }
         action.data.data.map(function(key, index){
                            if(key.pps_mode == 'pick'){
                                pick = pick + 1;
                            }else if(key.pps_mode == 'put'){
                                put = put + 1;
                            }else if(key.pps_mode == 'audit'){
                                audit = audit + 1
                            }
                            if(key.pps_active == false){
                                inactive = inactive + 1;
                            }
                            var key = {
                                "id" : key.pps_id,
                                "mode" : key.pps_mode
                            }                            
                        })
                        var ppsKey = {
                            "pick" : pick,
                            "put": put,
                            "audit" : audit,
                            "inactive" : inactive
                        }
        console.log(ppsKey);
        return Object.assign({}, state, {
            "ppsData" : ppsKey
        })
        }
         else if(action.data.resource_type === "butlers"){
                        var pick_or_put = 0, audit = 0, idle = 0, dead = 0, charging= 0;
                        action.data.data.map(function(key, index){
                           
                            if(key.status == 'dead' || key.status == 'initializing'){
                                dead = dead + 1
                            }else{
                                if(key.tasktype == 'null' || key.tasktype == 'movetask'){
                                    idle = idle + 1;
                                }else if(key.tasktype == 'picktask'){
                                    pick_or_put = pick_or_put + 1;
                                }else if(key.tasktype == 'audittask'){
                                    audit = audit + 1
                                }else if(key.tasktype == 'chargetask'){
                                    charging = charging + 1
                                }
                            }
                        })
                        var botKey = {
                            "Pick / Put" : pick_or_put,
                            "Audit": audit,
                            "Charging" : charging,
                            "Inactive" : dead,
                            "Idle" : idle
                        }
           console.log("Butlers Data");
           console.log(botKey);
           return Object.assign({}, state, {
               "butlersData" : botKey
          })
         }
        else if(action.data.resource_type === "chargers"){
                        var connected = 0, disconnected = 0;
                        action.data.data.map(function(key, index){
                            if(key.charger_status == 'disconnected' ){
                                disconnected = disconnected + 1;
                            }else if(key.charger_status == 'connected'){
                                connected = connected + 1;
                            }
                        })
                        var chargersKey = {
                            "Connected" : connected,
                            "Disconnected": disconnected
                        }
            console.log("Chargers Data");
            console.log(chargersKey);
            return Object.assign({}, state, {
             "chargersData" : chargersKey
         })
         }
        else if(action.data.resource_type === "orders"){
          var pickData={};
          
          if(action.data.hasOwnProperty('aggregate_data')){
 
            pickData={
              "status":action.data.aggregate_data.status,
              "avg":action.data.aggregate_data.avg_per_hr,
              "count_pending":action.data.aggregate_data.count_pending,
              "eta":action.data.aggregate_data.eta,
              "time_current":action.data.aggregate_data.time_current            
            }
          }
          console.log('Pick data: ');
          console.log(pickData);
            return Object.assign({}, state, {
            "pickData" : pickData
            })
        }

        // else if(action.data.resource_type === "inventory"){
        //     console.log("Inventory Data "+action.data)
        //     return Object.assign({}, state, {
        //     "inventoryData" : action.data
        // })
        // }

        // else if(action.data.resource_type === "put"){
        //     
        //     console.log("Put Data "+action.data)
        //     return Object.assign({}, state, {
        //     "putData" : action.data
        // })
        // }
        // else if(action.data.resource_type === "pick"){
        //     console.log("Pick Data "+action.data)
        //     return Object.assign({}, state, {
        //     "pickData" : action.data
        // })
        // }

        else{
          return Object.assign({}, state, {
            "socketConnected": true,
            "initDataSent":true,
            "socketData" : action.data
        })
        }
      }
      // Handshaking and login successful message.
      else if(action.data.message === "Sucessfully logged in"){
          return Object.assign({}, state, {
          "socketAuthorized": true,
          "initDataSent":false
        })
      }
      break;

	  default:
	    return state
  }
}