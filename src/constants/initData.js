export const wsOverviewData = {
	"default":{
          "type": "subscribe",
        "data": [
         
              {
                "resource_id": "overview",
                "details": {
                  "data": "histogram",
                  "callback": []
                }
              },
              {
                "resource_id": "put",
                "details": {
                  "data": "aggregate_v2",
                  "callback": []
                }
              },
              {
                "resource_id": "butlers",
                "details": {
                  "data": "aggregate_v2",
                  "callback": []
                }
              },
              {
                "resource_id": "chargers",
                "details": {
                  "data": "aggregate_v2",
                  "callback": []
                }
              },
              {
                "resource_id": "orders",
                "details": {
                  "data": "aggregate_v2",
                  "callback": []
                }
              },
              {
                "resource_id": "overview",
                "details": {
                  "data": "pps_performance",
                  "callback": []
                }
              },
              {
                "resource_id": "overview",
                "details": {
                  "data": "pps_throughput",
                  "callback": []
                }
              },
              
                {
                  "resource_id": "audit",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "overview",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "orders",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "users",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "inventory_today",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "status",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "system",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "audit_agg",
                  "details": {
                    "data": "aggregate_v2",
                    "callback": []
                  }
                }
        ]
},
"users":{
          "type": "subscribe",
          "data": [
                {
                  "resource_id": "users",
                  "details": {
                    "data": "complete_v2",
                    "callback": []
                  }
                },
                {
                  "resource_id": "audit",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "overview",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "orders",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "users",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "inventory_today",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "status",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "system",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                }
          ]
},
"system":{
          "type": "subscribe",
          "data": [
                {
                  "resource_id": "butlers",
                  "details": {
                    "data": "complete_v2",
                    "callback": []
                  }
                },
                {
                  "resource_id": "audit",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "overview",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "orders",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "users",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "inventory_today",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "status",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "system",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                }
          ]
},
"pps":{
          "type": "subscribe",
          "data": [
                {
                  "resource_id": "pps",
                  "details": {
                    "data": "complete_v2",
                    "callback": [],
                    "filter_params": {
                      "pps_id": ['=', '1']
                    }
                  }
                },
                {
                  "resource_id": "audit",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "overview",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "orders",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "users",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "inventory_today",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "status",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "system",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                }
          ]
},
"chargingstation":{
	"type": "subscribe",
		"data":[
			{
                  "resource_id": "chargers",
                  "details": {
                    "data": "complete_v2",
                    "callback": []
                  }
            },
                {
                  "resource_id": "audit",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "overview",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "orders",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "users",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "inventory_today",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "status",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "system",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                }
		]
},
"notification":{
		"type": "subscribe",
		"data":[
			{
                  "resource_id": "notification",
                  "details": {
                    "data": "complete_v2",
                    "callback": []
                  }
            },
                {
                  "resource_id": "audit",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "overview",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "orders",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "users",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "inventory_today",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "status",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "system",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                }
		]
},
"butlerbots":{
		"type": "subscribe",
		"data":[
			{
                  "resource_id": "butlers",
                  "details": {
                    "data": "complete_v2",
                    "callback": []
                  }
            },
                {
                  "resource_id": "audit",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "overview",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "orders",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "users",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "inventory_today",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "status",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "system",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                }
		]
},

"inventory":{
          "type": "subscribe",
          "data": [
                
                {

                  "resource_id": "inventory_today",
                  "details": {
                    "data": "complete_v2",
                    "callback": []
                  }
                },
                {
                  "resource_id": "inventory_history",
                  "details": {
                    "data": "complete_v2",
                    "callback": []
                  }
                },
                {
                  "resource_id": "audit",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "overview",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "orders",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "users",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "inventory_today",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "status",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "system",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                }
                
          ]
},
"waves":{
          "type": "subscribe",
          "data": [
                {
                  "resource_id": "orders",
                  "details": {
                    "data": "complete_v2",
                    "callback": []
                  }
                },
                {
                  "resource_id": "audit",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "overview",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "orders",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "users",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "inventory_today",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "status",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "system",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                }
          ]
},

"orders":{
          "type": "subscribe",
          "data": [
                {
                  "resource_id": "orders",
                  "details": {
                    "data": "complete_v2",
                    "callback": []
                  }
                },
                {
                  "resource_id": "audit",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "overview",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "orders",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "users",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "inventory_today",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "status",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "system",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                }
          ]
}
}




