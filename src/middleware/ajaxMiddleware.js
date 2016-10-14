import {AJAX_CALL,MOCK_LOGIN,AUTH_LOGIN} from '../constants/appConstants';
import {notifyFail} from '../actions/validationActions';
import {AjaxParse} from '../utilities/AjaxParser';
import {ShowError} from '../utilities/showError';

const ajaxMiddleware = (function(){ 

  return store => next => action => {
    switch(action.type) {

    case MOCK_LOGIN:
      /**
       * Sending arbitrary auth-token to emulate login
       */
      AjaxParse(store,{
                  "auth_token": "eyJhbGciOiJIUzI1NiIsImV4cCI6MTQ3NTAwNjc0OCwiaWF0IjoxNDc0OTc0MzQ4fQ.eyJpZCI6MX0.VUCUA1kqq5Robxbu_LzyLD2yrptvBEN6zVQ2DsP7uSE",
                  "duration": 32400
                },action.params.cause);
      break;
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
        if (httpRequest.status === 200) {
              var response=JSON.parse(httpRequest.response);
              AjaxParse(store,response,params.cause);
        }
        else if(httpRequest.status === 400){
          console.log('Request not processed');
          var response=JSON.parse(httpRequest.response);
          AjaxParse(store,response,params.cause);          
        }
        else
        {
          store.dispatch(notifyFail('Connection refused'));
          ShowError(store,params.cause);
        }        
     }
    };
    httpRequest.open(params.method, params.url);
    httpRequest.setRequestHeader('Content-Type', params.contentType || "text/html");
    httpRequest.setRequestHeader('Accept', params.accept || "text/html");
    if(params.cause!==AUTH_LOGIN)
      httpRequest.setRequestHeader('Authentication-Token', params.token);
    httpRequest.send(loginData);
    break;

    default:
        return next(action);
    }
  }

})();

export default ajaxMiddleware