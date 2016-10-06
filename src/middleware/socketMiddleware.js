import {wsResponseAction,wsOnMessageAction,wsEndConnection} from '../actions/socketActions'
import {WS_CONNECT,WS_DISCONNECT,WS_ONMESSAGE,WS_ONSEND} from '../constants/appConstants'
import {WS_URL} from '../constants/configConstants'
import {ResponseParse} from '../utilities/responseParser';


const socketMiddleware = (function(){ 
  var socket = null;

  const onOpen = (ws,store,token) => evt => {
    //Send a handshake, or authenticate with remote end

    //Tell the store we're connected
    store.dispatch(wsResponseAction(evt.type));
  }

  const onClose = (ws,store) => evt => {
    //Tell the store we've disconnected
    store.dispatch(wsEndConnection());
  }

  const onMessage = (ws,store) => evt => {
    //Parse the JSON message received on the websocket
    var msg = JSON.parse(evt.data);

      ResponseParse(store,msg);    
  }

  return store => next => action => {
    switch(action.type) {

      //The user wants us to connect
      case WS_CONNECT:
        //Start a new connection to the server
        if(socket !== null) {
          socket.close();
        }
        //Send an action that shows a "connecting..." status for now
        //store.dispatch(actions.connecting());

        //Attempt to connect (we could send a 'failed' action on error)
        socket = new WebSocket(WS_URL);
        socket.onmessage = onMessage(socket,store);
        socket.onclose = onClose(socket,store);
        socket.onopen = onOpen(socket,store,action.token);

        break;

      //The user wants us to disconnect
      case WS_DISCONNECT:
        if(socket !== null) {
          socket.close();
        }
        socket = null;

        //Set our state to disconnected
       
        break;

      //Send the 'SEND_MESSAGE' action down the websocket to the server
      case WS_ONSEND:
        socket.send(JSON.stringify(action.data));
        break;

      //This action is irrelevant to us, pass it on to the next middleware
      default:
        return next(action);
    }
  }

})();

export default socketMiddleware