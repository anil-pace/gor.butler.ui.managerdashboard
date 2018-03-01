import React from 'react';
import {connect} from 'react-redux';
import {Table, Column} from 'fixed-data-table';
import Dimensions from 'react-dimensions'
import {FormattedMessage, defineMessages} from 'react-intl';
import {
    SortHeaderCell,
    tableRenderer,
    TextCell,
    StatusCell
} from '../../components/commonFunctionsDataTable';
import {
    GOR_TABLE_HEADER_HEIGHT,
    DEBOUNCE_TIMER
} from '../../constants/frontEndConstants';
import {debounce} from '../../utilities/debounce';

import OrderFilter from './orderFilter';
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


var storage = [];
class OrderListTable extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            isPanelOpen:true,
        }

        this._enableCollapseAllBtn = this._enableCollapseAllBtn.bind(this);
        this._disableCollapseAllBtn = this._disableCollapseAllBtn.bind(this);
        this._reqOrderPerPbt = this._reqOrderPerPbt.bind(this);
    }

    _onColumnResizeEndCallback(newColumnWidth, columnKey) {
        this.setState(({columnWidths})=> ({
            columnWidths: {
                ...columnWidths,
                [columnKey]: newColumnWidth,
            }
        }));
    }

    _onFilterChange(e) {
        var data={"type": "searchOrder", "captureValue": "", "selected": 1}, debounceFilter;
        if (e.target && (e.target.value || e.target.value=== "")) {
            data["captureValue"]=e.target.value;
            this.props.setOrderFilter(e.target.value);
        }
        else {
            data["captureValue"]=e;
        }
        debounceFilter=debounce(this.props.refreshOption, DEBOUNCE_TIMER);
        debounceFilter(data);
    }


    backendSort(columnKey, sortDir) {
        var data={"columnKey": columnKey, "sortDir": sortDir, selected: this.props.pageNumber}
        this.props.sortHeaderState(columnKey);
        this.props.onSortChange(data);
        this.props.sortHeaderOrder({
            colSortDirs: {[columnKey]: sortDir},
        })
    }

    _showAllOrder() {
        this.props.refreshOption();
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

    _enableCollapseAllBtn(){
        this.props.enableCollapseAllBtn();
        // this.setState({
        //     collapseAllBtnState: false,
        //     isPanelOpen: true
        // })
    }

    _disableCollapseAllBtn(){
        this.props.disableCollapseAllBtn();
        // this.setState({
        //     collapseAllBtnState: true,
        //     isPanelOpen: false
        // })
    }

    _handleCollapseAll(){
        this.setState({
            collapseAllBtnState: true,
            isPanelOpen: false
        })
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

    _formatTime(timeLeft){
        let hours = Math.trunc(timeLeft/60);
        let minutes = timeLeft % 60;
        let final = hours +" hrs left";
        return final;
        //console.log(hours +":"+ minutes);
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

    render() {
        var self=this;
        const processedPbtData = this._processPBTs(this.props.pbts);
        const processedOrderData = this._processOrders(this.props.ordersPerPbt);

        

        return (
            <div>
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

                                        {/*{self.state.isPanelOpen === true ?*/}
                                            <GTableBody data={processedOrderData.orderData} >
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
                                            </GTableBody>{/*): null
                                        }*/}
                                    </Accordion> 
                                )
                            }):""}
                        </GTableBody>
                    </GTable>
                </div>
                
                {/*<div> {noData} </div>*/}
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

        pbts: state.orderDetails.pbts,
        ordersPerPbt:state.orderDetails.ordersPerPbt
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
        
        setOrderQuery: function (data) {
            dispatch(setOrderQuery(data));
        },
        makeAjaxCall: function(params){
            dispatch(makeAjaxCall(params))
        },


    }
};

OrderListTable.defaultProps = {
    pbts: [],
    ordersPerPbt: []
}

OrderListTable.PropTypes={
    items: React.PropTypes.array,
    containerWidth: React.PropTypes.number,
    itemNumber: React.PropTypes.number,
    currentHeaderOrder: React.PropTypes.object,
    setOrderFilter: React.PropTypes.func,
    sortHeaderState: React.PropTypes.func,
    refreshOption: React.PropTypes.func,
    lastUpdatedText: React.PropTypes.string,
    isFilterApplied: React.PropTypes.bool,
    timeZoneString: React.PropTypes.string,
    lastUpdated: React.PropTypes.string,
    responseFlag: React.PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderListTable);
