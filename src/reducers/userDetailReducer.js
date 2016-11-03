import {USER_DETAILS} from '../constants/appConstants';
import React  from 'react';
import { FormattedMessage } from 'react-intl';


export  function userDetails(state={},action){
	switch (action.type) {
	  case USER_DETAILS:

         var res, userData;
         res=action.data;
         if(res.complete_data){
           return Object.assign({}, state, {
               "userDetails" : res.complete_data
          })
         }

	  default:
	    return state
  }
}