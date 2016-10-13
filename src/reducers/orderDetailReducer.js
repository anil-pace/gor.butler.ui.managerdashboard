import {ORDER_RECIEVED} from '../constants/appConstants'; 

function processOrders(data) {
  var renderOrderData = [], orderData = {};
  if(data.length !== undefined) {
    for (var i = data.length - 1; i >= 0; i--) {
      orderData.id = data[i].order_id;
      orderData.status = data[i].warehouse_status;
      orderData.recievedTime = data[i].create_time;
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