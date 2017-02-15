import {ORDER_RECIEVED} from '../constants/frontEndConstants'; 

export  function getOrderDetail(state={},action){
  switch (action.type) {
    case ORDER_RECIEVED:

          var res, processedData,totalPage, totalOrders,itemsPerOrder,totalCompletedOrder,totalPendingOrder;
          res=action.data;
          if(res.orders) {
            totalOrders = res.total_size;
             totalPage = res.total_pages;
             itemsPerOrder = res.items_per_order;
             totalCompletedOrder = res.total_completed;
             totalPendingOrder = res.total_pending;
          
          return Object.assign({}, state, { 
            "ordersDetail" : res.orders,
            "totalPage" : totalPage,
            "totalOrders" : totalOrders,
            "itemsPerOrder": itemsPerOrder,
            "totalCompletedOrder":totalCompletedOrder,
            "totalPendingOrder":totalPendingOrder
          })
        }
    default:
      return state
  }
}