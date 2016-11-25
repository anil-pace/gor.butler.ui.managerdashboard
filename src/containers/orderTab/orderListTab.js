/**
 * Container for Overview tab
 * This will be switched based on tab click
 */

 import React  from 'react';
 import ReactPaginate from 'react-paginate';
 import { connect } from 'react-redux';
 import {getPageData, getStatusFilter, getTimeFilter,getPageSizeOrders,currentPageOrders,lastRefreshTime} from '../../actions/paginationAction';
 import {ORDERS_RETRIEVE,GOR_BREACHED,GOR_EXCEPTION,GET,APP_JSON} from '../../constants/frontEndConstants';
 import {BASE_URL, API_URL,ORDERS_URL,PAGE_SIZE_URL,PROTOCOL,ORDER_PAGE, PICK_BEFORE_ORDER_URL, BREACHED_URL,UPDATE_TIME_HIGH,UPDATE_TIME_LOW,EXCEPTION_TRUE} from '../../constants/configConstants';
 import OrderListTable from './orderListTable';
 import Dropdown from '../../components/dropdown/dropdown';
 import {stringConfig} from '../../constants/backEndConstants';
 import { FormattedMessage ,defineMessages,FormattedRelative,FormattedDate} from 'react-intl';


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
    data.selected = 0;
    this.handlePageClick(data);
  }

  processOrders(data, nProps) {

    var nProps = this;
    var data = nProps.props.orderData.ordersDetail;
    let progress  = nProps.context.intl.formatMessage(messages.inProgressStatus);
    let completed  = nProps.context.intl.formatMessage(messages.completedStatus);
    let exception = nProps.context.intl.formatMessage(messages.exceptionStatus);
    let unfulfillable  = nProps.context.intl.formatMessage(messages.unfulfillableStatus); 
    var renderOrderData = [], ordersStatus = {'pending':progress, "fulfillable": progress, "completed":completed, "not_fulfillable":unfulfillable, "exception":exception},orderData = {};
    var breachedStatus = {'pending':1, "fulfillable": 1, "completed":3, "not_fulfillable":2};
    var unBreachedStatus = {'pending':4, "fulfillable": 4, "completed":6, "not_fulfillable":5};
    var timeOffset=nProps.props.timeOffset;
    if(!data.length) {
      return;
    }

    for (var i =0; i < data.length; i++) {
      orderData.id = data[i].order_id;

      if(data[i].breached === true) {

        orderData.status = ordersStatus[data[i].status];
        orderData.statusClass = GOR_BREACHED;
        orderData.statusPriority = breachedStatus[data[i].status];
      }
      if(data[i].exception === true) {
        orderData.status = ordersStatus[data[i].status];
        orderData.statusClass = GOR_EXCEPTION;

        orderData.statusPriority = breachedStatus[data[i].status];
      }      
      else {
        orderData.status = stringConfig[data[i].status];
        orderData.statusClass = data[i].status;
        orderData.statusPriority = unBreachedStatus[data[i].status];
      }
      
      orderData.recievedTime = <FormattedDate value = {data[i].create_time}
                                timeZone={timeOffset}
                                year='numeric'
                                month='short'
                                day='2-digit'
                                hour="2-digit"
                                minute="2-digit"
                                second="2-digit"
                                timeZoneName="long"
                                />;
                                if(data[i].pick_before_time === null) {
                                  orderData.pickBy = "--";
                                }
                                else {
                                  orderData.pickBy = data[i].pick_before_time.substring(4);
                                  orderData.pickBy = orderData.pickBy.substring(0, orderData.pickBy.length - 4)
                                }

                                if(data[i].completed_orderlines === data[i].total_orderlines) {
                                  orderData.orderLine = data[i].total_orderlines;
                                }
                                else {
                                  orderData.orderLine = data[i].completed_orderlines + "/" + data[i].total_orderlines;
                                }
                                
                                orderData.completedTime = <FormattedDate value = {data[i].update_time}

                                timeZone={timeOffset}
                                year='numeric'
                                month='short'
                                day='2-digit'
                                hour="2-digit"
                                minute="2-digit"
                                second="2-digit"
                                timeZoneName="long"

                                />;

                                renderOrderData.push(orderData);
                                orderData = {};    
                              }
                              return renderOrderData;
                            }


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
                                  'method':GET,
                                  'cause': ORDERS_RETRIEVE,
                                  'token': this.props.auth_token,
                                  'contentType':APP_JSON
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
                              else if(this.props.filterOptions.statusFilter=== "exception")
                              {
                                appendStatusUrl = EXCEPTION_TRUE ;      
                              }
                              else {
                               appendStatusUrl = WAREHOUSE_STATUS + (this.props.filterOptions.statusFilter);
                             }
                             if(timeOut !== undefined && timeOut !== "allOrders") {
                              currentTime = new Date();
                              prevTime = new Date();
                              prevTime = new Date(prevTime.setHours(prevTime.getHours() - convertTime[timeOut]));
                              prevTime = prevTime.toISOString();
                              currentTime = currentTime.toISOString();
                              appendTimeUrl = UPDATE_TIME_LOW+ currentTime +UPDATE_TIME_HIGH+ prevTime;
                            }
                            data.url = data.url + appendStatusUrl+appendTimeUrl+appendPageSize;
                            this.props.lastRefreshTime((new Date()));
                            this.handlePageClick(data)
                          }

                          render(){
                            var updateStatus;
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
                            var orderDetail;
                            if(this.props.orderData.ordersDetail !== undefined) {
                              orderDetail = this.processOrders(this.props.orderData.ordersDetail, this);
                            }
                            return (
                              <div>
                              <div className="gor-Orderlist-table" >  

                              <OrderListTable items={orderDetail} itemNumber={itemNumber} statusFilter={this.props.getStatusFilter} timeFilter={this.props.getTimeFilter} refreshOption={this.refresh.bind(this)} lastUpdatedText = {updateStatusText} lastUpdated={updateStatusIntl} refreshList={this.refresh.bind(this)} intlMessg={this.props.intlMessages}/>

                              <div className="gor-pageNum">
                              <Dropdown  styleClass={'gor-Page-Drop'}  items={ordersByStatus} currentState={ordersByStatus[0]} optionDispatch={this.props.getPageSizeOrders} refreshList={this.refresh.bind(this)}/>
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
                            intlMessages: state.intl.messages,
                            timeOffset: state.authLogin.timeOffset,
                            auth_token: state.authLogin.auth_token  
                          };
                        }

                        var mapDispatchToProps = function(dispatch){
                          return {
                            getPageData: function(data){ dispatch(getPageData(data)); },
                            getStatusFilter: function(data){ dispatch(getStatusFilter(data)); },
                            getTimeFilter: function(data){ dispatch(getTimeFilter(data)); },
                            getPageSizeOrders: function(data){ dispatch(getPageSizeOrders(data));},
                            currentPage: function(data){ dispatch(currentPageOrders(data));},
                            lastRefreshTime: function(data){ dispatch(lastRefreshTime(data));}
                          }
                        };

                        OrderListTab.contextTypes = {
                         intl:React.PropTypes.object.isRequired
                       }

                       export default connect(mapStateToProps,mapDispatchToProps)(OrderListTab) ;
