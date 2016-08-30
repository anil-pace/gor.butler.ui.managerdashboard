const utils = {
  ajax:function (params,callBack) {
    var formData = params.formdata || null,
    loginData=JSON.stringify(formData || {});
    var httpRequest = new XMLHttpRequest();

    if (!httpRequest || !params.url) {
      return false;
    }
    httpRequest.onreadystatechange = function(xhr){
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            if(callBack){
              callBack.call(this,xhr);
            }
        } 

        
     }
    };
    httpRequest.open(params.method, params.url);
    httpRequest.setRequestHeader('Content-Type', params.contentType || "text/html");
    httpRequest.send(loginData);
    return httpRequest;
}

}

export {utils}