import {
  wsNotificationResponseAction,
  wsNotificationEndConnection
} from '../actions/notificationSocketActions'
import {
  WS_NOTIFICATION_CONNECT,
  WS_NOTIFICATION_DISCONNECT,
  WS_NOTIFICATION_ONSEND,
  WS_NOTIFICATION_SUBSCRIBE,
  WS_OPERATOR_LOG_SUBSCRIBE,
  WS_OPERATOR_LOG_UNSUBSCRIBE,
  WS_ORDERS_PLATFORM_SUBSCRIBE,
  WS_ORDERS_PLATFORM_UNSUBSCRIBE,
  WS_ORDERS_HEADER_UNSUBSCRIBE,
  WS_ORDERS_HEADER_SUBSCRIBE
} from '../constants/frontEndConstants'
import { WS_NOTIFICATION_URL, WS_URL } from '../constants/configConstants'
import { NotificationResponseParse } from '../utilities/notificationResponseParser'
import { OLResponseParse } from '../utilities/operationLogsResParser'
import { ordersPlatformResponseParse } from '../utilities/ordersPlatformResParser'
import SockJS from 'sockjs-client'
import webstomp from 'webstomp-client'

const notificationSocketMiddleware = (function() {
  var socket = null
  var operatorLogWSClient = null
  var ordersWSClient = null
  var orderHeaderWSClient = null

  const onMessage = (ws, store, module) => frame => {
    //Parse the JSON message received on the websocket

    var msg = frame.body ? JSON.parse(frame.body) : []
    switch (module) {
      case 'notifications':
        NotificationResponseParse(store, msg)
        break
      case 'operations':
        OLResponseParse(store, msg)
        break
      case 'orders':
        ordersPlatformResponseParse(store, msg, null)
        break
      case 'orders_header':
        ordersPlatformResponseParse(store, msg, 'header')
      default:
      //do nothing
    }
  }

  const onOpen = (ws, store, token) => evt => {
    //Send a handshake, or authenticate with remote end

    //Tell the store we're connected

    store.dispatch(wsNotificationResponseAction(evt.type))
  }

  const onClose = (ws, store) => evt => {
    //Tell the store we've disconnected

    store.dispatch(wsNotificationEndConnection())
  }

  return store => next => action => {
    switch (action.type) {
      //The user wants us to connect
      case WS_NOTIFICATION_CONNECT:
        //Start a new connection to the server
        if (socket && socket.connected) {
          socket.disconnect(function() {
            console.log('disconnected')
          })
        }
        //Send an action that shows a "connecting..." status for now
        //store.dispatch(actions.connecting());

        //Attempt to connect (we could send a 'failed' action on error)
        // @ts-ignore
        socket = webstomp.over(new SockJS(WS_NOTIFICATION_URL), {
          heartbeat: false
        })
        // //new WebSocket(WS_URL);
        socket.connect('', '', onOpen(socket, store, action.token))
        /*socket.onmessage = onMessage(socket,store);
        socket.onclose = onClose(socket,store);
        socket.onopen = onOpen(socket,store,action.token);*/

        break

      //The user wants us to disconnect
      case WS_NOTIFICATION_DISCONNECT:
        if (socket !== null) {
          socket.close()
        }
        socket = null

        //Set our state to disconnected

        break

      //Send the 'SEND_MESSAGE' action down the websocket to the server
      case WS_NOTIFICATION_ONSEND:
        socket.send(JSON.stringify(action.data))
        break
      case WS_NOTIFICATION_SUBSCRIBE:
        socket.subscribe(action.data, onMessage(socket, store, 'notifications'))
        break
      case WS_OPERATOR_LOG_SUBSCRIBE:
        if (socket && !operatorLogWSClient) {
          operatorLogWSClient = socket.subscribe(
            action.data.url,
            onMessage(socket, store, 'operations')
          )
          socket.send(action.data.url, action.data.filters)
        }
        break
      case WS_OPERATOR_LOG_UNSUBSCRIBE:
        if (operatorLogWSClient) {
          operatorLogWSClient.unsubscribe()
          operatorLogWSClient = null
        }
        if (action.data) {
          store.dispatch(action.data())
        }
        break
      case WS_ORDERS_PLATFORM_SUBSCRIBE:
        if (socket && !ordersWSClient) {
          ordersWSClient = socket.subscribe(
            action.data.url,
            onMessage(socket, store, 'orders')
          )
          socket.send(action.data.url, action.data.filters)
        }
        break
      case WS_ORDERS_PLATFORM_UNSUBSCRIBE:
        if (ordersWSClient) {
          ordersWSClient.unsubscribe()
          ordersWSClient = null
        }
        if (action.data) {
          store.dispatch(action.data())
        }
        break
      case WS_ORDERS_HEADER_SUBSCRIBE:
        if (socket && !orderHeaderWSClient) {
          orderHeaderWSClient = socket.subscribe(
            action.data.url,
            onMessage(socket, store, 'orders_header')
          )
          socket.send(action.data.url, action.data.filters)
        }
        break
      case WS_ORDERS_HEADER_UNSUBSCRIBE:
        if (orderHeaderWSClient) {
          orderHeaderWSClient.unsubscribe()
          orderHeaderWSClient = null
        }
        if (action.data) {
          store.dispatch(action.data())
        }
        break
      //This action is irrelevant to us, pass it on to the next middleware
      default:
        return next(action)
    }
  }
})()

export default notificationSocketMiddleware
