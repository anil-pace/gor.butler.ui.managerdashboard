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

 viewAuditDetails(auditId) {
  modal.add(ViewDetailsAudit, {
    title: '',
    size: 'large',
       	            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
       	            hideCloseButton: true, // (optional) if you don't wanna show the top right close button
       	            auditId:auditId
                    //.. all what you put in here you will get access in the modal props ;),
                  });
}
startAudit(auditID) {
  modal.add(AuditStart, {
    title: '',
    size: 'large',
   closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
   hideCloseButton: true, // (optional) if you don't wanna show the top right close button
   auditID: auditID
   //.. all what you put in here you will get access in the modal props ;),
                      });
}  

_handelClick(field) {
  let auditId=field.currentTarget.id;
        console.log(auditId);
        console.log(field.target.value);
  if(field.target.value=='viewdetails'){
    this.viewAuditDetails(auditId);
  }else if(field.target.value=='mannualassignpps'){
    this.startAudit(auditId);
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
  rowObject.initialName={
    'name':itemsData[i].system_created_audit==true?"":itemsData[i].system_created_audit,
    'flag':itemsData[i].system_created_audit
  }
  rowObject.auditDetails={
      "header":[itemsData[i].id,itemsData[i].audit_name],
      "subHeader":[itemsData[i].pps_id,itemsData[i].auditBased,itemsData[i].totalTime]
      }
  rowObject.auditProgress={
   "percentage": this._findStatus(itemsData[i].progressStatus),
   "flag":(itemsData[i].progressStatus.total>=1)?true:false,
   "status":itemsData[i].status
  }
  rowObject.resolvedState=itemsData[i].lineResolveState;
  rowObject.button={
    "startButton":itemsData[i].button['audit_start_button']=='enable'?true:false,
    "resolveButton":itemsData[i].button['audit_resolve_button']=='enable'?true:false,
    "reAudit":itemsData[i].startTime && itemsData[i].endTime!=""?true:false
  }
  rowObject.butoonToSHow=[];
    rowObject.butoonToSHow.push({name:'View Details',value:'viewdetails'});
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
  {yd:3, text: "NAME",sortable: true, width:16,progressWidth:10}, 
  {td:4,text: "OPENING STOCK", searchable: false,width:20},
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
      return <div key={index} style={tableData[index].width?{flex:'1 0 '+tableData[index].width+"%",'overflow':'visible'}:{}} className="cell" >
      {index==0?<label className="container" style={{'margin-top': '15px','margin-left': '20px','visibility':visibilityStatus}}> <input type="checkbox" id={tablerowdata[idx]['auditDetails']['header'][0]} checked={(me.state.checkedAudit).indexOf(tablerowdata[idx]['auditDetails']['header'][0])==-1?'':true}  onChange={me.headerCheckChange.bind(me)}/><span className="checkmark"></span></label> :""}
      {index==0?tablerowdata[idx][text]['flag']!==true?<NameInitial name={tablerowdata[idx][text]['name']} shape='round'/>:<div className='systemGenerated'></div>:""}
      {index==1?<DotSeparatorContent header={tablerowdata[idx][text]['header']} subHeader={tablerowdata[idx][text]['subHeader']} separator={'.'} />:""} 
      {index==2?tablerowdata[idx][text]['flag']?<div style={{'text-align':'center','margin-top':'10px','font-size':'14px','color':'#333333'}}><ProgressBar progressWidth={tablerowdata[idx][text]['percentage']}/><div style={{'padding-top':'10px'}}>{tablerowdata[idx][text]['status']}</div></div>:<div style={{'text-align':'center','padding-top':'15px'}}>{tablerowdata[idx][text]['status']}</div>:""}
      {index==3?<div style={{'text-align':'center','padding-top': '18px','font-weight':'600','color':'#333333'}}>{tablerowdata[idx][text]}</div>:""}
      {index==4 && tablerowdata[idx][text].startButton && ((me.state.checkedAudit.length<=1)||(me.state.checkedAudit.length>1 && me.state.checkedAudit.indexOf(tablerowdata[idx]['auditDetails']['header'][0])==-1))?<ActionDropDown id={tablerowdata[idx]['auditDetails']['header'][0]} style={{width:'115px',display:'inline',float:'right',position:'relative'}} clickOptionBack={me._handelClick} data={[{name:'Auto Assign PPS',value:'autoassignpps'},{name:'Manual Assign PPS',value:'mannualassignpps'}]}>
      <button className="gor-add-btn gor-listing-button">
      START
      </button>      
      </ActionDropDown>:""}
       {index==4 && tablerowdata[idx][text].reAudit?<button className="gor-add-btn gor-listing-button">
      RE-AUDIT
      </button>:""}
      {index==4 && tablerowdata[idx][text].resolveButton?
      <button className="gor-add-btn gor-listing-button" style={{float:'right'}}>
      RESOLVE
      </button>:""}
       {index==5?<ActionDropDown style={{width:'110px'}} id={tablerowdata[idx]['auditDetails']['header'][0]} clickOptionBack={me._handelClick} data={tablerowdata[idx][text]}>
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