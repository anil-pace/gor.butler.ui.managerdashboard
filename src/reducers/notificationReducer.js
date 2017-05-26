import {
  SEARCHED_NOTIFICATIONS_DATA,
  WS_NOTIFICATIONS_DATA,
  SEND_READ_INTIMATION,
  RESET_NOTIFICATION_DATA
} from '../constants/frontEndConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function notificationReducer(state={},action){
  switch (action.type) {
    case SEARCHED_NOTIFICATIONS_DATA:
          return Object.assign({}, state, { 
            "searchedNotificationData" : action.data,
            "searchApplied":true
          })
          break;
    case WS_NOTIFICATIONS_DATA:
          let wsNotificationData;// = state.wsNotificationData;
          let isNotificationRead = state.unreadCount;
          let readList=[];
          if(action.data.length > 1){
            wsNotificationData = action.data
          }
          else{
            wsNotificationData = state.wsNotificationData ? state.wsNotificationData.splice().unshift(action.data[0]) : action.data ;
          }
          if(!isNotificationRead){
            let len = wsNotificationData.length;
            let epochTime =  (new Date).getTime();
            for(let i= 0 ;i < len ; i++){
                let tuple={};
                tuple.id = wsNotificationData[i].id;
                tuple.lastRead = epochTime;
                readList.push(tuple);
            }
          }
          return Object.assign({}, state, { 
            "wsNotificationData" : wsNotificationData,
            "unreadCount": !isNotificationRead ? wsNotificationData.length : 0,
            "readNotificationList":readList
          })  
    case SEND_READ_INTIMATION:
          return Object.assign({}, state, { 
            "unreadCount": 0
          })
    case RESET_NOTIFICATION_DATA:
          return Object.assign({}, state, { 
            "searchApplied":false
          })            
    default:
      return state
  }
}