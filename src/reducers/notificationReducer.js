import {
  SEARCHED_NOTIFICATIONS_DATA,
  WS_NOTIFICATIONS_DATA,
  SEND_READ_INTIMATION,
  RESET_NOTIFICATION_DATA,
  GET_ALL_NOTIFICATIONS,
  RESET_NOTIFICATION_TABLE_DATA,
  SET_NOTIFICATION_SPINNER,
  SEARCHED_NOTIFICATIONS_DATA_ALL,
  SET_INFINITE_SPINNER,
  SET_NOTIFICATION,
  SET_NOTIFICATION_NULL
} from "../constants/frontEndConstants"
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export function notificationReducer(state = {}, action) {
  switch (action.type) {
    case SEARCHED_NOTIFICATIONS_DATA:
      return Object.assign({}, state, {
        searchedNotificationData: action.data.length ? action.data : [],
        searchApplied: true,
        searchDataFound: action.data.length ? true : false
      })
      break
    case WS_NOTIFICATIONS_DATA:
      let wsNotificationData
      let isNotificationRead = state.isNotificationRead
      let readList = []
      let responseData = action.data.splice(0)
      let initRespLen = responseData.length
      if (!isNotificationRead) {
        wsNotificationData = responseData
      } else {
        wsNotificationData = state.wsNotificationData
          ? responseData.concat(state.wsNotificationData.splice(0))
          : responseData
      }

      let epochTime = new Date().getTime()
      for (let i = 0; i < initRespLen; i++) {
        let tuple = {}
        tuple.id = responseData[i].id
        tuple.lastRead = epochTime
        readList.push(tuple.id)
      }

      return Object.assign({}, state, {
        wsNotificationData: wsNotificationData,
        unreadCount: initRespLen,
        readNotificationList: readList,
        isNotificationRead: false
      })
    case SEND_READ_INTIMATION:
      return Object.assign({}, state, {
        unreadCount: 0,
        isNotificationRead: true,
        readNotificationList: []
      })
    case RESET_NOTIFICATION_DATA:
      return Object.assign({}, state, {
        searchApplied: false,
        searchedNotificationData: []
      })
    case GET_ALL_NOTIFICATIONS:
      let notificationData = action.saltParams.lazyData
        ? state.completeNotificationData || []
        : []
      return Object.assign({}, state, {
        completeNotificationData: notificationData.concat(action.data),
        hasDataChanged: !state.hasDataChanged,
        isLoading: false,
        isInfiniteLoading: false,
        dataFound:
          action.saltParams.lazyData && !action.data.length ? false : null
      })
    case RESET_NOTIFICATION_TABLE_DATA:
      return Object.assign({}, state, {
        completeNotificationData: action.data
          ? []
          : state.completeNotificationData,
        hasDataChanged: !state.hasDataChanged,
        searchAppliedAllNotifications: false
      })
    case SET_NOTIFICATION_SPINNER:
      return Object.assign({}, state, {
        isLoading: action.data
      })
    case SET_INFINITE_SPINNER:
      return Object.assign({}, state, {
        isInfiniteLoading: action.data
      })
    case SEARCHED_NOTIFICATIONS_DATA_ALL:
      return Object.assign({}, state, {
        searchedAllNotificationData: action.data,
        isLoading: false,
        hasDataChanged: !state.hasDataChanged,
        searchAppliedAllNotifications: true
      })
    case SET_NOTIFICATION:
      return Object.assign({}, state, {
        noticationData: action.data
      })
    case SET_NOTIFICATION_NULL:
      return Object.assign({}, state, {
        noticationData: null
      })
    case "SET_NOTIFICATION_STATUS":
      return Object.assign({}, state, {
        notificationFilterState: action.data
      })

    default:
      return state
  }
}
