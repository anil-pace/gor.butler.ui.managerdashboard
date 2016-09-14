import {BUTLERS_DATA} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function butlersInfo(state={},action){
	switch (action.type) {
	  case BUTLERS_DATA:
	    //state.selectedAction = action.type;
	    //window.localStore.setItem('auth_token',action.data.auth_token)
         var pick_or_put = 0, audit = 0, idle = 0, dead = 0, charging= 0,res;
         res=action.data;
         if(res.data){
                        res.data.map(function(key, index){
                           
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
          }
                        var botKey = {
                            "Pick / Put" : pick_or_put,
                            "Audit": audit,
                            "Charging" : charging,
                            "Inactive" : dead,
                            "Idle" : idle
                        }
           // console.log("Butlers Data");
           // console.log(botKey);
           return Object.assign({}, state, {
               "butlersData" : botKey
          })

	  default:
	    return state
  }
}