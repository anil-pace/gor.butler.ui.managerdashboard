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
				  			<span className="dateTime"> Today's Date time </span>
				  		</div>
				  		<div className="orderLeftHeader"> Order fulfilment progress </div>
				  		<div className="orderLeftProgressBar">Progress Bar </div>
				  		<div className="orderLeftBottom">
				  			<div className="bottomLeft">
				  				<span> No PPS running </span>
				  			</div>
				  			<div className="bottomRight">
				  				<span> No Products to be picked </span>
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
