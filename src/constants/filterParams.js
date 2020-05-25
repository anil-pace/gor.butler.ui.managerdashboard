export const REPORTS_FILTER_PARAMS = [
  {
    name: "request_id",
    type: "text",
    dataType: "text",
    placeHolderText: "Enter Request Id",
    labelText: "Request Id"
  },
  {
    name: "external_id",
    type: "text",
    dataType: "text",
    placeHolderText: "Enter External Service Request Id",
    labelText: "External Id"
  },
  {
    name: "source_id",
    type: "text",
    dataType: "text",
    placeHolderText: "Enter Source Id",
    labelText: "Source Id"
  },
  {
    name: "destination_id",
    type: "text",
    dataType: "text",
    placeHolderText: "Enter Destination Id",
    labelText: "Destination Id"
  },
  {
    name: "sku_id",
    type: "text",
    dataType: "text",
    placeHolderText: "Enter SKU Id",
    labelText: "SKU Id"
  },
  {
    name: "pps_id",
    type: "text",
    dataType: "text",
    placeHolderText: "Enter PPS Id",
    labelText: "PPS Id"
  },
  {
    name: "user_id",
    type: "text",
    dataType: "text",
    placeHolderText: "Enter User Id",
    labelText: "User Id"
  },
  {
    name: "status",
    type: "token",
    tokens: {
      any: "Any",
      success: "Success",
      exception: "Exception"
    },
    labelText: "Status"
  },
  {
    name: "timeperiod",
    type: "token",
    tokens: {
      realtime: "Real Time",
      "1_H": "Last 1 Hour",
      "2_H": "Last 2 Hours",
      "1_d": "Last 1 Day",
      "2_d": "Last 2 Days",
      "1_M": "Last 1 Month",
      "2_M": "Last 2 Months",
      "3_M": "Last 3 Months"
    },
    labelText: "Time Period"
  },
  {
    name: "operatingMode",
    type: "token",
    tokens: {
      any: "Any",
      pick_front: "Pick Front",
      put_front: "Put Front",
      pick_back: "Pick Back",
      put_back: "Put Back",
      audit: "Audit"
    },
    labelText: "Operating Mode"
  }
]
