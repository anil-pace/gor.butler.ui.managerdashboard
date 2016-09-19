import {AJAX_CALL} from '../constants/appConstants'
import {AjaxParse} from '../utilities/ajaxParser';
import {ShowError} from '../utilities/showError';

const ajaxMiddleware = (function(){ 

  return store => next => action => {
    switch(action.type) {

     
    case AJAX_CALL:

    var params=action.params;

    var formData = params.formdata || null,
    loginData=JSON.stringify(formData || {});
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
        else
        {
          console.log('Connection refused');
          ShowError(store,params.cause);
        }        
     }
    };
    httpRequest.open(params.method, params.url);
    httpRequest.setRequestHeader('Content-Type', params.contentType || "text/html");
    httpRequest.send(loginData);
    break;

    default:
        return next(action);
    }
  }

})();

export default ajaxMiddleware