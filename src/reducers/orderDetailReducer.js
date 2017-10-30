import {ORDER_RECIEVED,SET_ORDER_QUERY} from '../constants/frontEndConstants';

export  function getOrderDetail(state={},action){
    switch (action.type) {
        case ORDER_RECIEVED:

            var res,totalPage, totalOrders,itemsPerOrder,totalCompletedOrder,totalPendingOrder;
            res=action.data;
            if(res.orders) {
                totalOrders=res.totalOrders;
                totalPage=res.totalPages;
                itemsPerOrder=res.itemsPerOrder;
                totalCompletedOrder=res.completedOrders;
                totalPendingOrder=res.pendingOrders;
                return Object.assign({}, state, {
                    "ordersDetail" : res.orders.length>0?res.orders:state.ordersDetail,
                    "totalPage" : res.orders.length>0?totalPage:state.totalPage,
                    "totalOrders" : res.orders.length>0?totalOrders:state.totalOrders,
                    "itemsPerOrder": res.orders.length>0?itemsPerOrder:state.itemsPerOrder,
                    "totalCompletedOrder":res.orders.length>0?totalCompletedOrder:state.totalCompletedOrder,
                    "totalPendingOrder":res.orders.length>0?totalPendingOrder:state.totalPendingOrder,
                    "successQuery":res.orders.length>0?state.query:state.successQuery,
                    "noResultFound":res.orders.length<1
                })
            }
            return state

        case SET_ORDER_QUERY:
            return Object.assign({},state,{
                "query":JSON.parse(JSON.stringify(action.data.query))
            })
        default:
            return state
    }
}