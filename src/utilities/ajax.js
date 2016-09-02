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
              var response=JSON.parse(httpRequest.response);
            if(callBack){
              callBack.call(this,response);
            }
          
            //  var authData = {
            //     'type': 'auth',
            //     'data' : {
            //         "auth_token" :response.auth_token,
            //         "username" : formData.username
            //     }
            // };
            // console.log(authData);
            //sessionStorage.setItem('sessionData', JSON.stringify(authData));
            //Send to web sockets
            //utils.postToWeb(authData);
            return response;
        } 
        else
        {
          console.log('Connection refused');
        }        
     }
    };
    httpRequest.open(params.method, params.url);
    httpRequest.setRequestHeader('Content-Type', params.contentType || "text/html");
    httpRequest.send(loginData);
   
    return httpRequest.response;
}

}

export {utils}