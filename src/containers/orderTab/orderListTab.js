import React  from 'react';
import {connect} from 'react-redux';
import {FormattedMessage, FormattedDate, defineMessages, FormattedRelative} from 'react-intl';
import {hashHistory} from 'react-router';
import {modal} from 'react-redux-modal';

import OrderFilter from './orderFilter';
import OrderListTable from './orderListTable';
import Spinner from '../../components/spinner/Spinner';
import {GTable} from '../../components/gor-table-component/index'
import {GTableHeader,GTableHeaderCell} from '../../components/gor-table-component/tableHeader';
import {GTableBody} from "../../components/gor-table-component/tableBody";
import {GTableRow} from "../../components/gor-table-component/tableRow";
import Accordion from '../../components/accordion/accordion';
import OrderTile from '../../containers/orderTab/OrderTile';
import ViewOrderLine from '../../containers/orderTab/viewOrderLine';
import FilterSummary from '../../components/tableFilter/filterSummary';
import ProgressBar from '../../components/progressBar/progressBar';
import DotSeparatorContent from '../../components/dotSeparatorContent/dotSeparatorContent';

import {setOrderListSpinner, orderListRefreshed,setOrderQuery} from '../../actions/orderListActions';
import {orderHeaderSortOrder, orderHeaderSort, orderFilterDetail} from '../../actions/sortHeaderActions';
import {showTableFilter, filterApplied, orderfilterState, toggleOrderFilter} from '../../actions/filterAction';
import {updateSubscriptionPacket, setWsAction} from './../../actions/socketActions';
import { makeAjaxCall } from '../../actions/ajaxActions';


import {wsOverviewData} from './../../constants/initData.js';

import {WS_ONSEND, ANY, 
    APP_JSON, POST, GET,
    ORDERS_FULFIL_FETCH, 
    ORDERS_SUMMARY_FETCH, 
    ORDERS_CUT_OFF_TIME_FETCH, 
    ORDERS_PER_PBT_FETCH, 
    ORDERLINES_PER_ORDER_FETCH,
    ORDERS_POLLING_INTERVAL
} from '../../constants/frontEndConstants';

import { setInfiniteSpinner } from '../../actions/notificationAction';
import { unSetAllActivePbts } from '../../actions/norderDetailsAction'

import {
    ORDERS_FULFIL_URL,
    ORDERS_SUMMARY_URL, 
    ORDERS_CUT_OFF_TIME_URL, 
    ORDERS_PER_PBT_URL, 
    ORDERLINES_PER_ORDER_URL
} from '../../constants/configConstants';

const moment = require('moment-timezone');

class OrderListTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = this._getInitialState();

        this._viewOrderLine = this._viewOrderLine.bind(this);
        this._handleCollapseAll = this._handleCollapseAll.bind(this);
    }

    _getInitialState(){
        return {
            isPanelOpen:true,
            collapseAllBtnState: true, 
            date: new Date(),
            queryApplied:Object.keys(this.props.location.query).length ? true :false,
            totalSize:this.props.totalSize || null,
            selected_page: 1, 
            query: null, 
            orderListRefreshed: null,
            setStartDateForOrders: null,
            setEndDateForOrders: null
        }
    }

    componentDidMount(){
        this.props.setOrderListSpinner(true);
        this.props.filterApplied(false);
    }

    _clearPolling(){
        clearInterval(this._intervalIdForCutOffTime);
        this._intervalIdForCutOffTime=null;
    }

    _reqCutOffTime(startDate, endDate, filteredPpsId, filteredOrderStatus){
        let formData = {
            "start_date": startDate,
            "end_date": endDate,
        };
        sessionStorage.setItem("startDate", startDate);
        sessionStorage.setItem("endDate", endDate);
        if(filteredPpsId){
            formData["filtered_ppsId"] = filteredPpsId;
            sessionStorage.setItem("filtered_ppsId", filteredPpsId);
        }
        if(filteredOrderStatus){
            formData["filtered_order_status"] = filteredOrderStatus;
            sessionStorage.setItem("filtered_order_status", JSON.stringify(filteredOrderStatus));
        }

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

        let self=this;
        this._intervalIdForCutOffTime= setInterval(function(){
            self.props.makeAjaxCall(params);
            self._reqOrdersFulfilment(startDate, endDate);
            self._reqOrdersSummary(startDate, endDate);
        },ORDERS_POLLING_INTERVAL);
    }



    componentWillReceiveProps(nextProps) {
        let setMomentStartDate, setMomentEndDate;

        /* when coming on orders page for first time OR coming after traversing from other tabs */
        if( (this.props.timeOffset !== nextProps.timeOffset) ||
            (!Object.keys(nextProps.location.query).length && !this._intervalIdForCutOffTime) ){
            this.props.setOrderListSpinner(true);
        setMomentStartDate = moment().startOf('day').tz(nextProps.timeOffset).toISOString();
        setMomentEndDate =   moment().endOf('day').tz(nextProps.timeOffset).toISOString();
        this._reqCutOffTime(setMomentStartDate, setMomentEndDate);
        this.setState({
            setStartDateForOrders: setMomentStartDate,
            setEndDateForOrders: setMomentEndDate
        })
    }

    if(Object.keys(nextProps.location.query).length>0 && this._intervalIdForCutOffTime){
        this._clearPolling();
    }


    if (nextProps.socketAuthorized && !this.state.subscribed) {
        this.setState({subscribed: true},function(){
            this._subscribeData(nextProps)
        })

    }
    if (Object.keys(nextProps.location.query).length && (!this.state.query || (JSON.stringify(nextProps.location.query) !== JSON.stringify(this.state.query)))) {
        this.setState({query: JSON.parse(JSON.stringify(nextProps.location.query))});
        this.setState({orderListRefreshed: nextProps.orderListRefreshed})
        this._refreshList(nextProps.location.query);
    }
}

_refreshList(query){

    let startDateFromFilter, endDateFromFilter, momentStartDateFromFilter, momentEndDateFromFilter;

    if(query.orderId){
        this._viewOrderLine(query.orderId); 
        this.props.filterApplied(false);
    }
    if( (query.fromDate && query.toDate) && (query.fromTime && query.toTime) ){
        startDateFromFilter = new Date(query.fromDate + " " + query.fromTime);
        endDateFromFilter = new Date(query.toDate + " " + query.toTime);

        momentStartDateFromFilter = moment.tz(startDateFromFilter, this.props.timeOffset).toISOString();
        momentEndDateFromFilter = moment.tz(endDateFromFilter, this.props.timeOffset).toISOString();

    }
    else{
        momentStartDateFromFilter = moment().startOf('day').tz(this.props.timeOffset).toISOString();
        momentEndDateFromFilter =   moment().endOf('day').tz(this.props.timeOffset).toISOString();
    }

    this._reqCutOffTime(momentStartDateFromFilter, momentEndDateFromFilter, query.ppsId, query.status);
    this.props.filterApplied(true);

    this.setState({
        setStartDateForOrders: momentStartDateFromFilter,
        setEndDateForOrders: momentEndDateFromFilter
    });
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
    this.props.filterApplied(false);
    hashHistory.push({pathname: "/orders", query: {}});
    let setMomentStartDate = moment().startOf('day').tz(this.props.timeOffset).toISOString();
    let setMomentEndDate =   moment().endOf('day').tz(this.props.timeOffset).toISOString();
    this._reqCutOffTime(setMomentStartDate, setMomentEndDate);
}

componentWillUnmount() {
    this._clearPolling();
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

    _viewOrderLine = (orderId) =>  {
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

    _handleCollapseAll(){
        this.props.unSetAllActivePbts()
    }
    

    render() {
        const todayDate = this._getTodayDate();
        let isPanelOpen = this.state.isPanelOpen;


        var filterHeight=screen.height - 150;
        var updateStatus, timeOffset, headerTimeZone;
        let updateStatusIntl, updateStatusText;
        
        var itemNumber=6, table, pages;
        
        var currentPage=this.props.filterOptions.currentPage, totalPage=this.props.orderData.totalPage;
        var orderDetail, alertNum=0, orderInfo;

        let orderDetails = this.props.pbts;

        return (
            <div>
            <div className="gor-Orderlist-table">

            {!this.props.showFilter ? <Spinner isLoading={this.props.orderListSpinner} setSpinner={this.props.setOrderListSpinner}/> : ""}
            <div>
            <div className="gor-filter-wrap" style={{'width': '400px','display': this.props.showFilter ? 'block' : 'none', height: filterHeight}}>
            <OrderFilter orderDetails={orderDetails} responseFlag={this.props.responseFlag}/>
            </div>

            <div>
            <OrderTile 
            pbtsData={this.props.pbts} 
            date={todayDate} 
            orderFulfilData={this.props.orderFulfilment}
            orderSummaryData={this.props.orderSummary}
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
        <FilterSummary total={orderDetails.length || 0}  
        isFilterApplied={this.props.isFilterApplied}
        responseFlag={this.props.responseFlag}
        filterText={<FormattedMessage id="orderlist.filter.search.bar"
        description='total order for filter search bar'
        defaultMessage='{total} Orders found'
        values={{total: orderDetails ? orderDetails.length : '0'}}/>}
        refreshList={this._clearFilter.bind(this)}
        refreshText={<FormattedMessage id="orderlist.filter.search.bar.showall"
        description="button label for show all"
        defaultMessage="Show all orders"/>}/>

        </div> 

        {this.props.pbts.length> 0  &&
            (<OrderListTable 
                pbts={this.props.pbts}
                startDate={this.state.setStartDateForOrders}
                endDate={this.state.setEndDateForOrders}
                intervalIdForCutOffTime={this._intervalIdForCutOffTime}
                isFilterApplied={this.props.isFilterApplied}
                enableCollapseAllBtn={this._enableCollapseAllBtn}
                disableCollapseAllBtn={this._disableCollapseAllBtn}
                isPanelOpen={this.state.isPanelOpen}
                />)}
            {!this.props.orderListSpinner && this.props.pbts.length===0 && <div className="noOrdersPresent"> No orders available </div>}
            {this.props.orderListSpinner && <div className="noOrdersPresent"></div>}

            </div>
            </div>
            );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        orderFilter: state.sortHeaderState.orderFilter || "",
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
    ordersPerPbt: []
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderListTab) ;