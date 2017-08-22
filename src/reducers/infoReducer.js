import {ID_DATA,NAME_DATA,PASSWORD_DATA,INFO_RESET,ERROR,HIDE,
  NOTIFY_PASS,NOTIFY_HIDE,NOTIFY_FAIL,NOTIFY_INFO,ID_MAP,SET_ROLE,
  NOTIFY_DELETE,GOR_PASS,GOR_FAIL,GOR_INFO,TICK_WHITE,REMOVE_ICON,
  ERROR_WHITE,LOGIN_ERROR,SKU_DATA,LOC_DATA,PASSWORD_BUTTON_RESET} from '../constants/frontEndConstants';

/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function appInfo(state={},action){
  switch (action.type) {

    case LOGIN_ERROR:
        let errorMsg=action.data, loginInfo;
         loginInfo={
          type:ERROR,
          msg:errorMsg
         };
          return Object.assign({}, state, { 
            "loginInfo" : loginInfo
          })
    case ID_DATA:
          return Object.assign({}, state, { 
            "idInfo" : action.data
          })          
    case NAME_DATA:

          return Object.assign({}, state, { 
            "nameInfo":action.data     
          })
    case PASSWORD_DATA:
          return Object.assign({}, state, { 
            "passwordInfo":action.data
          })
    case INFO_RESET:
          return Object.assign({}, state, { 
            "idInfo" : null,
            "nameInfo":null,
            "passwordInfo":null,
            "loginInfo":null,
            "roleSet":null,
          })
    case PASSWORD_BUTTON_RESET:
          return Object.assign({}, state, { 
            "passwordInfo":null
          })       
    case NOTIFY_PASS:
         let notifyMsg=action.data, notifyPass;
         notifyPass={
          type:GOR_PASS,
          icon:TICK_WHITE,
          msg:notifyMsg
         };
         return Object.assign({}, state, { 
            "notifyInfo":notifyPass
         })
   

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
    case NOTIFY_INFO:
         let notifyInfoMsg=action.data, notifyInfo;
         notifyInfo={
          type:GOR_INFO,
          icon:TICK_WHITE,
          msg:notifyInfoMsg
         };
         return Object.assign({}, state, { 
            "notifyInfo":notifyInfo
         })
    case NOTIFY_HIDE:
         let notifyHide;
         notifyHide={
          type:HIDE
         }
         return Object.assign({}, state, { 
            "notifyInfo":notifyHide
         })
    case ID_MAP:
        let roleList;
        roleList=action.data;
         return Object.assign({}, state, { 
            "roleList":roleList
         })
    case SET_ROLE:
        let roleSet;
        roleSet=action.data;
         return Object.assign({}, state, { 
            "roleSet":roleSet
         })
    case SKU_DATA:
          return Object.assign({}, state, { 
            "skuInfo" : action.data
          })
    case LOC_DATA:
          return Object.assign({}, state, { 
            "locInfo":action.data     
          })
    default:
      return state
  }
}