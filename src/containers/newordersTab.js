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
import ProgressBar from '../components/ProgressBar.js';
import Accordion from '../components/Accordion.js';
import ViewOrderLine from './neworderTab/viewOrderLine';
import {modal} from 'react-redux-modal';

var orderStrings ={
	"ordersCompleted": "Order(s) completed of",
	"orderLineCompleted": "Orderline(s) completed of",
	"breachedOrders": "Breached orders",
	"inProgress": "currently in progress"
}

class newordersTab extends React.Component{
	
	constructor(props) 
	{
    	super(props);
    	this.state={
    		todaysDate: "",
    		progressCount: 5
    	}
    	this.getTodaysDate = this.getTodaysDate.bind(this);
    	
    }	

    componentDidMount(){
    	this.getTodaysDate();
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

    getTodaysDate(){
    	let d = new Date();
    	let date = d.getDate();
    	let year = d.getFullYear();
    	let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getMonth()];
    	let currentDate = date + " " + month + " " + year; 
    	this.setState({
    		todaysDate : currentDate
    	})
    }

    
	render(){
		console.log("coming inside new orders Tab");
		var processedData=[
							{id: "Wave ID 001", text: "SKU CODE", sortable: true}, 
							{id: "Wave ID 002", text: "NAME", sortable: true},
							{id: "Wave ID 003", text: "OPENING STOCK", searchable: false}, 
							{id: "Wave ID 004", text: "PURCHAGE QTY", searchable: false}, 
							{id: "Wave ID 005", text: "SALE QTY", sortable: true}, 
							{id: "Wave ID 006", text: "CLOSING STOCK", sortable: true}
						];

	   var title = (
                    <GTableRow key={1} index={1} offset={processedData} max={processedData} data={processedData}>
                        <div key={1} style={processedData[0].width?{flex:'1 0 '+processedData[0].width+"%"}:{}} className="cell" > WAVE ROW 1
                            
                        </div>
                    </GTableRow>
			                        
	            );
		return(
			<div>
			  	<div className="orderTopWrapper">
				  	<div className="orderLeftWrapper">
				  		<div className="orderLeftContent">
					  		<div className="dateTimeWrapper">
					  			<span className="dateTime"> {this.state.todaysDate} </span>
					  		</div>
					  		<div className="orderLeftHeader"> 
					  			<FormattedMessage id="orders.progress" description="header of orders progress" defaultMessage="Order fulfuilment progress "/>
					  		</div>
					  		<ProgressBar progressWidth={this.state.progressCount}/>
					  		<div className="orderLeftStatus">
					  			<div className="statusLeft">
					  				<span> No PPS running </span>
					  			</div>
					  			<div className="statusRight">
					  				<span> No Products to be picked </span>
					  			</div>
					  		</div>
					  	</div>
				  	</div>

				  	<div className="orderCenterWrapper"> </div>

				  	<div className="orderRightWrapper">
				  		<div className="orderRightContent">
					  		<div className="orderButtonWrapper">
					  			<div className="gorButtonWrap">
								    <button className="ordersCollapseAll" onClick={this.viewOrderLine.bind(this)}>
								    <FormattedMessage id="orders.table.collapseAll" description="button label for collapse all" defaultMessage="COLLAPSE ALL "/>
								    </button>
							    </div>
								<div className="gorButtonWrap">
								    <button className="ordersFilterData">
								    <div className="gor-manage-task"/>
								    <FormattedMessage id="orders.tabel.filterLabel" description="button label for filter" defaultMessage="FILTER DATA"/>
								    </button>
								</div>
					  		</div>

					  		<div className="orderRightHeader"> 
					  			<FormattedMessage id="orders.summary" description="header of orders summary" defaultMessage="Order summary "/>
					  		</div>
					  		<div className="orderRightStatus">
					  			<div className="statusTop">
					  				<span> 0 {orderStrings.ordersCompleted} 0 </span>
					  				<span> 0 {orderStrings.orderLineCompleted} 0 </span>
					  				<span> 0 {orderStrings.breachedOrders} </span>
					  			</div>
					  			<div className="statusBottom">
					  				<span> 0 {orderStrings.inProgress} </span>
					  				<span> 0 {orderStrings.inProgress}</span>
					  				<span> 0 {orderStrings.breachedOrders} completed</span>
					  			</div>
					  		</div>
					  	</div>
				  	</div>
			    </div> 

			    <div className="waveListWrapper">
				    <GTable options={['table-bordered']}>
		                <GTableBody data={processedData} >
		                    {processedData ? processedData.map(function (row, idx) {
		                        return (
		                            <Accordion title="Wave Row 1">
		                            	<GTable options={['table-bordered']}>
							                <GTableBody data={processedData} >
							                    {processedData ? processedData.map(function (row, idx) {
							                        return (
							                            <GTableRow key={idx} index={idx} offset={processedData} max={processedData} data={processedData}>
							                                {Object.keys(row).map(function (text, index) {
							                                    return <div key={index} style={processedData[index].width?{flex:'1 0 '+processedData[index].width+"%"}:{}} className="cell" >
							                                        {text}
							                                    </div>
							                                })}
							                            </GTableRow>
							                        )
							                    }):""}
							                </GTableBody>
					            		</GTable>
					            	</Accordion>

		                        )
		                    }):""}
		                </GTableBody>
            		</GTable>
			        <Accordion title="Wave Row 2">   
			            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nemo harum voluptas aliquid rem possimus nostrum excepturi!
			            
			        </Accordion>
			  	</div>
			</div>
			)
	}
}

export default newordersTab ;
