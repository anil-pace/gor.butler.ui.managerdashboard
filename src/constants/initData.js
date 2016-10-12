export const wsOverviewData = {
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
                "resource_id": "chargers",
                "details": {
                  "data": "complete",
                  "callback": []
                }
              },
              {
                "resource_id": "butler",  
                "details": {
                  "data": "complete",
                  "callback": []
                }
              },
              {
                "resource_id": "pps",
                "details": {
                  "data": "complete",
                  "callback": []
                }
              },
              {
                "resource_id": "users",
                "details": {
                  "data": "complete",
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
        ]
}

export const wsUsersData = {
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
}


