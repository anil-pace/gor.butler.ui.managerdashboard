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
		"realtime":"Real Time",
		"1_HOUR":"Last 1 Hour",
		"2_HOUR":"Last 2 Hours",
		"1_DAY":"Last 1 Day",
		"2_DAY":"Last 2 Days",
		"1_MONTH":"Last 1 Month",
		"2_MONTH":"Last 2 Months",
		"3_MONTH":"Last 3 Months"

	},
	labelText:"Time Period"
},{
	name:"operatingMode",
	type:"token",
	tokens:{
		"any":"Any",
		"pick_front":"Pick Front",
		"put_front":"Put Front",
		"pick_back":"Pick Back",
		"put_back":"Put Back",
		"audit":"Audit"

	},
	labelText:"Operating Mode"
}]