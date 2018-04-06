import React from 'react';
import {connect} from 'react-redux';
import {modal} from 'react-redux-modal';
import {Table, Column} from 'fixed-data-table';
import Dimensions from 'react-dimensions'
import {FormattedMessage, defineMessages, FormattedRelative, FormattedDate, FormattedTime} from 'react-intl';
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
    ANY, DEFAULT_PAGE_SIZE_OL, REALTIME, ORDERS_FULFIL_FETCH, APP_JSON, POST, GET, ORDERS_SUMMARY_FETCH, ORDERS_CUT_OFF_TIME_FETCH, ORDERS_PER_PBT_FETCH, ORDERLINES_PER_ORDER_FETCH, POLLING_INTERVAL
} from '../../constants/frontEndConstants';

import { setInfiniteSpinner } from '../../actions/notificationAction';

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
            cutOffTimeIndex:"",
            isPanelOpen:true,
            page:1,
            size:10,
        }

        this._enableCollapseAllBtn = this._enableCollapseAllBtn.bind(this);
        this._disableCollapseAllBtn = this._disableCollapseAllBtn.bind(this);
        this._reqOrderPerPbt = this._reqOrderPerPbt.bind(this);
        this._viewOrderLine = this._viewOrderLine.bind(this);
        this._onScrollHandler = this._onScrollHandler.bind(this);
        this._startPollingCutOffTime = this._startPollingCutOffTime.bind(this);
    }

    _showAllOrder() {
        this.props.refreshOption();
    }

    _viewOrderLine = (orderId) =>  {
         // #stop polling orders while opening viewOrderline //
        clearTimeout(this._intervalIdForOrders);
        //this.props.stopPollingCutOffTime(this.props.intervalIdForCutOffTime);
        modal.add(ViewOrderLine, {
            startPollingOrders: this._reqOrderPerPbt,
            startPollingCutOffTime: this.props.startPollingCutOffTime,
            cutOffTimeIndex: this.state.cutOffTimeIndex,
            orderId: orderId,
            title: '',
            size: 'large',
            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true      // (optional) if you don't wanna show the top right close button
                                       //.. all what you put in here you will get access in the modal props ;),
            });
    }

    _reqOrderPerPbt(cutOffTimeIndex, saltParams={}){
        this.setState({
            cutOffTimeIndex: cutOffTimeIndex
        });

        let cutOffTime = this.props.pbts[cutOffTimeIndex].cut_off_time;
        const index = storage.indexOf(cutOffTime);


        //this.props.stopPollingCutOffTime(this.props.intervalId);

        //console.log("CUT OFF TIME POLLING STOPPED...!");


        console.log('%c ==================>!  ', 'background: blue; color: white');
        console.log("LEVEL 2 ORDER PER CUT OFF TIME REQUESTED WITH CUT OFF TIME ID===>" + cutOffTime);
        console.log("startDate =====>" + this.props.startDate,"endDate  =======>" + this.props.endDate, "cutofftime ========>" + cutOffTime);   

        let formData={
            "start_date": this.props.startDate,
            "end_date": this.props.endDate,
            "cut_off_time" : cutOffTime
        };

        let params={
            'url': ORDERS_PER_PBT_URL,
            //'url':ORDERS_PER_PBT_URL+"?page="+this.state.page+"&size="+this.state.size,
            'method':POST,
            'contentType':APP_JSON,
            'accept':APP_JSON,
            'cause':ORDERS_PER_PBT_FETCH,
            'formdata':formData,
        }
        this.props.makeAjaxCall(params);

        this._intervalIdForOrders = setTimeout(() => this._reqOrderPerPbt(cutOffTimeIndex), POLLING_INTERVAL);

        // #condition to STOP hitting http request on OPENING OF ACCORDION
        /*const index = storage.indexOf(cutOffTime);
        let formData={
            "start_date": this.props.startDate,
            "end_date": this.props.endDate,
            "cut_off_time" : cutOffTime
        };
        if(index === -1){   // FIRST TIME CLICK OF ACCORDION
            storage.push(cutOffTime);
            this.props.stopPolling(this.props.intervalId);  // #stop ongoing polling.
            console.log('%c ==================>!  ', 'background: blue; color: white');
            console.log("LEVEL 2 ORDER PER CUT OFF TIME REQUESTED WITH CUT OFF TIME ID===>" + cutOffTime);
            console.log("startDate =====>" + this.props.startDate,"endDate  =======>" + this.props.endDate, "cut off time ========>" + cutOffTime);   

            let params={
                'url': ORDERS_PER_PBT_URL,
                //'url':ORDERS_PER_PBT_URL+"?page="+this.state.page+"&size="+this.state.size,
                'method':GET,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'cause':ORDERS_PER_PBT_FETCH,
                'formdata':formData,
            }
            this.props.makeAjaxCall(params);
        }
        else if( index !== -1 && JSON.stringify(saltParams) === JSON.stringify({lazyData:true}) ){  // Accordion already open and infinite scroll
                console.log("coming inside lazyData TRUE");
            let params={
                'url': ORDERS_PER_PBT_URL,
                //'url':ORDERS_PER_PBT_URL+"?page="+this.state.page+"&size="+this.state.size,
                'method':GET,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'cause':ORDERS_PER_PBT_FETCH,
                'formdata':formData,
                'saltParams':saltParams,
            }
            
            this.props.makeAjaxCall(params);
        }
        else{    // CLICKED ON ALREADY OPEN ACCORDION
            console.log("coming inside else case means ACCORDION HAS BEEN CLOSED");
            storage.splice(index, 1);

            /* condition to re-starting polling when all the accordions are in CLOSED state */
        //     if(storage.length <= 0){
        //         this.props.restartPolling();
        //         this.props.setInfiniteSpinner(false); // remove the loading more status
        //     }
            
        // }*/

        

    }

    _startPollingCutOffTime(){
        this.props.startPollingCutOffTime();
    }

    _stopPollingOrders(intervalIdForOrders){
        clearTimeout(intervalIdForOrders);
        console.log("ORDERS POLLING STOPPED....!");
        //this.startPollingCutOffTime();
    }

    

    _enableCollapseAllBtn(){
        this.props.enableCollapseAllBtn();
        this.setState({
            collapseAllBtnState: false,
            isPanelOpen: true
        })
    }

    _disableCollapseAllBtn(){
        this.props.disableCollapseAllBtn();
        this.setState({
            collapseAllBtnState: true,
            isPanelOpen: false
        })
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

    calculateTimeLeft(cutOffTimeFromBK){
         let timeLeft, d1, d2, diff;

        if(cutOffTimeFromBK){
            d1 = new Date();
            d2= new Date(cutOffTimeFromBK);
            diff = d1 - d2;

            if(diff > 3600000){ // 3600 * 1000 milliseconds is for 1 hr
                timeLeft = Math.floor (diff / 3600000) + "hrs left";
            }
            else if(diff > 60000){ // 60 *1000 milliseconds is for 1 min
                timeLeft = Math.floor(diff / 60000) + "mins left";
            }
            else {  // 1000 milliseconds is for 1 sec
                timeLeft = Math.floor(diff / 1000) + "seconds left";
            }
            return timeLeft;
        }
        else 
        {
            timeLeft = "";
            return timeLeft;
        }
        
    }

    _processPBTs = (arg) => {
        let formatPbtTime, formatOrderId, formatPpsId, formatBinId, formatStartDate, formatCompleteDate, formatProgressBar;
        let pbtData = arg;
        let pbtDataLen = pbtData.length; 
        let pbtRows = []; 
        let processedData = {};

        if(pbtDataLen){
            for(let i =0 ; i < pbtDataLen; i++){
                let pbtRow = [];
                
                if(pbtData[i].order_id){
                    formatOrderId = (pbtData[i].order_id ? <FormattedMessage id="orders.order.orderId" description="order id" defaultMessage="Order {orderId}" values={{orderId: pbtData[i].order_id}} />: "null")
                    formatPpsId = (pbtData[i].pps_id ? <FormattedMessage id="orders.order.ppsId" description="pps id" defaultMessage="PPS {ppsId}" values={{ppsId: pbtData[i].pps_id}} /> : "null")
                    formatBinId = (pbtData[i].pps_bin_id ? <FormattedMessage id="orders.order.binId" description="bin id" defaultMessage="Bin {binId}" values={{binId: pbtData[i].pps_bin_id}} /> : "null")
                    formatStartDate = (pbtData[i].start_date ? <FormattedRelative updateInterval={10000} value={pbtData[i].start_date} timeZone={this.props.timeZone}/> : "null");
                    formatCompleteDate = (pbtData[i].completion_date ? <FormattedRelative updateInterval={10000} value={pbtData[i].completion_date} timeZone={this.props.timeZone}/> : "null");
                    formatProgressBar = this._formatProgressBar(pbtData[i].picked_products_count, pbtData[i].total_products_count);

                    pbtRow.push(<div className="DotSeparatorWrapper"> 
                                <DotSeparatorContent header={[formatOrderId]} subHeader={[formatPpsId, formatBinId, formatStartDate, formatCompleteDate]}/>
                            </div>);

                    pbtRow.push(<div style={{display: "flex", alignItems: "center", justifyContent:"center"}}>
                                    <div style={{width: "35%"}}>
                                        <div className="ProgressBarWrapper">
                                            <ProgressBar progressWidth={formatProgressBar.width}/>
                                        </div>
                                        <div style={{paddingTop: "10px", color: "#333333", fontSize: "14px"}}> {formatProgressBar.message}</div> 
                                    </div>
                                    <div style={{fontSize: "14px", width: "65%", display: "flex", alignItems: "center", justifyContent:"center"}}>
                                        <span>{pbtData[i].status}</span>
                                        <span>{pbtData[i].missing_count > 0 ? pbtData[i].missing_count : ""}</span>
                                        <span>{pbtData[i].damaged_count > 0 ? pbtData[i].damaged_count : ""}</span>
                                        <span>{pbtData[i].physically_damaged_count > 0 ? pbtData[i].physically_damaged_count : ""}</span>
                                        <span>{pbtData[i].unfulfillable_count > 0 ? pbtData[i].unfulfillable_count : ""}</span>
                                        <span>{pbtData[i].missing_count > 0 ? pbtData[i].missing_count : ""}</span>
                                    </div>
                                </div>);

                    if(formatProgressBar.action === true){
                        pbtRow.push(<div key={i} style={{textAlign:"center"}} className="gorButtonWrap">
                          <button className="viewOrderLineBtn" onClick={() => this._viewOrderLine(pbtData[i].order_id)}>
                            <FormattedMessage id="orders.view.orderLines" description="button label for view orderlines" defaultMessage="VIEW ORDERLINES "/>
                          </button>
                        </div>);
                    }
                    else{
                        pbtRow.push(<div> </div>);
                    }
                }

                

                //let formatTimeLeft = this._formatTime(pbtData[i].time_left);
                // let originalDate = pbtData[i].cut_off_time;
                // var convertedDate =  originalDate.getTime(); 
                // var timeText= <FormattedRelative value={convertedDate} timeZone={this.props.timeZone}/>;

                let msec = Date.parse("March 8, 2018");
                var d = new Date();  //2018-02-22 23:00:00
                var n = d.getMilliseconds();
                var x = n - 5 * 60000;

                //if(pbtData[i].cut_off_time){
                    //let formatPbtTime = (<FormattedTime
                             // value={pbtData[i].cut_off_time}
                             // hour= "numeric"
                             // minute= "numeric"
                             // timeZone= {this.props.timeOffset}
                             // hour12= {false}
                             // />);
                    let formatPbtTime = (pbtData[i].cut_off_time ? <FormattedMessage id="orders.pbt.cutofftime" description="cut off time" defaultMessage=" Cut off time {cutOffTime} hrs" values={{cutOffTime:<FormattedTime
                             value={pbtData[i].cut_off_time}
                             hour= "numeric"
                             minute= "numeric"
                             timeZone= {this.props.timeOffset}
                             hour12= {false}
                             />}} /> : "NO CUT OFF TIME");
                    //let formatTimeLeft = (<FormattedRelative updateInterval={10000} value={pbtData[i].cut_off_time} timeZone={this.props.timeZone}/>);
                    let formatTimeLeft = this.calculateTimeLeft(pbtData[i].cut_off_time);
                    let formatProgressBar = this._formatProgressBar(pbtData[i].picked_products_count, pbtData[i].total_products_count);
                    let formatTotalOrders = (<FormattedMessage id="orders.total" description="total orders" defaultMessage="Total {total} orders" values={{total:pbtData[i].total_orders}} />);

                    pbtRow.push(<div className="DotSeparatorWrapper"> 
                                    {formatTimeLeft!== "" ?
                                        <DotSeparatorContent header={[formatPbtTime]} subHeader={[formatTimeLeft]}/> :
                                        <DotSeparatorContent header={[formatPbtTime]} subHeader={[]}/>
                                    }
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

    _processOrders = (orderData, nProps) => {
        nProps = this;
        orderData  = nProps.props.ordersPerPbt;
        let formatPbtTime, formatOrderId, formatPpsId, formatBinId, formatStartDate, formatCompleteDate, formatProgressBar;
        let orderDataLen = orderData.length;
        let orderRows = [];
        let processedData = {};
        var timeOffset = nProps.props.timeOffset || "";
        if(orderDataLen){
            for(let i=0; i < orderDataLen; i++){
                let orderRow = [];

                formatOrderId = (orderData[i].order_id ? <FormattedMessage id="orders.order.orderId" description="order id" defaultMessage="Order {orderId}" values={{orderId: orderData[i].order_id}} />: "null")
                formatPpsId = (orderData[i].pps_id ? <FormattedMessage id="orders.order.ppsId" description="pps id" defaultMessage="PPS {ppsId}" values={{ppsId: orderData[i].pps_id}} /> : "null")
                formatBinId = (orderData[i].pps_bin_id ? <FormattedMessage id="orders.order.binId" description="bin id" defaultMessage="Bin {binId}" values={{binId: orderData[i].pps_bin_id}} /> : "null")

                //Create time need to be add
                    if (orderData[i].start_date) {
                        if (getDaysDiff(orderData[i].start_date) < 2) {
                            formatStartDate = nProps.context.intl.formatRelative(orderData[i].start_date, {
                                timeZone: timeOffset,
                                units: 'day'
                            }) +
                                ", " + nProps.context.intl.formatTime(orderData[i].start_date, {
                                    timeZone: timeOffset,
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: false
                                });
                        }
                        else {
                            formatStartDate = nProps.context.intl.formatDate(orderData[i].start_date,
                                {
                                    timeZone: timeOffset,
                                    month: 'short',
                                    day: '2-digit',
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false
                                });
                        }

                        if (orderData[i].completion_date) {
                            if ((getDaysDiff(orderData[i].completion_date) == getDaysDiff(orderData[i].start_date))) {
                                formatCompleteDate = nProps.context.intl.formatTime(orderData[i].completion_date, {
                                    timeZone: timeOffset,
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: false
                                });
                            }
                            else {
                                formatCompleteDate = nProps.context.intl.formatDate(orderData[i].completion_date,
                                    {
                                        timeZone: timeOffset,
                                        month: 'short',
                                        day: '2-digit',
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false
                                    });
                            }
                        }
                        else
                            formatCompleteDate = "";
                    }
                    //var endTIme = (formatCompleteDate !== "") ? " - " + formatCompleteDate : "";
                    //var totalTime = (formatStartDate ? formatStartDate : "") + (formatCompleteDate ? endTIme : "");

                    if (orderData[i].completion_date) {
                        if (getDaysDiff(orderData[i].completion_date) < 2) {
                            formatCompleteDate = nProps.context.intl.formatRelative(orderData[i].completion_date, {
                                timeZone: timeOffset,
                                units: 'day'
                            }) +
                                ", " + nProps.context.intl.formatTime(orderData[i].completion_date, {
                                    timeZone: timeOffset,
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: false
                                });
                        }
                        else {
                            formatCompleteDate = nProps.context.intl.formatDate(orderData[i].completion_date,
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
                    else {
                        formatCompleteDate = "--";
                    }

                formatProgressBar = this._formatProgressBar(orderData[i].picked_products_count, orderData[i].total_products_count);
                 
                orderRow.push(<div className="DotSeparatorWrapper"> 
                                <DotSeparatorContent header={[formatOrderId]} subHeader={[formatPpsId, formatBinId, formatStartDate, formatCompleteDate]}/>
                            </div>);

                orderRow.push( <div style={{display: "flex", alignItems: "center", justifyContent:"center"}}>
                                    <div style={{width: "35%"}}>
                                        <div className="ProgressBarWrapper">
                                            <ProgressBar progressWidth={formatProgressBar.width}/>
                                        </div>
                                        <div style={{paddingTop: "10px", color: "#333333", fontSize: "14px"}}> {formatProgressBar.message}</div> 
                                    </div>
                                    <div style={{fontSize: "14px", width: "65%", display: "flex", alignItems: "center", justifyContent:"center"}}>
                                        <span> {orderData[i].status} </span>
                                        <span> {orderData[i].missing_count > 0 ? orderData[i].missing_count : ""} </span>
                                        <span> {orderData[i].damaged_count > 0 ? orderData[i].damaged_count : ""} </span>
                                        <span> {orderData[i].physically_damaged_count > 0 ? orderData[i].physically_damaged_count : ""} </span>
                                        <span> {orderData[i].unfulfillable_count > 0 ? orderData[i].unfulfillable_count : ""} </span>
                                        <span> {orderData[i].missing_count > 0 ? orderData[i].missing_count : ""} </span>
                                    </div>
                             </div>);
                if(formatProgressBar.action === true){
                    orderRow.push(<div key={i} style={{textAlign:"center"}} className="gorButtonWrap">
                      <button onClick={() => this._viewOrderLine(orderData[i].order_id)}>
                        <FormattedMessage id="orders.view.orderLines" description="button label for view orderlines" defaultMessage="VIEW ORDERLINES "/>
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

    _onScrollHandler(event, cutOffTimeIndex){
        //if(event.target.scrollHeight - event.target.scrollTop >= 375){
            console.log(Math.round(event.target.scrollTop));
            console.log(event.target.clientHeight);
            console.log(event.target.scrollHeight);
        if( Math.round(event.target.scrollTop) + Number(event.target.clientHeight) ===  Number(event.target.scrollHeight) ){
            let page = this.state.dataFound === false ? this.state.page: this.state.page + 1;
            this.setState({
                    page
                },function(){
                    this.props.setInfiniteSpinner(true);
                    this._reqOrderPerPbt(cutOffTimeIndex, {lazyData:true});
                })
        }
        else {
            this.props.setInfiniteSpinner(false);
        }
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
                                return self.props.pbts[idx].total_orders ? 
                                (<Accordion 
                                    intervalIdForOrders={self._intervalIdForOrders}
                                    startPollingCutOffTime={self._startPollingCutOffTime}
                                    stopPollingOrders={self._stopPollingOrders}
                                    isInfiniteLoading={self.props.isInfiniteLoading}
                                    onScrollHandler={self._onScrollHandler} 
                                    getOrderPerPbt={self._reqOrderPerPbt} 
                                    cutOffTimeIndex={idx} 
                                    enableCollapseAllBtn={self._enableCollapseAllBtn}
                                    disableCollapseAllBtn={self._disableCollapseAllBtn} 
                                    title={
                                        <GTableRow style={{background: "#fafafa"}} key={idx} index={idx} offset={processedPbtData.offset} max={processedPbtData.max} data={processedPbtData.pbtData}>
                                            {row.map(function (text, index) {
                                                return <div key={index} style={{padding:"0px", display:"flex", flexDirection:"column", justifyContent:'center', height:"75px"}} className="cell" >
                                                    {text}
                                                </div>
                                            })}
                                        </GTableRow>}>

                                        {self.props.isPanelOpen === true ?
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
                                </Accordion>)

                                :<GTableRow style={{background: "#fafafa"}} key={idx} index={idx} offset={processedPbtData.offset} max={processedPbtData.max} data={processedPbtData.pbtData}>
                                        {row.map(function (text, index) {
                                            return <div key={index} style={{padding:"0px", display:"flex", flexDirection:"column", justifyContent:'center', height:"75px"}} className="cell" >
                                                {text}
                                            </div>
                                        })}
                                    </GTableRow>
                            }):""}
                        </GTableBody>
                    </GTable>
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

        totalPages: state.orderDetails.totalPages,
        totalOrders: state.orderDetails.totalOrders,
        ordersPerPbt:state.orderDetails.ordersPerPbt,
        timeZone:state.authLogin.timeOffset,
        isInfiniteLoading:state.notificationReducer.isInfiniteLoading

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
        setInfiniteSpinner:function(data){dispatch(setInfiniteSpinner(data));}


    }
};

OrderListTable.defaultProps = {
    ordersPerPbt: [],
    totalPages: "",
    totalOrders: ""
}

OrderListTable.contextTypes = {
    intl: React.PropTypes.object.isRequired
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
    responseFlag: React.PropTypes.bool,
    timeOffset: React.PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderListTable);
