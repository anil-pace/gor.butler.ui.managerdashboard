const StateGet={        
  WsParse:function(state,res)
  {     
        if(res.resource_type === "pps"){
         var pick = 0, put = 0, audit = 0, inactive = 0;
         if(res.hasOwnProperty('data')){
          res.data.map(function(key, index){
                            if(key.pps_mode == 'pick'){
                                pick = pick + 1;
                            }else if(key.pps_mode == 'put'){
                                put = put + 1;
                            }else if(key.pps_mode == 'audit'){
                                audit = audit + 1
                            }
                            if(key.pps_active == false){
                                inactive = inactive + 1;
                            }
                            var key = {
                                "id" : key.pps_id,
                                "mode" : key.pps_mode
                            }                            
                        })
        }
                        var ppsKey = {
                            "pick" : pick,
                            "put": put,
                            "audit" : audit,
                            "inactive" : inactive
                        }
        console.log(ppsKey);
        return Object.assign({}, state, {
            "ppsData" : ppsKey
        })
        }
         // else if(res.resource_type === "butlers"){
         //                var pick_or_put = 0, audit = 0, idle = 0, dead = 0, charging= 0;
         // if(res.hasOwnProperty('data')){
         //                res.data.map(function(key, index){
                           
         //                    if(key.status == 'dead' || key.status == 'initializing'){
         //                        dead = dead + 1
         //                    }else{
         //                        if(key.tasktype == 'null' || key.tasktype == 'movetask'){
         //                            idle = idle + 1;
         //                        }else if(key.tasktype == 'picktask'){
         //                            pick_or_put = pick_or_put + 1;
         //                        }else if(key.tasktype == 'audittask'){
         //                            audit = audit + 1
         //                        }else if(key.tasktype == 'chargetask'){
         //                            charging = charging + 1
         //                        }
         //                    }
         //                })
         //  }
         //                var botKey = {
         //                    "Pick / Put" : pick_or_put,
         //                    "Audit": audit,
         //                    "Charging" : charging,
         //                    "Inactive" : dead,
         //                    "Idle" : idle
         //                }
         //   console.log("Butlers Data");
         //   console.log(botKey);
         //   return Object.assign({}, state, {
         //       "butlersData" : botKey
         //  })
         // }
        else if(res.resource_type === "chargers"){
              var connected = 0, disconnected = 0;
              if(res.hasOwnProperty('data')){
                        res.data.map(function(key, index){
                            if(key.charger_status == 'disconnected' ){
                                disconnected = disconnected + 1;
                            }else if(key.charger_status == 'connected'){
                                connected = connected + 1;
                            }
                        })
              }
                        var chargersKey = {
                            "Connected" : connected,
                            "Disconnected": disconnected
                        }
            console.log("Chargers Data");
            console.log(chargersKey);
            return Object.assign({}, state, {
             "chargersData" : chargersKey
         })
         }
        else if(res.resource_type === "orders"){
          var status='',avg=0,count_pending=0,eta='',time_current='';
          if(res.hasOwnProperty('aggregate_data')){
              status=res.aggregate_data.status;
              avg=res.aggregate_data.avg_per_hr;
              count_pending=res.aggregate_data.count_pending;
              eta=res.aggregate_data.eta;
              time_current=res.aggregate_data.time_current;            
          }
            var ordersData={
              "status":status,
              "avg":avg,
              "count_pending":count_pending,
              "eta":eta,
              "time_current":time_current            
            }
          console.log('Orders data: ');
          console.log(ordersData);
            return Object.assign({}, state, {
            "ordersData" : ordersData
            })
        }

         else if(res.resource_type === "inventory"){
          var avail_volume=0,count_put=0,util_perc=0,util_vol=0,count_pick=0,avail_sku=0,stock_current=0,open_stock=0;
          if(res.hasOwnProperty('aggregate_data')){
              avail_volume=res.aggregate_data.total_available_volume;
              count_put=res.aggregate_data.count_put;
              util_perc=res.aggregate_data.total_utilized_percentage;
              util_vol=res.aggregate_data.total_utilized_volume;
              count_pick=res.aggregate_data.count_pick;
              avail_sku=res.aggregate_data.available_skus;
              stock_current=res.aggregate_data.stock_current;
              open_stock=res.aggregate_data.open_stock;                          
          }
            var ivData={
              "avail_volume":avail_volume,
              "count_put":count_put,
              "util_perc":util_perc,
              "util_vol":util_vol,
              "count_pick":count_pick,
              "avail_sku":avail_sku,
              "stock_current":stock_current,
              "open_stock":open_stock                          
            }

          console.log('Inventory data: ');
          console.log(ivData);
            return Object.assign({}, state, {
            "inventoryData" : ivData
            })
         }

        else if(res.resource_type === "put"){
          var count_complete=0;
          if(res.hasOwnProperty('aggregate_data')){
            count_complete=res.aggregate_data.count_complete;
          }
          console.log("Put Data ");
          console.log(count_complete);  
          return Object.assign({}, state, {
            "putData" : count_complete
          })
        }

        else if(res.resource_type === "pick"){
          var count_complete=0;
          if(res.hasOwnProperty('aggregate_data')){
            count_complete=res.aggregate_data.count_complete;
          }
          console.log("Pick Data ");
          console.log(count_complete);  
          return Object.assign({}, state, {
            "pickData" : count_complete
          })
        }

        else{
          return Object.assign({}, state, {
            "socketConnected": true,
            "initDataSent":true,
            "socketData" : res
        })
        }
  }
}

export {StateGet};
