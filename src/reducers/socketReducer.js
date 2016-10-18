import {WS_SUCCESS,WS_CONNECTED,WS_ONMESSAGE,WS_INIT,WS_END} from '../constants/appConstants';

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
    case WS_END:
      
      return Object.assign({}, state, {
          "socketConnected": false,      
          "socketAuthorized": false,
          "initDataSent":false
      })      
    case WS_ONMESSAGE:
      // Handshaking and login successful message.
      if(action.data.message === WS_SUCCESS){
          return Object.assign({}, state, {
          "socketAuthorized": true,
          "initDataSent":false
        })
      }
      else{
        return Object.assign({}, state, {
          "socketAuthorized": true,
          "initDataSent":true
        })
      }
    case WS_INIT:
      // Initiate data sending
          return Object.assign({}, state, {
            "socketConnected": true,
            "initDataSent":true
        })
	  default:
	    return state
  }
}