  
import {AJAX_CALL,AUTH_LOGIN,PAUSE_OPERATION,RESUME_OPERATION,MASTER_FILE_UPLOAD,FETCH_PPS_PROFILES,FETCH_TAGS,FETCH_PROFILE_FOR_PPS,CREATE_NEW_PROFILE,SAVE_PPS_PROFILE} from '../constants/frontEndConstants';

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
                   if(resContentType.match(/(text\/csv)/g) || resContentType.match(/(application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet)/g)){
                    //get the file name from the content-disposition header
                    //and then save the file
                    let fileName;
                    if (this.getResponseHeader('Content-disposition')){
                      let strName=this.getResponseHeader('Content-disposition').match(/(filename=.[^\s\n\t\r]+)/g);
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
    //TODO: Need to refactor
    if(params.cause!==FETCH_PPS_PROFILES && params.cause!==FETCH_TAGS && params.cause!==FETCH_PROFILE_FOR_PPS && params.cause!==CREATE_NEW_PROFILE && params.cause!==SAVE_PPS_PROFILE){
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
    }
    //TODO: Need to be removed for real apis
           if(params.cause===CREATE_NEW_PROFILE || params.cause===SAVE_PPS_PROFILE){
               httpRequest.setRequestHeader('Accept', params.accept || "text/html");
               httpRequest.setRequestHeader('Content-Type', params.contentType || "text/html");
           }


    httpRequest.send(httpData);
    break;

    default:
    return next(action);
  }
}

})();

export default ajaxMiddleware