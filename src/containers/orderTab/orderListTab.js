/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import {getPageData, getStatusFilter, getTimeFilter} from '../../actions/paginationAction';
import {ORDERS_RETRIEVE} from '../../constants/appConstants';
import {BASE_URL, ORDERS_URL} from '../../constants/configConstants';
import OrderListTable from './orderListTable';


class OrderListTab extends React.Component{
  constructor(props) 
  {
      super(props);
  } 
  componentDidMount() {
    var data = {};
    data.selected = 0;
    this.handlePageClick(data);
  }

    handlePageClick = (data) => {
    var url;
    if(data.url === undefined) {
      url = BASE_URL + ORDERS_URL + "?page=" + (data.selected+1) + "&PAGE_SIZE=8";
    }

    else {
      url = data.url;
    }
    let paginationData={
              'url':url,
              'method':'GET',
              'cause': ORDERS_RETRIEVE,
              'token': sessionStorage.getItem('auth_token'),
              'contentType':'application/json'
          } 
         this.props.getPageData(paginationData);
    }

    filter(data) {
  }
//d.setHours(d.getHours() - 2);

   refresh() {
    var convertTime = {"oneHourOrders": 1, "twoHourOrders": 2, "sixHourOrders": 6, "twelveHourOrders": 12, "oneDayOrders": 24};
    var status = this.props.filterOptions.statusFilter, timeOut = this.props.filterOptions.timeFilter,currentTime,prevTime;
    var data = {}, appendStatusUrl="", appendTimeUrl="";
    data.selected = 0;
    data.url = "";
    data.url = BASE_URL + ORDERS_URL + "?page=" + (data.selected+1) + "&PAGE_SIZE=8"
    if((status === undefined || status === "all")) {
      appendStatusUrl = "";
     }

    else if(this.props.filterOptions.statusFilter === "breached") {
      currentTime = new Date();
      currentTime = currentTime.toISOString();
      appendStatusUrl = '&pick_before_time<='+currentTime+'&warehouse_status=["pending","fulfillable"]' ;
    }
     
    else {
       appendStatusUrl = "&warehouse_status=" + (this.props.filterOptions.statusFilter);
    }

    // if(timeOut !== undefined && timeOut !== "allOrders") {
    //    currentTime = new Date();
    //    prevTime = new Date();
    //    prevTime = prevTime.setHours(prevTime.getHours() - convertTime[timeOut]);
    //    prevTime = prevTime.toISOString();
    //    currentTime = currentTime.toISOString();
      
    //   appendTimeUrl = 'update_time<='+ currentTime +'&update_time>='+ prevTime;
    // }
    data.url = data.url + appendStatusUrl+appendTimeUrl;
    this.handlePageClick(data)
  }
    
  render(){
    var itemNumber = 6, table, pages;
    var table = <OrderListTable items={this.props.orderData.ordersDetail} itemNumber={itemNumber} statusFilter={this.props.getStatusFilter} timeFilter={this.props.getTimeFilter} refreshOption={this.refresh.bind(this)}/>
    return (
      <div>
      {table}
      <div id={"react-paginate"}>
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageNum={this.props.orderData.totalPage}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={50}
                       clickCallback={this.handlePageClick.bind(this)}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
     </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    filterOptions: state.filterOptions || {},
    orderData: state.getOrderDetail || {},
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    getPageData: function(data){ dispatch(getPageData(data)); },
    getStatusFilter: function(data){ dispatch(getStatusFilter(data)); },
    getTimeFilter: function(data){ dispatch(getTimeFilter(data)); }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(OrderListTab) ;
