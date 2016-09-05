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
        if(action.data.resource_type === "PPS"){
            return Object.assign({}, state, {
            
            "ppsData" : action.data
        })
        }
        else{
          return Object.assign({}, state, {
            "socketConnected": true,
            "initDataSent":true,
            "socketData" : action.data
        })
        }
      }
      //need to change this hard coded value
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