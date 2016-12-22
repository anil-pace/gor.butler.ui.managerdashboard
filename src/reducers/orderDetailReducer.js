import {ORDER_RECIEVED} from '../constants/frontEndConstants'; 

export  function getOrderDetail(state={},action){
  switch (action.type) {
    case ORDER_RECIEVED:

          var res, processedData,totalPage, totalOrders;
          res=action.data;
          if(res.orders) {
            totalOrders = res.total_size;
             totalPage = res.total_pages;
          
          return Object.assign({}, state, { 
            "ordersDetail" : res.orders,
            "totalPage" : totalPage,
            "totalOrders" : totalOrders
          })
        }
    default:
      return state
  }
}