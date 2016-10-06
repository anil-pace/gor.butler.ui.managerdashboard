export const wsInitData = {
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
                  "resource_id": "put_details",
                  "details": {
                    "data": "aggregate",
                    "callback": []
                  }
                },
                // {
                //   "resource_id": "butler_details",
                //   "details": {
                //     "data": "aggregate",
                //     "callback": []
                //   }
                // },
                {
                  "resource_id": "charger_details",
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
                  "resource_id": "charger_details",
                  "details": {
                    "data": "complete",
                    "callback": []
                  }
                },
                // {
                //   "resource_id": "butler_details",  
                //   "details": {
                //     "data": "complete",
                //     "callback": []
                //   }
                // },
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