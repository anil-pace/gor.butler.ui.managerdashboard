

export const resTypePut = {
	"aggregate_data": {
		"items_put": 0
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
		"pps_mode": "pick",
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
        "cut_off_time": 100,   
        "estimated_completion_time": 200, 
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

//export {resTypePPS,resTypeInventory1,resTypeButlersData,resTypeChargers,resTypeInventory2,resTypePick,resTypePut,resTypeUsers,resTypeButlers,resTypeOrders};