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
        this._reqOrderPerPbt = this._reqOrderPerPbt.bind(this);
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
            orderListRefreshed: null
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
        console.log("component DId Mount get called");
        this._reqCutOffTime();
        //this._intervalId = setInterval(() => this._reqCutOffTime(), 1000);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.socketAuthorized && nextProps.orderListRefreshed && nextProps.location.query && (!this.state.query || (JSON.stringify(nextProps.location.query) !== JSON.stringify(this.state.query)))) {
            this.setState({query: JSON.parse(JSON.stringify(nextProps.location.query))});
            this.setState({orderListRefreshed: nextProps.orderListRefreshed})
            //this._subscribeData()
            this._refreshList(nextProps.location.query,nextProps.orderSortHeaderState.colSortDirs)
        }
    }

    _refreshList(query,orderbyParam) {
        var orderbyUrl;
        this.props.setOrderListSpinner(true);

        let _query_params=[], convertTime={
            "oneHourOrders": 1,
            "twoHourOrders": 2,
            "sixHourOrders": 6,
            "twelveHourOrders": 12,
            "oneDayOrders": 24
        };

        //appending filter for status

        if (query.status) {

           let statusList=query.status.constructor=== Array ? query.status.slice() : [query.status];
           if (statusList.length > 0) {
                let _flattened_statuses=[]
                let statusField="", orderIDfield="";
                statusList=statusList.constructor===Array?statusList:[statusList]
                statusList.forEach(function (status) {
                    _flattened_statuses.push(status.split("__"))
                })
                statusList=[].concat.apply([], _flattened_statuses)
                if(statusList.length===1){
                    statusField = [WAREHOUSE_STATUS_SINGLE,statusList.toString() ].join("==");
                }
                else if(statusList.length>1){
                    statusField = [WAREHOUSE_STATUS_MULTIPLE,"("+statusList.toString()+")" ].join("=");
                }

                if (query.orderId) {
                    orderIDfield = [";"+ORDER_ID_FILTER_PARAM, query.orderId].join("==");
                }
                _query_params.push(statusField+orderIDfield);
            }
        }

        else if(query.orderId){
            _query_params.push([ORDER_ID_FILTER_PARAM_WITHOUT_STATUS, query.orderId].join("=="))
        }

        //appending filter for orders by time:
        
        if (query.period) {
            let timeOut=query.period.constructor=== Array ? query.period[0] : query.period
            
            _query_params.push(UPDATE_TIME+convertTime[timeOut]);
            _query_params.push(UPDATE_TIME_UNIT+"hours") ;
        }

        let url = ORDERS_URL;

        _query_params.push([GIVEN_PAGE, query.page || 1].join("="))
        _query_params.push([GIVEN_PAGE_SIZE, this.props.filterOptions.pageSize || 25].join("="));
        if(orderbyParam && orderbyParam.sortDir){
            orderbyParam? _query_params.push(['order',toggleOrder(orderbyParam.sortDir)].join("=")):"";
            orderbyUrl=orderbyParam? sortOrderHead[orderbyParam["columnKey"]]:"";

        }
        else
        {
            orderbyParam? _query_params.push(['order',toggleOrder(orderbyParam[Object.keys(orderbyParam)])].join("=")):"";
            orderbyUrl=orderbyParam? sortOrderHead[Object.keys(orderbyParam)[0]]:"";
        }  
        url=[url, _query_params.join("&")].join("?");
        
        if(_query_params.length===2){
            url+=orderbyUrl+sortOrder["ASC"]+sortOrderHead["recievedTime"];
        }
        else{
            url+=orderbyUrl
        }

        let paginationData={
            'url': url,
            'method': 'GET',
            'cause': ORDERS_RETRIEVE,
            'token': this.props.auth_token,
            'contentType': 'application/json',
            'accept':'application/json'
        }
        if (Object.keys(query).filter(function (el) {
            return el !== 'page'
        }).length !== 0) {
            this.props.toggleOrderFilter(true);
            this.props.filterApplied(true);
        } else {
            this.props.toggleOrderFilter(false);
            this.props.filterApplied(false);
        }
        this.props.currentPage(1);
        this.props.orderfilterState({
            tokenSelected: {
                "STATUS": query.status ? (query.status.constructor=== Array ? query.status : [query.status]) : ['all'],
                "TIME PERIOD": query.period ? (query.period.constructor=== Array ? query.period[0] : query.period) : ['allOrders']
            },
            searchQuery: {"ORDER ID": query.orderId || ''},
            "PAGE": query.page || 1
        });
        this.props.setOrderQuery({query:query})
        this.props.getPageData(paginationData);

    }

    _clearFilter() {
        hashHistory.push({pathname: "/orders/orderlist", query: {}})
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



    

    

    processOrders(data, nProps) {

        var nProps=this;
        var data=nProps.props.orderData.ordersDetail;
        let progress=nProps.context.intl.formatMessage(messages.inProgressStatus);
        let completed=nProps.context.intl.formatMessage(messages.completedStatus);
        let exception=nProps.context.intl.formatMessage(messages.exceptionStatus);
        let unfulfillable=nProps.context.intl.formatMessage(messages.unfulfillableStatus);
        var renderOrderData=[], orderData={};
        var timeOffset=nProps.props.timeOffset, alertStatesNum=0, orderDataPacket={};
        if (!data.length) {
            orderDataPacket={"renderOrderData": renderOrderData, "alertStatesNum": alertStatesNum}
            return orderDataPacket;
        }

        for (var i=0; i < data.length; i++) {
            orderData.id=data[i].order_id;

            if (data[i].breached) {

                orderData.status=nProps.context.intl.formatMessage(stringConfig[data[i].status]);
                orderData.statusClass=GOR_BREACHED;
                alertStatesNum++;
            }
            else if (data[i].exception) {
                orderData.status=nProps.context.intl.formatMessage(stringConfig[data[i].status]);
                orderData.statusClass=GOR_EXCEPTION;
                alertStatesNum++;
            }
            else {
                let statusText = EVALUATED_STATUS[data[i].status] ? nProps.context.intl.formatMessage(stringConfig[EVALUATED_STATUS[data[i].status]]) : (nProps.context.intl.formatMessage(stringConfig[data[i].status]) || data[i].status);
                orderData.status= statusText;
                orderData.statusClass=EVALUATED_STATUS[data[i].status] ? EVALUATED_STATUS[data[i].status]:data[i].status;


            }
            if (!data[i].create_time) {
                orderData.recievedTime="--";
            }
            else {
                if (getDaysDiff(data[i].create_time) < 2) {
                    orderData.recievedTime=nProps.context.intl.formatRelative(data[i].create_time, {
                        timeZone: timeOffset,
                        units: 'day'
                    }) +
                    ", " + nProps.context.intl.formatTime(data[i].create_time, {
                        timeZone: timeOffset,
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false
                    });
                }
                else {
                    orderData.recievedTime=nProps.context.intl.formatDate(data[i].create_time,
                    {
                        timeZone: timeOffset,
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    });
                }
            }
            if (!data[i].pick_before_time) {
                orderData.pickBy="--";
            }
            else {
                if (getDaysDiff(data[i].pick_before_time) < 2) {
                    orderData.pickBy=nProps.context.intl.formatRelative(data[i].pick_before_time, {
                        timeZone: timeOffset,
                        units: 'day'
                    }) +
                    ", " + nProps.context.intl.formatTime(data[i].pick_before_time, {
                        timeZone: timeOffset,
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false
                    });
                }
                else {
                    orderData.pickBy=nProps.context.intl.formatRelative(data[i].pick_before_time,
                    {
                        timeZone: timeOffset,
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    });
                }
            }
            if (data[i].completed_orderlines=== data[i].total_orderlines) {
                orderData.orderLine=data[i].total_orderlines;
            }
            else {
                orderData.orderLine=data[i].completed_orderlines + "/" + data[i].total_orderlines;
            }
            if (data[i].status=== "complete") {
                if (getDaysDiff(data[i].update_time) < 2) {
                    orderData.completedTime=nProps.context.intl.formatRelative(data[i].update_time, {
                        timeZone: timeOffset,
                        units: 'day'
                    }) +
                    ", " + nProps.context.intl.formatTime(data[i].update_time, {
                        timeZone: timeOffset,
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false
                    });
                }
                else {
                    orderData.completedTime=nProps.context.intl.formatDate(data[i].update_time,
                    {
                        timeZone: timeOffset,
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    });
                }
            } else {
                orderData.completedTime="--";
            }

            renderOrderData.push(orderData);
            orderData={};

        }
        orderDataPacket={"renderOrderData": renderOrderData, "alertStatesNum": alertStatesNum}

        return orderDataPacket;
    }


    handlePageClick=(data)=> {
        var url;
        if (data.url=== undefined) {
            url=ORDERS_URL + ORDER_PAGE + (data.selected) + "&PAGE_SIZE=25";
        }

        else {
            url=data.url;
        }

        let paginationData={

            'url': url,
            'method': 'GET',
            'cause': ORDERS_RETRIEVE,
            'token': this.props.auth_token,
            'contentType': 'application/json',
            'accept':'application/json'

        }
        this.props.setOrderListSpinner(true);
        this.props.currentPage(data.selected);
        this.props.getPageData(paginationData);
    }
    
    //To check where the object is empty or not

    refresh=(data,pageSize)=> {
        var locationQuery=this.props.orderData.successQuery;
        if(locationQuery && Object.keys(locationQuery).length)
        {
            if(this.props.orderData.noResultFound){
                hashHistory.push({pathname: "/orders/orderlist", query: locationQuery})
            }else{
                this._refreshList(locationQuery,data);
            }

        }
        else
        {
            var convertTime={
                "oneHourOrders": 1,
                "twoHourOrders": 2,
                "sixHourOrders": 6,
                "twelveHourOrders": 12,
                "oneDayOrders": 24
            };
            var prevTime, currentTime;
            var appendStatusUrl="", appendTimeUrl="",appendTimeUnitUrl="", appendPageSize="", appendSortUrl="", appendTextFilterUrl="";
            var filterApplied=false;
            if (!data) {
                data={};
                data.selected=1;
                data.url="";
            /**
             * After clearing the applied filter,
             * It'll set the default state to the filters.
             */
             this.props.orderfilterState({
                tokenSelected: {"STATUS": [ANY], "ORDER TAGS": [ANY]},
                searchQuery: {}
            })
             this.props.toggleOrderFilter(false)
             this.props.showTableFilter(false)

         }
        //for backend sorting
        if (data.columnKey && data.sortDir) {
            appendSortUrl= sortOrder[data.sortDir]+sortOrderHead[data.columnKey];
        }
        else if (this.props.orderSortHeaderState && this.props.orderSortHeader && this.props.orderSortHeaderState.colSortDirs) {
            appendSortUrl=sortOrderHead[this.props.orderSortHeader] + sortOrder[this.props.orderSortHeaderState.colSortDirs[this.props.orderSortHeader]]
        }




        //appending filter for status
        if (data.tokenSelected && data.tokenSelected["STATUS"] && data.tokenSelected["STATUS"].length) {
            let statusToken=(data.tokenSelected["STATUS"]).slice(0);
            let index=statusToken.indexOf('breached');
            (index != -1) ? statusToken.splice(index, 1) : "";
            let status=(statusToken.length > 0) ? statusToken.join("','") : statusToken;
            let breachedtext=(index != -1) ? BREACHED : ""
            if ((status=== undefined || status=== "all")) {
                appendStatusUrl="";
            }
            else {
                appendStatusUrl=(status.length ===1) ? (WAREHOUSE_STATUS_SINGLE + "==" + status  + breachedtext) : breachedtext;
                appendStatusUrl=(status.length >1) ? (WAREHOUSE_STATUS_MULTIPLE + "=" + "("+status+")"  + breachedtext) : breachedtext;
            }
            data.selected=1;
            filterApplied=true;
        }
        
        //appending filter for orders by time
        if (data.tokenSelected && data.tokenSelected["TIME PERIOD"] && data.tokenSelected["TIME PERIOD"].length && data.tokenSelected["TIME PERIOD"][0] !== "allOrders") {
            var timeOut=data.tokenSelected["TIME PERIOD"][0];
            appendTimeUrl="&"+UPDATE_TIME+convertTime[timeOut];
            appendTimeUnitUrl="&"+UPDATE_TIME_UNIT+"hours";
            data.selected=1;
            filterApplied=true;
        }

        //generating api url by pagination page no.
        data.url="";
        data.url=ORDERS_URL + ORDER_PAGE + (data.selected ? data.selected : 0);
        
        //appending page size filter
        if(!pageSize) {
            if (this.props.filterOptions.pageSize === undefined) {
                appendPageSize = PAGE_SIZE_URL + "25";
            }

            else {
                appendPageSize = PAGE_SIZE_URL + this.props.filterOptions.pageSize;
            }
        }
        else{
            appendPageSize = PAGE_SIZE_URL + pageSize
        }


//combining all the filters
data.url=data.url + appendStatusUrl + appendTimeUrl + appendTimeUnitUrl + appendPageSize + appendSortUrl + appendTextFilterUrl;
this.props.lastRefreshTime((new Date()));
this.props.filterApplied(filterApplied);
this.handlePageClick(data)
}
}

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


    _processPBTs = (arg) => {
        let pbtData = arg;
        let pbtDataLen = pbtData.length; 
        let pbtRows = []; 
        let processedData = {};

        if(pbtDataLen){
            for(let i =0 ; i < pbtDataLen; i++){
                let pbtRow = [];
                
                let formatPbtTime = (<FormattedMessage id="orders.pbt.cutofftime" description="cut off time" defaultMessage=" Cut off time {cutOffTime} hrs"
                                        values={{cutOffTime:pbtData[i].cut_off_time}} />);

                let formatTimeLeft = this._formatTime(pbtData[i].time_left);

                let formatProgressBar = this._formatProgressBar(pbtData[i].picked_products_count, pbtData[i].total_products_count);

                let formatTotalOrders = (<FormattedMessage id="orders.total" description="total orders" defaultMessage="Total {total} orders"
                                         values={{total:pbtData[i].total_orders}} />);

                pbtRow.push(<div className="DotSeparatorWrapper"> 
                                <DotSeparatorContent header={[formatPbtTime]} subHeader={[formatTimeLeft]}/> 
                            </div>);

                pbtRow.push(<div>
                                <div className="ProgressBarWrapper">
                                    <ProgressBar progressWidth={formatProgressBar.width}/>
                                </div>
                                <div style={{paddingTop: "10px", color: "#333333", fontSize: "14px"}}> {formatProgressBar.message}</div>
                             </div>);

                pbtRow.push(<div className="totalOrderWrapper">{formatTotalOrders}</div>);
                            
                pbtRows.push(pbtRow);
            }
            processedData.pbtData = pbtRows;
        }
        processedData.offset = 0;
        processedData.max= pbtRows.length;
        return processedData;
    }

    _processOrders = (arg) => {
        let orderData = arg;
        let orderDataLen = orderData.length;
        let orderRows = [];
        let processedData = {};
        if(orderDataLen){
            for(let i=0; i < orderDataLen; i++){
                let orderRow = [];
                let formatOrderId = "Order " + orderData[i].order_id;
                let formatPpsId = "PPS " + orderData[i].pps_id;
                let formatBinId = "Bin" + orderData[i].pps_bin_id;

                let formatProgressBar = this._formatProgressBar(orderData[i].picked_products_count, orderData[i].total_products_count);
                 
                orderRow.push(<div className="DotSeparatorWrapper"> 
                                <DotSeparatorContent header={[formatOrderId]} subHeader={[formatPpsId, formatBinId, orderData[i].start_date]}/>
                            </div>);
                orderRow.push( <div>
                                 <div className="ProgressBarWrapper">
                                    <ProgressBar progressWidth={formatProgressBar.width}/>
                                </div>
                                 <div style={{paddingTop: "10px", color: "#333333", fontSize: "14px"}}> {formatProgressBar.message}</div> 
                             </div>);
                if(formatProgressBar.action === true){
                    orderRow.push(<div key={i} style={{textAlign:"center"}} className="gorButtonWrap" onClick={() => this._viewOrderLine(orderData[i].order_id)}>
                      <button>
                      <FormattedMessage id="orders.view orderLines" description="button label for view orderlines" defaultMessage="VIEW ORDERLINES "/>
                      </button>
                    </div>);
                }
                else{
                    orderRow.push(<div> </div>);
                }
                orderRows.push(orderRow);
            }
            processedData.orderData = orderRows;
        }
        processedData.offset = 0;
        processedData.max= orderRows.length;
        return processedData;
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

    _reqOrdersFulfilment(){
        console.log("_reqOrdersFulfilment get called post 5000 seconds");
        //this.props.setReportsSpinner(true);
        let formData={
            "start_date": this.state.date,
            "end_date": this.state.date
        };

        let params={
            'url':ORDERS_FULFIL_URL,
            'method':GET,
            'contentType':APP_JSON,
            'accept':APP_JSON,
            'cause':ORDERS_FULFIL_FETCH,
            'formdata':formData,
        }
        this.props.makeAjaxCall(params);
    }

    _reqOrdersSummary(){
        console.log("_reqOrdersSummary get called");
        //this.props.setReportsSpinner(true);

        let formData={
            "start_date": this.state.date,
            "end_date": this.state.date
        };

        let params={
            'url':ORDERS_SUMMARY_URL,
            'method':GET,
            'contentType':APP_JSON,
            'accept':APP_JSON,
            'cause':ORDERS_SUMMARY_FETCH,
            'formdata':formData,
        }
        this.props.makeAjaxCall(params);
    }

    _reqCutOffTime(){
        console.log("_reqCutOffTime get called");
        //this.props.setReportsSpinner(true);
        let formData={
            "start_date": this.state.date,
            "end_date": this.state.date,
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
        this._reqOrdersFulfilment();
        this._reqOrdersSummary();
    }

    _reqOrderPerPbt(arg){
        let cutOffTimeId = this.props.pbts[arg].cut_off_time;
        // #condition to not hitting http request on closing of accordion
        const index = storage.indexOf(cutOffTimeId);
        if(index === -1){
            storage.push(cutOffTimeId);
            console.log('%c ==================>!  ', 'background: #222; color: #bada55', cutOffTimeId);
            let formData={
                "start_date": this.state.date,
                "end_date": this.state.date,
                "cut_off_time" : cutOffTimeId
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
        else{
            storage.splice(index, 1);
        }
    }

    _restartPolling=()=> {
        this._intervalId = setInterval(() => this._reqCutOffTime(), 1000);
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
        this.setState({
            collapseAllBtnState: true,
            isPanelOpen: false
        })
    }

    render() {

        var self = this;
        const todayDate = this._getTodayDate();
        const processedPbtData = this._processPBTs(this.props.pbts);
        const processedOrderData = this._processOrders(this.props.ordersPerPbt);
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
                    { true/*orderDetail*/ ? 
                        <div>
                            <div className="gor-filter-wrap" style={{'width': '400px','display': this.props.showFilter ? 'block' : 'none', height: filterHeight}}>
                                <OrderFilter ordersDetail={orderDetail} responseFlag={this.props.responseFlag}/>
                            </div>

                            <div>
                                <OrderTile date={todayDate} 
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

                            {/*
                            <div className="gorToolBarWrap">
                            <div className="gorToolBarElements">
                            <FormattedMessage id="order.table.heading" description="Heading for order list"
                            defaultMessage="OrderList"/>
                            </div>
                            <div className="gor-button-wrap">

                            </div>
                            </div>

                        */}

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

                                    {/*
                                        <button className="gor-filterBtn-btn" onClick={this._handleClickRefreshButton.bind(this)}>
                                            <div className="gor-refresh-icon"/>
                                            <FormattedMessage id="order.table.buttonLable" description="button label for refresh" defaultMessage="Refresh Data"/>
                                        </button>

                                        <button className={this.props.orderFilterStatus ? "gor-filterBtn-applied" : "gor-filterBtn-btn"} onClick={this._setFilter.bind(this)}>
                                            <div className="gor-manage-task"/>
                                            <FormattedMessage id="gor.filter.filterLabel" description="button label for filter" defaultMessage="Filter data"/>
                                         </button>
                                        */}
                                    </div>
                                </div>
                            </div>
                    </div>
                {/*Filter Summary*/}
                <FilterSummary total={ ["1","2","3"].length  /*orderDetail.length*/ || 0} isFilterApplied={this.props.isFilterApplied}
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



                <div className="waveListWrapper">
                    <GTable options={['table-bordered']}>
                        <GTableBody data={processedPbtData.pbtData}>
                            {processedPbtData.pbtData ? processedPbtData.pbtData.map(function (row, idx) {
                                return (
                                    <Accordion getOrderPerPbt={self._reqOrderPerPbt} cutOffTimeId={idx} enableCollapseAllBtn={self._enableCollapseAllBtn} disableCollapseAllBtn={self._disableCollapseAllBtn} title={
                                        <GTableRow style={{background: "#fafafa"}} key={idx} index={idx} offset={processedPbtData.offset} max={processedPbtData.max} data={processedPbtData.pbtData}>
                                            {row.map(function (text, index) {
                                                return <div key={index} style={{padding:"0px", display:"flex", flexDirection:"column", justifyContent:'center', height:"75px"}} className="cell" >
                                                    {text}
                                                </div>
                                            })}
                                        </GTableRow>}>

                                        {self.state.isPanelOpen === true ?
                                            (<GTableBody data={processedOrderData.orderData} >
                                                {processedOrderData.orderData ? processedOrderData.orderData.map(function (row, idx) {
                                                    return (
                                                        <GTableRow key={idx} index={idx} offset={processedOrderData.offset} max={processedOrderData.max} data={processedOrderData.orderData}>
                                                            {Object.keys(row).map(function (text, index) {
                                                                return <div key={index} style={{padding:"0px", display:"flex", flexDirection:"column", justifyContent:'center', height:"75px"}} className="cell" >
                                                                    {row[text]}
                                                                </div>
                                                            })}
                                                        </GTableRow>
                                                    )
                                                }):""}
                                            </GTableBody>): null 
                                        }
                                    </Accordion> 
                                )
                            }):""}
                        </GTableBody>
                    </GTable>
                </div>

                    <div className="gor-pageNum">
                        <Dropdown styleClass={'gor-Page-Drop'} items={ordersByStatus} currentState={ordersByStatus[0]} 
                            optionDispatch={this.props.getPageSizeOrders} refreshList={this.onPageSizeChange.bind(this)}/>
                    </div>
                    <div className="gor-paginate">
                        {this.state.query ?
                            <GorPaginateV2 location={this.props.location} currentPage={this.state.query.page || 1} totalPage={this.props.orderData.totalPage}/> : null}
                    </div>
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
        ordersPerPbt: state.orderDetails.ordersPerPbt,
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
    pbts: [],
    ordersPerPbt: [],
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
    ordersPerPbt: React.PropTypes.array,
    getPageSizeOrders: React.PropTypes.func,
    showFilter: React.PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderListTab) ;