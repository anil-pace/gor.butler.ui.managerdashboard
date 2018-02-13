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
import {FormattedMessage} from 'react-intl';
import Accordion from '../components/accordion/accordion';
import OrderTile from '../containers/neworderTab/OrderTile';
import ViewOrderLine from '../containers/neworderTab/viewOrderLine';
import {modal} from 'react-redux-modal';
import ProgressBar from '../components/progressBar/progressBar';
import {showTableFilter} from '../actions/filterAction';
import DotSeparatorContent from '../components/dotSeparatorContent/dotSeparatorContent';
import Spinner from '../components/spinner/Spinner';
import { makeAjaxCall } from '../actions/ajaxActions';
import { ORDERS_FULFIL_FETCH, GET, ORDERS_SUMMARY_FETCH} from '../constants/frontEndConstants';


	var wData = [
		{cutofftime: "CUT OFF TIME 1", timeLeft: "1 hrs left", progressBar: "5", totalOrder: "Total orders 1111"},
		{cutofftime: "CUT OFF TIME 2", timeLeft: "2 hrs left", progressBar: "10", totalOrder: "Total orders 2"},
		{cutofftime: "CUT OFF TIME 3", timeLeft: "3 hrs left", progressBar: "Pending", totalOrder: "Total orders 3"},
		{cutofftime: "CUT OFF TIME 4", timeLeft: "4 hrs left", progressBar: "Pending", totalOrder: "Total orders 4"},
		{cutofftime: "CUT OFF TIME 5", timeLeft: "5 hrs left", progressBar: "0", totalOrder: "Total orders 5"}
	];

	var oData = [
		{orderId: "ORDER 123", subOrderId: "PPS005", binId:"Bin 07", progressBar: "5", action: true},
		{orderId: "ORDER 321", subOrderId: "PPS005", binId:"Bin 07", progressBar: "pending", action: false},
		{orderId: "ORDER 456", subOrderId: "PPS005", binId:"Bin 07", progressBar: "1", action: true},
		{orderId: "ORDER 654", subOrderId: "PPS005", binId:"Bin 07", progressBar: "70", action: false},
	];

class newordersTab extends React.Component{
	
	constructor(props) 
	{
    	super(props);
    	this.state={
    		isPanelOpen:true
    	}
    	this.viewOrderLine = this.viewOrderLine.bind(this);
    	this.collapseAll = this.collapseAll.bind(this);
    	this.resetCollapseAll = this.resetCollapseAll.bind(this);
    }	

    collapseAll = () => {
    	this.setState({
    		isPanelOpen: false
    	});
    }

    resetCollapseAll = () => {
    	this.setState({
    		isPanelOpen: true
    	});
    	console.log("resetCollapseAll is being called" );
    }

    componentWillReceiveProps(nextProps) {        
        this.setState({
            isPanelOpen: true
        })
    }

    componentDidMount(){
    	console.log("component DId Mount get called");
        this._getOrdersFulfilment(this.props);
        this._getOrdersSummary(this.props);
    }

    _getOrdersFulfilment(props){
    	console.log("_getOrdersFulfilment get called");
        //this.props.setReportsSpinner(true);
        let params={
            //'url':STORAGE_SPACE_URL,
            //'method':GET,
            //'contentType':APP_JSON,
            //'accept':APP_JSON,
            'cause':ORDERS_FULFIL_FETCH,
            //'token': this.props.auth_token
        }
        this.props.makeAjaxCall(params);
    }

    _getOrdersSummary(props){
    	console.log("_getOrdersSummary get called");
        //this.props.setReportsSpinner(true);
        let params={
            //'url':STORAGE_SPACE_URL,
            //'method':GET,
            //'contentType':APP_JSON,
            //'accept':APP_JSON,
            'cause':ORDERS_SUMMARY_FETCH,
            //'token': this.props.auth_token
        }
        this.props.makeAjaxCall(params);
    }

    _processData = () => {
		let wDataLen = wData.length; let oDataLen = oData.length;
		let waveRows = []; let orderRows = [];
		let processedData = {};

		if(wDataLen){
			for(let i =0 ; i < wDataLen; i++){
				let waveRow = [];
				waveRow.push(<DotSeparatorContent header={[wData[i].cutofftime]} subHeader={[wData[i].timeLeft]} />);
					{/*<div style={{padding: "2px 35px"}} className="cellWrapper">
								<div className="mainTitle">{wData[i].cutofftime}</div>
								<div className="subTitle">{wData[i].timeLeft}</div>
							</div>*/}
							
				waveRow.push(<div style={{width: "50%"}} className="cellWrapper"> <ProgressBar progressWidth={wData[i].progressBar}/> </div> );
				waveRow.push(<div className="cellWrapper">
								<span> {wData[i].totalOrder} </span>
							</div>);
				waveRows.push(waveRow);
			}
			processedData.waveData = waveRows;
		}
		
		if(oDataLen){
			for(let i=0; i < oDataLen; i++){
				let orderRow = [];
				orderRow.push(<DotSeparatorContent header={[oData[i].orderId]} subHeader={[oData[i].subOrderId, oData[i].binId]} />);
				orderRow.push(<div style={{width: "50%"}}> <ProgressBar progressWidth={oData[i].progressBar}/> </div>);
				if(oData[i].action === true){
					orderRow.push(<div key={i} className="gorButtonWrap" onClick={this.viewOrderLine.bind(this)}>
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
        processedData.max= waveRows.length;
		return processedData;
	}

    viewOrderLine = () =>  {
	    modal.add(ViewOrderLine, {
	        title: '',
	        size: 'large',
	            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
	            hideCloseButton: true // (optional) if you don't wanna show the top right close button
	            //.. all what you put in here you will get access in the modal props ;),
	        });
  	}

	render(){
		var self = this;
		var processedData = this._processData();
		let isPanelOpen = this.state.isPanelOpen;
		console.log("isPanelOpen" + isPanelOpen);
		return(
			<div>
			  	<OrderTile contractAll={this.collapseAll.bind(this)}/>

			    <div className="waveListWrapper">
				    <GTable options={['table-bordered']}>
                            <GTableBody data={processedData.waveData}>
                        		{processedData.waveData ? processedData.waveData.map(function (row, idx) {
                            		return (
		                            	<Accordion resetCollapseAll={self.resetCollapseAll} title={
			                                <GTableRow style={{background: "#fafafa"}} key={idx} index={idx} offset={processedData.offset} max={processedData.max} data={processedData.waveData}>
			                                    {row.map(function (text, index) {
			                                        return <div key={index} style={processedData.waveData[index]?{flex:'1 0 '+processedData.waveData[index].width+"%"}:{}} className="cell" >
			                                            {text}
			                                        </div>
			                                    })}
			                                </GTableRow>}>
			                                {isPanelOpen === true ?
				                                (<GTableBody data={processedData.orderData} >
					                                {processedData.orderData ? processedData.orderData.map(function (row, idx) {
					                                    return (
					                                        <GTableRow key={idx} index={idx} offset={processedData.offset} max={processedData.max} data={processedData.orderData}>
					                                            {Object.keys(row).map(function (text, index) {
					                                                return <div key={index} style={processedData.orderData[index]?{flex:'1 0 '+processedData.orderData[index].width+"%"}:{}} className="cell" >
					                                                    {row[text]}
					                                                </div>
					                                            })}
					                                        </GTableRow>
					                                    )
					                                }):""}
		                            			</GTableBody>) : null }
	                            		</Accordion> 
                            		)
                        		}):""}
                    		</GTableBody>
            		</GTable>
			  	</div>
			</div>
			)
	}
}


newordersTab.PropTypes={
    orderFulfilment: React.PropTypes.array,
}

newordersTab.defaultProps = {
    orderFulfilment: []
}

function mapStateToProps(state, ownProps) {
    return {
        showFilter: state.filterInfo.filterState || false,
        orderFulfilment: state.orderDetails.orderFulfilment,
        orderSummary: state.orderDetails.orderSummary
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
