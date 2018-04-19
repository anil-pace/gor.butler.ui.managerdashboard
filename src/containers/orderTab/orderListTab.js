import React  from 'react';
import {connect} from 'react-redux';
import {FormattedMessage, FormattedDate, defineMessages, FormattedRelative} from 'react-intl';
import {hashHistory} from 'react-router';
import {modal} from 'react-redux-modal';

import OrderFilter from './orderFilter';
import OrderListTable from './orderListTable';
import Dropdown from '../../components/dropdown/dropdown'
import Spinner from '../../components/spinner/Spinner';
import {GTable} from '../../components/gor-table-component/index'
import {GTableHeader,GTableHeaderCell} from '../../components/gor-table-component/tableHeader';
import {GTableBody} from "../../components/gor-table-component/tableBody";
import {GTableRow} from "../../components/gor-table-component/tableRow";
import Accordion from '../../components/accordion/accordion';
import OrderTile from '../../containers/orderTab/OrderTile';
import ViewOrderLine from '../../containers/orderTab/viewOrderLine';
import GorPaginateV2 from '../../components/gorPaginate/gorPaginateV2';
import FilterSummary from '../../components/tableFilter/filterSummary';
import ProgressBar from '../../components/progressBar/progressBar';
import DotSeparatorContent from '../../components/dotSeparatorContent/dotSeparatorContent';

import {setOrderListSpinner, orderListRefreshed,setOrderQuery} from '../../actions/orderListActions';
import {orderHeaderSortOrder, orderHeaderSort, orderFilterDetail} from '../../actions/sortHeaderActions';
import {showTableFilter, filterApplied, orderfilterState, toggleOrderFilter} from '../../actions/filterAction';
import {updateSubscriptionPacket, setWsAction} from './../../actions/socketActions';
import { makeAjaxCall } from '../../actions/ajaxActions';

import {getDaysDiff} from '../../utilities/getDaysDiff';

import {stringConfig} from '../../constants/backEndConstants';
import {wsOverviewData} from './../../constants/initData.js';



import {getPageData, getStatusFilter, getTimeFilter, getPageSizeOrders, currentPageOrders, lastRefreshTime} from '../../actions/paginationAction';

import {ORDERS_RETRIEVE, GOR_BREACHED, BREACHED, GOR_EXCEPTION, toggleOrder, INITIAL_HEADER_SORT, sortOrderHead, sortOrder, WS_ONSEND, EVALUATED_STATUS,
    ANY, DEFAULT_PAGE_SIZE_OL, REALTIME, ORDERS_FULFIL_FETCH, APP_JSON, POST, GET, ORDERS_SUMMARY_FETCH, ORDERS_CUT_OFF_TIME_FETCH, ORDERS_PER_PBT_FETCH, ORDERLINES_PER_ORDER_FETCH,
    ORDERS_POLLING_INTERVAL
} from '../../constants/frontEndConstants';
import { setInfiniteSpinner } from '../../actions/notificationAction';

import {unSetAllActivePbts} from '../../actions/norderDetailsAction'

import {
    API_URL,
    ORDERS_URL,
    PAGE_SIZE_URL,
    PROTOCOL,
    ORDER_PAGE,
    UPDATE_TIME_UNIT, UPDATE_TIME,
    EXCEPTION_TRUE,
    WAREHOUSE_STATUS_SINGLE,
    WAREHOUSE_STATUS_MULTIPLE,
    FILTER_ORDER_ID, GIVEN_PAGE, GIVEN_PAGE_SIZE, ORDER_ID_FILTER_PARAM,ORDER_ID_FILTER_PARAM_WITHOUT_STATUS,
    ORDERS_FULFIL_URL, ORDERS_SUMMARY_URL, ORDERS_CUT_OFF_TIME_URL, ORDERS_PER_PBT_URL, ORDERLINES_PER_ORDER_URL
} from '../../constants/configConstants';



 class OrderListTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = this._getInitialState();

        this._viewOrderLine = this._viewOrderLine.bind(this);
        this._startPollingCutOffTime = this._startPollingCutOffTime.bind(this);
        this._stopPollingCutOffTime = this._stopPollingCutOffTime.bind(this);
        this._enableCollapseAllBtn = this._enableCollapseAllBtn.bind(this);
        this._disableCollapseAllBtn = this._disableCollapseAllBtn.bind(this);
        this._handleCollapseAll = this._handleCollapseAll.bind(this);
    }

    _getInitialState(){
        return {
            isPanelOpen:true,
            collapseAllBtnState: true, 
            date: new Date(),
            //query:this.props.location.query,
            pageSize:this.props.location.query.pageSize || DEFAULT_PAGE_SIZE_OL,
            queryApplied:Object.keys(this.props.location.query).length ? true :false,
            totalSize:this.props.totalSize || null,
            selected_page: 1, 
            query: null, 
            orderListRefreshed: null,
        }
    }

    componentWillMount() {
        /**
         * It will update the last refreshed property of
         * overview details, so that updated subscription
         * packet can be sent to the server for data
         * update.
         */
         this.props.orderListRefreshed();
    }

    componentDidMount(){
        let startDate =  new Date (new Date() - 1000*3600*24).toISOString();
        let endDate = new Date().toISOString();
        this._reqCutOffTime(startDate, endDate); // for Instant load at First time;
       
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.orderListRefreshed && nextProps.location.query && (!this.state.query || (JSON.stringify(nextProps.location.query) !== JSON.stringify(this.state.query)))) {
            this.setState({query: JSON.parse(JSON.stringify(nextProps.location.query))});
            this.setState({orderListRefreshed: nextProps.orderListRefreshed})
            //clearTimeout(this._intervalIdForCutOffTime);
            this._refreshList(nextProps.location.query);
        }
    }

    _refreshList(query) {
        let startDateFromFilter, endDateFromFilter, setStartDate, setEndDate, cutOffTimeFromFilter;

        if( (query.fromDate && query.toDate) && (query.toDate && query.toTime) ){
            startDateFromFilter = new Date(query.fromDate + " " + query.fromTime).toISOString();
            endDateFromFilter = new Date(query.toDate + " " + query.toTime).toISOString();
             if( query.cutOffTime){
                cutOffTimeFromFilter = new Date(new Date().toISOString().split("T")[0] + " " + query.cutOffTime).toISOString();
                this._reqOrderPerPbt(startDateFromFilter, endDateFromFilter, cutOffTimeFromFilter); // for fetching orders by giving cut off time
                this.props.toggleOrderFilter(true);
                this.props.filterApplied(true);
            }
        }
        else{
            if(query.cutOffTime){
                setStartDate = new Date (new Date() - 1000*3600*24).toISOString();
                setEndDate = new Date().toISOString();
                cutOffTimeFromFilter = new Date(new Date().toISOString().split("T")[0] + " " + query.cutOffTime).toISOString();
                this._reqOrderPerPbt(setStartDate, setEndDate, cutOffTimeFromFilter); 
                this.props.toggleOrderFilter(true);
                this.props.filterApplied(true);
            }
            else if(query.orderId){
                let params={
                    'url':ORDERLINES_PER_ORDER_URL+"/"+query.orderId,
                    'method':GET,
                    'contentType':APP_JSON,
                    'accept':APP_JSON,
                    'cause':ORDERLINES_PER_ORDER_FETCH,
                }
                this.props.makeAjaxCall(params);
                    if(this.props.orderLines){
                        modal.add(ViewOrderLine, {
                        orderId: query.orderId,
                        title: '',
                        size: 'large',
                        closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
                        hideCloseButton: true      // (optional) if you don't wanna show the top right close button
                                               //.. all what you put in here you will get access in the modal props ;),
                        });
                }
                
            }
        }
        this.props.setOrderQuery({query:query});

        // if (Object.keys(query).filter(function (el) {
        //     return el !== 'page'
        // }).length !== 0) {
        //     this.props.toggleOrderFilter(true);
        //     this.props.filterApplied(true);
        // } else {
        //     this.props.toggleOrderFilter(false);
        //     this.props.filterApplied(false);
        // }
        // this.props.currentPage(1);
        // this.props.orderfilterState({
        //     tokenSelected: {
        //         "STATUS": query.status ? (query.status.constructor=== Array ? query.status : [query.status]) : ['all'],
        //         "TIME PERIOD": query.period ? (query.period.constructor=== Array ? query.period[0] : query.period) : ['allOrders']
        //     },
        //     searchQuery: {"ORDER ID": query.orderId || ''},
        //     "PAGE": query.page || 1
        // });
        // this.props.setOrderQuery({query:query})
        //this.props.getPageData(paginationData);
        
    }

    /* START ===> THIS REQUEST IS ONLY WHEN CUT OFF TIME IS REQUESTED FROM FILTER */ 
    _reqOrderPerPbt(fromDateTime, toDateTime, cutOffTime){
            let formData={
                "start_date": fromDateTime,
                "end_date": toDateTime,
                "cut_off_time" : cutOffTime
            };

            let params={
                'url':ORDERS_PER_PBT_URL,
                'method':POST,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'cause':ORDERS_PER_PBT_FETCH,
                'formdata':formData,
            }
            this.props.makeAjaxCall(params);
    }

    _clearFilter() {
        hashHistory.push({pathname: "/orders", query: {}});
    }

    componentWillUnmount() {
        clearInterval(this._intervalId);
    }

    enableCollapse(){
        this.setState({
            collapseState: true,
            isPanelOpen: true
        })
    }

    disableCollapse(){
        this.setState({
            collapseState: false,
            isPanelOpen: false
        })
    }

     

    _subscribeData() {
        let updatedWsSubscription=this.props.wsSubscriptionData;
        this.props.initDataSentCall(updatedWsSubscription["default"])
        this.props.updateSubscriptionPacket(updatedWsSubscription);
    }


    _handleClickRefreshButton(){
        this._refreshList(this.state.query,(this.props.orderSortHeaderState?this.props.orderSortHeaderState.colSortDirs:null))
    }
    /**
     * The method will update the subscription packet
     * and will fetch the data from the socket.
     * @private
     */

    _setFilter() {
        var newState=!this.props.showFilter;
        this.props.showTableFilter(newState)
    }

    onPageSizeChange(arg) {
        this.refresh(null, arg);
    }

    _viewOrderLine = (orderId) =>  {
        clearInterval(this._intervalId);  // #stop ongoing polling.
        modal.add(ViewOrderLine, {
            startPolling: this._restartPolling,
            orderId: orderId,
            title: '',
            size: 'large',
            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true      // (optional) if you don't wanna show the top right close button
                                       //.. all what you put in here you will get access in the modal props ;),
            });
    }

    _getTodayDate(){
        const todayDate = (<FormattedDate 
                          value={new Date()}
                          day='2-digit'
                          month='short'
                          year='numeric'
                        />);
        return todayDate;
    }

    _reqOrdersFulfilment(startDate, endDate){
        let formData={
            "start_date": startDate,
            "end_date": endDate
        };

        let params={
            'url':ORDERS_FULFIL_URL,
            'method':POST,
            'contentType':APP_JSON,
            'accept':APP_JSON,
            'cause':ORDERS_FULFIL_FETCH,
            'formdata':formData
        }
        this.props.makeAjaxCall(params);
    }

    _reqOrdersSummary(startDate, endDate){
        let formData={
            "start_date": startDate,
            "end_date": endDate
        };

        let params={
            'url':ORDERS_SUMMARY_URL,
            'method':POST,
            'contentType':APP_JSON,
            'accept':APP_JSON,
            'cause':ORDERS_SUMMARY_FETCH,
            'formdata':formData,
        }
        this.props.makeAjaxCall(params);
    }

    _reqCutOffTime(startDate, endDate){
        let formData={
            "start_date": startDate,
            "end_date": endDate
        };

        let params={
            'url':ORDERS_CUT_OFF_TIME_URL,
            'method':POST,
            'contentType':APP_JSON,
            'accept':APP_JSON,
            'cause':ORDERS_CUT_OFF_TIME_FETCH,
            'formdata':formData,
        }
        this.props.makeAjaxCall(params);
        //call other http calls
        this._reqOrdersFulfilment(startDate, endDate);
        this._reqOrdersSummary(startDate, endDate);
        let newStartDate = new Date (new Date() - 1000*3600*24).toISOString();
        let newEndendDate = new Date().toISOString();
        this._intervalIdForCutOffTime = setTimeout(() => this._reqCutOffTime(newStartDate, newEndendDate), ORDERS_POLLING_INTERVAL);
    }

    _startPollingCutOffTime = ()=> {
        this._reqCutOffTime( new Date (new Date() - 1000*3600*24).toISOString(), new Date().toISOString() );
    }

    _stopPollingCutOffTime = (intervalId) => {
        clearTimeout(intervalId);
    }

    _formatProgressBar(nr, dr){
        let x = {};
        
        if(nr === 0 && dr === 0){
            x.message = (<FormattedMessage id="orders.progress.pending" description="pending" defaultMessage="Pending"/>);
            x.action = false;
        }
        else if(nr === 0){
            x.message=(<FormattedMessage id="orders.progress.pending" description="pending" defaultMessage="{current} products to be picked"
                      values={{current:dr}} />);
            x.action = false;
        }
        else{
            x.width = (nr/dr)*100;
            x.message = (<FormattedMessage id="orders.progress.pending" description="pending" defaultMessage="{current} of {total} products picked"
                            values={{current:nr, total: dr}} />);
            x.action  = true;
        }
        return x;
    }

    _enableCollapseAllBtn(){
        this.setState({
            collapseAllBtnState: false,
            isPanelOpen: true
        })
    }

    _disableCollapseAllBtn(){
        this.setState({
            collapseAllBtnState: true,
            isPanelOpen: false
        })
    }

    _handleCollapseAll(){
        this.props.unSetAllActivePbts()
    }

    render() {

        const todayDate = this._getTodayDate();
        let isPanelOpen = this.state.isPanelOpen;


        var filterHeight=screen.height - 150;
        var updateStatus, timeOffset, headerTimeZone;
        let updateStatusIntl, updateStatusText;
        // if (this.props.filterOptions.lastUpdatedOn) {
        //     updateStatusText=
        //     <FormattedMessage id="orderlistTab.orderListRefreshedat" description='Refresh Status text'
        //     defaultMessage='Last Updated '/>
        //     updateStatusIntl=<FormattedRelative updateInterval={ORDERS_POLLING_INTERVAL} value={Date.now()}/>
        // }
        var itemNumber=6, table, pages;
        
        var currentPage=this.props.filterOptions.currentPage, totalPage=this.props.orderData.totalPage;
        var orderDetail, alertNum=0, orderInfo;
        // if (this.props.orderData.ordersDetail !== undefined) {
        //     orderInfo=this.processOrders(this.props.orderData.ordersDetail, this);
        //     orderDetail=orderInfo.renderOrderData;
        //     alertNum=orderInfo.alertStatesNum;
        // }
        // timeOffset=this.props.timeOffset || "",
        // headerTimeZone=(this.context.intl.formatDate(Date.now(),
        // {
        //     timeZone: timeOffset,
        //     year: 'numeric',
        //     timeZoneName: 'long'
        // }));

        /*Extracting Time zone string for the specified time zone*/
        //headerTimeZone=headerTimeZone.substr(5, headerTimeZone.length);
        return (
            <div>
                <div className="gor-Orderlist-table">

                    {!this.props.showFilter ? <Spinner isLoading={this.props.orderListSpinner} setSpinner={this.props.setOrderListSpinner}/> : ""}
                    { true ? 
                        <div>
                            <div className="gor-filter-wrap" style={{'width': '400px','display': this.props.showFilter ? 'block' : 'none', height: filterHeight}}>
                                <OrderFilter ordersDetail={orderDetail} responseFlag={this.props.responseFlag}/>
                            </div>

                            <div>
                                <OrderTile 
                                        startDate={new Date (new Date() - 1000*3600*24).toISOString()}
                                        endDate={new Date().toISOString()} 
                                        pbtsData={this.props.pbts} 
                                        date={todayDate} 
                                        orderFulfilData={this.props.orderFulfilment}
                                        orderSummaryData={this.props.orderSummary}
                                        collapseState={this.state.collapseState}
                                        disableCollapse={this.disableCollapse}
                                        callBack = {this.callBack}
                                        orderListSpinner={this.props.orderListSpinner}
                                        showFilter={this.props.showFilter}
                                        filterOptions={this.props.filterOptions}
                                        orderData={this.props.orderData}
                                        timeOffset={this.props.timeOffset}
                                        showTableFilter={this.showTableFilter}
                                        />


                            <div style={{position: "absolute", right:"0", top:"7px"}} className="filterWrapper">
                                <div className="gorToolBarDropDown">
                                    <div className="gor-button-wrap">
                                        <div className="gor-button-sub-status">
                                            {this.props.lastUpdatedText} {this.props.lastUpdated}
                                        </div>

                                        <div className="orderButtonWrapper">
                                            <div className="gorButtonWrap">
                                              <button disabled={this.props.pbts.filter((pbt)=>pbt.opened).length<1} className="gor-filterBtn-btn" onClick={this._handleCollapseAll}>
                                              <FormattedMessage id="orders.action.collapseAll" description="button label for collapse all" defaultMessage="COLLAPSE ALL "/>
                                              </button>
                                            </div>
                                            <div className="gorButtonWrap">
                                                <button className={this.props.orderFilterStatus ? "gor-filterBtn-applied" : "gor-filterBtn-btn"} onClick={this._setFilter.bind(this)}>
                                                    <div className="gor-manage-task"/>
                                                        <FormattedMessage id="orders.action.filterLabel" description="button label for filter" defaultMessage="FILTER DATA"/>
                                                    </button>
                                            </div>
                                        </div>

                                    
                                    </div>
                                </div>
                            </div>
                    </div>
                {/*Filter Summary*/}
                <FilterSummary total={this.props.pbts.length || 0} isFilterApplied={this.props.isFilterApplied}
                    responseFlag={this.props.responseFlag}
                    filterText={<FormattedMessage id="orderlist.filter.search.bar"
                    description='total order for filter search bar'
                    defaultMessage='{total} Orders found'
                    values={{total: orderDetail ? orderDetail.length : '0'}}/>}
                    refreshList={this._clearFilter.bind(this)}
                    refreshText={<FormattedMessage id="orderlist.filter.search.bar.showall"
                    description="button label for show all"
                    defaultMessage="Show all orders"/>}/>

                </div> : null}

                {this.props.pbts.length> 0 ?
                    (<OrderListTable 
                        pbts={this.props.pbts}
                        startDate={new Date (new Date() - 1000*3600*24).toISOString()}
                        endDate={new Date().toISOString()}
                        intervalIdForCutOffTime={this._intervalIdForCutOffTime}
                        startPollingCutOffTime={this._startPollingCutOffTime}
                        stopPollingCutOffTime={this._stopPollingCutOffTime}
                        isFilterApplied={this.props.isFilterApplied}
                        enableCollapseAllBtn={this._enableCollapseAllBtn}
                        disableCollapseAllBtn={this._disableCollapseAllBtn}
                        isPanelOpen={this.state.isPanelOpen}
                        />)
                    : <div className="noOrdersPresent"> No orders available </div>
                }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        orderFilter: state.sortHeaderState.orderFilter || "",
        orderSortHeader: state.sortHeaderState.orderHeaderSort || INITIAL_HEADER_SORT,
        orderSortHeaderState: state.sortHeaderState.orderHeaderSortOrder || [],
        orderListSpinner: state.spinner.orderListSpinner || false,
        filterOptions: state.filterOptions || {},
        orderData: state.getOrderDetail || {},
        statusFilter: state.filterOptions.statusFilter || null,
        intlMessages: state.intl.messages,
        timeOffset: state.authLogin.timeOffset,
        auth_token: state.authLogin.auth_token,
        showFilter: state.filterInfo.filterState || false,
        isFilterApplied: state.filterInfo.isFilterApplied || false,
        orderFilterStatus: state.filterInfo.orderFilterStatus,
        orderFilterState: state.filterInfo.orderFilterState || {},
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        orderListRefreshed: state.ordersInfo.orderListRefreshed,
        pageNumber:(state.filterInfo.orderFilterState)? state.filterInfo.orderFilterState.PAGE :1,

        orderFulfilment: state.orderDetails.orderFulfilment,
        orderSummary: state.orderDetails.orderSummary,
        pbts: state.orderDetails.pbts,
        orderLines: state.orderDetails.orderLines,
        orderData: state.getOrderDetail || {},
    };
}

var mapDispatchToProps=function (dispatch) {
    return {
        orderFilterDetail: function (data) {
            dispatch(orderFilterDetail(data))
        },
        orderHeaderSort: function (data) {
            dispatch(orderHeaderSort(data))
        },
        orderHeaderSortOrder: function (data) {
            dispatch(orderHeaderSortOrder(data))
        },
        getPageData: function (data) {
            dispatch(getPageData(data));
        },
        getStatusFilter: function (data) {
            dispatch(getStatusFilter(data));
        },
        getTimeFilter: function (data) {
            dispatch(getTimeFilter(data));
        },
        getPageSizeOrders: function (data) {
            dispatch(getPageSizeOrders(data));
        },
        currentPage: function (data) {
            dispatch(currentPageOrders(data));
        },
        lastRefreshTime: function (data) {
            dispatch(lastRefreshTime(data));
        },
        setOrderListSpinner: function (data) {
            dispatch(setOrderListSpinner(data))
        },
        
        showTableFilter: function (data) {
            dispatch(showTableFilter(data));
        },
        filterApplied: function (data) {
            dispatch(filterApplied(data));
        },
        orderfilterState: function (data) {
            dispatch(orderfilterState(data));
        },
        toggleOrderFilter: function (data) {
            dispatch(toggleOrderFilter(data));
        },
        orderListRefreshed: function (data) {
            dispatch(orderListRefreshed(data))
        },
        updateSubscriptionPacket: function (data) {
            dispatch(updateSubscriptionPacket(data));
        },
        initDataSentCall: function (data) {
            dispatch(setWsAction({type: WS_ONSEND, data: data}));
        },
        setOrderQuery: function (data) {
            dispatch(setOrderQuery(data));
        },
        makeAjaxCall: function(params){
            dispatch(makeAjaxCall(params))
        },
        unSetAllActivePbts:function(){
            dispatch(unSetAllActivePbts())
        },
        setInfiniteSpinner:function(data){dispatch(setInfiniteSpinner(data));}


    }
};

OrderListTab.defaultProps = {
    orderFulfilment: {},
    orderSummary: {},
    pbts: []
}

OrderListTab.PropTypes={
    orderFilter: React.PropTypes.string,
    orderSortHeader: React.PropTypes.string,
    orderSortHeaderState: React.PropTypes.array,
    orderListSpinner: React.PropTypes.bool,
    filterOptions: React.PropTypes.object,
    orderData: React.PropTypes.object,
    statusFilter: React.PropTypes.bool,
    timeOffset: React.PropTypes.number,
    auth_token: React.PropTypes.object,
    showFilter: React.PropTypes.bool,
    isFilterApplied: React.PropTypes.bool,
    orderFilterDetail: React.PropTypes.func,
    orderHeaderSort: React.PropTypes.func,
    orderHeaderSortOrder: React.PropTypes.func,
    getPageData: React.PropTypes.func,
    getStatusFilter: React.PropTypes.func,
    getTimeFilter: React.PropTypes.func,
    getPageSizeOrders: React.PropTypes.func,
    currentPage: React.PropTypes.func,
    lastRefreshTime: React.PropTypes.func,
    setOrderListSpinner: React.PropTypes.func,
    showTableFilter: React.PropTypes.func,
    filterApplied: React.PropTypes.func,
    orderFilterStatus: React.PropTypes.bool,
    orderFilterState: React.PropTypes.object,

    orderFulfilment: React.PropTypes.object,
    orderSummary: React.PropTypes.object,
    pbts: React.PropTypes.array,
    getPageSizeOrders: React.PropTypes.func,
    showFilter: React.PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderListTab) ;