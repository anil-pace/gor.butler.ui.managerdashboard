import {ID_DATA,NAME_DATA,PASSWORD_DATA,INFO_RESET} from '../constants/appConstants'; 
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function appInfo(state={},action){
  switch (action.type) {
    case ID_DATA:
          let userid=action.data.userid, idInfo;
          if(userid.length<1)
          {
            idInfo={
              isValid:false,
              msg:'Please enter a valid User ID'           
            }
          }
          else
          {
            idInfo={
              isValid:true,
              msg:'Succesfull'               
            };            
          }
          return Object.assign({}, state, { 
            "idInfo" : idInfo
          })
          break;
          
    case NAME_DATA:
          let firstname=action.data.firstname, lastname=action.data.lastname, format=  /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, nameInfo;
          if(firstname.length<1||lastname.length<1||firstname.length>50||lastname.length>50)
          {
            nameInfo={
              isValid:false,
              msg:'Please enter a valid User Name'           
            }
          }
          else if(format.test(firstname)||format.test(lastname))
          {
            nameInfo={
              isValid:false,
              msg:'Special characters "~","@" and "%" are not allowed'           
            }            
          }
          else
          {
            nameInfo={
              isValid:true,
              msg:'Succesfull'               
            };            
          }
          return Object.assign({}, state, { 
            "nameInfo":nameInfo      
          })
          break;

    case PASSWORD_DATA:
          let pwd1=action.data.pwd1,pwd2=action.data.pwd2, passwordInfo;

          if(pwd1.length<6||pwd2.length<6)
          {
            passwordInfo={
              isValid:false,
              msg:'Minimum 6 characters required'           
            };            
          }
          else if(pwd1!=pwd2)
          {
            passwordInfo={
              isValid:false,
              msg:'Passwords do not match'           
            };            
          }
          else
          {
            passwordInfo={
              isValid:true,
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
            "passwordInfo":null
          })
          break;

    default:
      return state
  }
}