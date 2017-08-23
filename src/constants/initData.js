export const wsOverviewData={
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
                  "resource_id": "zones",
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
"zoning":{
          "type": "subscribe",
          "data": [
                {
                  "resource_id": "zones",
                  "details": {
                    "data": "complete_v2",
                    "callback": []
                  }
                },
                {
                  "resource_id": "zones",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "emergency",
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
                  "resource_id": "waves",
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
"controllers": {
          "type": "subscribe",
          "data": [
                {
                  "resource_id": "controllers",
                  "details": {
                    "data": "complete_v2",
                    "callback": [],
                    "filter_params": {
                    }

                  }
                },
                {
                  "resource_id": "zones",
                  "details": {
                    "data": "header",
                    "callback": []
                  }
                },
                {
                  "resource_id": "emergency",
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
                  "resource_id": "waves",
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





