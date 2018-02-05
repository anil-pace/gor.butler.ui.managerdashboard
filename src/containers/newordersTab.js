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
import Accordion from '../components/accordion';
import OrderTile from '../containers/neworderTab/OrderTile';
import ViewOrderLine from '../containers/neworderTab/viewOrderLine';
import {modal} from 'react-redux-modal';
import ProgressBar from '../components/progressBar';
import {showTableFilter} from '../actions/filterAction';

	var wData = [
		{cutofftime: "CUT OFF TIME 1", timeLeft: "1 hrs left", progressBar: "5", totalOrder: "Total orders 1111"},
		{cutofftime: "CUT OFF TIME 2", timeLeft: "2 hrs left", progressBar: "10", totalOrder: "Total orders 2"},
		{cutofftime: "CUT OFF TIME 3", timeLeft: "3 hrs left", progressBar: "Pending", totalOrder: "Total orders 3"},
		{cutofftime: "CUT OFF TIME 4", timeLeft: "4 hrs left", progressBar: "Pending", totalOrder: "Total orders 4"},
		{cutofftime: "CUT OFF TIME 5", timeLeft: "5 hrs left", progressBar: "0", totalOrder: "Total orders 5"}
	];

	var oData = [
		{orderId: "ORDER 123", progressBar: "5", totalOrder: "Total orders 1", action: true},
		{orderId: "ORDER 321", progressBar: "pending", totalOrder: "Total orders 1", action: false},
		{orderId: "ORDER 456", progressBar: "1", totalOrder: "Total orders 1", action: true},
		{orderId: "ORDER 654", progressBar: "70", totalOrder: "Total orders 1", action: false},
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
    }	

    collapseAll(data){
    	console.log("collapseAll is being called");
    	this.setState({
    		isPanelOpen: data
    	});
    }

    componentWillReceiveProps(nextProps) {        
        this.setState({
            isPanelOpen: true
        })
    }

    _processData(){
		let wDataLen = wData.length; let oDataLen = oData.length;
		let waveRows = []; let orderRows = [];
		let processedData = {};

		if(wDataLen){
			for(let i =0 ; i < wDataLen; i++){
				let waveRow = [];
				waveRow.push(<div style={{padding: "2px 35px"}} className="cellWrapper">
								<div className="mainTitle">{wData[i].cutofftime}</div>
								<div className="subTitle">{wData[i].timeLeft}</div>
							</div>);
				waveRow.push(<div style={{width: "50%"}} className="cellWrapper"> <ProgressBar progressWidth={wData[i].progressBar}/> </div> );
				waveRow.push(<div className="cellWrapper">
								<span> {wData[i].totalOrder} </span>
							</div>);
				//waveRow.push(wData[i].action);
				waveRows.push(waveRow);
			}
			processedData.waveData = waveRows;
		}
		
		if(oDataLen){
			for(let i=0; i < oDataLen; i++){
				let orderRow = [];
				orderRow.push(<div style={{padding: "2px 35px"}}> {oData[i].orderId} </div>);
				orderRow.push(<div className="cellWrapper"> <ProgressBar progressWidth={oData[i].progressBar}/> </div>);
				orderRow.push(oData[i].totalOrder);
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

    viewOrderLine() {
	    modal.add(ViewOrderLine, {
	        title: '',
	        size: 'large',
	            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
	            hideCloseButton: true // (optional) if you don't wanna show the top right close button
	            //.. all what you put in here you will get access in the modal props ;),
	        });
  	}

	render(){
		var processedData = this._processData();
		let isPanelOpen = this.state.isPanelOpen;
		return(
			<div>
			  	<OrderTile contractAll={this.collapseAll.bind(this)}/>

			    <div className="waveListWrapper">
				    <GTable options={['table-bordered']}>
                            <GTableBody data={processedData.waveData}>
                        		{processedData.waveData ? processedData.waveData.map(function (row, idx) {
                            		return (
		                            	<Accordion title={
			                                <GTableRow key={idx} index={idx} offset={processedData.offset} max={processedData.max} data={processedData.waveData}>
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

function mapStateToProps(state, ownProps) {
    return {
        showFilter: state.filterInfo.filterState || false,
    };
}

var mapDispatchToProps=function (dispatch) {
    return {
        showTableFilter: function (data) {
            dispatch(showTableFilter(data));
        }
    }
};


newordersTab.PropTypes={
    showFilter: React.PropTypes.bool,
}

export default connect(mapStateToProps, mapDispatchToProps)(newordersTab) ;
