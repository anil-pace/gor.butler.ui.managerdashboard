import {WS_CONNECT,WS_DISCONNECT,WS_ONMESSAGE,WS_ONSEND,WS_URL} from '../constants/appConstants'
import {socketMiddleware} from '../middleware/socketMiddleware'

/**
 * @return {[type]}
 */
function openWsConnection(params){
	return (dispatch) => {
    	return dispatch({type: params.type})
    }
  
}


export function setWsAction(params){
	return (dispatch) => {
      return dispatch(openWsConnection(params))
    
  }
}