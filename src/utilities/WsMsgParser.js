/**
 * Importing mock data and constants for data parcing
 */
import {PARSE_PPS,PARSE_PPA_THROUGHPUT,PARSE_BUTLERS,PARSE_CHARGERS,PARSE_ORDERS,PARSE_INVENTORY,PARSE_PUT,PARSE_PICK} from '../constants/appConstants'



/**
 * [Function for parsing]
 * @param {[Object]} res [Response recieved from Mock/WS]
 */
export function WsParse(res)
  {     
        //Shared data variable initialization
        var throughput = {},totalPut = 0;
        
        function processPPSData(response){
            var aggData = response["aggregate_data"] || [];
            for(let i = 0;i<aggData.length ; i++ ){
              if(aggData[i].hasOwnProperty("pps_mode") && aggData[i]["pps_mode"] === "put"){
                totalPut++;
              }
            }
        }
        
        if(res.resource_type === PARSE_PPA_THROUGHPUT){
          if(res.aggregate_data){
            throughput["put_throughput"] = res.aggregate_data["put_throughput"];
            throughput["pick_throughput"] = res.aggregate_data["pick_throughput"];
            throughput["audit_throughput"] = res.aggregate_data["audit_throughput"];
          }
        }
        else if(res.resource_type === PARSE_PPS){
         let ppsData={};
         processPPSData(res);
         /*let pick = 0, put = 0, audit = 0, inactive = 0;
         res.data = mockData.resTypePPS.data;
         if(res.data){
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
                        var ppsData= {
                            "pick" : pick,
                            "put": put,
                            "audit" : audit,
                            "inactive" : inactive
                        }*/

       
            return ppsData
      
        }
         else if(res.resource_name === PARSE_BUTLERS){
        let pick_or_put = 0, audit = 0, idle = 0, dead = 0, charging= 0;
         res.data = mockData.resTypeButlers.data;
         if(res.data){
                        res.data.map(function(key, index){
                           
                            if(key.status === 'dead' || key.status === 'initializing'){
                                dead = dead + 1
                            }else{
                                if(key.tasktype === 'null' || key.tasktype === 'movetask'){
                                    idle = idle + 1;
                                }else if(key.tasktype == 'picktask'){
                                    pick_or_put = pick_or_put + 1;
                                }else if(key.tasktype == 'audittask'){
                                    audit = audit + 1
                                }else if(key.tasktype == 'chargetask'){
                                    charging = charging + 1
                                }
                            }
                        })
          }
                        let botKey = {
                            "Pick / Put" : pick_or_put,
                            "Audit": audit,
                            "Charging" : charging,
                            "Inactive" : dead,
                            "Idle" : idle
                        }
           
           return Object.assign({}, state, {
               "butlersData" : botKey
          })
         }
        else if(res.resource_name === PARSE_CHARGERS){
              let connected = 0, disconnected = 0;
              res.data = mockData.resTypeChargers.data;
              if(res.data){
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
            // console.log("Chargers Data");
            // console.log(chargersKey);
            return Object.assign({}, state, {
            "chargersData" : chargersKey
         })
         }
        else if(res.resource_name === PARSE_ORDERS){
          let status='',avg=0,count_pending=0,eta='',time_current='';
          res.aggregate_data = mockData.resTypeOrders.aggregate_data;
          if(res.aggregate_data){
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
          
            return Object.assign({}, state, {
            "ordersData" : ordersData
            })
        }

         else if(res.resource_name === PARSE_INVENTORY){
          let avail_volume=0,count_put=0,util_perc=0,util_vol=0,count_pick=0,avail_sku=0,stock_current=0,open_stock=0;
          res.aggregate_data = mockData.resTypeInventory1.aggregate_data;
          if(res.aggregate_data){
              avail_volume=res.aggregate_data.total_available_volume;
              count_put=res.aggregate_data.count_put;
              util_perc=res.aggregate_data.total_utilized_percentage;
              util_vol=res.aggregate_data.total_utilized_volume;
              count_pick=res.aggregate_data.count_pick;
              avail_sku=res.aggregate_data.available_skus;
              stock_current=res.aggregate_data.stock_current;
              open_stock=res.aggregate_data.open_stock;                          
          }
            let ivData={
              "avail_volume":avail_volume,
              "count_put":count_put,
              "util_perc":util_perc,
              "util_vol":util_vol,
              "count_pick":count_pick,
              "avail_sku":avail_sku,
              "stock_current":stock_current,
              "open_stock":open_stock                          
            }

          
            return Object.assign({}, state, {
            "inventoryData" : ivData
            })
         }

        else if(res.resource_name === PARSE_PUT){
          let putObj={};
          
          if(res.aggregate_data){
              if(!res.aggregate_data.items_put){
                putObj.value = "None";
                putObj.heading = "Items to Stock"
                putObj.low="Offline"
              }
              else{
                putObj.value = res.aggregate_data.items_put;
                putObj.low= totalPut ? totalPut+ "PPS stocking 342 items/hr" : "Starting...";
              }
              putObj.count_complete=res.aggregate_data.count_complete;
              putObj.heading = "Items to Stock";
              putObj.logo = "iStock";
            
          }
          
          return putObj;
        }

        else if(res.resource_name === PARSE_PICK){
          let count_complete=0;
          res.aggregate_data = mockData.resTypePick.aggregate_data;
          if(res.aggregate_data){
            count_complete=res.aggregate_data.count_complete;
          }
            
          return Object.assign({}, state, {
            "pickData" : count_complete
          })
        }

        else{
          return  {
            "socketConnected": true,
            "initDataSent":true,
            "socketData" : res
        }
        }
  }

