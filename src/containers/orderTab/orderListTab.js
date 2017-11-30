import React  from 'react';
import {connect} from 'react-redux';
import {
    getPageData,
    getStatusFilter,
    getTimeFilter,
    getPageSizeOrders,
    currentPageOrders,
    lastRefreshTime
} from '../../actions/paginationAction';
import {
    ORDERS_RETRIEVE,
    GOR_BREACHED,
    BREACHED,
    GOR_EXCEPTION,
    toggleOrder,
    INITIAL_HEADER_SORT,
    sortOrderHead,
    sortOrder, WS_ONSEND,
    EVALUATED_STATUS
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
    FILTER_ORDER_ID, GIVEN_PAGE, GIVEN_PAGE_SIZE, ORDER_ID_FILTER_PARAM,ORDER_ID_FILTER_PARAM_WITHOUT_STATUS
} from '../../constants/configConstants';
import OrderListTable from './orderListTable';
import Dropdown from '../../components/dropdown/dropdown'
import {FormattedMessage, defineMessages, FormattedRelative} from 'react-intl';
import Spinner from '../../components/spinner/Spinner';
import {setOrderListSpinner, orderListRefreshed,setOrderQuery} from '../../actions/orderListActions';
import {stringConfig} from '../../constants/backEndConstants';
import {orderHeaderSortOrder, orderHeaderSort, orderFilterDetail} from '../../actions/sortHeaderActions';
import {getDaysDiff} from '../../utilities/getDaysDiff';
import GorPaginateV2 from '../../components/gorPaginate/gorPaginateV2';
import {showTableFilter, filterApplied, orderfilterState, toggleOrderFilter} from '../../actions/filterAction';
import {hashHistory} from 'react-router'
import {updateSubscriptionPacket, setWsAction} from './../../actions/socketActions'
import {wsOverviewData} from './../../constants/initData.js';
import OrderFilter from './orderFilter';
import FilterSummary from '../../components/tableFilter/filterSummary'
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


 class OrderListTab extends React.Component {
    constructor(props) {
        super(props);
        this.state={selected_page: 1, query: null, orderListRefreshed: null};
    }

    componentWillMount() {
        /**
         * It will update the last refreshed property of
         * overview details, so that updated subscription
         * packet can be sent to the server for data
         * update.
         */
         this.props.orderListRefreshed()
     }

     componentWillReceiveProps(nextProps) {
        if (nextProps.socketAuthorized && nextProps.orderListRefreshed && nextProps.location.query && (!this.state.query || (JSON.stringify(nextProps.location.query) !== JSON.stringify(this.state.query)))) {
            this.setState({query: JSON.parse(JSON.stringify(nextProps.location.query))});
            this.setState({orderListRefreshed: nextProps.orderListRefreshed})
            this._subscribeData()
            this._refreshList(nextProps.location.query,nextProps.orderSortHeaderState.colSortDirs)
        }
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

    /**
     *
     */
     _clearFilter() {
        hashHistory.push({pathname: "/orders/orderlist", query: {}})
    }

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
                tokenSelected: {"STATUS": ["all"], "TIME PERIOD": ["allOrders"]},
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


render() {
    var filterHeight=screen.height - 190 - 50;
    var updateStatus, timeOffset, headerTimeZone;
    let updateStatusIntl, updateStatusText;
    if (this.props.filterOptions.lastUpdatedOn) {
        updateStatusText=
        <FormattedMessage id="orderlistTab.orderListRefreshedat" description='Refresh Status text'
        defaultMessage='Last Updated '/>
        updateStatusIntl=<FormattedRelative updateInterval={10000} value={Date.now()}/>
    }
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
    if (this.props.orderData.ordersDetail !== undefined) {
        orderInfo=this.processOrders(this.props.orderData.ordersDetail, this);
        orderDetail=orderInfo.renderOrderData;
        alertNum=orderInfo.alertStatesNum;
    }
    timeOffset=this.props.timeOffset || "",
    headerTimeZone=(this.context.intl.formatDate(Date.now(),
    {
        timeZone: timeOffset,
        year: 'numeric',
        timeZoneName: 'long'
    }));

    /*Extracting Time zone string for the specified time zone*/
    headerTimeZone=headerTimeZone.substr(5, headerTimeZone.length);
    return (
        <div>
        <div className="gor-Orderlist-table">

        {!this.props.showFilter ? <Spinner isLoading={this.props.orderListSpinner}
        setSpinner={this.props.setOrderListSpinner}/> : ""}
        {orderDetail ? <div>
            <div className="gor-filter-wrap" style={{
                'width': '350px',
                'display': this.props.showFilter ? 'block' : 'none',
                height: filterHeight
            }}>
            <OrderFilter ordersDetail={orderDetail} responseFlag={this.props.responseFlag}/>
            </div>
            <div className="gorToolBar">
            <div className="gorToolBarWrap">
            <div className="gorToolBarElements">
            <FormattedMessage id="order.table.heading" description="Heading for order list"
            defaultMessage="OrderList"/>
            </div>
            <div className="gor-button-wrap">

            </div>
            </div>
            <div className="filterWrapper">
            <div className="gorToolBarDropDown">
            <div className="gor-button-wrap">
            <div
            className="gor-button-sub-status">{this.props.lastUpdatedText} {this.props.lastUpdated} </div>
            <button className="gor-filterBtn-btn"
            onClick={this._handleClickRefreshButton.bind(this)}>
            <div className="gor-refresh-icon"/>
            <FormattedMessage id="order.table.buttonLable"
            description="button label for refresh"
            defaultMessage="Refresh Data"/>
            </button>
            <button
            className={this.props.orderFilterStatus ? "gor-filterBtn-applied" : "gor-filterBtn-btn"}
            onClick={this._setFilter.bind(this)}>
            <div className="gor-manage-task"/>
            <FormattedMessage id="gor.filter.filterLabel"
            description="button label for filter"
            defaultMessage="Filter data"/>
            </button>
            </div>
            </div>
            </div>
            </div>
        {/*Filter Summary*/}
        <FilterSummary total={orderDetail.length || 0} isFilterApplied={this.props.isFilterApplied}
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


        <OrderListTable items={orderDetail} timeZoneString={headerTimeZone} itemNumber={itemNumber}
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
        />

        <div className="gor-pageNum">
        <Dropdown styleClass={'gor-Page-Drop'} items={ordersByStatus} currentState={ordersByStatus[0]}
        optionDispatch={this.props.getPageSizeOrders} refreshList={this.onPageSizeChange.bind(this)}/>
        </div>
        <div className="gor-paginate">
        {this.state.query ?
            <GorPaginateV2 location={this.props.location} currentPage={this.state.query.page || 1}
            totalPage={this.props.orderData.totalPage}/> : null}
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
        pageNumber:(state.filterInfo.orderFilterState)? state.filterInfo.orderFilterState.PAGE :1
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


    }
};

OrderListTab.contextTypes={
    intl: React.PropTypes.object.isRequired
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
    orderFilterState: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderListTab) ;