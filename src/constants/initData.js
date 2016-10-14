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
                  "data": "aggregate",
                  "callback": []
                }
              },
              {
                "resource_id": "butlers",
                "details": {
                  "data": "aggregate",
                  "callback": []
                }
              },
              {
                "resource_id": "chargers",
                "details": {
                  "data": "aggregate",
                  "callback": []
                }
              },
              {
                "resource_id": "orders",
                "details": {
                  "data": "aggregate",
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
              }
        ]
},
"users":{
          "type": "subscribe",
          "data": [
                {
                  "resource_id": "users",
                  "details": {
                    "data": "complete",
                    "callback": []
                  }
                },
                
          ]
},
"system":{
          "type": "subscribe",
          "data": [
                {
                  "resource_id": "butlers",
                  "details": {
                    "data": "complete",
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
                    "data": "complete",
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
                    "data": "complete",
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
                    "data": "complete",
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
                    "data": "complete",
                    "callback": []
                  }
            }
		]
},

"inventory":{
          "type": "subscribe",
          "data": [
                {
                  "resource_id": "inventory",
                  "details": {
                    "data": "complete",
                    "callback": []
                  }
                },
                
          ]
},
"orders":{
          "type": "subscribe",
          "data": [
                {
                  "resource_id": "orders",
                  "details": {
                    "data": "complete",
                    "callback": []
                  }
                },
                
          ]
}
}




