/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
//import OrdersSubTab from '../components/subtab/ordersTabs';
import Tilex from '../components/tile2x/Tile2x';
//import Accordion from '../components/Accordion';
import {GTable} from '../components/gor-table-component/index'
import {GTableHeader,GTableHeaderCell} from '../components/gor-table-component/tableHeader';
import {GTableBody} from "../components/gor-table-component/tableBody";
import {GTableRow} from "../components/gor-table-component/tableRow";
import {FormattedMessage} from 'react-intl';

var items ={
	"pageId": "orders",
	"headingleft": "Order fulfuilment progress",
	"textleft": "No PPS running",
	"statusleft": "No products to be picked",
	"headingright": "Order summary",


}

class newordersTab extends React.Component{
	
	constructor(props) 
	{
    	super(props);
    	this.state={
    		todaysDate: ""
    	}
    	this.getTodaysDate = this.getTodaysDate.bind(this);
    	
    }	

    componentDidMount(){
    	this.getTodaysDate();
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
							{id:1, text: "SKU CODE", sortable: true}, 
							{id:2, text: "NAME", sortable: true},
							{id:3, text: "OPENING STOCK", searchable: false}, 
							{id:4, text: "PURCHAGE QTY", searchable: false}, 
							{id:5, text: "SALE QTY", sortable: true}, 
							{id:6, text: "CLOSING STOCK", sortable: true}
						]
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
				  		<div className="orderLeftProgressBar">Progress Bar </div>
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
							    <button className="ordersCollapseAll">
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
				  				<span> 0 Order(s) completed of 0 </span>
				  				<span> 0 Orderline(s) completed of 0 </span>
				  				<span> 0 Breached orders </span>
				  			</div>
				  			<div className="statusBottom">
				  				<span> 0 currently in progress </span>
				  				<span> 0 currently in progress </span>
				  				<span> 0 Breached orders completed</span>
				  			</div>
				  		</div>
				  	</div>
			  	</div>

			  </div>
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
			</div>
			)
	}
}

export default newordersTab ;
