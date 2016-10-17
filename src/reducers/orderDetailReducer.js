import {ORDER_RECIEVED} from '../constants/appConstants'; 

function processOrders(data) {
  var renderOrderData = [], ordersStatus = {'pending':"Progress", "fulfillable": "Progress", "completed":"Completed", "not_fulfillable":"Unfulfillable"},orderData = {};
  if(data.length !== undefined) {
    for (var i =0; i < data.length; i++) {
      orderData.id = data[i].order_id;

      if(data[i].breached === false) {
        orderData.status = ordersStatus[data[i].status];
      }

      else {
        orderData.status = "Breached";
      }
      orderData.recievedTime = data[i].create_time;
      if(data[i].pick_before_time === null) {
        orderData.pickBy = "--";
      }
      else {
        orderData.pickBy = data[i].pick_before_time;
      }

      if(data[i].completed_orderlines === 0) {
        orderData.orderLine = data[i].total_orderlines;
      }
      else {
        total_orderlines = data[i].completed_orderlines + "/" + data[i].total_orderlines;
        orderData.orderLine = total_orderlines;
      }
      orderData.completedTime = data[i].update_time;

      renderOrderData.push(orderData);
      orderData = {};
    }
  }
  return renderOrderData;
}

export  function getOrderDetail(state={},action){
  switch (action.type) {
    case ORDER_RECIEVED:

          var res, processedData,totalPage;
          res=action.data;
          if(res.orders) {
             totalPage = res.total_pages;
             processedData = processOrders(res.orders);
          }
          return Object.assign({}, state, { 
            "ordersDetail" : processedData,
            "totalPage" : totalPage
          })

    default:
      return state
  }
}