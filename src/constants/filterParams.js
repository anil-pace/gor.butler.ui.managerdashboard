export const REPORTS_FILTER_PARAMS = [{
	name:"request_id",
	type:"text",
	dataType:"text",
	placeHolderText:"Enter Request Id",
	labelText:"Request Id"

},{
	name:"sku_id",
	type:"text",
	dataType:"text",
	placeHolderText:"Enter SKU Id",
	labelText:"SKU Id"
},{
	name:"pps_id",
	type:"text",
	dataType:"text",
	placeHolderText:"Enter PPS Id",
	labelText:"PPS Id"
},{
	name:"user_id",
	type:"text",
	dataType:"text",
	placeHolderText:"Enter User Id",
	labelText:"User Id"
},{
	name:"status",
	type:"token",
	tokens:{
		any:"Any",
		success:"Success",
		exception:"Exception"
	},
	labelText:"Status"
},{
	name:"timeperiod",
	type:"token",
	tokens:{
		realtime:"Real Time",
		60:"Last 1 Hour",
		120:"Last 2 Hour"
	},
	labelText:"Time Period"
}]