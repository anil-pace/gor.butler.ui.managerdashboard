

export const resTypePut = {
	"aggregate_data": {
		"items_put": 256789
	},
	"resource_type": "put"
};

export const resTypeThroughPut = {
	"aggregate_data": {
		"put_throughput": 3556,
		"pick_throughput": 3546,
		"audit_throughput": 2400 // to get clarification for audit 
	},
	"resource_type": "put_pick_audit_throughput"
}
export const resTypeAudit = {
	"aggregate_data": {
			"audit_type":null,		
			"total_audited": 20687
			},
	"resource_type": "audit"
}

export const resTypePick ={
	"aggregate_data": {
		"count_complete": 0
	},
	"resource_type": "pick"
};


export const resTypeInventory1 = {
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
export const resTypeChargers = {
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

export const resTypeButlersData = {
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



export const resTypeInventory2 = {
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

export const resTypeHistogram = {
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

export const resTypeChargersDetail = {
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

export const resTypeButlerDetail = {
   	 
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

export const resTypePPSdetail = { 
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

 export const resTypePPSperformance = { 
	"aggregate_data": [{
		"pps_id": 1,
                	"time_unit": "per_hour",
		"orders_picked": 500,
		"items_picked": 800, 
		"items_put": 400,
		"items_audited": 300,
		"pps_mode": "put",
		"active": "true"
	},{
		"pps_id": 2,
                	"time_unit": "per_hour",
		"orders_picked": 500,
		"items_picked": 900,
		"items_put": 500,
		"items_audited": 570,
		"pps_mode": "put",
		"active": "true"
	}, {
		"pps_id": 3,
                	"time_unit": "per_hour",
		"orders_picked": 500,
		"items_picked": 800,
		"items_put": 600,
		"items_audited": 770,
		"pps_mode": "put",
		"active": "true"
	}, {
		"pps_id": 4,
                	"time_unit": "per_hour",
		"orders_picked": 500,
		"items_picked": 900,
		"items_put": 700,
		"items_audited": 870,
		"pps_mode": "put",
		"active": "true"
	},{
		"pps_id": 5,
                	"time_unit": "per_hour",
		"orders_picked": 500,
		"items_picked": 800,
		"items_put": 600,
		"items_audited": 470,
		"pps_mode": "put",
		"active": "true"
	},{
		"pps_id": 6,
                	"time_unit": "per_hour",
		"orders_picked": 500,
		"items_picked": 700,
		"items_put": 700,
		"items_audited": 370,
		"pps_mode": "put",
		"active": "true"
	},{
		"pps_id": 7,
                	"time_unit": "per_hour",
		"orders_picked": 500,
		"items_picked": 600,
		"items_put": 800,
		"items_audited": 270,
		"pps_mode": "put",
		"active": "true"
	},{
		"pps_id": 8,
                	"time_unit": "per_hour",
		"orders_picked": 500,
		"items_picked": 300,
		"items_put": 300,
		"items_audited": 770,
		"pps_mode": "pick",
		"active": "true"
	},{
		"pps_id": 9,
                	"time_unit": "per_hour",
		"orders_picked": 500,
		"items_picked": 200, 
		"items_put": 400,
		"items_audited": 600,
		"pps_mode": "audit",
		"active": "true"
	},{
		"pps_id": 10,
                	"time_unit": "per_hour",
		"orders_picked": 500,
		"items_picked": 300,
		"items_put": 500,
		"items_audited": 570,
		"pps_mode": "put",
		"active": "true"
	}
	],
	"resource_type": "pps"
}


export const resTypeUsersDetails = {
    
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

export const resTypeNotify = {
  "alert_data": [
    {
      "code": "us001",
      "description": "Username already registered",
      "details": [],
      "level": "error"
    }]
};

export const resTypeSnapShot = {
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

export const resTypeSnapShotToday = {
	"complete_data": [{
		"total_skus": 198,
		"opening_stock": 1322,
		"cbm_used": 6.37,
		"warehouse_utilization": 7.68,
		"date": "2016-12-12T06:09:15.615252+00:00",
		"category_data": [{
			"category_type": "generic_apparel",
			"cbm_used": 0.59,
			"warehouse_utilization": 12.26,
			"days_on_hand": 1630.0
		}, {
			"category_type": "only_medicine",
			"cbm_used": 0.81,
			"warehouse_utilization": 11.74,
			"days_on_hand": null
		}, {
			"category_type": "generic_medicine",
			"cbm_used": 0.82,
			"warehouse_utilization": 11.06,
			"days_on_hand": null
		}, {
			"category_type": "medicine_apparel_generic",
			"cbm_used": 0.69,
			"warehouse_utilization": 11.06,
			"days_on_hand": null
		}, {
			"category_type": "apparel_medicine_generic",
			"cbm_used": 0.73,
			"warehouse_utilization": 10.68,
			"days_on_hand": null
		}],
		"items_picked": 3,
		"items_put": 10
	}],
	"resource_type": "inventory_today"
}

export const resTypeSnapShotHistory = {
	"complete_data": [{
		"total_skus": 198,
		"cbm_used": 6.37,
		"warehouse_utilization": 7.68,
		"category_data": [{
			"category_type": "only_medicine",
			"cbm_used": 0.81,
			"days_on_hand": null,
			"warehouse_utilization": 11.8
		}, {
			"category_type": "generic_apparel",
			"cbm_used": 0.59,
			"days_on_hand": null,
			"warehouse_utilization": 11.8
		}, {
			"category_type": "generic_medicine",
			"cbm_used": 0.82,
			"days_on_hand": null,
			"warehouse_utilization": 11.12
		}, {
			"category_type": "medicine_apparel_generic",
			"cbm_used": 0.69,
			"days_on_hand": null,
			"warehouse_utilization": 11.12
		}, {
			"category_type": "apparel_medicine_generic",
			"cbm_used": 0.73,
			"days_on_hand": null,
			"warehouse_utilization": 10.74
		}],
		"opening_stock": 1322,
		"date": "2016-12-11T15:30:00.099216+00:00",
		"items_picked": 0,
		"items_put": 0
	}, {
		"total_skus": 198,
		"cbm_used": 6.37,
		"warehouse_utilization": 7.68,
		"category_data": [{
			"category_type": "only_medicine",
			"cbm_used": 0.81,
			"days_on_hand": null,
			"warehouse_utilization": 11.8
		}, {
			"category_type": "generic_apparel",
			"cbm_used": 0.59,
			"days_on_hand": null,
			"warehouse_utilization": 11.8
		}, {
			"category_type": "generic_medicine",
			"cbm_used": 0.82,
			"days_on_hand": null,
			"warehouse_utilization": 11.12
		}, {
			"category_type": "medicine_apparel_generic",
			"cbm_used": 0.69,
			"days_on_hand": null,
			"warehouse_utilization": 11.12
		}, {
			"category_type": "apparel_medicine_generic",
			"cbm_used": 0.73,
			"days_on_hand": null,
			"warehouse_utilization": 10.74
		}],
		"opening_stock": 73,
		"date": "2016-12-10T15:30:00.110887+00:00",
		"items_picked": 6,
		"items_put": 12
	}, {
		"total_skus": 1,
		"cbm_used": 0.0,
		"warehouse_utilization": 0.0,
		"category_data": [],
		"opening_stock": 143,
		"date": "2016-12-09T15:30:00.389739+00:00",
		"items_picked": 84,
		"items_put": 16
	}, {
		"total_skus": 1,
		"cbm_used": 0.0,
		"warehouse_utilization": 0.01,
		"category_data": [],
		"opening_stock": 10,
		"date": "2016-12-08T15:30:00.153703+00:00",
		"items_picked": 96,
		"items_put": 229
	}, {
		"total_skus": 1,
		"cbm_used": 0.0,
		"warehouse_utilization": 0.0,
		"category_data": [],
		"opening_stock": 21,
		"date": "2016-12-07T15:30:00.493919+00:00",
		"items_picked": 21,
		"items_put": 10
	}, {
		"total_skus": 1,
		"cbm_used": 0.0,
		"warehouse_utilization": 0.0,
		"category_data": [],
		"opening_stock": 22,
		"date": "2016-12-06T15:30:00.479760+00:00",
		"items_picked": 14,
		"items_put": 13
	}, {
		"total_skus": 1,
		"cbm_used": 0.0,
		"warehouse_utilization": 0.01,
		"category_data": [],
		"opening_stock": 147,
		"date": "2016-12-05T15:30:00.784861+00:00",
		"items_picked": 0,
		"items_put": 0
	}],
	"resource_type": "inventory_history"
}










//export {resTypePPS,resTypeInventory1,resTypeButlersData,resTypeChargers,resTypeInventory2,resTypePick,resTypePut,resTypeUsers,resTypeButlers,resTypeOrders};