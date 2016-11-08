/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import {getPageData, getStatusFilter, getTimeFilter,getPageSize,currentPage,lastRefreshTime} from '../../actions/paginationAction';
import {ORDERS_RETRIEVE} from '../../constants/appConstants';
import {BASE_URL, API_URL,ORDERS_URL,PAGE_SIZE_URL,PROTOCOL,ORDER_PAGE, PICK_BEFORE_ORDER_URL, BREACHED_URL} from '../../constants/configConstants';
import OrderListTable from './orderListTable';
import Dropdown from '../../components/dropdown/dropdown'
import { FormattedMessage } from 'react-intl';


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

   // componentWillReceiveProps(nextProps) {
   //   this.refresh();
   // }

    handlePageClick = (data) => {
    var url;
    if(data.url === undefined) {
      url = API_URL + ORDERS_URL + ORDER_PAGE + (data.selected+1) + "&PAGE_SIZE=25";
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
          this.props.currentPage(data.selected+1);
         this.props.getPageData(paginationData);
    }


   refresh() {
    var convertTime = {"oneHourOrders": 1, "twoHourOrders": 2, "sixHourOrders": 6, "twelveHourOrders": 12, "oneDayOrders": 24};
    var status = this.props.filterOptions.statusFilter, timeOut = this.props.filterOptions.timeFilter,currentTime,prevTime;
    var data = {}, appendStatusUrl="", appendTimeUrl="", appendPageSize="";
    data.selected = 0;
    data.url = "";
    data.url = API_URL + ORDERS_URL + ORDER_PAGE + (data.selected+1);

    if(this.props.filterOptions.pageSize === undefined) {
      appendPageSize = PAGE_SIZE_URL + "25";
    }

    else {
      appendPageSize = PAGE_SIZE_URL + this.props.filterOptions.pageSize ;
    }

    if((status === undefined || status === "all")) {
      appendStatusUrl = "";
     }

    else if(this.props.filterOptions.statusFilter === "breached") {
      currentTime = new Date();
      currentTime = currentTime.toISOString();
      appendStatusUrl = PICK_BEFORE_ORDER_URL + currentTime + BREACHED_URL ;
    }
     
    else {
       appendStatusUrl = "&warehouse_status=" + (this.props.filterOptions.statusFilter);
    }

     if(timeOut !== undefined && timeOut !== "allOrders") {
        currentTime = new Date();
        prevTime = new Date();
        prevTime = new Date(prevTime.setHours(prevTime.getHours() - convertTime[timeOut]));
        prevTime = prevTime.toISOString();
       currentTime = currentTime.toISOString();
       appendTimeUrl = '&update_time<='+ currentTime +'&update_time>='+ prevTime;
     }
    data.url = data.url + appendStatusUrl+appendTimeUrl+appendPageSize;
    this.props.lastRefreshTime((new Date()));
    this.handlePageClick(data)
  }


    
  render(){
    var updateStatus;
    let updateStatusIntl;
    if(this.props.filterOptions.lastUpdatedOn) {
      var diff = (new Date())-this.props.filterOptions.lastUpdatedOn;
      if (diff > 60e3) {
       updateStatus =  Math.floor(diff / 60e3) ;
        updateStatusIntl = <FormattedMessage id="orderlistTab.refreshStatusMinutes" description='refresh status for orderlist' defaultMessage='Last Updated {updateStatus} minutes ago' values={{updateStatus: updateStatus?updateStatus:'0'}}/>
      
      }
      else {
        updateStatus = Math.floor(diff / 1e3) ;
        updateStatusIntl = <FormattedMessage id="orderlistTab.refreshStatusSeconds" description='refresh status for orderlist' defaultMessage='Last Updated {updateStatus} seconds ago' values={{updateStatus: updateStatus?updateStatus:'0'}}/>
      
      }

  }

  //let updateStatusIntl = <FormattedMessage id="orderlistTab.refreshStatus" description='refresh status for orderlist' defaultMessage='Last Updated {} seconds ago' values={{totalOrder: totalOrder?totalOrder:'0'}}/>
               
  
    
    var itemNumber = 6, table, pages;
     const ordersByStatus = [
    { value: '25', label: '25' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
    { value: '250', label: '250' },
    { value: '500', label: '500' },
    { value: '1000', label: '1000' }
    ];
    var currentPage = this.props.filterOptions.currentPage, totalPage = this.props.orderData.totalPage;

    return (
      <div>
      <div className="gor-Orderlist-table" >  

      <OrderListTable items={this.props.orderData.ordersDetail} itemNumber={itemNumber} statusFilter={this.props.getStatusFilter} timeFilter={this.props.getTimeFilter} refreshOption={this.refresh.bind(this)} lastUpdated={updateStatusIntl} refreshList={this.refresh.bind(this)} intlMessg={this.props.intlMessages}/>
      
      <div className="gor-pageNum">
        <Dropdown  styleClass={'gor-Page-Drop'}  items={ordersByStatus} currentState={ordersByStatus[0]} optionDispatch={this.props.getPageSize} refreshList={this.refresh.bind(this)}/>
      </div>
      <div className="gor-paginate">
        <div className = "gor-paginate-state"> 
         <FormattedMessage id="orderlistTab.pageNum" description='page num orderlist' defaultMessage='Page {currentPage} of {totalPage}' values={{currentPage: currentPage?currentPage:'0', totalPage: totalPage?totalPage:'0'}}/>
      
        </div>
        <div id={"react-paginate"}>
          <ReactPaginate previousLabel={"<<"}
                       nextLabel={">>"}
                       breakClassName={"break-me"}
                       pageNum={this.props.orderData.totalPage}
                       marginPagesDisplayed={1}
                       pageRangeDisplayed={1}
                       clickCallback={this.handlePageClick.bind(this)}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
        </div>
      </div>
      </div>
      </div>
      
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    filterOptions: state.filterOptions || {},
    orderData: state.getOrderDetail || {},
    statusFilter : state.filterOptions.statusFilter || null,
    intlMessages: state.intl.messages
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    getPageData: function(data){ dispatch(getPageData(data)); },
    getStatusFilter: function(data){ dispatch(getStatusFilter(data)); },
    getTimeFilter: function(data){ dispatch(getTimeFilter(data)); },
    getPageSize: function(data){ dispatch(getPageSize(data));},
    currentPage: function(data){ dispatch(currentPage(data));},
    lastRefreshTime: function(data){ dispatch(lastRefreshTime(data));}
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(OrderListTab) ;
