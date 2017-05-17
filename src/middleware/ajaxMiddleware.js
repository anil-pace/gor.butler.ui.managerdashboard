
import {AJAX_CALL,AUTH_LOGIN,PAUSE_OPERATION,RESUME_OPERATION,MASTER_FILE_UPLOAD} from '../constants/frontEndConstants';

import {AjaxParse} from '../utilities/AjaxParser';
import {ShowError} from '../utilities/showError';
import {endSession} from '../utilities/endSession';
import {saveFile} from '../utilities/utils';

const ajaxMiddleware = (function(){ 

  return store => next => action => {
    switch(action.type) {

       case AJAX_CALL:

       var params=action.params;
       var formData = params.formdata || params || null,httpData;
       if(params.cause !== MASTER_FILE_UPLOAD){
          httpData = params.formdata? JSON.stringify(params.formdata):null;
       }
       else{
          httpData = params.formdata;
       }
       
       
       var httpRequest = new XMLHttpRequest();
       var authCause = [AUTH_LOGIN, PAUSE_OPERATION, RESUME_OPERATION];
       if (!httpRequest || !params.url) {
        return false;
        }
      httpRequest.onreadystatechange = function(xhr){
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
              if(httpRequest.status === 401 && authCause.indexOf(params.cause)==-1) {
                endSession(store);
              }
              else {
                 try
                 {
                   if(httpRequest.getResponseHeader('Content-type') === "text/csv; charset=utf-8") {
                    //get the file name from the content-disposition header
                    //and then save the file
                    let fileName = 'Download.csv';
                    if (this.getResponseHeader('Content-disposition')){
                      let strName = this.getResponseHeader('Content-disposition').match(/(filename=.[^\s\n\t\r]+)/g);
                      fileName = strName[0].slice(9);
                    }

                    saveFile(httpRequest.response,fileName);
                  }

                   else {
                    var response=JSON.parse(httpRequest.response,httpRequest.status);
                    AjaxParse(store,response,params.cause,httpRequest.status);          
                  }
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
    if(params.contentType !== false){
      httpRequest.setRequestHeader('Content-Type', params.contentType || "text/html");
    }
    httpRequest.setRequestHeader('Accept', params.accept || "text/html");
    if(params.cause!==AUTH_LOGIN)
    {
      httpRequest.setRequestHeader('Authentication-Token', params.token);
    }
    httpRequest.send(httpData);
    break;

    default:
    return next(action);
  }
}

})();

export default ajaxMiddleware