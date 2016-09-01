const utils = {
  postToWeb:function(data){
    var ws= new WebSocket('wss://192.168.8.118/manager_api/wss');
    ws.onopen = function(evt) 
    {
                console.log("connected");
                ws.send(JSON.stringify(data));
    };
     ws.onmessage = function(evt){

                var received_msg = evt.data; 
                var data = JSON.parse(evt.data);
                if(data.hasOwnProperty('alert_data')){ 
 
                }else if(data.hasOwnProperty('message')){
                  console.log('Message recieved');
                }
                else { 
 
                }
                sessionStorage.setItem('sessionData', null);
                // ws.close();
      };
      ws.onclose = function() {
                console.log('closed');
      };
  },
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
             console.log(httpRequest.response);
             var response=JSON.parse(httpRequest.response);
             var authData = {
                'type': 'auth',
                'data' : {
                    "auth_token" :response.auth_token,
                    "username" : formData.username
                }
            };
            console.log(authData);
            sessionStorage.setItem('sessionData', JSON.stringify(authData));
            //Send to web sockets
            utils.postToWeb(authData);
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