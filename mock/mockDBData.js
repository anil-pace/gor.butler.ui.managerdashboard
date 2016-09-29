

export const resTypePut = {
	"aggregate_data": {
		"items_put": 256789
	},
	"resource_type": "put_details"
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
	"resource_type": "audit_details"
}

export const resTypePPS = {
	"aggregate_data": [{
		"pps_id": 1,
        "time_unit": "per_hour",
		"orders_picked": 500,
		"items_picked": 1000, 
		"items_put": 2400,
		"items_audited": "need_to_be_decided_per_item_or_per_audit",
		"pps_mode": "put",
		"active": "true/false"
	},{
		"pps_id": 5,
        "time_unit": "per_hour",
		"orders_picked": 500,
		"items_picked": 1000, 
		"items_put": 2400,
		"items_audited": "need_to_be_decided_per_item_or_per_audit",
		"pps_mode": "audit",
		"active": "true/false"
	},{
		"pps_id": 2,
        "time_unit": "per_hour",
		"orders_picked": 500,
		"items_picked": 1000,
		"items_put": 2400,
		"items_audited": "need_to_be_decided_per_item_or_per_audit",
		"pps_mode": "audit",
		"active": "true/false"
	}],
	"resource_type": "pps_details"
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
        "orders_at_risk":10,   
        "Wave_ending_time":'21-30-57' 
    },
    "resource_type": "order_details"
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
		"start_time": 10, 
		"end_time": 11,
		"orders_completed": 200,
		"items_audited": 1000,
		"items_put": 800
	}, {
		"start_time": 11, 
		"end_time": 12,
		"orders_completed": 300,
		"items_audited": 900,
		"items_put": 600
	}, {
		"start_time": 12,
		"end_time": 13,
		"orders_completed": 200,
		"items_audited": 800,
		"items_put": 900
	}, {
		"start_time": 13, 
		"end_time": 14,
		"orders_completed": 300,
		"items_audited": 700,
		"items_put": 800
	}, {
		"start_time": 14, 
		"end_time": 15,
		"orders_completed": 350,
		"items_audited": 800,
		"items_put": 1200
	}, {
		"start_time": 15, 
		"end_time": 16,
		"orders_completed": 400,
		"items_audited": 900,
		"items_put": 1000
	}, {
		"start_time": 16, 
		"end_time": 17,
		"orders_completed": 420,
		"items_audited": 1000,
		"items_put": 800
	}, {
		"start_time": 17, 
		"end_time": 18,
		"orders_completed": 200,
		"items_audited": 1100,
		"items_put": 900
	}, {
		"start_time": 18, 
		"end_time": 19,
		"orders_completed": 300,
		"items_audited": 700,
		"items_put": 800
	}, {
		"start_time": 19,
		"end_time": 20,
		"orders_completed": 200,
		"items_audited": 500,
		"items_put": 700
	}, {
		"start_time": 20, 
		"end_time": 21,
		"orders_completed": 300,
		"items_audited": 600,
		"items_put": 500
	}, {
		"start_time": 21, 
		"end_time": 22,
		"orders_completed": 350,
		"items_audited": 800,
		"items_put": 600
	}, {
		"start_time": 22, 
		"end_time": 23,
		"orders_completed": 400,
		"items_audited": 500,
		"items_put": 500
	}, {
		"start_time": 23, 
		"end_time": 24,
		"orders_completed": 420,
		"items_audited": 900,
		"items_put": 400
	}
	],
	"resource_type": "histogram_details"
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
		"pps_mode": "put",
		"active": "true"
	},{
		"pps_id": 9,
                	"time_unit": "per_hour",
		"orders_picked": 500,
		"items_picked": 200, 
		"items_put": 400,
		"items_audited": 600,
		"pps_mode": "put",
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
	"resource_type": "pps_detail"
}


export const resTypeUsersDetails = {
    
    "aggregate_data": [{
   	 "name": "mahesh Kumar",
     "user_id": 12,
   	 "status": 0, 
   	 "role": 0, //(0/1/2 === operator/manager/supervisor)
   	 "work_mode": 0,  //(pick_back/ pick_front/ put_back/ put_front/ audit),
   	 "location": "Head office",
   	 "login_time": "11:12:03", 
    }, {
   	 "name": "Ajay yadav",
     "user_id": 13,
   	 "status": 1, //(0/1 === offline/online)
   	 "role": 1, //(0/1/2 === operator/manager/supervisor)
   	 "work_mode":  1,  //(pick_back/ pick_front/ put_back/ put_front/ audit),
   	 "location": "pps 002",
   	 "login_time": "11:12:03"
             
    }, {
   	 "name": "Sachdeva",
     "user_id": 14,
   	 "status": 1, //(0/1 === offline/online)
   	 "role": 2, //(0/1/2 === operator/manager/supervisor)
   	 "work_mode":  2,  //(pick_back/ pick_front/ put_back/ put_front/ audit),
   	 "location": "pps 003",
   	 "login_time": "11:12:03"
             
    }, {
   	 "name": "mahesh Kumar",
     "user_id": 12,
   	 "status": 0, 
   	 "role": 0, //(0/1/2 === operator/manager/supervisor)
   	 "work_mode": 0,  //(pick_back/ pick_front/ put_back/ put_front/ audit),
   	 "location": "Head office",
   	 "login_time": "11:12:03", 
    }, {
   	 "name": "Ajay yadav",
     "user_id": 13,
   	 "status": 1, //(0/1 === offline/online)
   	 "role": 1, //(0/1/2 === operator/manager/supervisor)
   	 "work_mode":  1,  //(pick_back/ pick_front/ put_back/ put_front/ audit),
   	 "location": "pps 002",
   	 "login_time": "11:12:03"
             
    }, {
   	 "name": "Sachdeva",
     "user_id": 14,
   	 "status": 1, //(0/1 === offline/online)
   	 "role": 2, //(0/1/2 === operator/manager/supervisor)
   	 "work_mode":  2,  //(pick_back/ pick_front/ put_back/ put_front/ audit),
   	 "location": "pps 003",
   	 "login_time": "11:12:03"
             
    }, {
   	 "name": "mahesh Kumar",
     "user_id": 12,
   	 "status": 0, 
   	 "role": 0, //(0/1/2 === operator/manager/supervisor)
   	 "work_mode": 0,  //(pick_back/ pick_front/ put_back/ put_front/ audit),
   	 "location": "Head office",
   	 "login_time": "11:12:03", 
    }, {
   	 "name": "Ajay yadav",
     "user_id": 13,
   	 "status": 1, //(0/1 === offline/online)
   	 "role": 1, //(0/1/2 === operator/manager/supervisor)
   	 "work_mode":  1,  //(pick_back/ pick_front/ put_back/ put_front/ audit),
   	 "location": "pps 002",
   	 "login_time": "11:12:03"
             
    }, {
   	 "name": "Sachdeva",
     "user_id": 14,
   	 "status": 1, //(0/1 === offline/online)
   	 "role": 2, //(0/1/2 === operator/manager/supervisor)
   	 "work_mode":  2,  //(pick_back/ pick_front/ put_back/ put_front/ audit),
   	 "location": "pps 003",
   	 "login_time": "11:12:03"
             
    }, {
   	 "name": "mahesh Kumar",
     "user_id": 12,
   	 "status": 0, 
   	 "role": 0, //(0/1/2 === operator/manager/supervisor)
   	 "work_mode": 0,  //(pick_back/ pick_front/ put_back/ put_front/ audit),
   	 "location": "Head office",
   	 "login_time": "11:12:03", 
    }, {
   	 "name": "Ajay yadav",
     "user_id": 13,
   	 "status": 1, //(0/1 === offline/online)
   	 "role": 1, //(0/1/2 === operator/manager/supervisor)
   	 "work_mode":  1,  //(pick_back/ pick_front/ put_back/ put_front/ audit),
   	 "location": "pps 002",
   	 "login_time": "11:12:03"
             
    }, {
   	 "name": "Sachdeva",
     "user_id": 14,
   	 "status": 1, //(0/1 === offline/online)
   	 "role": 2, //(0/1/2 === operator/manager/supervisor)
   	 "work_mode":  2,  //(pick_back/ pick_front/ put_back/ put_front/ audit),
   	 "location": "pps 003",
   	 "login_time": "11:12:03"
             
    }, {
   	 "name": "mahesh Kumar",
     "user_id": 12,
   	 "status": 0, 
   	 "role": 0, //(0/1/2 === operator/manager/supervisor)
   	 "work_mode": 0,  //(pick_back/ pick_front/ put_back/ put_front/ audit),
   	 "location": "Head office",
   	 "login_time": "11:12:03", 
    }, {
   	 "name": "Ajay yadav",
     "user_id": 13,
   	 "status": 1, //(0/1 === offline/online)
   	 "role": 1, //(0/1/2 === operator/manager/supervisor)
   	 "work_mode":  1,  //(pick_back/ pick_front/ put_back/ put_front/ audit),
   	 "location": "pps 002",
   	 "login_time": "11:12:03"
             
    }, {
   	 "name": "Sachdeva",
     "user_id": 14,
   	 "status": 1, //(0/1 === offline/online)
   	 "role": 2, //(0/1/2 === operator/manager/supervisor)
   	 "work_mode":  2,  //(pick_back/ pick_front/ put_back/ put_front/ audit),
   	 "location": "pps 003",
   	 "login_time": "11:12:03"
             
    }, {
   	 "name": "mahesh Kumar",
     "user_id": 12,
   	 "status": 0, 
   	 "role": 0, //(0/1/2 === operator/manager/supervisor)
   	 "work_mode": 0,  //(pick_back/ pick_front/ put_back/ put_front/ audit),
   	 "location": "Head office",
   	 "login_time": "11:12:03", 
    }, {
   	 "name": "Ajay yadav",
     "user_id": 13,
   	 "status": 1, //(0/1 === offline/online)
   	 "role": 1, //(0/1/2 === operator/manager/supervisor)
   	 "work_mode":  1,  //(pick_back/ pick_front/ put_back/ put_front/ audit),
   	 "location": "pps 002",
   	 "login_time": "11:12:03"
             
    }, {
   	 "name": "Sachdeva",
     "user_id": 14,
   	 "status": 1, //(0/1 === offline/online)
   	 "role": 2, //(0/1/2 === operator/manager/supervisor)
   	 "work_mode":  2,  //(pick_back/ pick_front/ put_back/ put_front/ audit),
   	 "location": "pps 003",
   	 "login_time": "11:12:03"
             
    }],
    "resource_type": "users"
}










//export {resTypePPS,resTypeInventory1,resTypeButlersData,resTypeChargers,resTypeInventory2,resTypePick,resTypePut,resTypeUsers,resTypeButlers,resTypeOrders};