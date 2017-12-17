import * as actions from '../../../actions/paginationAction'
import * as CONSTANTS from '../../../constants/frontEndConstants'

describe('actions', () => {
  it('should create an action to receive orders data', () => {
    const data =  {
  "orders": [{
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-12T11:21:15.935+05:30",
    "exception": "false",
    "order_id": "2",
    "pick_before_time": null,
    "status": "completed",
    "total_orderlines": 0,
    "update_time": "2017-10-12T11:21:15.935+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-09T14:36:42.022+05:30",
    "exception": "false",
    "order_id": "2",
    "pick_before_time": null,
    "status": "completed",
    "total_orderlines": 0,
    "update_time": "2017-10-09T14:36:42.022+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-09T14:36:42.043+05:30",
    "exception": "false",
    "order_id": "9",
    "pick_before_time": null,
    "status": "completed",
    "total_orderlines": 0,
    "update_time": "2017-10-09T14:36:42.043+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-09T14:36:42.046+05:30",
    "exception": "false",
    "order_id": "10",
    "pick_before_time": null,
    "status": "completed",
    "total_orderlines": 0,
    "update_time": "2017-10-09T14:36:42.046+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-09T14:36:42.048+05:30",
    "exception": "false",
    "order_id": "11",
    "pick_before_time": null,
    "status": "completed",
    "total_orderlines": 0,
    "update_time": "2017-10-09T14:36:42.048+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-09T14:36:42.050+05:30",
    "exception": "false",
    "order_id": "12",
    "pick_before_time": null,
    "status": "completed",
    "total_orderlines": 0,
    "update_time": "2017-10-09T14:36:42.050+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-09T14:36:42.052+05:30",
    "exception": "false",
    "order_id": "13",
    "pick_before_time": null,
    "status": "completed",
    "total_orderlines": 0,
    "update_time": "2017-10-09T14:36:42.052+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-09T14:36:42.054+05:30",
    "exception": "false",
    "order_id": "14",
    "pick_before_time": null,
    "status": "completed",
    "total_orderlines": 0,
    "update_time": "2017-10-09T14:36:42.054+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-09T14:36:42.056+05:30",
    "exception": "false",
    "order_id": "15",
    "pick_before_time": null,
    "status": "completed",
    "total_orderlines": 0,
    "update_time": "2017-10-09T14:36:42.056+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-09T14:36:42.059+05:30",
    "exception": "false",
    "order_id": "17",
    "pick_before_time": null,
    "status": "completed",
    "total_orderlines": 0,
    "update_time": "2017-10-09T14:36:42.059+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-09T14:36:42.062+05:30",
    "exception": "false",
    "order_id": "19",
    "pick_before_time": null,
    "status": "completed",
    "total_orderlines": 0,
    "update_time": "2017-10-09T14:36:42.062+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-12T11:33:56.775+05:30",
    "exception": "false",
    "order_id": "20",
    "pick_before_time": null,
    "status": "completed",
    "total_orderlines": 0,
    "update_time": "2017-10-12T11:33:56.775+05:30"
  }],
  "totalOrders": 18,
  "totalPages": 1,
  "completedOrders": 12,
  "pendingOrders": 1,
  "itemsPerOrder": 0.0
}
const data_null = null;

    const expectedAction = {
      type: CONSTANTS.ORDER_RECIEVED,
      data: data
    }
    const expectedAction_null = {
        type: CONSTANTS.ORDER_RECIEVED,
        data: data_null
    }
    expect(actions.recieveOrdersData(data)).toEqual(expectedAction);
    expect(actions.recieveOrdersData(data_null)).toEqual(expectedAction_null);
  })
 
})