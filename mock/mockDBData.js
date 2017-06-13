

export const resTypePut={
	"aggregate_data": {
		"items_put": 256789
	},
	"resource_type": "put"
};

export const resTypeThroughPut={
	"aggregate_data": {
		"put_throughput": 3556,
		"pick_throughput": 3546,
		"audit_throughput": 2400 // to get clarification for audit 
	},
	"resource_type": "put_pick_audit_throughput"
}
export const resTypeAudit={
	"aggregate_data": {
			"audit_type":null,		
			"total_audited": 20687
			},
	"resource_type": "audit"
}

export const resTypePick={
	"aggregate_data": {
		"count_complete": 0
	},
	"resource_type": "pick"
};


export const resTypeInventory1={
	"aggregate_data": {
		"total_available_volume": 0,
		"count_put": 0,
		"total_utilized_percentage": 0,
		"total_utilized_volume": 0,
		"count_pick": 0,
		"available_skus": 1,
		"stock_current": 8,
		"open_stock": 15
	},
	"resource_type": "inventory"
}
export const resTypeOrders={
    "aggregate_data": {
        "pending_orders": 100,   
        "cut_off_time": 170,   
        "estimated_completion_time": 20, 
        "orders_at_risk":0,   
        "wave_ending_time":'21-30-57 (IST)' 
    },
    "resource_type": "orders"
}
export const resTypeChargers={
	"data": [{
		"charger_mode": "manual",
		"charger_id": "1",
		"charger_status": "disconnected"
	}, {
		"charger_mode": "manual",
		"charger_id": "2",
		"charger_status": "disconnected"
	}, {
		"charger_mode": "manual",
		"charger_id": "4",
		"charger_status": "disconnected"
	}, {
		"charger_mode": "manual",
		"charger_id": "5",
		"charger_status": "disconnected"
	}, {
		"charger_mode": "manual",
		"charger_id": "3",
		"charger_status": "disconnected"
	}, {
		"charger_mode": "manual",
		"charger_id": "6",
		"charger_status": "disconnected"
	}],
	"resource_type": "chargers"
}

export const resTypeButlersData={
	"data": [{
		"status": "ready",
		"display_id": "undefined",
		"direction": 0,
		"deltas": [0, 0, 0],
		"navstatus": "init",
		"address": "127.0.0.1",
		"paused": false,
		"state": "online",
		"taskkey": null,
		"voltage": 0,
		"tasktype": "null",
		"error_desc": "no_error",
		"position": "019.014",
		"current_subtask": "undefined",
		"butler_id": "1"
	}, {
		"status": "processing",
		"display_id": "undefined",
		"direction": 1,
		"deltas": [0, 0, 0],
		"navstatus": "info",
		"address": "127.0.0.1",
		"paused": false,
		"state": "online",
		"taskkey": "41c8ac5d-0762-42ea-9cda-4360d54512fd",
		"voltage": 0,
		"tasktype": "audittask",
		"error_desc": "no_error",
		"position": "018.022",
		"current_subtask": "pps_control",
		"butler_id": "2"
	}, {
		"status": "processing",
		"display_id": "undefined",
		"direction": 2,
		"deltas": [0, 0, 0],
		"navstatus": "info",
		"address": "127.0.0.1",
		"paused": false,
		"state": "online",
		"taskkey": "2bd7e683-3951-46c1-ad6b-9671b50331d3",
		"voltage": 0,
		"tasktype": "audittask",
		"error_desc": "no_error",
		"position": "019.024",
		"current_subtask": "goto_barcode",
		"butler_id": "3"
	}, {
		"status": "processing",
		"display_id": "undefined",
		"direction": 1,
		"deltas": [0, 0, 0],
		"navstatus": "info",
		"address": "127.0.0.1",
		"paused": false,
		"state": "online",
		"taskkey": "34b6fd43-4d95-4f30-808b-74fc4312e083",
		"voltage": 0,
		"tasktype": "audittask",
		"error_desc": "no_error",
		"position": "018.023",
		"current_subtask": "goto_barcode",
		"butler_id": "4"
	}, {
		"status": "ready",
		"display_id": "undefined",
		"direction": 0,
		"deltas": [0, 0, 0],
		"navstatus": "info",
		"address": "127.0.0.1",
		"paused": false,
		"state": "online",
		"taskkey": null,
		"voltage": 0,
		"tasktype": "null",
		"error_desc": "no_error",
		"position": "022.013",
		"current_subtask": "undefined",
		"butler_id": "5"
	}, {
		"status": "ready",
		"display_id": "undefined",
		"direction": 0,
		"deltas": [0, 0, 0],
		"navstatus": "init",
		"address": "127.0.0.1",
		"paused": false,
		"state": "online",
		"taskkey": null,
		"voltage": 0,
		"tasktype": "null",
		"error_desc": "no_error",
		"position": "044.035",
		"current_subtask": "undefined",
		"butler_id": "6"
	}, {
		"status": "ready",
		"display_id": "undefined",
		"direction": 0,
		"deltas": [0, 0, 0],
		"navstatus": "init",
		"address": "127.0.0.1",
		"paused": false,
		"state": "online",
		"taskkey": null,
		"voltage": 0,
		"tasktype": "null",
		"error_desc": "no_error",
		"position": "039.015",
		"current_subtask": "undefined",
		"butler_id": "7"
	}, {
		"status": "ready",
		"display_id": "undefined",
		"direction": 0,
		"deltas": [0, 0, 0],
		"navstatus": "init",
		"address": "127.0.0.1",
		"paused": false,
		"state": "online",
		"taskkey": null,
		"voltage": 0,
		"tasktype": "null",
		"error_desc": "no_error",
		"position": "019.011",
		"current_subtask": "undefined",
		"butler_id": "8"
	}, {
		"status": "ready",
		"display_id": "undefined",
		"direction": 0,
		"deltas": [0, 0, 0],
		"navstatus": "init",
		"address": "127.0.0.1",
		"paused": false,
		"state": "online",
		"taskkey": null,
		"voltage": 0,
		"tasktype": "null",
		"error_desc": "no_error",
		"position": "033.012",
		"current_subtask": "undefined",
		"butler_id": "9"
	}, {
		"status": "ready",
		"display_id": "undefined",
		"direction": 0,
		"deltas": [0, 0, 0],
		"navstatus": "init",
		"address": "127.0.0.1",
		"paused": false,
		"state": "online",
		"taskkey": null,
		"voltage": 0,
		"tasktype": "null",
		"error_desc": "no_error",
		"position": "040.035",
		"current_subtask": "undefined",
		"butler_id": "10"
	}, {
		"status": "ready",
		"display_id": "undefined",
		"direction": 0,
		"deltas": [0, 0, 0],
		"navstatus": "init",
		"address": "127.0.0.1",
		"paused": false,
		"state": "online",
		"taskkey": null,
		"voltage": 0,
		"tasktype": "null",
		"error_desc": "no_error",
		"position": "026.016",
		"current_subtask": "undefined",
		"butler_id": "11"
	}, {
		"status": "ready",
		"display_id": "undefined",
		"direction": 0,
		"deltas": [0, 0, 0],
		"navstatus": "init",
		"address": "127.0.0.1",
		"paused": false,
		"state": "online",
		"taskkey": null,
		"voltage": 0,
		"tasktype": "null",
		"error_desc": "no_error",
		"position": "037.027",
		"current_subtask": "undefined",
		"butler_id": "12"
	}, {
		"status": "processing",
		"display_id": "undefined",
		"direction": 1,
		"deltas": [0, 0, 0],
		"navstatus": "info",
		"address": "127.0.0.1",
		"paused": false,
		"state": "online",
		"taskkey": "1cc5249d-38c0-4716-8335-b3b3ffb99b29",
		"voltage": 0,
		"tasktype": "picktask",
		"error_desc": "no_error",
		"position": "018.034",
		"current_subtask": "pps_control",
		"butler_id": "13"
	}, {
		"status": "ready",
		"display_id": "undefined",
		"direction": 0,
		"deltas": [0, 0, 0],
		"navstatus": "init",
		"address": "127.0.0.1",
		"paused": false,
		"state": "online",
		"taskkey": null,
		"voltage": 0,
		"tasktype": "null",
		"error_desc": "no_error",
		"position": "030.013",
		"current_subtask": "undefined",
		"butler_id": "14"
	}, {
		"status": "ready",
		"display_id": "undefined",
		"direction": 0,
		"deltas": [0, 0, 0],
		"navstatus": "init",
		"address": "127.0.0.1",
		"paused": false,
		"state": "online",
		"taskkey": null,
		"voltage": 0,
		"tasktype": "null",
		"error_desc": "no_error",
		"position": "041.032",
		"current_subtask": "undefined",
		"butler_id": "15"
	}],
	"resource_type": "butlers"
};



export const resTypeInventory2={
	"aggregate_data": {
		"total_available_volume": 0,
		"count_put": 0,
		"total_utilized_percentage": 0,
		"total_utilized_volume": 0,
		"count_pick": 0,
		"available_skus": 1,
		"stock_current": 8,
		"open_stock": 15
	},
	"resource_type": "inventory"
};

export const resTypeHistogram={
	"aggregate_data": [{
		"start_time": "0",
		"items_audited": 0,
		"end_time": "1",
		"orders_completed": 0,
		"items_put": null
	}, {
		"start_time": "1",
		"items_audited": 0,
		"end_time": "2",
		"orders_completed": 0,
		"items_put": null
	}, {
		"start_time": "2",
		"items_audited": 0,
		"end_time": "3",
		"orders_completed": 0,
		"items_put": null
	}, {
		"start_time": "3",
		"items_audited": 0,
		"end_time": "4",
		"orders_completed": 0,
		"items_put": null
	}, {
		"start_time": "4",
		"items_audited": 0,
		"end_time": "5",
		"orders_completed": 0,
		"items_put": null
	}, {
		"start_time": "5",
		"items_audited": 0,
		"end_time": "6",
		"orders_completed": 0,
		"items_put": null
	}, {
		"start_time": "6",
		"items_audited": 0,
		"end_time": "7",
		"orders_completed": 0,
		"items_put": null
	}, {
		"start_time": "7",
		"items_audited": 0,
		"end_time": "8",
		"orders_completed": 0,
		"items_put": null
	}, {
		"start_time": "8",
		"items_audited": 0,
		"end_time": "9",
		"orders_completed": 0,
		"items_put": null
	}, {
		"start_time": "9",
		"items_audited": 0,
		"end_time": "10",
		"orders_completed": 0,
		"items_put": null
	}, {
		"start_time": "10",
		"items_audited": 0,
		"end_time": "11",
		"orders_completed": 0,
		"items_put": null
	}, {
		"start_time": "11",
		"items_audited": 0,
		"end_time": "12",
		"orders_completed": 0,
		"items_put": null
	}, {
		"start_time": "12",
		"items_audited": 0,
		"end_time": "13",
		"orders_completed": 0,
		"items_put": null
	}, {
		"start_time": "13",
		"items_audited": 0,
		"end_time": "14",
		"orders_completed": 0,
		"items_put": null
	}, {
		"start_time": "14",
		"items_audited": 0,
		"end_time": "15",
		"orders_completed": 7,
		"items_put": null
	}, {
		"start_time": "15",
		"items_audited": 0,
		"end_time": "16",
		"orders_completed": 1,
		"items_put": null
	}, {
		"start_time": "16",
		"items_audited": 0,
		"end_time": "17",
		"orders_completed": 0,
		"items_put": 1
	}, {
		"start_time": "17",
		"items_audited": 0,
		"end_time": "18",
		"orders_completed": 0,
		"items_put": null
	}],
	"resource_type": "histogram"
}

export const resTypeChargersDetail={
   	 "aggregate_data": [{
   		 "charger_id": 10,
      		 "docked_butler_id": 2
   	 }, {
   		 "charger_id": 12,
      		 "docked_butler_id": 7
   	 }, {
   		 "charger_id": 13,
      		 "docked_butler_id": null
   	 }, {
   		 "charger_id": 10,
      		 "docked_butler_id": 2
   	 }, {
   		 "charger_id": 12,
      		 "docked_butler_id": 7
   	 }, {
   		 "charger_id": 13,
      		 "docked_butler_id": null
   	 }, {
   		 "charger_id": 10,
      		 "docked_butler_id": 2
   	 }, {
   		 "charger_id": 12,
      		 "docked_butler_id": 7
   	 }, {
   		 "charger_id": 13,
      		 "docked_butler_id": null
   	 }, {
   		 "charger_id": 10,
      		 "docked_butler_id": 2
   	 }, {
   		 "charger_id": 12,
      		 "docked_butler_id": 7
   	 }, {
   		 "charger_id": 13,
      		 "docked_butler_id": null
   	 }, {
   		 "charger_id": 10,
      		 "docked_butler_id": 2
   	 }, {
   		 "charger_id": 12,
      		 "docked_butler_id": 7
   	 }, {
   		 "charger_id": 13,
      		 "docked_butler_id": null
   	 }, {
   		 "charger_id": 10,
      		 "docked_butler_id": 2
   	 }, {
   		 "charger_id": 12,
      		 "docked_butler_id": 7
   	 }, {
   		 "charger_id": 13,
      		 "docked_butler_id": null
   	 }, {
   		 "charger_id": 10,
      		 "docked_butler_id": 2
   	 }, {
   		 "charger_id": 12,
      		 "docked_butler_id": 7
   	 }, {
   		 "charger_id": 13,
      		 "docked_butler_id": null
   	 }],
   	 "resource_type": "system_chargers_details"
}

export const resTypeButlerDetail={
   	 
   	 "aggregate_data": [{
   		 "butler_id": 9,
   		  "current_task": 0, 
          "current_subtask": 0, 
   		 "msu_id": 12,
                        "pps_id": 19,
                        "charger_id": 2, 
   		 "location": "018.012",
   		 "voltage": 29.7
   	 }, {
   		 "butler_id": 110,
   		 "current_task": 1, 
                        "current_subtask": 1, 
   		 "msu_id": 10,
                        "pps_id": 17,
                        "charger_id": 11, 
   		 "location": "028.022",
   		 "voltage": 240.5
   	 }, {
   		 "butler_id": 9,
   		  "current_task": 0, 
          "current_subtask": 0, 
   		 "msu_id": 12,
                        "pps_id": 19,
                        "charger_id": 2, 
   		 "location": "018.012",
   		 "voltage": 29.7
   	 }, {
   		 "butler_id": 110,
   		 "current_task": 1, 
                        "current_subtask": 1, 
   		 "msu_id": 10,
                        "pps_id": 17,
                        "charger_id": 11, 
   		 "location": "028.022",
   		 "voltage": 240.5
   	 }, {
   		 "butler_id": 9,
   		  "current_task": 0, 
          "current_subtask": 0, 
   		 "msu_id": 12,
                        "pps_id": 19,
                        "charger_id": 2, 
   		 "location": "018.012",
   		 "voltage": 29.7
   	 }, {
   		 "butler_id": 110,
   		 "current_task": 1, 
                        "current_subtask": 1, 
   		 "msu_id": 10,
                        "pps_id": 17,
                        "charger_id": 11, 
   		 "location": "028.022",
   		 "voltage": 240.5
   	 }, {
   		 "butler_id": 9,
   		  "current_task": 0, 
          "current_subtask": 0, 
   		 "msu_id": 12,
                        "pps_id": 19,
                        "charger_id": 2, 
   		 "location": "018.012",
   		 "voltage": 29.7
   	 }, {
   		 "butler_id": 110,
   		 "current_task": 1, 
                        "current_subtask": 1, 
   		 "msu_id": 10,
                        "pps_id": 17,
                        "charger_id": 11, 
   		 "location": "028.022",
   		 "voltage": 240.5
   	 }, {
   		 "butler_id": 9,
   		  "current_task": 0, 
          "current_subtask": 0, 
   		 "msu_id": 12,
                        "pps_id": 19,
                        "charger_id": 2, 
   		 "location": "018.012",
   		 "voltage": 29.7
   	 }, {
   		 "butler_id": 110,
   		 "current_task": 1, 
                        "current_subtask": 1, 
   		 "msu_id": 10,
                        "pps_id": 17,
                        "charger_id": 11, 
   		 "location": "028.022",
   		 "voltage": 240.5
   	 }, {
   		 "butler_id": 9,
   		  "current_task": 0, 
          "current_subtask": 0, 
   		 "msu_id": 12,
                        "pps_id": 19,
                        "charger_id": 2, 
   		 "location": "018.012",
   		 "voltage": 29.7
   	 }, {
   		 "butler_id": 110,
   		 "current_task": 1, 
                        "current_subtask": 1, 
   		 "msu_id": 10,
                        "pps_id": 17,
                        "charger_id": 11, 
   		 "location": "028.022",
   		 "voltage": 240.5
   	 }, {
   		 "butler_id": 9,
   		  "current_task": 0, 
          "current_subtask": 0, 
   		 "msu_id": 12,
                        "pps_id": 19,
                        "charger_id": 2, 
   		 "location": "018.012",
   		 "voltage": 29.7
   	 }, {
   		 "butler_id": 110,
   		 "current_task": 1, 
                        "current_subtask": 1, 
   		 "msu_id": 10,
                        "pps_id": 17,
                        "charger_id": 11, 
   		 "location": "028.022",
   		 "voltage": 240.5
   	 }, {
   		 "butler_id": 9,
   		  "current_task": 0, 
          "current_subtask": 0, 
   		 "msu_id": 12,
                        "pps_id": 19,
                        "charger_id": 2, 
   		 "location": "018.012",
   		 "voltage": 29.7
   	 }, {
   		 "butler_id": 110,
   		 "current_task": 1, 
                        "current_subtask": 1, 
   		 "msu_id": 10,
                        "pps_id": 17,
                        "charger_id": 11, 
   		 "location": "028.022",
   		 "voltage": 240.5
   	 }
   	 ],
   	 "resource_type": "system_butlers_details"
 }

export const resTypePPSdetail={ 
   	 "aggregate_data": [{
   		 "pps_id": 10,
   		 "pps_status": 1,
   		 "current_task": 0,
   		 "performance": 120,  
   		 "operators_assigned": ["Aarush Tulip, ", "Aman Sharma "]
   	 }, {
   		 "pps_id": 13,
   		 "pps_status": 0,
   		 "current_task": 2, 
   		 "performance": 320, 
   		 "operators_assigned": ["Aarush Tulip, ", "Ajay singh "]
   	 }, {
   		 "pps_id": 10,
   		 "pps_status": 1,
   		 "current_task": 0,
   		 "performance": 120,  
   		 "operators_assigned": ["Aarush Tulip, ", "Aman Sharma "]
   	 }, {
   		 "pps_id": 13,
   		 "pps_status": 0,
   		 "current_task": 2, 
   		 "performance": 320, 
   		 "operators_assigned": ["Aarush Tulip, ", "Ajay singh "]
   	 }, {
   		 "pps_id": 10,
   		 "pps_status": 1,
   		 "current_task": 0,
   		 "performance": 120,  
   		 "operators_assigned": ["Aarush Tulip, ", "Aman Sharma "]
   	 }, {
   		 "pps_id": 13,
   		 "pps_status": 0,
   		 "current_task": 2, 
   		 "performance": 320, 
   		 "operators_assigned": ["Aarush Tulip, ", "Ajay singh "]
   	 }, {
   		 "pps_id": 10,
   		 "pps_status": 1,
   		 "current_task": 0,
   		 "performance": 120,  
   		 "operators_assigned": ["Aarush Tulip, ", "Aman Sharma "]
   	 }, {
   		 "pps_id": 13,
   		 "pps_status": 0,
   		 "current_task": 2, 
   		 "performance": 320, 
   		 "operators_assigned": ["Aarush Tulip, ", "Ajay singh "]
   	 }, {
   		 "pps_id": 10,
   		 "pps_status": 1,
   		 "current_task": 0,
   		 "performance": 120,  
   		 "operators_assigned": ["Aarush Tulip, ", "Aman Sharma "]
   	 }, {
   		 "pps_id": 13,
   		 "pps_status": 0,
   		 "current_task": 2, 
   		 "performance": 320, 
   		 "operators_assigned": ["Aarush Tulip, ", "Ajay singh "]
   	 }, {
   		 "pps_id": 10,
   		 "pps_status": 1,
   		 "current_task": 0,
   		 "performance": 120,  
   		 "operators_assigned": ["Aarush Tulip, ", "Aman Sharma "]
   	 }, {
   		 "pps_id": 13,
   		 "pps_status": 0,
   		 "current_task": 2, 
   		 "performance": 320, 
   		 "operators_assigned": ["Aarush Tulip, ", "Ajay singh "]
   	 }, {
   		 "pps_id": 10,
   		 "pps_status": 1,
   		 "current_task": 0,
   		 "performance": 120,  
   		 "operators_assigned": ["Aarush Tulip, ", "Aman Sharma "]
   	 }, {
   		 "pps_id": 13,
   		 "pps_status": 0,
   		 "current_task": 2, 
   		 "performance": 320, 
   		 "operators_assigned": ["Aarush Tulip, ", "Ajay singh "]
   	 },
   	  ],
   	 "resource_type": "system_pps_details"
 }

 export const resTypePPSperformance={ 
	"aggregate_data": [{
		"pps_id": 1,
                	"time_unit": "per_hour",
		"orders_picked": 500,
		"items_picked": 800, 
		"items_put": 400,
		"items_audited": 300,
		"pps_mode": "put",
		"active": true
	},{
		"pps_id": 2,
                	"time_unit": "per_hour",
		"orders_picked": 500,
		"items_picked": 900,
		"items_put": 500,
		"items_audited": 570,
		"pps_mode": "pick",
		"active": true
	}, {
		"pps_id": 3,
                	"time_unit": "per_hour",
		"orders_picked": 500,
		"items_picked": 800,
		"items_put": 600,
		"items_audited": 770,
		"pps_mode": "put",
		"active": false
	}, {
		"pps_id": 4,
                	"time_unit": "per_hour",
		"orders_picked": 500,
		"items_picked": 900,
		"items_put": 700,
		"items_audited": 870,
		"pps_mode": "audit",
		"active": true
	}
	],
	"resource_type": "pps"
}


export const resTypeUsersDetails={
    
    "resource_type": "users",
	"complete_data": [{


		"user_id": 10,
		"user_name": "Ajay Singh",
		"login_time": "2016-10-05 18:20:33.372221",
		"role": "manager",
		"logged_in": true,
		"pps": {
			"pps_id": 1,
			"seat_type": "back",
			"pps_mode": "put"
		}
	}] 

}

export const resTypeNotify={
  "alert_data": [
    {
      "code": "us001",
      "description": "Username already registered",
      "details": [],
      "level": "error"
    }]
};

export const resTypeSnapShot={
  "categories": [
    {
      "colorCode": "#7983E6",
      "name":"Apparel",
      "cbm": 10,
      "daysHand": 1.4
    },
    {
      "colorCode": "#89AE51",
      "name":"Shoes",
      "cbm": 10,
      "daysHand": 1.4
    },
    {
      "colorCode": "#D2BA3F",
      "name":"Cosmetics",
      "cbm": 10,
      "daysHand": 1.4
    },
    {
      "colorCode": "#A44550",
      "name":"Books",
      "cbm": 10,
      "daysHand": 1.4
    },
    {
      "colorCode": "#8F39EC",
      "name":"Electronics",
      "cbm": 10,
      "daysHand": 1.4
    },
    {
      "colorCode": "#C1C1C1",
      "name":"Others",
      "cbm": 10,
      "daysHand": 1.4
    }],
    "legendData" : {
		"data":[{"name":"Pick","color":"#C69332"},{"name":"Put","color":"#5B62BC"}],
		"config":{
			"ypos":10,
			"xpos":20,
			"xIncrement":80
		}
	},
    "total_space":1000,
    "remaining_space":40,
    "resource_type": "inventory"
};

export const resTypeSnapShotToday={
	"complete_data": [{
		"total_skus": 330,
		"opening_stock": 5813,
		"cbm_used": 18.36,
		"warehouse_utilization": 19.88,
		"date": "2017-06-13T03:47:13.776081+00:00",
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.36,
			"warehouse_utilization": 1.94,
			"days_on_hand": null
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.29,
			"warehouse_utilization": 1.56,
			"days_on_hand": null
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"warehouse_utilization": 1.42,
			"days_on_hand": null
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"warehouse_utilization": 1.03,
			"days_on_hand": null
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"warehouse_utilization": 1.03,
			"days_on_hand": null
		}],
		"items_picked": 0,
		"items_put": 0
	}],
	"resource_type": "inventory_today"
}

export const resTypeSnapShotHistory={
	"complete_data": [{
		"total_skus": 330,
		"cbm_used": 18.36,
		"warehouse_utilization": 19.88,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.36,
			"days_on_hand": null,
			"warehouse_utilization": 1.94
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.29,
			"days_on_hand": null,
			"warehouse_utilization": 1.56
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.42
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.03
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.03
		}],
		"opening_stock": 5579,
		"date": "2017-06-12T15:30:00.089248+00:00",
		"items_picked": 413,
		"items_put": 647
	}, {
		"total_skus": 324,
		"cbm_used": 17.39,
		"warehouse_utilization": 18.83,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.35,
			"days_on_hand": null,
			"warehouse_utilization": 2.0
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.28,
			"days_on_hand": null,
			"warehouse_utilization": 1.6
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.5
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.09
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.05
		}],
		"opening_stock": 5579,
		"date": "2017-06-11T15:30:00.072243+00:00",
		"items_picked": 0,
		"items_put": 0
	}, {
		"total_skus": 324,
		"cbm_used": 17.39,
		"warehouse_utilization": 18.83,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.35,
			"days_on_hand": null,
			"warehouse_utilization": 2.0
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.28,
			"days_on_hand": null,
			"warehouse_utilization": 1.6
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.5
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.09
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.05
		}],
		"opening_stock": 5724,
		"date": "2017-06-10T15:30:00.039933+00:00",
		"items_picked": 525,
		"items_put": 388
	}, {
		"total_skus": 327,
		"cbm_used": 17.99,
		"warehouse_utilization": 19.48,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.36,
			"days_on_hand": null,
			"warehouse_utilization": 1.98
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.29,
			"days_on_hand": null,
			"warehouse_utilization": 1.59
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.45
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.03
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.05
		}],
		"opening_stock": 5689,
		"date": "2017-06-09T15:30:00.394322+00:00",
		"items_picked": 647,
		"items_put": 689
	}, {
		"total_skus": 327,
		"cbm_used": 17.91,
		"warehouse_utilization": 19.39,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.36,
			"days_on_hand": null,
			"warehouse_utilization": 1.99
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.29,
			"days_on_hand": null,
			"warehouse_utilization": 1.6
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.43
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.04
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.06
		}],
		"opening_stock": 5839,
		"date": "2017-06-08T15:30:00.354790+00:00",
		"items_picked": 557,
		"items_put": 428
	}, {
		"total_skus": 329,
		"cbm_used": 17.44,
		"warehouse_utilization": 18.88,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.35,
			"days_on_hand": null,
			"warehouse_utilization": 2.02
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.29,
			"days_on_hand": null,
			"warehouse_utilization": 1.65
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.47
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.1
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.06
		}],
		"opening_stock": 5675,
		"date": "2017-06-01T15:30:00.163385+00:00",
		"items_picked": 84,
		"items_put": 24
	}, {
		"total_skus": 329,
		"cbm_used": 17.72,
		"warehouse_utilization": 19.19,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.35,
			"days_on_hand": null,
			"warehouse_utilization": 1.99
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.29,
			"days_on_hand": null,
			"warehouse_utilization": 1.62
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.45
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.09
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.07
		}],
		"opening_stock": 5458,
		"date": "2017-05-31T15:30:00.110323+00:00",
		"items_picked": 109,
		"items_put": 326
	}, {
		"total_skus": 327,
		"cbm_used": 17.14,
		"warehouse_utilization": 18.56,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.35,
			"days_on_hand": null,
			"warehouse_utilization": 2.05
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.29,
			"days_on_hand": null,
			"warehouse_utilization": 1.68
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.25,
			"days_on_hand": null,
			"warehouse_utilization": 1.47
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.08
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.08
		}],
		"opening_stock": 5203,
		"date": "2017-05-30T15:30:00.128350+00:00",
		"items_picked": 0,
		"items_put": 255
	}, {
		"total_skus": 311,
		"cbm_used": 16.27,
		"warehouse_utilization": 17.62,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.35,
			"days_on_hand": null,
			"warehouse_utilization": 2.16
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.29,
			"days_on_hand": null,
			"warehouse_utilization": 1.77
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.25,
			"days_on_hand": null,
			"warehouse_utilization": 1.55
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.14
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.12
		}],
		"opening_stock": 5363,
		"date": "2017-05-29T15:30:00.247963+00:00",
		"items_picked": 407,
		"items_put": 256
	}, {
		"total_skus": 318,
		"cbm_used": 16.82,
		"warehouse_utilization": 18.21,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.35,
			"days_on_hand": null,
			"warehouse_utilization": 2.1
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.29,
			"days_on_hand": null,
			"warehouse_utilization": 1.71
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.55
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.12
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.08
		}],
		"opening_stock": 5363,
		"date": "2017-05-28T15:30:00.530480+00:00",
		"items_picked": 0,
		"items_put": 0
	}, {
		"total_skus": 318,
		"cbm_used": 16.82,
		"warehouse_utilization": 18.21,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.35,
			"days_on_hand": null,
			"warehouse_utilization": 2.1
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.29,
			"days_on_hand": null,
			"warehouse_utilization": 1.71
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.55
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.12
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.08
		}],
		"opening_stock": 5363,
		"date": "2017-05-27T15:30:00.349257+00:00",
		"items_picked": 0,
		"items_put": 0
	}, {
		"total_skus": 318,
		"cbm_used": 16.82,
		"warehouse_utilization": 18.21,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.35,
			"days_on_hand": null,
			"warehouse_utilization": 2.1
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.29,
			"days_on_hand": null,
			"warehouse_utilization": 1.71
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.55
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.12
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.08
		}],
		"opening_stock": 5361,
		"date": "2017-05-26T15:30:00.402243+00:00",
		"items_picked": 408,
		"items_put": 419
	}, {
		"total_skus": 317,
		"cbm_used": 16.96,
		"warehouse_utilization": 18.37,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.36,
			"days_on_hand": null,
			"warehouse_utilization": 2.13
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.28,
			"days_on_hand": null,
			"warehouse_utilization": 1.67
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.54
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.11
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.09
		}],
		"opening_stock": 5343,
		"date": "2017-05-25T15:30:00.227832+00:00",
		"items_picked": 67,
		"items_put": 87
	}, {
		"total_skus": 316,
		"cbm_used": 16.71,
		"warehouse_utilization": 18.09,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.36,
			"days_on_hand": null,
			"warehouse_utilization": 2.16
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.28,
			"days_on_hand": null,
			"warehouse_utilization": 1.68
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.54
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.13
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.09
		}],
		"opening_stock": 5490,
		"date": "2017-05-24T15:30:00.446861+00:00",
		"items_picked": 551,
		"items_put": 419
	}, {
		"total_skus": 325,
		"cbm_used": 17.36,
		"warehouse_utilization": 18.8,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.36,
			"days_on_hand": null,
			"warehouse_utilization": 2.08
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.29,
			"days_on_hand": null,
			"warehouse_utilization": 1.65
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.5
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.11
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.09
		}],
		"opening_stock": 5323,
		"date": "2017-05-23T15:30:00.214587+00:00",
		"items_picked": 173,
		"items_put": 344
	}, {
		"total_skus": 315,
		"cbm_used": 16.8,
		"warehouse_utilization": 18.19,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.36,
			"days_on_hand": null,
			"warehouse_utilization": 2.15
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.28,
			"days_on_hand": null,
			"warehouse_utilization": 1.69
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.55
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.15
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.12
		}],
		"opening_stock": 5348,
		"date": "2017-05-22T15:30:00.100008+00:00",
		"items_picked": 301,
		"items_put": 279
	}, {
		"total_skus": 321,
		"cbm_used": 16.9,
		"warehouse_utilization": 18.3,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.36,
			"days_on_hand": null,
			"warehouse_utilization": 2.1
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.28,
			"days_on_hand": null,
			"warehouse_utilization": 1.67
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.54
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.14
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.1
		}],
		"opening_stock": 5348,
		"date": "2017-05-21T15:30:00.295085+00:00",
		"items_picked": 0,
		"items_put": 0
	}, {
		"total_skus": 321,
		"cbm_used": 16.9,
		"warehouse_utilization": 18.3,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.36,
			"days_on_hand": null,
			"warehouse_utilization": 2.1
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.28,
			"days_on_hand": null,
			"warehouse_utilization": 1.67
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.54
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.14
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.1
		}],
		"opening_stock": 5348,
		"date": "2017-05-20T15:30:00.174695+00:00",
		"items_picked": 0,
		"items_put": 0
	}, {
		"total_skus": 321,
		"cbm_used": 16.9,
		"warehouse_utilization": 18.3,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.36,
			"days_on_hand": null,
			"warehouse_utilization": 2.1
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.28,
			"days_on_hand": null,
			"warehouse_utilization": 1.67
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.54
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.14
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.1
		}],
		"opening_stock": 5392,
		"date": "2017-05-19T15:30:00.071715+00:00",
		"items_picked": 224,
		"items_put": 180
	}, {
		"total_skus": 322,
		"cbm_used": 17.08,
		"warehouse_utilization": 18.49,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.36,
			"days_on_hand": null,
			"warehouse_utilization": 2.11
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.28,
			"days_on_hand": null,
			"warehouse_utilization": 1.64
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.53
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.11
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.09
		}],
		"opening_stock": 5267,
		"date": "2017-05-18T15:30:00.142358+00:00",
		"items_picked": 31,
		"items_put": 156
	}, {
		"total_skus": 319,
		"cbm_used": 16.91,
		"warehouse_utilization": 18.32,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.36,
			"days_on_hand": null,
			"warehouse_utilization": 2.13
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.28,
			"days_on_hand": null,
			"warehouse_utilization": 1.64
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.54
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.12
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.1
		}],
		"opening_stock": 5214,
		"date": "2017-05-17T15:30:00.132426+00:00",
		"items_picked": 23,
		"items_put": 178
	}, {
		"total_skus": 317,
		"cbm_used": 17.04,
		"warehouse_utilization": 19.14,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.36,
			"days_on_hand": null,
			"warehouse_utilization": 2.11
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.28,
			"days_on_hand": null,
			"warehouse_utilization": 1.63
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.53
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.11
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.09
		}],
		"opening_stock": 5051,
		"date": "2017-05-16T15:30:00.479140+00:00",
		"items_picked": 299,
		"items_put": 469
	}, {
		"total_skus": 322,
		"cbm_used": 17.14,
		"warehouse_utilization": 20.01,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.36,
			"days_on_hand": null,
			"warehouse_utilization": 2.12
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.28,
			"days_on_hand": null,
			"warehouse_utilization": 1.63
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.52
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.12
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.12
		}],
		"opening_stock": 5051,
		"date": "2017-05-15T15:30:00.127940+00:00",
		"items_picked": 144,
		"items_put": 173
	}, {
		"total_skus": 321,
		"cbm_used": 17.21,
		"warehouse_utilization": 20.18,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.36,
			"days_on_hand": null,
			"warehouse_utilization": 2.11
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.28,
			"days_on_hand": null,
			"warehouse_utilization": 1.62
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.52
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.12
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.12
		}],
		"opening_stock": 5051,
		"date": "2017-05-14T15:30:00.119714+00:00",
		"items_picked": 0,
		"items_put": 0
	}],
	"resource_type": "inventory_history"
}










//export {resTypePPS,resTypeInventory1,resTypeButlersData,resTypeChargers,resTypeInventory2,resTypePick,resTypePut,resTypeUsers,resTypeButlers,resTypeOrders};