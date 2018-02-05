//source: https://codepen.io/adamaoc/pen/wBGGQv?editors=1010

import React  from 'react';
import { FormattedMessage, FormattedDate } from 'react-intl';
import ProgressBar from '../../components/progressBar';
import OrderFilter from './orderFilter';

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
      progressCount: 5,
      showFilter: false
    }
    this.collapseAll = this.collapseAll.bind(this);
    this.showFilter = this.showFilter.bind(this);
    this.hideFilter = this.hideFilter.bind(this);
  } 

  componentDidMount(){
  }

  collapseAll(){
     this.props.contractAll(false);
  }

  showFilter(){
    this.setState({
      showFilter: true
    })
  }

  hideFilter(data){
    this.setState({
      showFilter: data
    })
  }

  render()
  {
      let filterHeight=screen.height - 190 - 50;
      return (
          <div className="orderTopWrapper">
              <div className="orderLeftWrapper">
                <div className="orderLeftContent">
                  <div className="dateTimeWrapper">
                      <FormattedDate 
                          value={new Date()}
                          day='2-digit'
                          month='short'
                          year='numeric'
                      />
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
                      <button className="ordersCollapseAll" onClick={this.collapseAll.bind(this)}>
                      <FormattedMessage id="orders.table.collapseAll" description="button label for collapse all" defaultMessage="COLLAPSE ALL "/>
                      </button>
                    </div>
                  <div className="gorButtonWrap">
                      <button className="ordersFilterData" onClick={this.showFilter.bind(this)}>
                      <div className="gor-manage-task"/>
                      <FormattedMessage id="orders.tabel.filterLabel" description="button label for filter" defaultMessage="FILTER DATA"/>
                      </button>
                  </div>
                  </div>

                  {this.state.showFilter? 
                        (<div className="gor-filter-wrap"
                             style={{'width': this.state.showFilter ? '350px' : '0px', height: filterHeight}}>
                            <OrderFilter hideFilter={this.hideFilter}/>
                        </div>) : null
                  }
                  

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
