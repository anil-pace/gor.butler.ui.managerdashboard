import React from 'react';
import {connect} from 'react-redux';
import {modal} from 'react-redux-modal';
import {FormattedMessage, defineMessages, FormattedRelative, FormattedDate, FormattedTime, injectIntl} from 'react-intl';
import {GTable} from '../../components/gor-table-component/index'
import {GTableBody} from "../../components/gor-table-component/tableBody";
import {GTableRow} from "../../components/gor-table-component/tableRow";
import Accordion from '../../components/accordion/accordion';
import ViewOrderLine from '../../containers/orderTab/viewOrderLine';
import ProgressBar from '../../components/progressBar/progressBar';
import DotSeparatorContent from '../../components/dotSeparatorContent/dotSeparatorContent';

import {setOrderListSpinner, orderListRefreshed,setOrderQuery} from '../../actions/orderListActions';
import {orderHeaderSortOrder, orderHeaderSort, orderFilterDetail} from '../../actions/sortHeaderActions';
import {showTableFilter, filterApplied, orderfilterState, toggleOrderFilter} from '../../actions/filterAction';
import {updateSubscriptionPacket, setWsAction} from './../../actions/socketActions';
import { makeAjaxCall } from '../../actions/ajaxActions';


import {wsOverviewData} from './../../constants/initData.js';

import {ORDERS_RETRIEVE, GOR_BREACHED, BREACHED, GOR_EXCEPTION, toggleOrder, INITIAL_HEADER_SORT, sortOrderHead, sortOrder, WS_ONSEND, EVALUATED_STATUS,
    ANY, DEFAULT_PAGE_SIZE_OL, REALTIME, ORDERS_FULFIL_FETCH, APP_JSON, POST, GET, ORDERS_SUMMARY_FETCH, ORDERS_CUT_OFF_TIME_FETCH, ORDERS_PER_PBT_FETCH, ORDERLINES_PER_ORDER_FETCH, POLLING_INTERVAL,
    ORDERS_POLLING_INTERVAL
} from '../../constants/frontEndConstants';

import { setInfiniteSpinner } from '../../actions/notificationAction';
import moment from 'moment-timezone';

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
import {setActivePbt} from '../../actions/norderDetailsAction';

const messages=defineMessages({
    inProgressStatus: {
        id: 'orderList.inProgress.status',
        description: "In 'inProgress' for orders",
        defaultMessage: "In progress"
    },
    completedStatus: {
        id: "orderList.completed.status",
        description: " 'completed' status",
        defaultMessage: "Completed"
    },
    cancelledStatus: {
        id: "orderList.cancelled.status",
        description: " 'Cancelled' status",
        defaultMessage: "Cancelled"
    },
    createdStatus: {
        id: "orderList.created.status",
        description: " 'created' status",
        defaultMessage: "Created"
    },
    
    onHoldStatus: {
        id: 'orderlist.onHold.status',
        description: " 'Refreshed' status",
        defaultMessage: 'On hold'
    },
    notFulfillableStatus: {
        id: 'orderlist.notFulfillale.status',
        description: " 'Refreshed' status",
        defaultMessage: 'Not fulfillable'
    },
    cutOffTime:{
        id: 'orderlist.cutOffTime.time',
        description: " cut off time in hrs",
        defaultMessage: 'Cut off time {cutOffTime} hrs'
    },
    orderId:{
        id: 'orders.order.orderId',
        description: "order id",
        defaultMessage: 'Order {orderId}'
    },
    ppsId:{
        id: 'orders.order.ppsId',
        description: "pps id",
        defaultMessage: 'PPS {ppsId}'
    },
    binId:{
        id: 'orders.order.binId',
        description: "bin id",
        defaultMessage: 'Bin {binId}'
    },
    left:{
        id: 'orders.order.left',
        description: "left",
        defaultMessage: ' left'
    },
    ago:{
        id: 'orders.order.ago',
        description: "ago",
        defaultMessage: ' ago'
    },
    today:{
        id: 'orders.order.today',
        description: "Today",
        defaultMessage: 'Today'
    },
    tomorrow:{
        id: 'orders.order.tomorrow',
        description: "tomorrow",
        defaultMessage: 'Tomorrow'
    },
    yesterday:{
        id: 'orders.order.yesterday',
        description: "yesterday",
        defaultMessage: 'Yesterday'
    }
});
class OrderListTable extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            cutOffTimeIndex:"",
            statusMapping:{
                "CREATED": this.props.intl.formatMessage(messages.createdStatus),
                "PROCESSING": this.props.intl.formatMessage(messages.inProgressStatus),
                "PROCESSED": this.props.intl.formatMessage(messages.completedStatus),
                "FAILED": this.props.intl.formatMessage(messages.notFulfillableStatus),
                "CANCELED": this.props.intl.formatMessage(messages.cancelledStatus),
                "CANCELLED": this.props.intl.formatMessage(messages.cancelledStatus),
                "WAITING": this.props.intl.formatMessage(messages.onHoldStatus)
            }
        }

        this._reqOrderPerPbt = this._reqOrderPerPbt.bind(this);
        this._viewOrderLine = this._viewOrderLine.bind(this);
        this._calculateTimeLeft = this._calculateTimeLeft.bind(this);
        
    }

    _showAllOrder() {
        this.props.refreshOption();
    }

    _viewOrderLine = (orderId) =>  {
        modal.add(ViewOrderLine, {
            startPollingOrders: this._reqOrderPerPbt,
            cutOffTimeIndex: this.state.cutOffTimeIndex,
            orderId: orderId,
            title: '',
            size: 'large',
            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true      // (optional) if you don't wanna show the top right close button
                                       //.. all what you put in here you will get access in the modal props ;),
            });
    }

    _reqOrderPerPbt(pbtData, saltParams={}){
        let cutOffTime = pbtData.cut_off_time
        let page="1"
        let size="10";
        let need_to_fetch_more=false
        try{
            need_to_fetch_more=pbtData.ordersPerPbt.order.length < pbtData.ordersPerPbt.totalOrders
        }catch(ex){

        }
    

        if(saltParams.lazyData && need_to_fetch_more){  // Accordion already open and infinite scroll
            try{
                page=(pbtData.ordersPerPbt.orders.length/size)+1
                page=page.toString();
            }catch(ex){
                page="1"
            }
        }
        else{
            try{
                size=pbtData.ordersPerPbt.orders.length
                size = size.toString()
            }catch(ex){
              size = "10"
            }
            
        }

        let formData={
          "start_date": this.props.startDate,
          "end_date": this.props.endDate,
          "cut_off_time" : cutOffTime,
          "filtered_ppsId": this.props.ppsIdFilter,
          "filtered_order_status":this.props.statusFilter,
          "page": page,
          "size": size
      };


        saltParams.cut_off_time=cutOffTime
        let params={
          'url':ORDERS_PER_PBT_URL,
          'method':POST,
          'contentType':APP_JSON,
          'accept':APP_JSON,
          'cause':ORDERS_PER_PBT_FETCH,
          'formdata':formData,
          saltParams:saltParams
      }
      this.props.makeAjaxCall(params);
   }

    


    _formatProgressBar(nr, dr){
        let x = {};
        if(nr === 0 && dr === 0){ // when nothing has started
            x.message = (<FormattedMessage id="orders.pending.status" description="status" defaultMessage="Pending"/>);
            x.action = false;
        }

        else if(nr === dr){ // when ALL orders has been processed
            x.message=(<FormattedMessage id="orders.toBePicked.status" description="status" defaultMessage="{total} products picked"
                      values={{total:dr}} />);
            x.action = true;
        }
        else if(nr === 0){ // when ALL are remaining to be picked
            x.message=(<FormattedMessage id="orders.productsPicked.status" description="status" defaultMessage="{current} products to be picked"
                      values={{current:dr}} />);
            x.action = true;
        }
        else{
            x.width = (nr/dr)*100; 
            x.message = (<FormattedMessage id="orders.inProgress.status" description="status" defaultMessage="{current} of {total} products picked"
                            values={{current:nr, total: dr}} />);
            x.action  = true;
        }
        return x;
    }

    _calculateTimeLeft(cutOffTimeFromBK){
        let timeLeft=null, intlLeft,currentLocalTime,cutOffTime;
        if(cutOffTimeFromBK){
            //moment.locale(this.props.intl.locale);
            currentLocalTime = moment().tz(this.props.timeZone);
            cutOffTime = moment(cutOffTimeFromBK).tz(this.props.timeZone);
            intlLeft =   this.props.intl.formatMessage((currentLocalTime > cutOffTime
?messages.ago:messages.left));
            timeLeft = currentLocalTime.from(cutOffTime,true) +" "+ intlLeft;
            
        }
        return timeLeft;
    }

    _processPBTs = (arg, nProps) => {
        nProps = this;
        let formatOrderId, formatPpsId, formatBinId, formatStartDate, formatCompleteDate, formatProgressBar, pbtData;
        let isGroupedById = nProps.props.isGroupedById;
        pbtData = isGroupedById ? nProps.props.pbts : (nProps.props.pbts[0].ordersPerPbt ? nProps.props.pbts[0].ordersPerPbt.orders : []);
        let pbtDataLen = pbtData.length; 
        if(pbtDataLen === 0) return false;
        let timeOffset = nProps.props.timeOffset || "";
        let pbtRows = []; 
        let processedData = {};



        if(pbtDataLen){
            for(let i =0 ; i < pbtDataLen; i++){
                let pbtRow = [];
                let formatStartDate=null, formatCompleteDate=null;
                
                    /* START => case #3 when cut off time NOT at all there for any of the orders */
                    if(!isGroupedById && Object.keys(pbtData[0]).length){
                        formatOrderId = ((pbtData[i].order_id && pbtData[i] !== "") ?
                                        this.props.intl.formatMessage(messages.orderId, {orderId: pbtData[i].order_id}): "");

                        formatPpsId =   ((pbtData[i].pps_id && pbtData[i].pps_id !== "") ? 
                                                this.props.intl.formatMessage(messages.ppsId, {ppsId: pbtData[i].pps_id}): "");

                        formatBinId =   ((pbtData[i].pps_bin_id && pbtData[i].pps_bin_id !=="") ?
                                         this.props.intl.formatMessage(messages.binId, {binId: pbtData[i].pps_bin_id}): "");

                        formatProgressBar = this._formatProgressBar(pbtData[i].picked_products_count, pbtData[i].total_products_count);


                        

                        //Create time need to be add
                         try{
                            
                            if(pbtData[i].start_date){
                                
                                let startDate = pbtData[i].start_date;
                                formatStartDate= this._calculateRelativeTime(moment(startDate).tz(timeOffset),
                                    moment().tz(timeOffset))+", "+moment(startDate).tz(timeOffset).format("HH:mm");
                            }
                            if(pbtData[i].completion_date){
                                let completionDate = pbtData[i].completion_date;
                                formatCompleteDate= this._calculateRelativeTime(moment(completionDate).tz(timeOffset),
                                    moment().tz(timeOffset))+", "+moment(completionDate).tz(timeOffset).format("HH:mm");
                            }
                }
                catch(ex){}
                        pbtRow.push(<div className="DotSeparatorWrapper"> 
                                    <DotSeparatorContent header={[formatOrderId]} subHeader={[formatPpsId, formatBinId, formatStartDate, formatCompleteDate]}/>
                                </div>);

                        pbtRow.push(<div style={{display: "flex", alignItems: "center", justifyContent:"center"}}>
                                        <div style={{width: "35%"}}>
                                            {formatProgressBar.width ?
                                                <div className="ProgressBarWrapper">
                                                    <ProgressBar progressWidth={formatProgressBar.width}/>
                                                </div>: null
                                            }
                                            <div style={{paddingTop: "10px", color: "#333333", fontSize: "14px"}}> {formatProgressBar.message}</div> 
                                        </div>
                                        <div style={{fontSize: "14px", width: "65%", display: "flex", alignItems: "center", justifyContent:"center"}}>
                                            <span> {this.state.statusMapping[pbtData[i].status] ? this.state.statusMapping[pbtData[i].status] : pbtData[i].status} </span>
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

                        pbtRows.push(pbtRow);
                    }

                    /* START => handles case#1(when all have group id) & case #2 (some group Id + some not group id) */
                    else if(isGroupedById){
                        if (!pbtData[i]){
                            continue;
                        }
                        let formatIntlPbt = (pbtData[i].cut_off_time ?moment(pbtData[i].cut_off_time).tz(timeOffset).format("HH:mm"): "");
                        let formatPbtTime = (pbtData[i].cut_off_time ? 
                                                this.props.intl.formatMessage(messages.cutOffTime, {cutOffTime: formatIntlPbt}): "NO CUT OFF TIME");
                        let formatTimeLeft = this._calculateTimeLeft(pbtData[i].cut_off_time);
                        let formatProgressBar = this._formatProgressBar(pbtData[i].picked_products_count, pbtData[i].total_products_count);
                        let formatTotalOrders = (<FormattedMessage id="orders.total" description="total orders" defaultMessage="Total {total} orders" values={{total:pbtData[i].total_orders}} />);

                        pbtRow.push(<div className="DotSeparatorWrapper"> 
                                        {formatTimeLeft ?
                                            <DotSeparatorContent header={[formatPbtTime]} subHeader={[formatTimeLeft]}/> :
                                            <DotSeparatorContent header={[formatPbtTime]} subHeader={[]}/>
                                        }
                                    </div>);
                        pbtRow.push(<div>
                                        {formatProgressBar.width ?
                                            <div className="ProgressBarWrapper">
                                                <ProgressBar progressWidth={formatProgressBar.width}/>
                                            </div>: null
                                        }
                                        <div style={{paddingTop: "10px", color: "#333333", fontSize: "14px"}}> {formatProgressBar.message}</div>
                                     </div>);

                        pbtRow.push(<div className="totalOrderWrapper">{formatTotalOrders}</div>);
                        pbtRows.push(pbtRow);
                    }
                    else{
                        return [];
                    }
                }
            processedData.pbtData = pbtRows;

        }
        processedData.offset = 0;
        processedData.max= pbtRows.length;

        return processedData;
    }
    _calculateRelativeTime(referenceDate,currentDate){
        
        return moment(referenceDate).calendar(currentDate, {
            sameDay: '['+this.props.intl.formatMessage(messages.today)+']',
            nextDay: '['+this.props.intl.formatMessage(messages.tomorrow)+']',
            nextWeek: 'DD MMM',
            lastDay: '['+this.props.intl.formatMessage(messages.yesterday)+']',
            lastWeek: 'DD MMM',
            sameElse: 'DD MMM'
        });
   
    }

    _processOrders = (orderData, nProps) => {
        nProps = this;
        let formatPbtTime, formatOrderId, formatPpsId, formatBinId, formatProgressBar;

        let orderDataLen = orderData.length;
        let orderRows = [];
        let processedData = {};
        let timeOffset = nProps.props.timeOffset || "";
        if(orderDataLen){
            for(let i=0; i < orderDataLen; i++){
                let orderRow = [];
                let formatStartDate = null,formatCompleteDate=null;

                formatOrderId = ((orderData[i].order_id && orderData[i] !== "") ?
                                        this.props.intl.formatMessage(messages.orderId, {orderId: orderData[i].order_id}): "");

                formatPpsId =   ((orderData[i].pps_id && orderData[i].pps_id !== "") ? 
                                        this.props.intl.formatMessage(messages.ppsId, {ppsId: orderData[i].pps_id}): "");

                formatBinId =   ((orderData[i].pps_bin_id && orderData[i].pps_bin_id !=="") ?
                                         this.props.intl.formatMessage(messages.binId, {binId: orderData[i].pps_bin_id}): "");

                formatProgressBar = this._formatProgressBar(orderData[i].picked_products_count, orderData[i].total_products_count);

                

                //Create time need to be add
                try{
                    if(orderData[i].start_date){
                        let startDate = orderData[i].start_date;
                        formatStartDate= this._calculateRelativeTime(moment(startDate).tz(timeOffset),
                            moment().tz(timeOffset))+", "+moment(startDate).tz(timeOffset).format("HH:mm");
                    }
                    if(orderData[i].completion_date){
                        let completionDate = orderData[i].completion_date;
                        formatCompleteDate= this._calculateRelativeTime(moment(completionDate).tz(timeOffset),
                            moment().tz(timeOffset))+", "+moment(completionDate).tz(timeOffset).format("HH:mm");
                    }
                }
                catch(ex){}
                 
                orderRow.push(<div className="DotSeparatorWrapper"> 
                                <DotSeparatorContent header={[formatOrderId]} 
                                    subHeader={[formatPpsId, formatBinId, formatStartDate, formatCompleteDate]}/>
                            </div>);

                orderRow.push( <div style={{display: "flex", alignItems: "center", justifyContent:"center"}}>
                                    <div style={{width: "35%"}}>
                                        {formatProgressBar.width ?
                                            <div className="ProgressBarWrapper">
                                                <ProgressBar progressWidth={formatProgressBar.width}/>
                                            </div>: null
                                        }
                                        <div style={{paddingTop: "10px", color: "#333333", fontSize: "14px"}}> {formatProgressBar.message}</div> 
                                    </div>
                                    <div style={{fontSize: "14px", width: "65%", display: "flex", alignItems: "center", justifyContent:"center"}}>
                                        <span> {this.state.statusMapping[orderData[i].status] ? this.state.statusMapping[orderData[i].status] : orderData[i].status} </span>
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

    _onScrollHandler(pbtData, event){
        if(pbtData.ordersPerPbt &&  pbtData.ordersPerPbt.totalOrders > pbtData.ordersPerPbt.orders.length){
            if( Math.round(event.target.scrollTop) + Number(event.target.clientHeight) ===  Number(event.target.scrollHeight) ){
                        this.props.setInfiniteSpinner(false);
                        this._reqOrderPerPbt(pbtData, {lazyData:true});
                }
                else {
                    this.props.setInfiniteSpinner(false);
                }
            }
    }

    render() {
        var self=this;
        const processedPbtData = this._processPBTs(this.props.pbts);
        let isGroupedById = this.props.isGroupedById;
        return (
            <div>
                <div className="waveListWrapper">
                    <GTable options={['table-bordered']}>
                    {processedPbtData ?
                        <GTableBody data={processedPbtData.pbtData}>
                            {processedPbtData.pbtData ? processedPbtData.pbtData.map(function (row, idx) {
                                return isGroupedById ?
                                (<Accordion 
                                    key={idx}
                                    pbts={self.props.pbts}
                                    setActivePbt={self.props.setActivePbt}
                                    intervalIdForOrders={self._intervalIdForOrders}
                                    isInfiniteLoading={self.props.isInfiniteLoading}
                                    onScrollHandler={self._onScrollHandler.bind(self,self.props.pbts[idx])} 
                                    getOrderPerPbt={self._reqOrderPerPbt} 
                                    cutOffTimeIndex={idx} 
                                    enableCollapseAllBtn={self._enableCollapseAllBtn}
                                    disableCollapseAllBtn={self._disableCollapseAllBtn} 
                                    isOpened={self.props.pbts[idx].opened}
                                    setOrderListSpinner={self.props.setOrderListSpinner}
                                    title={
                                        <GTableRow style={{background: "#fafafa"}} key={idx} index={idx} offset={processedPbtData.offset} max={processedPbtData.max} data={processedPbtData.pbtData}>
                                            {row.map(function (text, index) {
                                                return <div key={index} style={{padding:"0px", display:"flex", flexDirection:"column", justifyContent:'center', height:"75px"}} className="cell" >
                                                    {text}
                                                </div>
                                            })}
                                        </GTableRow>}>

                                    {/* START=> While clicking on Accordion */} 
                                    {self.props.pbts[idx].ordersPerPbt && <GTableBody  data={self._processOrders(self.props.pbts[idx].ordersPerPbt.orders).orderData} >
                                        {self._processOrders(self.props.pbts[idx].ordersPerPbt.orders).orderData.map(function (row_1, idx_1) {
                                            return (
                                                <GTableRow key={idx_1} index={idx_1} offset={self._processOrders(self.props.pbts[idx].ordersPerPbt.orders).offset} max={self._processOrders(self.props.pbts[idx].ordersPerPbt.orders).max} data={self._processOrders(self.props.pbts[idx].ordersPerPbt.orders).orderData}>
                                                    {Object.keys(row_1).map(function (text, index) {
                                                        return <div key={index} style={{padding:"0px", display:"flex", flexDirection:"column", justifyContent:'center', height:"75px"}} className="cell" >
                                                            {row_1[text]}
                                                        </div>
                                                    })}
                                                </GTableRow>
                                            )
                                        })}
                                    </GTableBody>}
                                    {/* END=> */} 
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
                    : <div className="noOrdersPresent"> 
                            <FormattedMessage id="orders.noOrders.noOrders" 
                                description="display no orders" 
                                defaultMessage="No orders available"/>
                        </div>
                    }
                    </GTable>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        orderFilter: state.sortHeaderState.orderFilter || "",
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
        pbts:state.orderDetails.pbts,
        totalPages: state.orderDetails.totalPages,
        totalOrders: state.orderDetails.totalOrders,
        ordersPerPbt:state.orderDetails.ordersPerPbt,
        timeZone:state.authLogin.timeOffset,
        isInfiniteLoading:state.notificationReducer.isInfiniteLoading,
        isGroupedById: state.orderDetails.isGroupedById
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
        setInfiniteSpinner:function(data)
            {dispatch(setInfiniteSpinner(data))
        },
        setActivePbt:function(data){
            dispatch(setActivePbt(data))
        }
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
    setOrderFilter: React.PropTypes.func,
    isFilterApplied: React.PropTypes.bool,
    timeZoneString: React.PropTypes.string,
    lastUpdated: React.PropTypes.string,
    responseFlag: React.PropTypes.bool,
    timeOffset: React.PropTypes.number,
    isGroupedById: React.PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OrderListTable));