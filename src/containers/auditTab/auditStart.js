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

   _tableAuditPPSData(itemsData){
  let tableData=[];
  for(var i=0;i<itemsData.length;i++){
  let rowObject={};
  rowObject.ppsDetails={
      "header":[itemsData[i].pps_id],
      "subHeader":[itemsData[i].pps_mode]
      }
  rowObject.assignOperator=itemsData[i].operator_assigned;
  rowObject.auditStatus={
      "header":[itemsData[i].audits_pending+' Audits pending'],
      "subHeader":[itemsData[i].auditlines_pending+ ' lines remaining to be Audited']
      }
  tableData.push(rowObject);
  rowObject={};
}
return tableData;
} 

   _tableotherPPSData(itemsData){
  let tableData=[];
  for(var i=0;i<itemsData.length;i++){
  let rowObject={};
  rowObject.ppsDetails={
      "header":[itemsData[i].pps_id],
      "subHeader":[itemsData[i].pps_mode]
      }
  rowObject.assignOperator=itemsData[i].operator_assigned;
  tableData.push(rowObject);
  rowObject={};
}
return tableData;
}
 headerCheckChange(){
   console.log('Print checked');
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
    let me=this;
    let items=this.props.ppsList.pps_list||{};
    let auditPPS=[],otherPPS=[];
   (Object.keys(items)).map(function(key) {
       if(items[key].pps_mode==='audit'){
        auditPPS.push(items[key]);
       }else{
        otherPPS.push(items[key]);
       }
  });
   var tablerowdataAudit=this._tableAuditPPSData(auditPPS);
  var tablerowdataOther=this._tableotherPPSData(otherPPS);




		var tableData=[
			{id:1,text: "SKU CODE", sortable: true}, 
			{id:2, text: "NAME",sortable: true}, 
      {id:3,text: "OPENING STOCK", searchable: false}

		];
      var tableDataother=[
      {id:1,text: "SKU CODE", sortable: true}, 
      {id:2, text: "NAME",sortable: true}, 
      {id:3,text: "OPENING STOCK", searchable: false}

    ];

      return (
         <div>
            <div className="gor-modal-content">


               <div className='gor-modal-body'>
               <span>For Audit DHTA 001 - iPhone</span>
               <span className="close" onClick={this._removeThisModal.bind(this)}>×</span>
              
              

                            <GTable options={['table-bordered','auditStart']}>
                   <GTableHeader options={['auditTable']}>   
                                <GTableHeaderCell key={1} header='Audit' className='audittable'>
                                <label className="container" style={{'margin-left': '10px'}}> <input type="checkbox"  onChange={me.headerCheckChange.bind(me)}/><span className="checkmark"></span></label>
                                       <span>{tablerowdataAudit.length} PPS in audit mode</span>
                                   </GTableHeaderCell>
                          
                       </GTableHeader>

                       <GTableBody data={tableData} >
                       {tablerowdataAudit ? tablerowdataAudit.map(function (row, idx) {
                           return (
                               
                               <GTableRow key={idx} index={idx} offset={tableData.offset} max={tableData.max} data={tableData} >
                             
                                   {Object.keys(row).map(function (text, index) {
                                       return <div key={index} style={tableData[index].width?{flex:'1 0 '+tableData[index].width+"%"}:{}} className="cell" >  
                                          {index==0?<label className="container" style={{'margin-top': '15px','margin-left': '10px'}}> <input type="checkbox"  onChange={me.headerCheckChange.bind(me)}/><span className="checkmark"></span></label> :""}
                                          {index==0?<DotSeparatorContent header={tablerowdataAudit[idx][text]['header']} subHeader={tablerowdataAudit[idx][text]['subHeader']} separator={'.'} />:""} 
                                          {index==1?<div>Operator Assigned: {tablerowdataAudit[idx][text]}</div>:""}
                                          {index==2?<DotSeparatorContent header={tablerowdataAudit[idx][text]['header']} subHeader={tablerowdataAudit[idx][text]['subHeader']} separator={'.'} />:""}     
                                          
                                       </div>
                                   })}
                                
                               </GTableRow>
                           )
                       }):""}
                   </GTableBody>
                  
               </GTable>
               <GTable options={['table-bordered']}>
                        <GTableHeader options={['auditTable']}>
                                     <GTableHeaderCell key={1} header='Audit' className='audittable'>
                                     <label className="container" style={{'margin-left': '10px'}}> <input type="checkbox"  onChange={me.headerCheckChange.bind(me)}/><span className="checkmark"></span></label>
                                            <span>{tablerowdataOther.length} PPS in other mode</span>
                                              
                                        </GTableHeaderCell>
                               
                            </GTableHeader>
     
                            <GTableBody data={tableData} >
                            {tablerowdataOther ? tablerowdataOther.map(function (row, idx) {
                                return (
                                    
                                    <GTableRow key={idx} index={idx} offset={tableData.offset} max={tableData.max} data={tableData} >
                                  
                                        {Object.keys(row).map(function (text, index) {
                                            return <div key={index} style={tableData[index].width?{flex:'1 0 '+tableData[index].width+"%"}:{}} className="cell" >  
                                                {index==0?<label className="container" style={{'margin-top': '15px','margin-left': '10px'}}> <input type="checkbox"  onChange={me.headerCheckChange.bind(me)}/><span className="checkmark"></span></label> :""}
                                                {index==0?<DotSeparatorContent header={tablerowdataOther[idx][text]['header']} subHeader={tablerowdataOther[idx][text]['subHeader']} separator={'.'} />:""} 
                                                {index==1?<div>Operator Assigned: {tablerowdataOther[idx][text]}</div>:""}
                                                
                                            </div>
                                        })}
                                     
                                    </GTableRow>
                                )
                            }):""}
                        </GTableBody>
                    </GTable>
                     </div>
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