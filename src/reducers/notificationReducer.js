import {
  SEARCHED_NOTIFICATIONS_DATA,
  WS_NOTIFICATIONS_DATA,
  SEND_READ_INTIMATION,
  RESET_NOTIFICATION_DATA,
  GET_ALL_NOTIFICATIONS,
  RESET_NOTIFICATION_TABLE_DATA,
  SET_NOTIFICATION_SPINNER,
  SEARCHED_NOTIFICATIONS_DATA_ALL
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
                readList.push(tuple.id);
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
    case GET_ALL_NOTIFICATIONS: 
          let notificationData = action.saltParams.lazyData ? (state.completeNotificationData || []) : [];
          return Object.assign({}, state, { 
            "completeNotificationData":notificationData.concat(action.data),
            "hasDataChanged":!state.hasDataChanged,
            "isLoading":false,
            "dataFound":(action.saltParams.lazyData && !action.data.length ? false : null)
          })  
    case RESET_NOTIFICATION_TABLE_DATA:
           return Object.assign({}, state, { 
            "completeNotificationData":(action.data ? [] :state.completeNotificationData),
            "hasDataChanged":!state.hasDataChanged,
            "searchAppliedAllNotifications":false
          }) 
    case SET_NOTIFICATION_SPINNER:  
          return Object.assign({}, state, { 
            "isLoading":action.data
          })  
    case SEARCHED_NOTIFICATIONS_DATA_ALL:
          return Object.assign({}, state, { 
            "searchedAllNotificationData":action.data,
            "isLoading":false,
            "hasDataChanged":!state.hasDataChanged,
            "searchAppliedAllNotifications":true
          })

    default:
      return state
  }
}