import {WS_CONNECTED,WS_ONMESSAGE,WS_END, DATA_SUBSCRIPTION_PACKET} from '../constants/frontEndConstants';


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
      break;
    case WS_END:
      
      return Object.assign({}, state, {
          "socketConnected": false,      
          "socketAuthorized": false,
          "initDataSent":false
      })    
      break;  
    case WS_ONMESSAGE:
      // Handshaking and login successful message.
          return Object.assign({}, state, {
          "socketAuthorized": true,
          "initDataSent":true
        })
      break;

    case DATA_SUBSCRIPTION_PACKET:
      return Object.assign({}, state, {
          "socketDataSubscriptionPacket":action.data 
        })
    break;  
      
	  default:
	    return state
  }
}