import {USER_DETAILS} from '../constants/frontEndConstants';
import React  from 'react';
import { FormattedMessage } from 'react-intl';


export  function userDetails(state={},action){
	switch (action.type) {
	  case USER_DETAILS:

         var res, userData;
         res=action.data;
         if(res.complete_data && res.complete_data.length)
          {
              return Object.assign({}, state, {
                 "userDetails" : res.complete_data,
                "emptyResponse" :false //This flag will update base on response data
               })
          }
          else
          {
           return Object.assign({}, state, {
                 "emptyResponse" :true //This flag will update base on response data
          })
         }

	  default:
	    return state
  }
}



