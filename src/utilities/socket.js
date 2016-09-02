  const sock = {
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
  }
}
export {sock};