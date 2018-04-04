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
import OrderTile from '../../containers/neworderTab/OrderTile';
import ViewOrderLine from '../../containers/neworderTab/viewOrderLine';
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
    ANY, DEFAULT_PAGE_SIZE_OL, REALTIME, ORDERS_FULFIL_FETCH, APP_JSON, POST, GET, ORDERS_SUMMARY_FETCH, ORDERS_CUT_OFF_TIME_FETCH, ORDERS_PER_PBT_FETCH, ORDERLINES_PER_ORDER_FETCH
} from '../../constants/frontEndConstants';

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

const messages=defineMessages({
    inProgressStatus: {
        id: 'orderList.progress.status',
        description: "In 'progress message' for orders",
        defaultMessage: "In Progress"
    },

    completedStatus: {
        id: "orderList.completed.status",
        description: " 'Completed' status",
        defaultMessage: "Completed"
    },

    exceptionStatus: {
        id: "orderList.exception.status",
        description: " 'Exception' status",
        defaultMessage: "Exception"
    },

    unfulfillableStatus: {
        id: "orderList.Unfulfillable.status",
        description: " 'Unfulfillable' status",
        defaultMessage: "Unfulfillable"
    },
    orderListRefreshedat: {
        id: 'orderlist.Refreshed.at',
        description: " 'Refreshed' status",
        defaultMessage: 'Last Updated '
    }
});

var storage = [];

 class OrderListTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = this._getInitialState();

        this._viewOrderLine = this._viewOrderLine.bind(this);
        this._restartPolling = this._restartPolling.bind(this);
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
            startDate: new Date (new Date() - 1000*3600*24).toISOString(),
            endDate: new Date().toISOString(),
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
        // let startDate =  "2017-03-27T11:53:30.084Z";
        // let endDate = "3017-03-27T11:53:30.084Z";
        let startDate =  this.state.startDate;
        let endDate = this.state.endDate;
        this._reqCutOffTime(startDate, endDate); // for Instant load at First time;
        this._intervalId = setInterval(() => this._reqCutOffTime(startDate, endDate), 10000);
    }

    componentWillReceiveProps(nextProps) {
        // if(Object.keys(nextProps.location.query).length > 0){
        //     clearInterval(this._intervalId);
        //     this._refreshList(nextProps.location.query);
        // }
        if (nextProps.location.query && (!this.state.query || (JSON.stringify(nextProps.location.query) !== JSON.stringify(this.state.query)))) {
            this.setState({query: JSON.parse(JSON.stringify(nextProps.location.query))});
            //this.setState({orderListRefreshed: nextProps.orderListRefreshed})
            clearInterval(this._intervalId);
            this._refreshList(nextProps.location.query);
        }
    }

    _refreshList(query) {
        console.log('%c ==================>!  ', 'background: #222; color: #bada55');
        console.log("FILTER QUERY COMING POST APPLY FILTER");
        console.log("query =========================>" + JSON.stringify(query)); 

        if( (query.fromDate && query.toDate) && (query.toDate && query.toTime) ){
            let startDateFromFilter = new Date(query.fromDate + " " + query.fromTime).toISOString();
            let endDateFromFilter = new Date(query.toDate + " " + query.toTime).toISOString();
             console.log("start date from filter =========================>" + startDateFromFilter);
             console.log("end date from filter =========================>" + endDateFromFilter);
             if( query.cutOffTime){
                /* convert cut off time from filter to format accepted by backend i.e., //2018-03-01 23:00:00 */
                let dt = new Date().toISOString().split("T")[0];  // date will be bydefault today's date
                let tm = query.cutOffTime + ":00";  // time can be selected by user in hr:mm format
                let cutOffTimeFromFilter = dt + " " + tm; 
                console.log("cut off time  from filter =========================>" + cutOffTimeFromFilter);
                this._reqOrderPerPbt(startDateFromFilter, endDateFromFilter, cutOffTimeFromFilter); // for fetching orders by giving cut off time
            }
            else
                this._reqCutOffTime(startDateFromFilter, endDateFromFilter);  // for fetching cut off time list
        }
        else{
            if(query.cutOffTime){
                var today = new Date();
                var todayDate = today.getFullYear()+':'+(today.getMonth()+1)+':'+today.getDate();
                let setStartDate = new Date(new Date().toISOString().split("T")[0] + " " + "00:00:00").toISOString();
                let setEndDate = new Date(new Date().toISOString().split("T")[0] + " " + "23:59:00").toISOString();
                console.log("setStartDate" + setStartDate, "setEndDate" + setEndDate );
                let cutOffTimeFromFilter = query.cutOffTime; 
                console.log("cut off time  from filter =========================>" + cutOffTimeFromFilter);
                this._reqOrderPerPbt(setStartDate, setEndDate, cutOffTimeFromFilter); 
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
            }
        }
        this.props.setOrderListSpinner(true);
    }

    /* START ===> THIS REQUEST IS ONLY WHEN CUT OFF TIME IS REQUESTED FROM FILTER */ 
        _reqOrderPerPbt(fromDateTime, toDateTime, cutOffTime){
                console.log("LEVEL 2 ORDER PER CUT OFF TIME REQUESTED WITH CUT OFF TIME ID" + cutOffTime);
                console.log("startDate =========================>" + fromDateTime);   
                console.log("endDate  ==========================>" + toDateTime); 
                let formData={
                    "start_date": fromDateTime,
                    "end_date": toDateTime,
                    "cut_off_time" : cutOffTime
                };

                let params={
                    'url':ORDERS_PER_PBT_URL,
                    'method':GET,
                    'contentType':APP_JSON,
                    'accept':APP_JSON,
                    'cause':ORDERS_PER_PBT_FETCH,
                    'formdata':formData,
                }
                this.props.makeAjaxCall(params);
        }
    /* END ===> THIS REQUEST IS ONLY WHEN CUT OFF TIME IS REQUESTED FROM FILTER */

    _clearFilter() {
        hashHistory.push({pathname: "/orders", query: {}})
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

    _reqOrdersFulfilment(fromTime, toTime){
        let formData={
            "start_date": fromTime,
            "end_date": toTime
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

    _reqOrdersSummary(fromTime, toTime){
        let formData={
            "start_date": fromTime,
            "end_date": toTime
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
        console.log('%c ==================>!  ', 'background: #222; color: #bada55');
        console.log("LEVEL 1 CUT OFF TIME REQUESTED");
        //this.props.setReportsSpinner(true);
        console.log("startDate =========================>" + startDate);   
        console.log("endDate  ==========================>" + endDate);        

        let formData={
            "start_date": startDate,
            "end_date": endDate
        };

        let params={
            'url':ORDERS_CUT_OFF_TIME_URL,
            'method':GET,
            'contentType':APP_JSON,
            'accept':APP_JSON,
            'cause':ORDERS_CUT_OFF_TIME_FETCH,
            'formdata':formData,
        }
        this.props.makeAjaxCall(params);
        //call other http calls
        //this._reqOrdersFulfilment(startDate, endDate);
        //this._reqOrdersSummary(startDate, endDate);
    }

    _restartPolling = ()=> {
        this._intervalId = setInterval(() => this._reqCutOffTime(this.state.startDate, this.state.endDate), 10000);
    }

    _stopPolling = (intervalId) => {
        clearInterval(intervalId);
    }

    _formatTime(timeLeft){
        let hours = Math.trunc(timeLeft/60);
        let minutes = timeLeft % 60;
        let final = hours +" hrs left";
        return final;
        //console.log(hours +":"+ minutes);
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
        // this.setState({
        //     collapseAllBtnState: true,
        //     isPanelOpen: false
        // })
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
        //     updateStatusIntl=<FormattedRelative updateInterval={10000} value={Date.now()}/>
        // }
        var itemNumber=6, table, pages;
        const ordersByStatus=[
        {value: '25', label: '25'},
        {value: '50', label: '50'},
        {value: '100', label: '100'},
        {value: '250', label: '250'},
        {value: '500', label: '500'},
        {value: '1000', label: '1000'}
        ];
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
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate} 
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
                                              <button disabled={this.state.collapseAllBtnState} className="gor-filterBtn-btn" onClick={this._handleCollapseAll}>
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
                <FilterSummary total={ this.props.pbts.length  /*orderDetail.length*/ || 0} isFilterApplied={this.props.isFilterApplied}
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


                {/*<OrderListTable items={orderDetail} timeZoneString={headerTimeZone} itemNumber={itemNumber}
                statusFilter={this.props.getStatusFilter} timeFilter={this.props.getTimeFilter}
                refreshOption={this._clearFilter.bind(this)} lastUpdatedText={updateStatusText}
                lastUpdated={updateStatusIntl}
                intlMessg={this.props.intlMessages} alertNum={alertNum}
                totalOrders={this.props.orderData.totalOrders}
                itemsPerOrder={this.props.orderData.itemsPerOrder}
                totalCompletedOrder={this.props.orderData.totalCompletedOrder}
                totalPendingOrder={this.props.orderData.totalPendingOrder}
                sortHeaderState={this.props.orderHeaderSort}
                currentSortState={this.props.orderSortHeader}
                sortHeaderOrder={this.props.orderHeaderSortOrder}
                currentHeaderOrder={this.props.orderSortHeaderState}
                setOrderFilter={this.props.orderFilterDetail}
                getOrderFilter={this.props.orderFilter} setFilter={this.props.showTableFilter}
                showFilter={this.props.showFilter} responseFlag={this.props.orderListSpinner}
                isFilterApplied={this.props.isFilterApplied}
                orderFilterStatus={this.props.orderFilterStatus}
                onSortChange={this.refresh.bind(this)}
                pageNumber={this.props.pageNumber}
                />*/}

                {this.props.pbts.length> 0 ?
                    (<OrderListTable 
                        pbts={this.props.pbts}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        intervalId={this._intervalId}
                        restartPolling={this._restartPolling}
                        stopPolling={this._stopPolling}
                        isFilterApplied={this.props.isFilterApplied}
                        enableCollapseAllBtn={this._enableCollapseAllBtn}
                        disableCollapseAllBtn={this._disableCollapseAllBtn}
                        isPanelOpen={this.state.isPanelOpen} />)
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