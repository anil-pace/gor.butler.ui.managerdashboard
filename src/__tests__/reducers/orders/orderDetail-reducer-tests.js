import {getOrderDetail} from '../../../reducers/orderDetailReducer'
import * as CONSTANTS from '../../../constants/frontEndConstants'



describe('Order Detail Reducer', () => {

  it('should ...', () => {

    const data =  {
    "orders": [{
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-11-16T11:50:19.847+05:30",
        "exception": false,
        "order_id": "od1234e5467",
        "pick_before_time": "2016-07-26T11:38:41.378+05:30",
        "status": "complete",
        "total_orderlines": 0,
        "update_time": "2017-11-16T11:50:19.850+05:30"
    }, {
        "breached": true,
        "completed_orderlines": 0,
        "create_time": "2017-11-16T11:27:16.931+05:30",
        "exception": false,
        "order_id": "od12345467",
        "pick_before_time": "2016-07-26T11:38:41.378+05:30",
        "status": "pending",
        "total_orderlines": 0,
        "update_time": "2017-11-16T11:27:16.934+05:30"
    }, {
        "breached": true,
        "completed_orderlines": 0,
        "create_time": "2017-11-16T11:22:54.380+05:30",
        "exception": false,
        "order_id": "od1234567",
        "pick_before_time": "2016-07-26T11:38:41.378+05:30",
        "status": "ACCEPTED",
        "total_orderlines": 0,
        "update_time": "2017-11-16T11:22:54.385+05:30"
    }, {
        "breached": true,
        "completed_orderlines": 0,
        "create_time": "2017-11-16T10:33:50.484+05:30",
        "exception": false,
        "order_id": "od123456",
        "pick_before_time": "2017-07-26T11:38:41.378+05:30",
        "status": "ACCEPTED",
        "total_orderlines": 0,
        "update_time": "2017-11-16T10:33:50.493+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.616+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "INTERNAL_SERVER_ERROR",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.620+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.615+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "CREATED",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.620+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.615+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "BAD_REQUEST",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.620+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.614+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "fulfillable",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.620+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.614+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "abandoned",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.620+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.613+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "complete",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.620+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.604+05:30",
        "exception": false,
        "order_id": "2",
        "pick_before_time": null,
        "status": "rejected",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.620+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.602+05:30",
        "exception": false,
        "order_id": "3",
        "pick_before_time": null,
        "status": "abandoned",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.620+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.599+05:30",
        "exception": false,
        "order_id": "3",
        "pick_before_time": null,
        "status": "abandoned",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.597+05:30",
        "exception": false,
        "order_id": "2",
        "pick_before_time": null,
        "status": "fulfillable",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.596+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "rejected",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.594+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "ACCEPTED",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.594+05:30",
        "exception": false,
        "order_id": "2",
        "pick_before_time": null,
        "status": "not_fulfillable",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.593+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "not_fulfillable",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.592+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "complete",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.592+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "CREATED",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.590+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "CREATED",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.589+05:30",
        "exception": false,
        "order_id": "2",
        "pick_before_time": null,
        "status": "CREATED",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.584+05:30",
        "exception": false,
        "order_id": "2",
        "pick_before_time": null,
        "status": "CREATED",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.583+05:30",
        "exception": false,
        "order_id": "2",
        "pick_before_time": null,
        "status": "INTERNAL_SERVER_ERROR",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.582+05:30",
        "exception": false,
        "order_id": "2",
        "pick_before_time": null,
        "status": "BAD_REQUEST",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }],
    "total_size": 72,
    "total_pages": 3,
    "total_completed": 7,
    "total_pending": 1,
    "items_per_order": 0.0
}


const expectedOrdersDetail = [{
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-11-16T11:50:19.847+05:30",
        "exception": false,
        "order_id": "od1234e5467",
        "pick_before_time": "2016-07-26T11:38:41.378+05:30",
        "status": "complete",
        "total_orderlines": 0,
        "update_time": "2017-11-16T11:50:19.850+05:30"
    }, {
        "breached": true,
        "completed_orderlines": 0,
        "create_time": "2017-11-16T11:27:16.931+05:30",
        "exception": false,
        "order_id": "od12345467",
        "pick_before_time": "2016-07-26T11:38:41.378+05:30",
        "status": "pending",
        "total_orderlines": 0,
        "update_time": "2017-11-16T11:27:16.934+05:30"
    }, {
        "breached": true,
        "completed_orderlines": 0,
        "create_time": "2017-11-16T11:22:54.380+05:30",
        "exception": false,
        "order_id": "od1234567",
        "pick_before_time": "2016-07-26T11:38:41.378+05:30",
        "status": "ACCEPTED",
        "total_orderlines": 0,
        "update_time": "2017-11-16T11:22:54.385+05:30"
    }, {
        "breached": true,
        "completed_orderlines": 0,
        "create_time": "2017-11-16T10:33:50.484+05:30",
        "exception": false,
        "order_id": "od123456",
        "pick_before_time": "2017-07-26T11:38:41.378+05:30",
        "status": "ACCEPTED",
        "total_orderlines": 0,
        "update_time": "2017-11-16T10:33:50.493+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.616+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "INTERNAL_SERVER_ERROR",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.620+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.615+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "CREATED",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.620+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.615+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "BAD_REQUEST",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.620+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.614+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "fulfillable",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.620+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.614+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "abandoned",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.620+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.613+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "complete",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.620+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.604+05:30",
        "exception": false,
        "order_id": "2",
        "pick_before_time": null,
        "status": "rejected",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.620+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.602+05:30",
        "exception": false,
        "order_id": "3",
        "pick_before_time": null,
        "status": "abandoned",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.620+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.599+05:30",
        "exception": false,
        "order_id": "3",
        "pick_before_time": null,
        "status": "abandoned",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.597+05:30",
        "exception": false,
        "order_id": "2",
        "pick_before_time": null,
        "status": "fulfillable",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.596+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "rejected",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.594+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "ACCEPTED",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.594+05:30",
        "exception": false,
        "order_id": "2",
        "pick_before_time": null,
        "status": "not_fulfillable",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.593+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "not_fulfillable",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.592+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "complete",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.592+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "CREATED",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.590+05:30",
        "exception": false,
        "order_id": "09809809",
        "pick_before_time": null,
        "status": "CREATED",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.589+05:30",
        "exception": false,
        "order_id": "2",
        "pick_before_time": null,
        "status": "CREATED",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.584+05:30",
        "exception": false,
        "order_id": "2",
        "pick_before_time": null,
        "status": "CREATED",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.583+05:30",
        "exception": false,
        "order_id": "2",
        "pick_before_time": null,
        "status": "INTERNAL_SERVER_ERROR",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }, {
        "breached": false,
        "completed_orderlines": 0,
        "create_time": "2017-10-31T15:36:07.582+05:30",
        "exception": false,
        "order_id": "2",
        "pick_before_time": null,
        "status": "BAD_REQUEST",
        "total_orderlines": 0,
        "update_time": "2017-10-31T15:36:07.619+05:30"
    }]
const expectedTotalPages = 3;
const expectedTotalOrders = 72;
const expectedItemsPerOrder = 0.0;
const expectedTotalCompletedOrders = 7;
const expectedTotalPendingOrders = 1;
const expectedNoResultFound = false;
const expectedSuccessQuery = undefined;

expect(
  getOrderDetail(
    {"successQuery":undefined},
    {
        type : CONSTANTS.ORDER_RECIEVED,
        data
    }
    )
  ).toEqual(
  {
      "ordersDetail" : expectedOrdersDetail,
      "totalPage" : expectedTotalPages,
      "totalOrders" : expectedTotalOrders,
      "itemsPerOrder": expectedItemsPerOrder,
      "totalCompletedOrder":expectedTotalCompletedOrders,
      "totalPendingOrder":expectedTotalPendingOrders,
      "noResultFound":expectedNoResultFound,
      "successQuery" : expectedSuccessQuery
  }
  )

})
})