import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Tile from '../../components/tile/tile.js';
import {GTable} from '../../components/gor-table-component/index'
import {GTableHeader,GTableHeaderCell} from '../../components/gor-table-component/tableHeader';
import {GTableBody} from "../../components/gor-table-component/tableBody";
import {GTableRow} from "../../components/gor-table-component/tableRow";
import { setCheckedAuditpps,setCheckedOtherpps} from '../../actions/auditActions';
import {userRequest} from '../../actions/userActions';
import DotSeparatorContent from '../../components/dotSeparatorContent/dotSeparatorContent';
import { GET_PPSLIST,START_AUDIT,GET,APP_JSON,POST } from '../../constants/frontEndConstants';
import { PPSLIST_URL,START_AUDIT_URL } from '../../constants/configConstants';

class AuditStart extends React.Component {
   constructor(props) {
      super(props);
      this.state={checkedAuditPPS:[]};
      this.state={checkedOtherPPS:[]};
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
 headerCheckChange(type,e){
     let ppslist=this.props.ppsList.pps_list;
   let arr=[];// this.props.checkedAudit
   if(type=='Audit'){
   if(e.currentTarget.checked)
   {
    Object.keys(ppslist).forEach(function(key) {
    if(ppslist[key].pps_mode=='audit')
         arr.push(ppslist[key].pps_id)
    });
  this.props.setCheckedAuditpps(arr);
}else
{
  this.props.setCheckedAuditpps([]);
}
   }
   else{
    if(e.currentTarget.checked)
   {
    Object.keys(ppslist).forEach(function(key) {
    if(ppslist[key].pps_mode!=='audit')
         arr.push(ppslist[key].pps_id)
})
    this.props.setCheckedOtherpps(arr);
   }
   else{
    this.props.setCheckedOtherpps([]);
   }
 }
}

 CheckChange(type,e){
   let arr=[];
  if(type=='Audit')
  {
  arr=this.props.checkedAuditPPSList;
  let a= arr.indexOf(e.currentTarget.id);
  (a==-1)?arr.push(e.currentTarget.id): arr.splice(a,1);
  this.props.setCheckedAuditpps(arr);
  }else
  {
  arr=this.props.checkedOtherPPSList;
  let a= arr.indexOf(e.currentTarget.id);
  (a==-1)?arr.push(e.currentTarget.id): arr.splice(a,1);
  this.props.setCheckedOtherpps(arr);
  }
  

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
     componentWillReceiveProps(nextProps){
      this.setState({'checkedAuditPPS':nextProps.checkedAuditPPSList});
      this.setState({'checkedOtherPPS':nextProps.checkedOtherPPSList});
    
       // if(!nextProps.auth_token)
       // {
       //   this._removeThisModal();
       // }
     }

   render() {
    let me=this;
    let items=this.props.ppsList.pps_list||{};
 let checkedAuditPPSCount=this.props.checkedAuditPPSList.length;
  let checkedOtherPPSCount=this.props.checkedOtherPPSList.length;
    let totalAuditPPSCount=0;
    let totalOtherPPSCount=0;
     Object.keys(items).forEach(function(key) {
    if(items[key].pps_mode=='audit')
        totalAuditPPSCount++;
     else{
      totalOtherPPSCount++;
     } 
    })


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
			{id:1,text: "SKU CODE", sortable: true,width:35}, 
			{id:2, text: "NAME",sortable: true,width:32}, 
      {id:3,text: "OPENING STOCK", searchable: false,width:32}

		];
      var tableDataother=[
      {id:1,text: "SKU CODE", sortable: true,width:35}, 
      {id:2, text: "NAME",sortable: true,width:65}, 
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
                                <label className="container" style={{'margin-left': '10px'}}> <input type="checkbox" checked={this.props.checkedAuditPPSList.length==0?'':true} onChange={me.headerCheckChange.bind(me,'Audit')}/>
                                 <span className={totalAuditPPSCount==checkedAuditPPSCount?"checkmark":"checkmark1"}></span>
                                </label>
                                       <span>{tablerowdataAudit.length} PPS in audit mode</span>
                                   </GTableHeaderCell>
                          
                       </GTableHeader>

                       <GTableBody data={tableData} >
                       {tablerowdataAudit ? tablerowdataAudit.map(function (row, idx) {
                           return (
                               
                               <GTableRow key={idx} index={idx} offset={tableData.offset} max={tableData.max} data={tableData} >
                             
                                   {Object.keys(row).map(function (text, index) {
                                       return <div key={index} style={tableData[index].width?{flex:'1 0 '+tableData[index].width+"%"}:{}} className="cell" >  
                                          {index==0?<label className="container" style={{'margin-top': '15px','margin-left': '10px'}}> <input type="checkbox" id={tablerowdataAudit[idx]['ppsDetails']['header'][0]} checked={(me.state.checkedAuditPPS).indexOf(tablerowdataAudit[idx]['ppsDetails']['header'][0])==-1?'':true} onChange={me.CheckChange.bind(me,'Audit')}/><span className="checkmark"></span></label> :""}
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
                                     <label className="container" style={{'margin-left': '10px'}}> <input type="checkbox" checked={this.props.checkedOtherPPSList.length==0?'':true}  onChange={me.headerCheckChange.bind(me,'other')}/>
                                     <span className={totalOtherPPSCount==checkedOtherPPSCount?"checkmark":"checkmark1"}></span></label>
                                            <span>{tablerowdataOther.length} PPS in other mode</span>
                                              
                                        </GTableHeaderCell>
                               
                            </GTableHeader>
     
                            <GTableBody data={tableData} >
                            {tablerowdataOther ? tablerowdataOther.map(function (row, idx) {
                                return (
                                    
                                    <GTableRow key={idx} index={idx} offset={tableData.offset} max={tableData.max} data={tableData} >
                                  
                                        {Object.keys(row).map(function (text, index) {
                                            return <div key={index} style={tableDataother[index].width?{flex:'1 0 '+tableDataother[index].width+"%"}:{}} className="cell" >  
                                                {index==0?<label className="container" style={{'margin-top': '15px','margin-left': '10px'}}> <input type="checkbox" id={tablerowdataOther[idx]['ppsDetails']['header'][0]} checked={(me.state.checkedOtherPPS).indexOf(tablerowdataOther[idx]['ppsDetails']['header'][0])==-1?'':true}  onChange={me.CheckChange.bind(me,'Other')}/><span className="checkmark"></span></label> :""}
                                                {index==0?<DotSeparatorContent header={tablerowdataOther[idx][text]['header']} subHeader={tablerowdataOther[idx][text]['subHeader']} separator={'.'} />:""} 
                                                {index==1?<div>Operator Assigned: {tablerowdataOther[idx][text]}</div>:""}
                                                
                                            </div>
                                        })}
                                     
                                    </GTableRow>
                                )

                            }):""}

                        </GTableBody>

                    </GTable>
                       <button className="gor-add-btn gor-listing-button">START
      </button>
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
      auth_token:state.authLogin.auth_token,
      checkedAuditPPSList:state.auditInfo.checkedAuditPPSList||[],
      checkedOtherPPSList:state.auditInfo.checkedOtherPPSList||[]
      

  };
}

var mapDispatchToProps=function(dispatch){
  return {
    userRequest: function(data){ dispatch(userRequest(data)); },
    setCheckedAuditpps: function (data) {dispatch(setCheckedAuditpps(data))},
    setCheckedOtherpps: function (data) {dispatch(setCheckedOtherpps(data))},
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(AuditStart);