import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Tile from '../../components/tile/tile.js';
import {GTable} from '../../components/gor-table-component/index'
import {GTableHeader,GTableHeaderCell} from '../../components/gor-table-component/tableHeader';
import {GTableBody} from "../../components/gor-table-component/tableBody";
import {GTableRow} from "../../components/gor-table-component/tableRow";
import {userRequest} from '../../actions/userActions';
import DotSeparatorContent from '../../components/dotSeparatorContent/dotSeparatorContent';
import { GET_PPSLIST,START_AUDIT,GET,APP_JSON,POST } from '../../constants/frontEndConstants';
import { PPSLIST_URL,START_AUDIT_URL } from '../../constants/configConstants';

class AuditStart extends React.Component {
   constructor(props) {
      super(props);
   }
   _removeThisModal() {
      this.props.removeModal();
   }

   _tableBodyData(itemsData){
  let tableData=[];
  for(var i=0;i<itemsData.length;i++){
  let rowObject={};
  rowObject.initialName=itemsData[i].system_created_audit==true?"System":itemsData[i].system_created_audit;
  rowObject.auditDetails={
      "header":[itemsData[i].id,itemsData[i].audit_name],
      "subHeader":[itemsData[i].pps_id,itemsData[i].auditBased,itemsData[i].startTime]
      }
  rowObject.auditProgress=this._findStatus(itemsData[i].progressStatus);
  rowObject.resolvedState=itemsData[i].unresolved +' lines to be resolved';
  rowObject.button={
    "startButton":itemsData[i].button['audit_start_button']=='enable'?true:false,
    "reAudit":itemsData[i].startTime && itemsData[i].endTime!="--"?true:false
  }

  tableData.push(rowObject);
  rowObject={};
}
return tableData;
} 

     componentDidMount(){
        let userData={
                'url':PPSLIST_URL,
                'method':GET,
                'cause':GET_PPSLIST,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'token':sessionStorage.getItem('auth_token')
            }
        this.props.userRequest(userData);
  }
   //   componentWillReceiveProps(nextProps){
   //     if(!nextProps.auth_token)
   //     {
   //       this._removeThisModal();
   //     }
   //   }

   render() {
    let items=this.props.ppsList.pps_list;
    let auditPPS=[],otherPPS=[];
   Object.keys(items).map(function(key) {
       if(items[key].pps_mode==='audit'){
        auditPPS.push(items[key]);
       }else{
        otherPPS.push(items[key]);
       }
  });
   var tablerowdataAudit=this._tableBodyData(auditPPS);
  var tablerowdataOther=this._tableBodyData(otherPPS);




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


               <div className='gor-modal-body'>
               <span>For Audit DHTA 001 - iPhone</span>
               <span className="close" onClick={this._removeThisModal.bind(this)}>×</span>
               </div>
              

                            <GTable options={['table-bordered','auditStart']}>
				    	
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
function mapStateToProps(state, ownProps){
  return {
      auditType:  state.auditInfo.auditType  || {},
      ppsList: state.auditInfo.ppsList  || [],
      auth_token:state.authLogin.auth_token
  };
}

var mapDispatchToProps=function(dispatch){
  return {
    userRequest: function(data){ dispatch(userRequest(data)); }
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(AuditStart);