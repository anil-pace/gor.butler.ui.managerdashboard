import {WS_NOTIFICATION_CONNECTED,WS_NOTIFICATION_ONMESSAGE,WS_NOTIFICATION_END} from '../constants/frontEndConstants';


/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function notificationSocketReducer(state={},action){
	switch (action.type) {
	  
	  case WS_NOTIFICATION_CONNECTED:
      return Object.assign({}, state, {
        	"notificationSocketConnected": true
        	
      })
      break;
    case WS_NOTIFICATION_END:
      return Object.assign({}, state, {
          "notificationSocketConnected": false,      
          "notificationSocketAuthorized": false
      })    
      break;  
    case WS_NOTIFICATION_ONMESSAGE:
      // Handshaking and login successful message.
          return Object.assign({}, state, {
          "dummy": true
        })
      break;
	  default:
	    return state
  }
}