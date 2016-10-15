import {ID_DATA,NAME_DATA,PASSWORD_DATA,INFO_RESET,ID_BACKEND,ERROR,SUCCESS,INFO,HIDE,NOTIFY_PASS,NOTIFY_HIDE,NOTIFY_FAIL,PASS_DATA,MD_ID,SET_ROLE} from '../constants/appConstants'; 
import {US001,US002,UE001} from '../constants/messageConstants'; 

/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function appInfo(state={},action){
  switch (action.type) {
    case ID_BACKEND:
          let idExist;
          if(action.data===true)
          {
           idExist={
              type:ERROR,
              msg:'Username already exists'             
            };                        
          }
          else
          {
           idExist={
              type:SUCCESS,
              msg:'Succesfull'               
            };                        
          }
          return Object.assign({}, state, { 
            "idInfo" : idExist
          })
          break;

    case ID_DATA:
          let userid=action.data.userid, idInfo;
          if(userid.length<1)
          {
            idInfo={
              type:ERROR,
              msg:'Please enter a valid User ID'           
            }
          }
          else
          {
            idInfo={
              type:SUCCESS,
              msg:'Succesfull'               
            };            
          }
          return Object.assign({}, state, { 
            "idInfo" : idInfo
          })
          break;
    
    case PASS_DATA:
          let password=action.data.password, loginPassInfo;
          if(password.length<1)
          {
            loginPassInfo={
              type:ERROR,
              msg:'Please enter a password'           
            }
          }
          else
          {
            loginPassInfo={
              type:SUCCESS,
              msg:'Succesfull'               
            };            
          }
          return Object.assign({}, state, { 
            "loginPassInfo" : loginPassInfo
          })
    
          break;
    case NAME_DATA:
          let firstname=action.data.firstname, lastname=action.data.lastname, format=  /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, nameInfo;
          if(firstname.length<1||lastname.length<1||firstname.length>50||lastname.length>50)
          {
            nameInfo={
              type:ERROR,
              msg:'Please enter a valid User Name'           
            }
          }
          else if(format.test(firstname)||format.test(lastname))
          {
            nameInfo={
              type:ERROR,
              msg:'Special characters "~","@" and "%" are not allowed'           
            }            
          }
          else
          {
            nameInfo={
              type:SUCCESS,
              msg:'Succesfull'               
            };            
          }
          return Object.assign({}, state, { 
            "nameInfo":nameInfo      
          })
          break;

    case PASSWORD_DATA:
          let pwd1=action.data.pwd1,pwd2=action.data.pwd2, passwordInfo;

          if(pwd1.length<6)
          {
            passwordInfo={
              type:ERROR,
              msg:'Minimum 6 characters required'           
            };            
          }
          else if(pwd1!=pwd2)
          {
            passwordInfo={
              type:ERROR,
              msg:'Passwords do not match'           
            };            
          }
          else
          {
            passwordInfo={
              type:SUCCESS,
              msg:'Succesfull'               
            };            
          }
          return Object.assign({}, state, { 
            "passwordInfo":passwordInfo
          })
          break;

    case INFO_RESET:
          return Object.assign({}, state, { 
            "idInfo" : null,
            "nameInfo":null,
            "passwordInfo":null,
            "loginPassInfo":null,
            "roleSet":null
          })
          break;

    case NOTIFY_PASS:
         let notifyMsg=action.data, notifyInfo;
         notifyInfo={
          type:SUCCESS,
          msg:notifyMsg
         };
         return Object.assign({}, state, { 
            "notifyInfo":notifyInfo
         })
         break;

    case NOTIFY_FAIL:
         let notifyErr=action.data, notifyErrInfo;
         notifyErrInfo={
          type:ERROR,
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
        roleInfo={
          type:INFO,
          msg:action.data
        }
         return Object.assign({}, state, { 
            "roleInfo":roleInfo
         })
        break;

    case SET_ROLE:
        let roleSet;
        roleSet={
          type:INFO,
          msg:action.data
        }
         return Object.assign({}, state, { 
            "roleSet":roleSet
         })      
    default:
      return state
  }
}