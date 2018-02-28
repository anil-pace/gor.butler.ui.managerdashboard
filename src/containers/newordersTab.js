/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import {connect} from 'react-redux';
import {GTable} from '../components/gor-table-component/index'
import {GTableHeader,GTableHeaderCell} from '../components/gor-table-component/tableHeader';
import {GTableBody} from "../components/gor-table-component/tableBody";
import {GTableRow} from "../components/gor-table-component/tableRow";
import { FormattedMessage, FormattedDate } from 'react-intl';
import Accordion from '../components/accordion/accordion';
import OrderTile from '../containers/neworderTab/OrderTile';
import ViewOrderLine from '../containers/neworderTab/viewOrderLine';

import GorPaginateV2 from '../components/gorPaginate/gorPaginateV2';
import Dropdown from '../components/gor-dropdown-component/dropdown';

import {modal} from 'react-redux-modal';
import ProgressBar from '../components/progressBar/progressBar';
import {showTableFilter} from '../actions/filterAction';
import DotSeparatorContent from '../components/dotSeparatorContent/dotSeparatorContent';
import Spinner from '../components/spinner/Spinner';
import { makeAjaxCall } from '../actions/ajaxActions';
import { DEFAULT_PAGE_SIZE_OL, REALTIME, ORDERS_FULFIL_FETCH, APP_JSON, POST, GET, ORDERS_SUMMARY_FETCH, ORDERS_CUT_OFF_TIME_FETCH, ORDERS_PER_PBT_FETCH, ORDERLINES_PER_ORDER_FETCH} from '../constants/frontEndConstants';
import { ORDERS_FULFIL_URL, ORDERS_SUMMARY_URL, ORDERS_CUT_OFF_TIME_URL, ORDERS_PER_PBT_URL, ORDERLINES_PER_ORDER_URL} from '../constants/configConstants';
import {setOrderListSpinner, orderListRefreshed,setOrderQuery} from '../actions/orderListActions';
import {filterApplied, orderfilterState, toggleOrderFilter} from '../actions/filterAction';
import {hashHistory} from 'react-router';
import FilterSummary from '../components/tableFilter/filterSummary';

import {
    AUDIT_RETRIEVE,
    PUT,
    GOR_COMPLETED_STATUS,
    GOR_IN_PROGRESS_STATUS,
    LOCATION,
    AUDIT_PARAM_TYPE,
    AUDIT_PARAM_VALUE,
    SPECIFIC_LOCATION_ID,
    SPECIFIC_SKU_ID,
    AUDIT_TYPE,
    SKU,
    TIMER_ID,
    AUDIT_PENDING_APPROVAL,
    AUDIT_RESOLVED,
    AUDIT_CREATED,
    AUDIT_LINE_REJECTED,
    AUDIT_ISSUES_STATUS,
    AUDIT_BY_PDFA,
    AUDIT_BY_LOCATION,
    AUDIT_BY_SKU,
    AUDIT_TASK_ID,
    AUDIT_STATUS,
    sortAuditHead,
    sortOrder,
    ALL,FILTER_PPS_ID,AUDIT_START_TIME,AUDIT_END_TIME,AUDIT_CREATEDBY,
    ANY,WS_ONSEND,toggleOrder,CANCEL_AUDIT,SYSTEM_GENERATED
} from '../constants/frontEndConstants';
import {
    ORDERS_RETRIEVE,
    GOR_BREACHED,
    BREACHED,
    GOR_EXCEPTION,
    INITIAL_HEADER_SORT,
    sortOrderHead,
    EVALUATED_STATUS,
} from '../constants/frontEndConstants';


import {
    getPageData,
    getStatusFilter,
    getTimeFilter,
    getPageSizeOrders,
    currentPageOrders,
    lastRefreshTime
} from '../actions/paginationAction';

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
    FILTER_ORDER_ID, SEARCH_AUDIT_URL, GIVEN_PAGE, GIVEN_PAGE_SIZE, ORDER_ID_FILTER_PARAM,ORDER_ID_FILTER_PARAM_WITHOUT_STATUS,FILTER_AUDIT_ID,CANCEL_AUDIT_URL
} from '../constants/configConstants';
import {addDateOffSet} from '../utilities/processDate';

var storage = [];
/*Page size dropdown options*/
const pageSizeDDOpt = [ {value: "25", disabled:false,label: <FormattedMessage id="operationLog.page.twentyfive" description="Page size 25"
                                                          defaultMessage="25"/>},
            {value: "50",  disabled:false,label: <FormattedMessage id="operationLog.page.fifty" description="Page size 50"
                                                          defaultMessage="50"/>},
            {value: "100",  disabled:false,label: <FormattedMessage id="operationLog.page.hundred" description="Page size 100"
                                                          defaultMessage="100"/>}];


class newordersTab extends React.Component{
	
	constructor(props) 
	{
    	super(props);
    	this.state = this._getInitialState();
    	this._viewOrderLine = this._viewOrderLine.bind(this);
        this._reqOrderPerPbt = this._reqOrderPerPbt.bind(this);
        this._handlePageChange= this._handlePageChange.bind(this);
        this._restartPolling = this._restartPolling.bind(this);
        
        this.enableCollapse = this.enableCollapse.bind(this);
        this.disableCollapse = this.disableCollapse.bind(this);

        this.callBack= this.callBack.bind(this);
    }	

    _getInitialState(){
        return {
            isPanelOpen:true,
            collapseState: false,
            date: new Date(),
            query:this.props.location.query,
            pageSize:this.props.location.query.pageSize || DEFAULT_PAGE_SIZE_OL,
            queryApplied:Object.keys(this.props.location.query).length ? true :false,
            totalSize:this.props.totalSize || null,
            selected_page: 1, 
            //query: null, 
            orderListRefreshed: null
            //date: new Date().getTime() //get time in milliseconds since midnight, 1970-01-01.
        }
    }

    componentWillUnmount() {
        clearInterval(this._intervalId);
        /**
         * It will update the last refreshed property of
         * overview details, so that updated subscription
         * packet can be sent to the server for data
         * update.
         */
         this.props.orderListRefreshed()
    }

    callBack(query){
        //alert("coming to newordersTab" + JSON.stringify(query));
        this._refreshList(this.props.location.query);
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

    _handlePageChange(e){
        // this.setState({
        //     pageSize:e.value,
        //     dataFetchedOnLoad:false
        // },function(){
        //     let _query =  Object.assign({},this.props.location.query);
        //     _query.pageSize = this.state.pageSize;
        //     _query.page = _query.page || 1;
        //     this.props.router.push({pathname: "/reports/operationsLog",query: _query})
        // })
        
    }

    componentWillReceiveProps(nextProps) {        
        if (nextProps.socketAuthorized && nextProps.orderListRefreshed && nextProps.location.query && (!this.state.query || (JSON.stringify(nextProps.location.query) !== JSON.stringify(this.state.query)))) {
            
            this.setState({query: JSON.parse(JSON.stringify(nextProps.location.query))});
            this.setState({orderListRefreshed: nextProps.orderListRefreshed})
            this._subscribeData();
            this._refreshList(nextProps.location.query,nextProps.orderSortHeaderState.colSortDirs)
        }
    }

    componentDidMount(){
    	console.log("component DId Mount get called");
        this._reqCutOffTime();
        //this._intervalId = setInterval(() => this._reqCutOffTime(), 1000);
    }

    _subscribeData() {
        let updatedWsSubscription=this.props.wsSubscriptionData;
        this.props.initDataSentCall(updatedWsSubscription["default"])
        this.props.updateSubscriptionPacket(updatedWsSubscription);
    }

    

    _refreshList(query,auditParam) {

        var auditbyUrl;
        let _query_params=[], _auditParamValue=[], _auditStatuses=[],_auditCretedBy=[],url="";
        if(query.fromDate){
            url=SEARCH_AUDIT_URL+AUDIT_START_TIME+"="+query.fromDate;
        }else{
            url=SEARCH_AUDIT_URL +AUDIT_START_TIME+"="+ addDateOffSet(new Date(), -30)
        }
         if(query.toDate)
        {
            _query_params.push([AUDIT_END_TIME, query.toDate].join("="))
        }
    //order TAGS
        if (query.orderTags && query.orderTags.constructor !== Array) {
            query.orderTags=[query.orderTags]
        }

        if (query.orderTags && query.orderTags.length=== 1) {
            _query_params.push([AUDIT_PARAM_TYPE, query.orderTags[0]].join("="))
         }
       
        else {
            _query_params.push([AUDIT_PARAM_TYPE, ANY].join("="))
        }

        // if (query.skuId || query.locationId) {

        //     if (query.skuId) {
        //         _auditParamValue.push(query.skuId)
        //     }
        //     if (query.locationId) {
        //         _auditParamValue.push(query.locationId)
        //     }

        //     _query_params.push([AUDIT_PARAM_VALUE, "['"+_auditParamValue.join("','")+"']"].join("="))
        // }
    //order STATUS
        if (query.status) {
            let _flattened_statuses=[]
            query.status=query.status.constructor===Array?query.status:[query.status]
            query.status.forEach(function (status) {
                _flattened_statuses.push(status.split("__"))
            })
            _auditStatuses=[].concat.apply([], _flattened_statuses)
            _query_params.push([AUDIT_STATUS,"['"+_auditStatuses.join("','")+"']" ].join("="))
        }

        if (query.orderId) {
            _query_params.push([FILTER_AUDIT_ID, query.orderId].join("="))
        }
        
        if (query.ppsId) {
            _query_params.push([FILTER_PPS_ID, query.ppsId].join("="))
        }

        if (query.skuId) {
            _query_params.push([FILTER_AUDIT_ID, query.skuId].join("="))
        }

        _query_params.push([GIVEN_PAGE,query.page||1].join("="))
        _query_params.push([GIVEN_PAGE_SIZE,20].join("="))

           if(auditParam && auditParam.sortDir){
            _query_params.push(['order',toggleOrder(auditParam.sortDir)].join("="));
            auditbyUrl=sortAuditHead[auditParam["columnKey"]];

        }
        else
        {
            if (auditParam){
                _query_params.push(['order',toggleOrder(auditParam[Object.keys(auditParam)])].join("="));
                auditbyUrl=sortAuditHead[Object.keys(auditParam)[0]];
            }else{
                auditbyUrl="";
            }
        }

        url=[url,_query_params.join("&")].join("&")
        url+=auditbyUrl;

        if (Object.keys(query).filter(function(el){return el!=='page'}).length !== 0) {
            this.props.toggleOrderFilter(true);
            this.props.filterApplied(true);
        } else {
            this.props.toggleOrderFilter(false);
            this.props.filterApplied(false);
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
        this.props.orderfilterState({
            tokenSelected: {
                "ORDER TAGS": query.orderTags ? (query.orderTags.constructor=== Array ? query.orderTags : [query.orderTags]) : [ANY],
                "STATUS": query.status ? (query.status.constructor=== Array ? query.status[0] : query.status) : [ANY]
            },
            searchQuery: {
                "PICK BEFORE TIME": query.pbt || '',
                "ORDER ID": query.orderId || '',
                "PPS ID": query.ppsId || '',
                "SKU ID": query.skuId || '',
                'FROM DATE':query.fromDate||'',
                'TO DATE':query.toDate||''
            },
            "PAGE": query.page || 1,
            defaultToken: {"ORDER TAGS": [ANY], "STATUS": [ANY]}
        });
        this.props.setOrderQuery({query:query})
        //this.props.getPageData(paginationData);

    }

    /**
     *
     */
     _clearFilter() {
        hashHistory.push({pathname: "/orders/orderlist", query: {}})
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

    _getTodayDate(){
    	const todayDate = (<FormattedDate 
                          value={new Date()}
                          day='2-digit'
                          month='short'
                          year='numeric'
                      	/>);
        return todayDate;
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

    _restartPolling=()=> {
        this._intervalId = setInterval(() => this._reqCutOffTime(), 1000);
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

    //To check where the object is empty or not

    

    onPageSizeChange(arg) {
        //this.refresh(null, arg);
    }

	render(){

        const ordersByStatus=[
            {value: '25', label: '25'},
            {value: '50', label: '50'},
            {value: '100', label: '100'},
            {value: '250', label: '250'},
            {value: '500', label: '500'},
            {value: '1000', label: '1000'}
        ];

        var orderDetail = ["1","2","3"];

        var {totalSize,pageSize} = this.state;
		var self = this;
		const todayDate = this._getTodayDate();
		const processedPbtData = this._processPBTs(this.props.pbts);
        const processedOrderData = this._processOrders(this.props.ordersPerPbt);
		let isPanelOpen = this.state.isPanelOpen;

        var timePeriod = self.props.location.query.time_period;
        var pageSizeDDDisabled = timePeriod === REALTIME ;
        var location = JSON.parse(JSON.stringify(self.props.location));
        var totalPage = Math.ceil(totalSize / pageSize);
		return (
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
                            />

                        {orderDetail ?
                            <div>
                                <FilterSummary total={orderDetail.length || 0} isFilterApplied={this.props.isFilterApplied}
                                responseFlag={this.props.responseFlag}
                                filterText={<FormattedMessage id="orderlist.filter.search.bar"
                                description='total order for filter search bar'
                                defaultMessage='{total} Orders found'
                                values={{total: orderDetail ? orderDetail.length : '0'}}/>}
                                refreshList={this._clearFilter.bind(this)}
                                refreshText={<FormattedMessage id="orderlist.filter.search.bar.showall"
                                description="button label for show all"
                                defaultMessage="Show all orders"/>}/></div> : null}

			    <div className="waveListWrapper">
                {(this.props.pbts.length !==0 ) ? 
				    (<GTable options={['table-bordered']}>
                        <GTableBody data={processedPbtData.pbtData}>
                    		{processedPbtData.pbtData ? processedPbtData.pbtData.map(function (row, idx) {
                        		return (
	                            	<Accordion getOrderPerPbt={self._reqOrderPerPbt} cutOffTimeId={idx} enableCollapse={self.enableCollapse} disableCollapse={self.disableCollapse} title={
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
            		</GTable>): <div style={{display:"flex", alignItems:"center", justifyContent: "center", minHeight: "450px", fontSize: "30px", color: "#666666"}}> No orders available </div>
                }
			  	</div>

                <div className="paginateWrapper">
                    <div className="paginateLeft">
                        <Dropdown 
                         options={pageSizeDDOpt} 
                         onSelectHandler={(e) => this._handlePageChange(e)}
                         disabled={pageSizeDDDisabled} 
                         selectedOption={DEFAULT_PAGE_SIZE_OL}/>
                    </div>
                    
                    <div className="paginateRight">
                    {this.state.query ?
                        <GorPaginateV2 location={this.props.location} currentPage={this.state.query.page||1} totalPage={this.props.orderData.totalPage ? 1 : totalPage}/> : null}
                    </div>
                </div>
			</div>
			)
	}
}


newordersTab.PropTypes={
    orderFulfilment: React.PropTypes.object,
    orderSummary: React.PropTypes.object,
    pbts: React.PropTypes.array,
    ordersPerPbt: React.PropTypes.array,
    getPageSizeOrders: React.PropTypes.func,
    showFilter: React.PropTypes.bool,
}

newordersTab.defaultProps = {
    orderFulfilment: {},
    orderSummary: {},
    pbts: [],
    ordersPerPbt: [],
    getPageData: React.PropTypes.func,
}

function mapStateToProps(state, ownProps) {
    return {
        orderFulfilment: state.orderDetails.orderFulfilment,
        orderSummary: state.orderDetails.orderSummary,
        pbts: state.orderDetails.pbts,
        ordersPerPbt: state.orderDetails.ordersPerPbt,
        orderData: state.getOrderDetail || {},

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
        //wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        orderListRefreshed: state.ordersInfo.orderListRefreshed,
        pageNumber:(state.filterInfo.orderFilterState)? state.filterInfo.orderFilterState.PAGE :1
    };
}

var mapDispatchToProps=function (dispatch) {
    return {
        setOrderListSpinner: function (data) {
            dispatch(setOrderListSpinner(data))
        },
        getPageData: function (data) {
            dispatch(getPageData(data));
        },
        showTableFilter: function (data) {
            dispatch(showTableFilter(data));
        },
        makeAjaxCall: function(params){
        	dispatch(makeAjaxCall(params))
        },
        orderListRefreshed: function (data) {
            dispatch(orderListRefreshed(data))
        },
        setOrderQuery: function (data) {
            dispatch(setOrderQuery(data));
        },
        toggleOrderFilter: function (data) {
            dispatch(toggleOrderFilter(data));
        },
        orderfilterState: function (data) {
            dispatch(orderfilterState(data));
        },
        filterApplied: function (data) {
            dispatch(filterApplied(data));
        },
        currentPage: function (data) {
            dispatch(currentPageOrders(data));
        },
        getPageSizeOrders: function (data) {
            dispatch(getPageSizeOrders(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(newordersTab) ;
