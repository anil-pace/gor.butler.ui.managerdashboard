  
import {AJAX_CALL,AUTH_LOGIN,PAUSE_OPERATION,RESUME_OPERATION,MASTER_FILE_UPLOAD} from '../constants/frontEndConstants';

import {AjaxParse} from '../utilities/AjaxParser';
import {FileResponseParser} from '../utilities/fileResponseParser';
import {ShowError} from '../utilities/showError';
import {endSession} from '../utilities/endSession';


const ajaxMiddleware=(function(){ 

  return store=> next=> action=> {
    switch(action.type) {

        case AJAX_CALL:

       var params=action.params;
       var saltParams = action.params.saltParams ? action.params.saltParams : {};
       var formData = params.formdata || params || null,httpData;

       if(params.cause !== MASTER_FILE_UPLOAD){
          httpData=params.formdata? JSON.stringify(params.formdata):null;
       }
       else{
          httpData=params.formdata;
       }
       
       
       var httpRequest=new XMLHttpRequest();
       var authCause=[AUTH_LOGIN, PAUSE_OPERATION, RESUME_OPERATION];
       if (!httpRequest || !params.url) {
        return false;
        }
        if(params.responseType){
          httpRequest.responseType=params.responseType;
        }
      httpRequest.onreadystatechange=function(xhr){
        if (httpRequest.readyState=== XMLHttpRequest.DONE) {
              if(httpRequest.status=== 401 && authCause.indexOf(params.cause)==-1) {
                endSession(store);
              }
              else {
                 try
                 {
                     let resContentType = httpRequest.getResponseHeader('Content-type');
                      if(resContentType.match(/(text\/csv)/g) || 
                      resContentType.match(/(application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet)/g) ||
                      resContentType.match(/(application\/vnd.ms-excel)/g)){
                    //get the file name from the content-disposition header
                    //and then save the file

                    

                    let fileName;
                    if (this.getResponseHeader('Content-Disposition')){
                      let strName=this.getResponseHeader('Content-Disposition').match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                      fileName=strName[0].slice(10,strName.length-2);
                    }
                    fileName=(!fileName)?(resContentType.match(/(text\/csv)/g)? "download.csv" : "download.xlsx"):fileName;
                    FileResponseParser(store,httpRequest.response,params.cause,fileName)
                  }
                   else{
                    let  decodedString= httpRequest.responseType==="arraybuffer"? String.fromCharCode.apply(null, new Uint8Array(httpRequest.response)):httpRequest.response;
                    var response=JSON.parse(decodedString,httpRequest.status);
                    AjaxParse(store,response,params.cause,httpRequest.status,saltParams);          

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
    httpRequest.onerror=function (err){
               ShowError(store,params.cause,httpRequest.status);
    }

    httpRequest.open(params.method, params.url,!params.sync);
        if(params.contentType !== false){
            httpRequest.setRequestHeader('Content-Type', params.contentType || "text/html");
        }
        if(params.withCredentials){
            httpRequest.withCredentials = true;
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