//source: https://codepen.io/adamaoc/pen/wBGGQv?editors=1010

import React  from 'react';
import { FormattedMessage } from 'react-intl';
import ProgressBar from '../components/progressBar.js';
import ViewOrderLine from '../containers/neworderTab/viewOrderLine';
import {modal} from 'react-redux-modal';

var orderStrings ={
  "ordersCompleted": "Order(s) completed of",
  "orderLineCompleted": "Orderline(s) completed of",
  "breachedOrders": "Breached orders",
  "inProgress": "currently in progress"
}


class OrderTile extends React.Component{
  constructor(props) 
  {
    super(props);
    this.state={
      todaysDate: "",
      progressCount: 5
    }
    this.getTodaysDate = this.getTodaysDate.bind(this);
    this.viewOrderLine = this.viewOrderLine.bind(this);
    
  } 

  componentDidMount(){
    this.getTodaysDate();
  }

  getTodaysDate(){
    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getMonth()];
    let currentDate = date + " " + month + " " + year; 
    this.setState({
      todaysDate : currentDate
    })
  }

  viewOrderLine() {
    modal.add(ViewOrderLine, {
        title: '',
        size: 'large',
            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true // (optional) if you don't wanna show the top right close button
            //.. all what you put in here you will get access in the modal props ;),
        });
  }
  
  render()
  {
      return (
          <div className="orderTopWrapper">
              <div className="orderLeftWrapper">
                <div className="orderLeftContent">
                  <div className="dateTimeWrapper">
                    <span className="dateTime"> {this.state.todaysDate} </span>
                  </div>
                  <div className="orderLeftHeader"> 
                    <FormattedMessage id="orders.progress" description="header of orders progress" defaultMessage="Order fulfuilment progress "/>
                  </div>
                  <ProgressBar progressWidth={this.state.progressCount}/>
                  <div className="orderLeftStatus">
                    <div className="statusLeft">
                      <span> No PPS running </span>
                    </div>
                    <div className="statusRight">
                      <span> No Products to be picked </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="orderCenterWrapper"> </div>

              <div className="orderRightWrapper">
                <div className="orderRightContent">
                  <div className="orderButtonWrapper">
                    <div className="gorButtonWrap">
                      <button className="ordersCollapseAll" onClick={this.viewOrderLine.bind(this)}>
                      <FormattedMessage id="orders.table.collapseAll" description="button label for collapse all" defaultMessage="COLLAPSE ALL "/>
                      </button>
                    </div>
                  <div className="gorButtonWrap">
                      <button className="ordersFilterData">
                      <div className="gor-manage-task"/>
                      <FormattedMessage id="orders.tabel.filterLabel" description="button label for filter" defaultMessage="FILTER DATA"/>
                      </button>
                  </div>
                  </div>

                  <div className="orderRightHeader"> 
                    <FormattedMessage id="orders.summary" description="header of orders summary" defaultMessage="Order summary "/>
                  </div>
                  <div className="orderRightStatus">
                    <div className="statusTop">
                      <span> 0 {orderStrings.ordersCompleted} 0 </span>
                      <span> 0 {orderStrings.orderLineCompleted} 0 </span>
                      <span> 0 {orderStrings.breachedOrders} </span>
                    </div>
                    <div className="statusBottom">
                      <span> 0 {orderStrings.inProgress} </span>
                      <span> 0 {orderStrings.inProgress}</span>
                      <span> 0 {orderStrings.breachedOrders} completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
      );
    }
  }

  export default OrderTile;
