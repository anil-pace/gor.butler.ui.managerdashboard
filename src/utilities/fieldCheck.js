import {ERROR,SUCCESS} from '../constants/appConstants';
import {EMPTY_PWD,TYPE_SUCCESS,EMPTY_NAME,INVALID_NAME,INVALID_PWD,MATCH_PWD} from '../constants/messageConstants';

export function nameStatus(firstname,lastname){
          let nameInfo, format=  /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
          if(firstname.length<1||lastname.length<1||firstname.length>50||lastname.length>50)
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
export function passwordStatus(pwd1,pwd2){
          let passwordInfo;
          if(pwd1.length<6)
          {
            passwordInfo={
              type:ERROR,
              msg:INVALID_PWD           
            };            
          }
          else if(pwd1!=pwd2)
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
          };   
          return passwordInfo;
}
