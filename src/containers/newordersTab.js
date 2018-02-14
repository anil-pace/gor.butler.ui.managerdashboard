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
            //date: new Date().getTime() //get time in milliseconds since midnight, 1970-01-01.
        }
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
        this.setState({
            pageSize:e.value,
            dataFetchedOnLoad:false
        },function(){
            let _query =  Object.assign({},this.props.location.query);
            _query.pageSize = this.state.pageSize;
            _query.page = _query.page || 1;
            this.props.router.push({pathname: "/reports/operationsLog",query: _query})
        })
        
    }

    componentWillReceiveProps(nextProps) {        
        // this.setState({
        //     isPanelOpen: true
        // })
    }

    componentDidMount(){
    	console.log("component DId Mount get called");
        this._reqCutOffTime();
        //this._intervalId = setInterval(() => this._reqCutOffTime(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this._intervalId);
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

	render(){

        const ordersByStatus=[
            {value: '25', label: '25'},
            {value: '50', label: '50'},
            {value: '100', label: '100'},
            {value: '250', label: '250'},
            {value: '500', label: '500'},
            {value: '1000', label: '1000'}
        ];

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

		return(
			<div>
			  	<OrderTile date={todayDate} 
                            orderFulfilData={this.props.orderFulfilment}
                            orderSummaryData={this.props.orderSummary}
                            collapseState={this.state.collapseState}
                            disableCollapse={this.disableCollapse}
                            />

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
                        <GorPaginateV2 disabled={pageSizeDDDisabled} location={location} currentPage={this.state.query.page||1} totalPage={isNaN(totalPage) ? 1 : totalPage}/>
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
}

newordersTab.defaultProps = {
    orderFulfilment: {},
    orderSummary: {},
    pbts: [],
    ordersPerPbt: []
}

function mapStateToProps(state, ownProps) {
    return {
        showFilter: state.filterInfo.filterState || false,
        orderFulfilment: state.orderDetails.orderFulfilment,
        orderSummary: state.orderDetails.orderSummary,
        pbts: state.orderDetails.pbts,
        ordersPerPbt: state.orderDetails.ordersPerPbt,
        orderData: state.getOrderDetail || {},
    };
}

var mapDispatchToProps=function (dispatch) {
    return {
        
        showTableFilter: function (data) {
            dispatch(showTableFilter(data));
        },
        makeAjaxCall: function(params){
        	dispatch(makeAjaxCall(params))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(newordersTab) ;
