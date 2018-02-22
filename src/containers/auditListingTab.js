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
 import Accordion from '../components/Accordian/accordian';
 import NameInitial from '../components/NameInitial/nameInitial';
 import DotSeparatorContent from '../components/dotSeparatorContent/dotSeparatorContent';
 import ProgressBar from '../components/progressBar/progressBar.js';
 import ViewDetailsAudit from '../containers/auditTab/viewDetailsAudit';
 import AuditStart from '../containers/auditTab/auditStart';
 import ActionDropDown from '../components/actionDropDown/actionDropDown';
 import {modal} from 'react-redux-modal';

 class auditListingTab extends React.Component{

   constructor(props) 
   {
    super(props);
    this._handelClick = this._handelClick.bind(this);
    this.state={visibleMenu:false} ;
    this.state={checkedAudit:[]};
  }	

  headerCheckChange(e){
    let arr=this.props.checkedAudit;
  let a= arr.indexOf(e.currentTarget.id);
  (a==-1)?arr.push(e.currentTarget.id): arr.splice(a,1);
  //console.log(this.state.checkedAudit);
  this.props.setCheckedAudit(arr);
    
    //console.log(e.currentTarget.checked);
    //console.log(e.currentTarget.id);
 }
 componentWillReceiveProps(nextProps){
  this.setState({'checkedAudit':nextProps.checkedAudit});
 }

 viewAuditDetails() {
  modal.add(ViewDetailsAudit, {
    title: '',
    size: 'large',
       	            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
       	            hideCloseButton: true // (optional) if you don't wanna show the top right close button
       	            //.. all what you put in here you will get access in the modal props ;),
                  });
}
startAudit() {
  modal.add(AuditStart, {
    title: '',
    size: 'large',
                        closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
                        hideCloseButton: true // (optional) if you don't wanna show the top right close button
                        //.. all what you put in here you will get access in the modal props ;),
                      });
}  

_handelClick(field) {
  if(field.target.value=='viewdetails'){
    this.viewAuditDetails();
  }else if(field.target.value=='mannualassignpps'){
    this.startAudit();
  }

}  

_findStatus(data)
{
return (Math.round(data.completed*100)/data.total);
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
  rowObject.butoonToSHow=[];
      if(itemsData[i].button['audit_cancel_button']=='enable'){
      rowObject.butoonToSHow.push({name:'Cancel',value:'cancel'});
      }
      if(itemsData[i].button['audit_delete_button']=='enable'){
      rowObject.butoonToSHow.push({name:'Delete',value:'delete'});
      }
       if(itemsData[i].button['audit_duplicate_button']=='enable'){
      rowObject.butoonToSHow.push({name:'Duplicate',value:'duplicate'});
      }
       if(itemsData[i].button['audit_resolve_button']=='enable'){
      rowObject.butoonToSHow.push({name:'Resolve',value:'Resolve'});
      }
       if(itemsData[i].button['audit_view_issues_button']=='enable'){
      rowObject.butoonToSHow.push({name:'View Details',value:'viewdetails'});
      }

  tableData.push(rowObject);
  rowObject={};
}
return tableData;
} 


render(){
  let me=this;
  var itemsData=me.props.items;
  var tablerowdata=this._tableBodyData(itemsData);
  var tableData=[
  {sd:1,text: "INITIL NAME", sortable: true,width:7}, 
  {sd:2,text: "SKU CODE", sortable: true,width:25}, 
  {yd:3, text: "NAME",sortable: true, width:20}, 
  {td:4,text: "OPENING STOCK", searchable: false,width:15},
  {rd:5,text: "PURCHAGE QTY", searchable: false,width:20},
  {ed:6,text: "PURCHAGE QTY", searchable: false,width:8}
  ];
  return(

   <div>

   <div className="waveListWrapper">
   <GTable options={['table-bordered']}>

   <GTableBody data={tablerowdata} >
   {tablerowdata ? tablerowdata.map(function (row, idx) {
    return (

    <GTableRow key={idx} index={idx} offset={tableData.offset} max={tableData.max} data={tablerowdata} >

    {Object.keys(row).map(function (text, index) {
      let visibilityStatus=tablerowdata[idx]['button'].startButton?'true':'hidden';
      return <div key={index} style={tableData[index].width?{flex:'1 0 '+tableData[index].width+"%"}:{}} className="cell" >
      {index==0?<label className="container" style={{'margin-top': '15px','margin-left': '10px','visibility':visibilityStatus}}> <input type="checkbox" id={tablerowdata[idx]['auditDetails']['header'][0]} checked={(me.state.checkedAudit).indexOf(tablerowdata[idx]['auditDetails']['header'][0])==-1?'':true}  onChange={me.headerCheckChange.bind(me)}/><span className="checkmark"></span></label> :""}
      {index==0?<NameInitial name={tablerowdata[idx][text]} shape='round' />:""} 
      {index==1?<DotSeparatorContent header={tablerowdata[idx][text]['header']} subHeader={tablerowdata[idx][text]['subHeader']} separator={'.'} />:""} 
      {index==2?<ProgressBar progressWidth={tablerowdata[idx][text]}/>:""}
      {index==3?<div>{tablerowdata[idx][text]}</div>:""}
      {(index==4) && tablerowdata[idx][text].startButton && ((me.state.checkedAudit.length<=1)||(me.state.checkedAudit.length>1 && me.state.checkedAudit.indexOf(tablerowdata[idx]['auditDetails']['header'][0])==-1))?<ActionDropDown style={{width:'115px',display:'inline',float:'right'}} clickOptionBack={me._handelClick} data={[{name:'Auto Assign PPS',value:'autoassignpps'},{name:'Manual Assign PPS',value:'mannualassignpps'}]}>
      <button className="gor-add-btn">
      Start
      </button>      
      </ActionDropDown>:""}
       {index==4 && tablerowdata[idx][text].reAudit?<button className="gor-add-btn">
      Reaudit
      </button>:""}
      {index==4 && !tablerowdata[idx][text].startButton?
      <button className="gor-add-btn" style={{float:'right'}}>
      Resolve
      </button>:""}
       {index==5?<ActionDropDown style={{width:'110px'}} clickOptionBack={me._handelClick} data={tablerowdata[idx][text]}>
      <div className='embeddedImage'></div>    
      </ActionDropDown>:""}

      </div>
    })}

    </GTableRow>
    )
  }):""}
  </GTableBody>

  </GTable>
  </div>
  </div>
  )
}
}
export default auditListingTab ;