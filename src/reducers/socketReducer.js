import {WS_CONNECT,WS_DISCONNECT,WS_CONNECTED,WS_ONMESSAGE,WS_ONSEND,WS_URL} from '../constants/appConstants';
import {WsParse} from '../utilities/WsMsgParser';
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
        return WsParse(state,action.data);
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