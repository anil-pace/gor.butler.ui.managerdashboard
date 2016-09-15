import {WS_CONNECT,WS_SUCCESS,WS_DISCONNECT,WS_CONNECTED,WS_ONMESSAGE,WS_ONSEND,WS_URL,WS_INIT} from '../constants/appConstants';
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
      // Handshaking and login successful message.
      if(action.data.message === WS_SUCCESS){
          return Object.assign({}, state, {
          "socketAuthorized": true,
          "initDataSent":false
        })
      }
      break;
    case WS_INIT:
      // Initiate data sending
          return Object.assign({}, state, {
            "socketConnected": true,
            "initDataSent":true
        })
      break;
	  default:
	    return state
  }
}