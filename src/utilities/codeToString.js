import React  from 'react';
import { FormattedMessage,FormattedPlural } from 'react-intl'; 
import {ERROR,SUCCESS} from '../constants/frontEndConstants';
import {CODE_US001,CODE_US002,CODE_US004,CODE_UE001,CODE_UE002,CODE_UE003,CODE_UE004,CODE_UE005,CODE_UE006,CODE_AS002,CODE_AS003,CODE_G016,CODE_AE001,CODE_AE002,
  CODE_AE004,CODE_AE005,CODE_AE006,CODE_E026,CODE_E027,CODE_AE007,CODE_AE008,CODE_E052,CODE_E051,CODE_E135} from '../constants/backEndConstants'
import {US004,UE001,UE002,UE003,UE004,UE005,UE006,AS003,G016,AE001,AE002,AE004,AE005,AE006,E026,E027,ERR_RES,AE007,AE008,E051,E052,E135} from '../constants/messageConstants';

export function codeToString(res){
          let stringInfo;
          switch(res.code)
          {
            case CODE_US001:
              stringInfo={
                type:SUCCESS,
                msg:(<FormattedMessage id="notify.success.add" description='Text for successfull user addition' 
            defaultMessage='New user "{first} {last}" added successfully' values={{first:res.details[0]||"--",last:res.details[1]||"--"}}/>)   //Make string for addition
              }
              break;
            case CODE_US002:
              stringInfo={
                type:SUCCESS,
                msg:(<FormattedMessage id="notify.success.delete" description='Text for successfull user deletion' 
            defaultMessage='User "{first} {last}" deleted successfully' values={{first:res.details[0]||"--",last:res.details[1]||"--"}}/>)    //Make string for deletion
              }
              break;
            case CODE_US004:
              stringInfo={
                type:SUCCESS,
                msg:US004
              }
              break;
            case CODE_AS002:
              stringInfo={
                type:SUCCESS,
                msg:(<FormattedMessage id="notify.delete.audit.success" description='Text for successfull audit deletion' 
            defaultMessage="Audit task {audit_id} has been deleted" values={{audit_id:res.details["display_id"]||"--"}}/>)
              }
              break;              
            case CODE_UE001:
              stringInfo={
                type:ERROR,
                msg:UE001
              }
              break;
            case CODE_UE002:
              stringInfo={
                type:ERROR,
                msg:UE002
              }
              break;
            case CODE_UE003:
              stringInfo={
                type:ERROR,
                msg:UE003
              }
              break;
            case CODE_UE004:
              stringInfo={
                type:ERROR,
                msg:UE004
              }
              break;
            case CODE_UE005:
              stringInfo={
                type:ERROR,
                msg:UE005
              }
              break;
            case CODE_UE006:
              stringInfo={
                type:ERROR,
                msg:UE006
              }
              break;
            case CODE_AS003:
              stringInfo={
                type:ERROR,
                msg:AS003
              }
              break;     
            case CODE_G016:
              stringInfo={
                type:ERROR,
                msg:G016
              }
              break;
            case CODE_AE001:
              stringInfo={
                type:ERROR,
                msg:AE001
              }                     
              break;
            case CODE_AE002:
              stringInfo={
                type:ERROR,
                msg:AE002
              }                     
              break;
            case CODE_AE004:
              stringInfo={
                type:ERROR,
                msg:AE004
              }                     
              break;
            case CODE_AE005:
              stringInfo={
                type:ERROR,
                msg:AE005
              }                     
              break;
            case CODE_AE006:
              stringInfo={
                type:ERROR,
                msg:AE006
              }                     
              break;      
            case CODE_E026:
              stringInfo={
                type:ERROR,
                msg:E026
              }                     
              break;                                    
            case CODE_E027:
              stringInfo={
                type:ERROR,
                msg:E027
              }                     
              break;
            case CODE_AE008:
              stringInfo={
                type:SUCCESS,
                msg:AE008
              }                     
              break;    
            case CODE_AE007:
              stringInfo={
                type:SUCCESS,
                msg:AE007
              }                     
              break;                                            
            case CODE_E051:
              stringInfo={
                type:ERROR,
                msg:E051
              }     
              break;                              
            case CODE_E052:
              stringInfo={
                type:ERROR,
                msg:E052
              }                                   
              break;
              case CODE_E135:
              stringInfo={
                type:ERROR,
                msg:E135
              }                                   
              break;

              
            default:
              stringInfo={
                type:ERROR,
                msg:ERR_RES
              }
          }
          return stringInfo;
}