import {ORDER_RECIEVED} from '../constants/appConstants'; 
import React  from 'react';
import { FormattedMessage } from 'react-intl';

function processOrders(data) {
  let progress = <FormattedMessage id="orderList.progress.status" description='progress status for orderList' defaultMessage='In Progress'/>;
  let completed = <FormattedMessage id="orderList.completed.status" description='completed status for orderList' defaultMessage='Completed'/>;
  let unfulfillable = <FormattedMessage id="orderList.Unfulfillable.status" description='Unfulfillable status for orderList' defaultMessage='Unfulfillable'/>;
  var renderOrderData = [], ordersStatus = {'pending':progress, "fulfillable": progress, "completed":completed, "not_fulfillable":unfulfillable},orderData = {};
  if(data.length !== undefined) {
    for (var i =0; i < data.length; i++) {
      orderData.id = data[i].order_id;

      if(data[i].breached === false) {
        orderData.status = ordersStatus[data[i].status];
        orderData.statusClass = data[i].status;
      }

      else {
        orderData.status = ordersStatus[data[i].status];
        orderData.statusClass = "breached";
      }
      orderData.recievedTime = (data[i].create_time.substring(4));
      orderData.recievedTime = orderData.recievedTime.substring(0, orderData.recievedTime.length - 4)
      if(data[i].pick_before_time === null) {
        orderData.pickBy = "--";
      }
      else {
        orderData.pickBy = data[i].pick_before_time.substring(4);
        orderData.pickBy = orderData.pickBy.substring(0, orderData.pickBy.length - 4)
      }

      if(data[i].completed_orderlines === 0) {
        orderData.orderLine = data[i].total_orderlines;
      }
      else {
        total_orderlines = data[i].completed_orderlines + "/" + data[i].total_orderlines;
        orderData.orderLine = total_orderlines;
      }
      orderData.completedTime = data[i].update_time.substring(4);
      orderData.completedTime = orderData.completedTime.substring(0, orderData.completedTime.length - 4);

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