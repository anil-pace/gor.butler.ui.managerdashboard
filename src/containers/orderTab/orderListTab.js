import React  from 'react';
import { connect } from 'react-redux';
import {getPageData, getStatusFilter, getTimeFilter,getPageSizeOrders,currentPageOrders,lastRefreshTime} from '../../actions/paginationAction';
import {ORDERS_RETRIEVE,GOR_BREACHED,GOR_EXCEPTION,GET,APP_JSON, INITIAL_HEADER_SORT, INITIAL_HEADER_ORDER} from '../../constants/frontEndConstants';
import {BASE_URL, API_URL,ORDERS_URL,PAGE_SIZE_URL,PROTOCOL,ORDER_PAGE, PICK_BEFORE_ORDER_URL, BREACHED_URL,UPDATE_TIME_HIGH,UPDATE_TIME_LOW,EXCEPTION_TRUE,WAREHOUSE_STATUS,FILTER_ORDER_ID} from '../../constants/configConstants';
import OrderListTable from './orderListTable';
import Dropdown from '../../components/dropdown/dropdown'
import { FormattedMessage ,defineMessages,FormattedRelative} from 'react-intl';
import Spinner from '../../components/spinner/Spinner';
import {setOrderListSpinner} from '../../actions/orderListActions';
import {stringConfig} from '../../constants/backEndConstants';
import {orderHeaderSortOrder, orderHeaderSort, orderFilterDetail} from '../../actions/sortHeaderActions';
import {getDaysDiff} from '../../utilities/getDaysDiff';
import GorPaginate from '../../components/gorPaginate/gorPaginate';
const messages = defineMessages ({
  inProgressStatus:{
    id: 'orderList.progress.status',
    description: "In 'progress message' for orders",
    defaultMessage: "In Progress"},

    completedStatus:{
      id:"orderList.completed.status",
      description:" 'Completed' status",
      defaultMessage: "Completed"},

      exceptionStatus:{
        id:"orderList.exception.status",
        description:" 'Exception' status",
        defaultMessage: "Exception"},

        unfulfillableStatus:{
          id:"orderList.Unfulfillable.status", 
          description:" 'Unfulfillable' status",
          defaultMessage: "Unfulfillable"},
          orderListRefreshedat:{
            id:'orderlist.Refreshed.at', 
            description:" 'Refreshed' status",
            defaultMessage:'Last Updated '}
          });


class OrderListTab extends React.Component{
  constructor(props) 
  {
    super(props);
  } 
  componentDidMount() {
    var data = {};
    data.selected = 1;
    this.refresh(data);
  }

  processOrders(data, nProps) {

    var nProps = this;
    var data = nProps.props.orderData.ordersDetail;
    let progress  = nProps.context.intl.formatMessage(messages.inProgressStatus);
    let completed  = nProps.context.intl.formatMessage(messages.completedStatus);
    let exception = nProps.context.intl.formatMessage(messages.exceptionStatus);
    let unfulfillable  = nProps.context.intl.formatMessage(messages.unfulfillableStatus); 
    var renderOrderData = [], orderData = {};
    var timeOffset=nProps.props.timeOffset, alertStatesNum = 0, orderDataPacket = {};
    if(!data.length) {
      orderDataPacket = {"renderOrderData":renderOrderData,"alertStatesNum":alertStatesNum}
      return orderDataPacket;
    }

    for (var i =0; i < data.length; i++) {
      orderData.id = data[i].order_id;

      if(data[i].breached === true) {

        orderData.status = nProps.context.intl.formatMessage(stringConfig[data[i].status]);
        orderData.statusClass = GOR_BREACHED;
        alertStatesNum++;
      }
      else if(data[i].exception === true) {
        orderData.status = nProps.context.intl.formatMessage(stringConfig[data[i].status]);
        orderData.statusClass = GOR_EXCEPTION;
        alertStatesNum++;
      }      
      else {
        if(nProps.context.intl.formatMessage(stringConfig[data[i].status])) {
          orderData.status = nProps.context.intl.formatMessage(stringConfig[data[i].status]);
        }
        else {
          orderData.status = data[i].status;
        }
        orderData.statusClass = data[i].status;
      }
      if(!data[i].create_time){
        orderData.recievedTime = "--";
      }
      else{
        if(getDaysDiff(data[i].create_time)<2){
          orderData.recievedTime = nProps.context.intl.formatRelative(data[i].create_time,{timeZone:timeOffset,units:'day'}) +
           ", " + nProps.context.intl.formatTime(data[i].create_time,{timeZone:timeOffset,hour: 'numeric',minute: 'numeric',hour12: false});
        }
        else{
          orderData.recievedTime = nProps.context.intl.formatDate(data[i].create_time,
          {timeZone:timeOffset,
          year:'numeric',
          month:'short',
          day:'2-digit',
          hour:"2-digit",
          minute:"2-digit",
          hour12: false
          });
        }
      }
      if(!data[i].pick_before_time) {
        orderData.pickBy = "--";
      }
      else {
        if(getDaysDiff(data[i].pick_before_time)<2){
          orderData.pickBy = nProps.context.intl.formatRelative(data[i].pick_before_time,{timeZone:timeOffset,units:'day'}) +
           ", " + nProps.context.intl.formatTime(data[i].pick_before_time,{timeZone:timeOffset,hour: 'numeric',minute: 'numeric',hour12: false});
        }
        else{
          orderData.pickBy = nProps.context.intl.formatDate(data[i].pick_before_time,
          {timeZone:timeOffset,
          year:'numeric',
          month:'short',
          day:'2-digit',
          hour:"2-digit",
          minute:"2-digit",
          hour12: false
          });
        }
      }
     if(data[i].completed_orderlines === data[i].total_orderlines) {
      orderData.orderLine = data[i].total_orderlines;
    }
    else {
      orderData.orderLine = data[i].completed_orderlines + "/" + data[i].total_orderlines;
    }
    if (data[i].status === "completed"){
      if(getDaysDiff(data[i].update_time)<2){
        orderData.completedTime = nProps.context.intl.formatRelative(data[i].update_time,{timeZone:timeOffset,units:'day'}) + 
        ", " + nProps.context.intl.formatTime(data[i].update_time,{timeZone:timeOffset,hour: 'numeric',minute: 'numeric',hour12: false});     
      }
      else{
        orderData.completedTime = nProps.context.intl.formatDate(data[i].update_time,
        {timeZone:timeOffset,
          year:'numeric',
          month:'short',
          day:'2-digit',
          hour:"2-digit",
          minute:"2-digit",
          hour12: false
        });
      }
    }else{
      orderData.completedTime = "--";
    }

    renderOrderData.push(orderData);
    orderData = {};

  }
  orderDataPacket = {"renderOrderData":renderOrderData,"alertStatesNum":alertStatesNum}

  return orderDataPacket;
}


handlePageClick = (data) => {
  var url;
  if(data.url === undefined) {
    url = API_URL + ORDERS_URL + ORDER_PAGE + (data.selected) + "&PAGE_SIZE=25";
  }

  else {
    url = data.url;
  }

  let paginationData={

    'url':url,
    'method':'GET',
    'cause': ORDERS_RETRIEVE,
    'token': this.props.auth_token,
    'contentType':'application/json'
  } 
  this.props.setOrderListSpinner(true);
  this.props.currentPage(data.selected);
  this.props.getPageData(paginationData);
}






refresh = (data) => {
  var convertTime = {"oneHourOrders": 1, "twoHourOrders": 2, "sixHourOrders": 6, "twelveHourOrders": 12, "oneDayOrders": 24};
  var status = this.props.filterOptions.statusFilter, timeOut = this.props.filterOptions.timeFilter,currentTime,prevTime;
  var  appendStatusUrl="", appendTimeUrl="", appendPageSize="", appendSortUrl="", appendTextFilterUrl="";
  var sortHead = {"recievedTime":"&order_by=create_time", "pickBy":"&order_by=pick_before_time", "id":"&order_by=order_id"};
  var sortOrder = {"DESC":"&order=asc", "ASC":"&order=desc"};
  if(!data) {
    data = {};
    data.selected = 1;
    data.url = "";
  }
  //for backend sorting
  if(data.columnKey && data.sortDir) {
    appendSortUrl = sortHead[data.columnKey] + sortOrder[data.sortDir];
  }
  else if(this.props.orderSortHeaderState && this.props.orderSortHeader && this.props.orderSortHeaderState.colSortDirs) {
    appendSortUrl = sortHead[this.props.orderSortHeader] + sortOrder[this.props.orderSortHeaderState.colSortDirs[this.props.orderSortHeader]]
  }

  //for search via text filter
  if((data.captureValue || data.captureValue === "") && data.type === "searchOrder") {
      appendTextFilterUrl = FILTER_ORDER_ID + data.captureValue;
  }

  else if(this.props.orderFilter){
    appendTextFilterUrl = FILTER_ORDER_ID + this.props.orderFilter;
  }

  //generating api url by pagination page no.
  data.url = "";
  data.url = API_URL + ORDERS_URL + ORDER_PAGE + (data.selected);
  
  //appending page size filter
  if(this.props.filterOptions.pageSize === undefined) {
    appendPageSize = PAGE_SIZE_URL + "25";
  }

  else {
    appendPageSize = PAGE_SIZE_URL + this.props.filterOptions.pageSize ;
  }

  //appending filter for status
  if((status === undefined || status === "all")) {
    appendStatusUrl = "";
  }
  else if(this.props.filterOptions.statusFilter === "breached") {
    currentTime = new Date();
    currentTime = currentTime.toISOString();
    appendStatusUrl = PICK_BEFORE_ORDER_URL + currentTime + BREACHED_URL ;
  }
  else if(this.props.filterOptions.statusFilter=== "exception")
  {
    appendStatusUrl = EXCEPTION_TRUE ;      
  }
  else {
   appendStatusUrl = WAREHOUSE_STATUS + (this.props.filterOptions.statusFilter);
 }

 //appending filter for orders by time
 if(timeOut !== undefined && timeOut !== "allOrders") {
  currentTime = new Date();
  prevTime = new Date();
  prevTime = new Date(prevTime.setHours(prevTime.getHours() - convertTime[timeOut]));
  prevTime = prevTime.toISOString();
  currentTime = currentTime.toISOString();
  appendTimeUrl = UPDATE_TIME_LOW+ currentTime +UPDATE_TIME_HIGH+ prevTime;
}

//combining all the filters
data.url = data.url + appendStatusUrl+appendTimeUrl+appendPageSize+ appendSortUrl + appendTextFilterUrl;
this.props.lastRefreshTime((new Date()));
this.handlePageClick(data)
}



render(){
  var updateStatus,timeOffset,headerTimeZone;
  let updateStatusIntl,updateStatusText;
  if(this.props.filterOptions.lastUpdatedOn) {
    updateStatusText = <FormattedMessage id="orderlistTab.orderListRefreshedat" description='Refresh Status text' defaultMessage='Last Updated ' />
    updateStatusIntl = <FormattedRelative updateInterval={10000} value={Date.now()}/>
  }
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
  var orderDetail , alertNum = 0,orderInfo;
  if(this.props.orderData.ordersDetail !== undefined) {
    orderInfo = this.processOrders(this.props.orderData.ordersDetail, this);
    orderDetail = orderInfo.renderOrderData;
    alertNum = orderInfo.alertStatesNum;
  }

  timeOffset = this.props.timeOffset || "",
  headerTimeZone = (this.context.intl.formatDate(Date.now(),
  {timeZone:timeOffset,
    year:'numeric',
    timeZoneName:'long'
  }));
  
  /*Extracting Time zone string for the specified time zone*/
  headerTimeZone = headerTimeZone.substr(5, headerTimeZone.length);
  return (
  <div>
  <div className="gor-Orderlist-table" >  

  <Spinner isLoading={this.props.orderListSpinner} setSpinner={this.props.setOrderListSpinner}/>
  <OrderListTable items={orderDetail} timeZoneString = {headerTimeZone} itemNumber={itemNumber} 
                  statusFilter={this.props.getStatusFilter} timeFilter={this.props.getTimeFilter} 
                  refreshOption={this.refresh.bind(this)} lastUpdatedText = {updateStatusText} lastUpdated={updateStatusIntl} 
                  refreshList={this.refresh.bind(this)} intlMessg={this.props.intlMessages} alertNum={alertNum}
                  totalOrders={this.props.orderData.totalOrders}
                  sortHeaderState={this.props.orderHeaderSort} currentSortState={this.props.orderSortHeader} 
                  sortHeaderOrder={this.props.orderHeaderSortOrder} currentHeaderOrder={this.props.orderSortHeaderState}
                  refreshData={this.refresh.bind(this)} setOrderFilter={this.props.orderFilterDetail}
                  getOrderFilter={this.props.orderFilter}
                  />

  <div className="gor-pageNum">
  <Dropdown  styleClass={'gor-Page-Drop'}  items={ordersByStatus} currentState={ordersByStatus[0]} optionDispatch={this.props.getPageSizeOrders} refreshList={this.refresh.bind(this)}/>
  </div>
  <div className="gor-paginate">
  <GorPaginate getPageDetail={this.refresh.bind(this)} totalPage={this.props.orderData.totalPage}/>
  </div>
  </div>
  </div>

  );
}
}

function mapStateToProps(state, ownProps){
  return {
    orderFilter: state.sortHeaderState.orderFilter|| "",
    orderSortHeader: state.sortHeaderState.orderHeaderSort || INITIAL_HEADER_SORT ,
    orderSortHeaderState: state.sortHeaderState.orderHeaderSortOrder || [],
    orderListSpinner: state.spinner.orderListSpinner || false,
    filterOptions: state.filterOptions || {},
    orderData: state.getOrderDetail || {},
    statusFilter : state.filterOptions.statusFilter || null,
    intlMessages: state.intl.messages,
    timeOffset: state.authLogin.timeOffset,
    auth_token: state.authLogin.auth_token  
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    orderFilterDetail: function(data){dispatch(orderFilterDetail(data))},
    orderHeaderSort: function(data){dispatch(orderHeaderSort(data))},
    orderHeaderSortOrder: function(data){dispatch(orderHeaderSortOrder(data))},
    getPageData: function(data){ dispatch(getPageData(data)); },
    getStatusFilter: function(data){ dispatch(getStatusFilter(data)); },
    getTimeFilter: function(data){ dispatch(getTimeFilter(data)); },
    getPageSizeOrders: function(data){ dispatch(getPageSizeOrders(data));},
    currentPage: function(data){ dispatch(currentPageOrders(data));},
    lastRefreshTime: function(data){ dispatch(lastRefreshTime(data));},
    setOrderListSpinner: function(data){dispatch(setOrderListSpinner(data))},
    setCurrentPage: function(data){dispatch(setCurrentPage(data))}
  }
};

OrderListTab.contextTypes = {
 intl:React.PropTypes.object.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderListTab) ;
