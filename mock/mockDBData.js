

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
		"total_skus": 294,
		"cbm_used": 12.1,
		"warehouse_utilization": 14.85,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.34,
			"days_on_hand": null,
			"warehouse_utilization": 3.23
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.27,
			"days_on_hand": null,
			"warehouse_utilization": 3.2
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.25,
			"days_on_hand": null,
			"warehouse_utilization": 1.59
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.53
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.53
		}],
		"opening_stock": 3240,
		"date": "2017-02-28T15:30:00.109713+00:00",
		"items_picked": 91,
		"items_put": 341
	}],
	"resource_type": "inventory_today"
}

export const resTypeSnapShotHistory = {
	"complete_data": [
	{
		"total_skus": 280,
		"cbm_used": 11.2,
		"warehouse_utilization": 13.74,
		"category_data": [{
			"category_type": "FMCG",
			"cbm_used": 0.27,
			"days_on_hand": null,
			"warehouse_utilization": 3.44
		}, {
			"category_type": "RETAIL",
			"cbm_used": 0.33,
			"days_on_hand": null,
			"warehouse_utilization": 3.44
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.24,
			"days_on_hand": null,
			"warehouse_utilization": 1.61
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.61
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.61
		}],
		"opening_stock": 3749,
		"date": "2017-02-27T15:30:00.442535+00:00",
		"items_picked": 682,
		"items_put": 190
	}, {
		"total_skus": 307,
		"cbm_used": 13.15,
		"warehouse_utilization": 16.14,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.34,
			"days_on_hand": null,
			"warehouse_utilization": 3.09
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.27,
			"days_on_hand": null,
			"warehouse_utilization": 3.01
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.5
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.48
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.48
		}],
		"opening_stock": 3749,
		"date": "2017-02-26T15:30:00.153323+00:00",
		"items_picked": 0,
		"items_put": 0
	}, {
		"total_skus": 307,
		"cbm_used": 13.15,
		"warehouse_utilization": 16.14,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.34,
			"days_on_hand": null,
			"warehouse_utilization": 3.09
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.27,
			"days_on_hand": null,
			"warehouse_utilization": 3.01
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.5
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.48
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.48
		}],
		"opening_stock": 3361,
		"date": "2017-02-25T15:30:01.110393+00:00",
		"items_picked": 97,
		"items_put": 488
	}, {
		"total_skus": 298,
		"cbm_used": 11.72,
		"warehouse_utilization": 14.39,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.34,
			"days_on_hand": null,
			"warehouse_utilization": 3.35
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 3.26
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.25,
			"days_on_hand": null,
			"warehouse_utilization": 1.65
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.62
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.53
		}],
		"opening_stock": 3099,
		"date": "2017-02-24T15:30:00.061027+00:00",
		"items_picked": 315,
		"items_put": 591
	}, {
		"total_skus": 295,
		"cbm_used": 10.83,
		"warehouse_utilization": 13.29,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.33,
			"days_on_hand": null,
			"warehouse_utilization": 3.6
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.25,
			"days_on_hand": null,
			"warehouse_utilization": 3.41
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.72
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.24,
			"days_on_hand": null,
			"warehouse_utilization": 1.69
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.17,
			"days_on_hand": null,
			"warehouse_utilization": 1.56
		}],
		"opening_stock": 3387,
		"date": "2017-02-23T15:30:00.157603+00:00",
		"items_picked": 540,
		"items_put": 279
	}, {
		"total_skus": 295,
		"cbm_used": 12.74,
		"warehouse_utilization": 15.63,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.33,
			"days_on_hand": null,
			"warehouse_utilization": 3.23
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 3.18
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.25,
			"days_on_hand": null,
			"warehouse_utilization": 1.62
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.56
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.53
		}],
		"opening_stock": 3349,
		"date": "2017-02-22T15:30:00.217336+00:00",
		"items_picked": 347,
		"items_put": 429
	}, {
		"total_skus": 280,
		"cbm_used": 11.59,
		"warehouse_utilization": 14.22,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.34,
			"days_on_hand": null,
			"warehouse_utilization": 3.42
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 3.27
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.25,
			"days_on_hand": null,
			"warehouse_utilization": 1.62
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.59
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.59
		}],
		"opening_stock": 3535,
		"date": "2017-02-21T15:30:00.094766+00:00",
		"items_picked": 512,
		"items_put": 336
	}, {
		"total_skus": 290,
		"cbm_used": 12.31,
		"warehouse_utilization": 15.1,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.34,
			"days_on_hand": null,
			"warehouse_utilization": 3.24
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.27,
			"days_on_hand": null,
			"warehouse_utilization": 3.19
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.59
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.25,
			"days_on_hand": null,
			"warehouse_utilization": 1.57
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.48
		}],
		"opening_stock": 3565,
		"date": "2017-02-20T15:30:00.247652+00:00",
		"items_picked": 751,
		"items_put": 740
	}, {
		"total_skus": 302,
		"cbm_used": 12.52,
		"warehouse_utilization": 15.37,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.35,
			"days_on_hand": null,
			"warehouse_utilization": 3.24
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 3.1
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.58
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.58
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.47
		}],
		"opening_stock": 3565,
		"date": "2017-02-19T15:30:00.338992+00:00",
		"items_picked": 0,
		"items_put": 0
	}, {
		"total_skus": 302,
		"cbm_used": 12.52,
		"warehouse_utilization": 15.37,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.35,
			"days_on_hand": null,
			"warehouse_utilization": 3.24
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 3.1
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.58
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.58
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.47
		}],
		"opening_stock": 3565,
		"date": "2017-02-18T15:30:00.108278+00:00",
		"items_picked": 0,
		"items_put": 0
	}, {
		"total_skus": 302,
		"cbm_used": 12.52,
		"warehouse_utilization": 15.36,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.35,
			"days_on_hand": null,
			"warehouse_utilization": 3.24
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 3.1
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.58
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.58
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.47
		}],
		"opening_stock": 3738,
		"date": "2017-02-17T15:30:00.584207+00:00",
		"items_picked": 487,
		"items_put": 321
	}, {
		"total_skus": 312,
		"cbm_used": 13.02,
		"warehouse_utilization": 15.98,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.34,
			"days_on_hand": null,
			"warehouse_utilization": 3.07
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.27,
			"days_on_hand": null,
			"warehouse_utilization": 3.04
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.51
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.25,
			"days_on_hand": null,
			"warehouse_utilization": 1.48
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.45
		}],
		"opening_stock": 3111,
		"date": "2017-02-16T15:30:00.703085+00:00",
		"items_picked": 206,
		"items_put": 836
	}, {
		"total_skus": 281,
		"cbm_used": 10.81,
		"warehouse_utilization": 13.26,
		"category_data": [{
			"category_type": "FMCG",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 3.55
		}, {
			"category_type": "RETAIL",
			"cbm_used": 0.33,
			"days_on_hand": null,
			"warehouse_utilization": 3.55
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.24,
			"days_on_hand": null,
			"warehouse_utilization": 1.68
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.65
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.17,
			"days_on_hand": null,
			"warehouse_utilization": 1.59
		}],
		"opening_stock": 3532,
		"date": "2017-02-15T15:30:00.169905+00:00",
		"items_picked": 811,
		"items_put": 406
	}, {
		"total_skus": 300,
		"cbm_used": 12.46,
		"warehouse_utilization": 15.29,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.33,
			"days_on_hand": null,
			"warehouse_utilization": 3.22
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.27,
			"days_on_hand": null,
			"warehouse_utilization": 3.19
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.25,
			"days_on_hand": null,
			"warehouse_utilization": 1.57
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.54
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.17,
			"days_on_hand": null,
			"warehouse_utilization": 1.43
		}],
		"opening_stock": 3841,
		"date": "2017-02-14T15:30:00.482222+00:00",
		"items_picked": 785,
		"items_put": 481
	}, {
		"total_skus": 313,
		"cbm_used": 13.52,
		"warehouse_utilization": 16.88,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.35,
			"days_on_hand": null,
			"warehouse_utilization": 3.04
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.27,
			"days_on_hand": null,
			"warehouse_utilization": 2.96
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.47
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.44
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.42
		}],
		"opening_stock": 3840,
		"date": "2017-02-13T15:30:00.139451+00:00",
		"items_picked": 497,
		"items_put": 497
	}, {
		"total_skus": 313,
		"cbm_used": 13.54,
		"warehouse_utilization": 17.83,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.35,
			"days_on_hand": null,
			"warehouse_utilization": 3.04
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.27,
			"days_on_hand": null,
			"warehouse_utilization": 2.96
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.47
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.44
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.42
		}],
		"opening_stock": 3840,
		"date": "2017-02-12T15:30:00.141786+00:00",
		"items_picked": 0,
		"items_put": 0
	}, {
		"total_skus": 313,
		"cbm_used": 13.54,
		"warehouse_utilization": 17.83,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.35,
			"days_on_hand": null,
			"warehouse_utilization": 3.04
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.27,
			"days_on_hand": null,
			"warehouse_utilization": 2.96
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.47
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.44
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.42
		}],
		"opening_stock": 3391,
		"date": "2017-02-11T15:30:00.112700+00:00",
		"items_picked": 0,
		"items_put": 449
	}, {
		"total_skus": 298,
		"cbm_used": 12.02,
		"warehouse_utilization": 15.82,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.34,
			"days_on_hand": null,
			"warehouse_utilization": 3.26
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.25,
			"days_on_hand": null,
			"warehouse_utilization": 3.06
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.25,
			"days_on_hand": null,
			"warehouse_utilization": 1.6
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.6
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.54
		}],
		"opening_stock": 3252,
		"date": "2017-02-10T15:30:00.175868+00:00",
		"items_picked": 500,
		"items_put": 644
	}, {
		"total_skus": 289,
		"cbm_used": 11.55,
		"warehouse_utilization": 15.21,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.33,
			"days_on_hand": null,
			"warehouse_utilization": 3.28
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.25,
			"days_on_hand": null,
			"warehouse_utilization": 3.16
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.25,
			"days_on_hand": null,
			"warehouse_utilization": 1.7
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.67
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.58
		}],
		"opening_stock": 2893,
		"date": "2017-02-09T15:30:00.285567+00:00",
		"items_picked": 560,
		"items_put": 929
	}, {
		"total_skus": 269,
		"cbm_used": 10.59,
		"warehouse_utilization": 13.94,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.33,
			"days_on_hand": null,
			"warehouse_utilization": 3.68
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.24,
			"days_on_hand": null,
			"warehouse_utilization": 3.47
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.94
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.87
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.8
		}],
		"opening_stock": 2932,
		"date": "2017-02-08T15:30:00.253949+00:00",
		"items_picked": 567,
		"items_put": 537
	}, {
		"total_skus": 270,
		"cbm_used": 10.76,
		"warehouse_utilization": 14.16,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.33,
			"days_on_hand": null,
			"warehouse_utilization": 3.63
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.25,
			"days_on_hand": null,
			"warehouse_utilization": 3.43
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.25,
			"days_on_hand": null,
			"warehouse_utilization": 1.85
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.78
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.18,
			"days_on_hand": null,
			"warehouse_utilization": 1.75
		}],
		"opening_stock": 3187,
		"date": "2017-02-07T15:30:00.075722+00:00",
		"items_picked": 928,
		"items_put": 691
	}, {
		"total_skus": 292,
		"cbm_used": 11.46,
		"warehouse_utilization": 15.09,
		"category_data": [{
			"category_type": "FMCG",
			"cbm_used": 0.25,
			"days_on_hand": null,
			"warehouse_utilization": 3.31
		}, {
			"category_type": "RETAIL",
			"cbm_used": 0.29,
			"days_on_hand": null,
			"warehouse_utilization": 3.16
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.76
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.73
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.7
		}],
		"opening_stock": 3308,
		"date": "2017-02-06T15:30:00.156182+00:00",
		"items_picked": 391,
		"items_put": 284
	}, {
		"total_skus": 306,
		"cbm_used": 11.89,
		"warehouse_utilization": 15.65,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.34,
			"days_on_hand": null,
			"warehouse_utilization": 3.34
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.27,
			"days_on_hand": null,
			"warehouse_utilization": 3.31
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.7
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.67
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.64
		}],
		"opening_stock": 3308,
		"date": "2017-02-05T15:30:00.081774+00:00",
		"items_picked": 0,
		"items_put": 0
	}, {
		"total_skus": 306,
		"cbm_used": 11.89,
		"warehouse_utilization": 15.65,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.34,
			"days_on_hand": null,
			"warehouse_utilization": 3.34
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.27,
			"days_on_hand": null,
			"warehouse_utilization": 3.31
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.7
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.67
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.64
		}],
		"opening_stock": 3308,
		"date": "2017-02-04T15:30:00.286823+00:00",
		"items_picked": 0,
		"items_put": 0
	}, {
		"total_skus": 306,
		"cbm_used": 11.89,
		"warehouse_utilization": 15.65,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.34,
			"days_on_hand": null,
			"warehouse_utilization": 3.34
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.27,
			"days_on_hand": null,
			"warehouse_utilization": 3.31
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.7
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.67
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.64
		}],
		"opening_stock": 3350,
		"date": "2017-02-03T15:30:00.566874+00:00",
		"items_picked": 964,
		"items_put": 932
	}, {
		"total_skus": 312,
		"cbm_used": 12.07,
		"warehouse_utilization": 15.89,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.34,
			"days_on_hand": null,
			"warehouse_utilization": 3.3
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.27,
			"days_on_hand": null,
			"warehouse_utilization": 3.27
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.68
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.65
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.62
		}],
		"opening_stock": 3099,
		"date": "2017-02-02T15:30:00.206885+00:00",
		"items_picked": 492,
		"items_put": 744
	}, {
		"total_skus": 310,
		"cbm_used": 11.35,
		"warehouse_utilization": 14.93,
		"category_data": [{
			"category_type": "RETAIL",
			"cbm_used": 0.32,
			"days_on_hand": null,
			"warehouse_utilization": 3.15
		}, {
			"category_type": "FMCG",
			"cbm_used": 0.25,
			"days_on_hand": null,
			"warehouse_utilization": 3.12
		}, {
			"category_type": "FRAGILE",
			"cbm_used": 0.26,
			"days_on_hand": null,
			"warehouse_utilization": 1.81
		}, {
			"category_type": "SHOES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.78
		}, {
			"category_type": "PERFUMES",
			"cbm_used": 0.19,
			"days_on_hand": null,
			"warehouse_utilization": 1.75
		}],
		"opening_stock": 1872,
		"date": "2017-02-01T15:30:00.161384+00:00",
		"items_picked": 0,
		"items_put": 1227
	}],
	"resource_type": "inventory_history"
}










//export {resTypePPS,resTypeInventory1,resTypeButlersData,resTypeChargers,resTypeInventory2,resTypePick,resTypePut,resTypeUsers,resTypeButlers,resTypeOrders};