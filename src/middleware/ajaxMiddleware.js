
import {AJAX_CALL,AUTH_LOGIN} from '../constants/frontEndConstants';

import {AjaxParse} from '../utilities/AjaxParser';
import {ShowError} from '../utilities/showError';
import {endSession} from '../utilities/endSession';

const ajaxMiddleware = (function(){ 

  return store => next => action => {
    switch(action.type) {

       case AJAX_CALL:

       var params=action.params;

       var formData = params.formdata || params || null,
       loginData= params.formdata? JSON.stringify(params.formdata):null;
       var httpRequest = new XMLHttpRequest();

       if (!httpRequest || !params.url) {
        return false;
        }
      httpRequest.onreadystatechange = function(xhr){
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
              if(httpRequest.status === 401 && params.cause!==AUTH_LOGIN) {
                endSession(store);
              }
              else {
                 try
                 {
                  var response=JSON.parse(httpRequest.response,httpRequest.status);
                  AjaxParse(store,response,params.cause,httpRequest.status);          
                 }
                 catch(e)
                 {
                   if(!response){
                    ShowError(store,params.cause,httpRequest.status);
                   }
                   throw e;
                 }
              }      
      }
    };
    httpRequest.onerror = function (err){
               ShowError(store,params.cause,httpRequest.status);
    }
    httpRequest.open(params.method, params.url);
    httpRequest.setRequestHeader('Content-Type', params.contentType || "text/html");
    httpRequest.setRequestHeader('Accept', params.accept || "text/html");
    httpRequest.setRequestHeader('Authorization', params.authorization || null);
    if(params.cause!==AUTH_LOGIN)
    {
      httpRequest.setRequestHeader('Authentication-Token', params.token);
    }
    httpRequest.send(loginData);
    break;

    default:
    return next(action);
  }
}

})();

export default ajaxMiddleware