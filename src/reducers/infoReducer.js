import {ID_DATA,NAME_DATA,PASSWORD_DATA,INFO_RESET,ERROR,SUCCESS,INFO,HIDE,NOTIFY_PASS,NOTIFY_HIDE,NOTIFY_FAIL,PASS_DATA,MD_ID,SET_ROLE,NOTIFY_DELETE,DELETION,GOR_PASS,GOR_FAIL,TICK_WHITE,REMOVE_ICON,ERROR_WHITE} from '../constants/frontEndConstants';
import {US001,US002,UE001,UE002,INVALID_ID,EMPTY_PWD,EMPTY_NAME,INVALID_NAME,INVALID_PWD,MATCH_PWD,TYPE_SUCCESS} from '../constants/messageConstants'; 

/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function appInfo(state={},action){
  switch (action.type) {

    case ID_DATA:
          return Object.assign({}, state, { 
            "idInfo" : action.data
          })
          break;
    
    case NAME_DATA:

          return Object.assign({}, state, { 
            "nameInfo":action.data     
          })
          break;

    case PASSWORD_DATA:

          return Object.assign({}, state, { 
            "passwordInfo":action.data
          })
          break;

    case INFO_RESET:
          return Object.assign({}, state, { 
            "idInfo" : null,
            "nameInfo":null,
            "passwordInfo":null,
            "roleSet":null
          })
          break;

    case NOTIFY_PASS:
         let notifyMsg=action.data, notifyInfo;
         notifyInfo={
          type:GOR_PASS,
          icon:TICK_WHITE,
          msg:notifyMsg
         };
         return Object.assign({}, state, { 
            "notifyInfo":notifyInfo
         })
         break;
    
    case NOTIFY_DELETE:
         let notifyDel=action.data, notifyDelInfo;
         notifyDelInfo={
          type:GOR_PASS,
          icon:REMOVE_ICON,
          msg:notifyDel
         };
         return Object.assign({}, state, { 
            "notifyInfo":notifyDelInfo
         })
         break;

    case NOTIFY_FAIL:
         let notifyErr=action.data, notifyErrInfo;
         notifyErrInfo={
          type:GOR_FAIL,
          icon:ERROR_WHITE,
          msg:notifyErr
         };
         return Object.assign({}, state, { 
            "notifyInfo":notifyErrInfo
         })
         break;

    case NOTIFY_HIDE:
         let notifyHide;
         notifyHide={
          type:HIDE
         }
         return Object.assign({}, state, { 
            "notifyInfo":notifyHide
         })
         break;


    case MD_ID:
        let roleInfo;
        roleInfo=action.data;
         return Object.assign({}, state, { 
            "roleInfo":roleInfo
         })
        break;

    case SET_ROLE:
        let roleSet;
        roleSet=action.data;
         return Object.assign({}, state, { 
            "roleSet":roleSet
         })      
    default:
      return state
  }
}