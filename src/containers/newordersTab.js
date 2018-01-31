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
import OrderTile from '../components/OrderTile';



class newordersTab extends React.Component{
	
	constructor(props) 
	{
    	super(props);
    }	

	render(){
		console.log("coming inside new orders Tab");
		var processedData=[	
			{columnId: "1", headerText: "WaveId"},
			{columnId: "2", headerText: "ProgressBar"},
			{columnId: "3", headerText: "Cut off Time"},
			{columnId: "4", headerText: "Icon"}
		];

		var tableData=[
			{id:1,text: "SKU CODE", sortable: true, icon: true}, 
			{id:2, text: "NAME",sortable: true,  icon: true}, 
            {id:3,text: "OPENING STOCK", searchable: false, icon: true},
            {id:4,text: "PURCHAGE QTY", searchable: false, icon: true},
            {id:5,text: "SALE QTY",sortable: true, icon: true}, 
            {id:6, text: "CLOSING STOCK",sortable: true, icon: true}

		];
		return(
			<div>
			  	<OrderTile />
			    <div className="waveListWrapper">
				    <GTable options={['table-bordered']}>
				    	<Accordion title={
				    		<GTableHeader>
		                        {processedData.map(function (header, index) {
		                            return <GTableHeaderCell key={index} header={header}>
		                                    <span>{header.headerText}</span>
		                                </GTableHeaderCell>
		                    	})}
		                    </GTableHeader>}> 

		                    <GTableBody data={tableData} >
                                {tableData ? tableData.map(function (row, idx) {
                                    return (
                                        <GTableRow key={idx} index={idx} offset={tableData.offset} max={tableData.max} data={tableData}>
                                            {Object.keys(row).map(function (text, index) {
                                                return <div key={index} style={tableData[index].width?{flex:'1 0 '+tableData[index].width+"%"}:{}} className="cell" >
                                                    {text}
                                                </div>
                                            })}
                                        </GTableRow>
                                    )
                                }):""}
                            </GTableBody>
		                </Accordion>
            		</GTable>
			  	</div>
			</div>
			)
	}
}
export default newordersTab ;
