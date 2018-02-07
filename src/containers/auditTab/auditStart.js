import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Tile from '../../components/tile/tile.js';
import {GTable} from '../../components/gor-table-component/index'
import {GTableHeader,GTableHeaderCell} from '../../components/gor-table-component/tableHeader';
import {GTableBody} from "../../components/gor-table-component/tableBody";
import {GTableRow} from "../../components/gor-table-component/tableRow";
import DotSeparatorContent from '../../components/dotSeparatorContent/dotSeparatorContent';

class ViewDetailsAudit extends React.Component {
   constructor(props) {
      super(props);
   }
   _removeThisModal() {
      this.props.removeModal();
   }
   //   componentWillReceiveProps(nextProps){
   //     if(!nextProps.auth_token)
   //     {
   //       this._removeThisModal();
   //     }
   //   }

   render() {
      var data={
         'Created By':'Raja Dey',
         'Operator':'Raaja DDey',
         'Audit Type':'Multi SKU'
      }
      var data1={
         'Start Time':'Today, 11:30',
         'End Time':'-',
         'Progress':'128 lines completed out of 514'
      }
      var data1={
         'PPS ID':'PPS 003',
         'Show KQ':'Yes',
         'Reminder':'-'
      }
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

      return (
         <div>
            <div className="gor-modal-content">
               <div className='gor-modal-head'>
                  <span className='orderIdWrapper'>
                     <FormattedMessage id="orders.orderId" description='Heading for view orderline' defaultMessage='Order ID' />
                  </span>
                  <span className="close" onClick={this._removeThisModal.bind(this)}>×</span>
               </div>

               <div className='gor-modal-body'>
               <span>For Audit DHTA 001 - iPhone</span>
               </div>
              

                            <GTable options={['table-bordered']}>
				    	
                   <GTableHeader options={['auditTable']}>
                           
                                <GTableHeaderCell key={1} header='Audit'>
                                       <span>7 SKUs in this Audit task</span>
                                         
                                   </GTableHeaderCell>
                          
                       </GTableHeader>

                       <GTableBody data={tableData} >
                       {tableData ? tableData.map(function (row, idx) {
                           return (
                               
                               <GTableRow key={idx} index={idx} offset={tableData.offset} max={tableData.max} data={tableData} >
                             
                                   {Object.keys(row).map(function (text, index) {
                                       return <div key={index} style={tableData[index].width?{flex:'1 0 '+tableData[index].width+"%"}:{}} className="cell" >  
                                          {index==0?<DotSeparatorContent header={['PPS 003']} subHeader={['Audit Mode']} separator={'.'} />:""} 
                                          {index==1?<div>Operator Assigned: Harish Yadav</div>:""}
                                          {index==2?<DotSeparatorContent header={['3 Attributes selected']} subHeader={['Red','128gb','Special Edition']} separator={'.'} />:""}     
                                          
                                       </div>
                                   })}
                                
                               </GTableRow>
                           )
                       }):""}
                   </GTableBody>
                  
               </GTable>
               <GTable options={['table-bordered']}>
				    	
                        <GTableHeader options={['auditTable']}>
                                
                                     <GTableHeaderCell key={1} header='Audit'>
                                            <span>7 SKUs in this Audit task</span>
                                              
                                        </GTableHeaderCell>
                               
                            </GTableHeader>
     
                            <GTableBody data={tableData} >
                            {tableData ? tableData.map(function (row, idx) {
                                return (
                                    
                                    <GTableRow key={idx} index={idx} offset={tableData.offset} max={tableData.max} data={tableData} >
                                  
                                        {Object.keys(row).map(function (text, index) {
                                            return <div key={index} style={tableData[index].width?{flex:'1 0 '+tableData[index].width+"%"}:{}} className="cell" >  
                                                {index==0?<DotSeparatorContent header={['PPS 003']} subHeader={['Audit Mode']} separator={'.'} />:""} 
                                                {index==1?<div>Operator Assigned: Harish Yadav</div>:""}
                                                
                                            </div>
                                        })}
                                     
                                    </GTableRow>
                                )
                            }):""}
                        </GTableBody>
                       
                    </GTable>






            </div>

         </div>
      );
   }
}
export default ViewDetailsAudit;