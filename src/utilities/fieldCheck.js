import {ERROR,SUCCESS} from '../constants/frontEndConstants';
import {EMPTY_PWD,TYPE_SUCCESS,EMPTY_NAME,INVALID_NAME,INVALID_PWD_OP,INVALID_PWD_MG,MATCH_PWD,INVALID_LOCID,INVALID_SKUID,INVALID_ID,INVALID_FORMAT} from '../constants/messageConstants';

export function nameStatus(firstname,lastname){
          let nameInfo, format=  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
          if(!firstname.length||!lastname.length||firstname.length>50||lastname.length>50)
          {
            nameInfo={
              type:ERROR,
              msg:EMPTY_NAME         
            }
          }
          else if(format.test(firstname)||format.test(lastname))
          {
            nameInfo={
              type:ERROR,
              msg:INVALID_NAME           
            }            
          }
          else
          {
            nameInfo={
              type:SUCCESS,
              msg:TYPE_SUCCESS               
            };            
          };   
          return nameInfo;
}
export function passwordStatus(pswd,confirmPswd,selectedRole,managerRole){
          let passwordInfo;
          if(!pswd.length)
          {
            passwordInfo={
              type:ERROR,
              msg:EMPTY_PWD           
            };            
          }
          else if(pswd.length<8)
          {
            if(selectedRole===managerRole)
            {
              passwordInfo={
              type:ERROR,
              msg:INVALID_PWD_MG           
              };
            }
            else if(pswd.length<6)
            {
              passwordInfo={
              type:ERROR,
              msg:INVALID_PWD_OP           
              };              
            }            
            else
            {
              passwordInfo={
              type:SUCCESS,
              msg:TYPE_SUCCESS               
              };            
            }
          }
          else if(pswd!=confirmPswd)
          {
            passwordInfo={
              type:ERROR,
              msg:MATCH_PWD           
            };            
          }
          else
          {
            passwordInfo={
              type:SUCCESS,
              msg:TYPE_SUCCESS               
            };            
          }   
        return passwordInfo;
}
export function locationStatus(locId){
    let locInfo;
    if(locId.length<1)
      {
            locInfo={
              type:ERROR,
              msg:INVALID_LOCID           
            }
      }
      else
      {
            locInfo={
              type:SUCCESS,
              msg:TYPE_SUCCESS               
            };            
      }
      return locInfo;
}  
export function skuStatus(skuId) 
{
   let skuInfo;
   if(skuId.length<1)
      {
            skuInfo={
              type:ERROR,
              msg:INVALID_SKUID           
            }
      }
      else
      {
            skuInfo={
              type:SUCCESS,
              msg:TYPE_SUCCESS               
            };            
      }
      return skuInfo;
}
export function idStatus(userid)
{
    let idInfo,format=  /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;
    if(userid.length<1||userid.length>30)
    {
            idInfo={
              type:ERROR,
              msg:INVALID_ID           
            }
    }
    else if(format.test(userid))
    {
            idInfo={
              type:ERROR,
              msg:INVALID_FORMAT           
            }
    }
    else
      {
            idInfo={
              type:SUCCESS,
              msg:TYPE_SUCCESS               
            };            
      }
    return idInfo;
}