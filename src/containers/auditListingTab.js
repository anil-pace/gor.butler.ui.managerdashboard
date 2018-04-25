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
 import {FormattedMessage,defineMessages} from 'react-intl';
 import ResolveAudit from './auditTab/resolveAudit';
 import NameInitial from '../components/NameInitial/nameInitial';
 import DotSeparatorContent from '../components/dotSeparatorContent/dotSeparatorContent';
 import ProgressBar from '../components/progressBar/progressBar.js';
 import ViewDetailsAudit from '../containers/auditTab/viewDetailsAudit';
 import AuditStart from '../containers/auditTab/auditStart';
 import ActionDropDown from '../components/actionDropDown/actionDropDown';
 import {modal} from 'react-redux-modal';
 import AuditAction from '../containers/auditTab/auditAction';
 import EditAudit from '../containers/auditTab/editAudit';  
 import {
    APP_JSON,
    GET,PAUSE_AUDIT,DELETE_AUDIT,CANCEL_AUDIT,AUDIT_DUPLICATE,START_AUDIT,POST,PUT,START_AUDIT_TASK
} from '../constants/frontEndConstants';
import {
   AUDIT_PAUSE_URL,CANCEL_AUDIT_URL,DELETE_AUDIT_URL,AUDIT_DUPLICATE_URL,START_AUDIT_URL
} from '../constants/configConstants'; 

const messages=defineMessages({
  alCancel: {
    id: "auditlisting.cancel.status",
    defaultMessage: "Cancel"
},
alDelete: {
    id: "auditlisting.delete.status",
    defaultMessage: "Delete"
},
alDuplicate: {
    id: "auditlisting.duplicate.prefix",
    defaultMessage: "Duplicate"
},
alResolve: {
    id: "auditlisting.resolve.status",
    defaultMessage: "Resolve"
},
alPause: {
  id: "auditlisting.pause.status",
  defaultMessage: "Pause"
},
alEdit: {
  id: "auditlisting.edit.status",
  defaultMessage: "Edit"
},
alViewDetails: {
  id: "auditlisting.viewdetails.status",
  defaultMessage: "View Details"
},
autoAssignPPS: {
  id: "auditlisting.label.autoassignpps",
  defaultMessage: "Auto Assign PPS"
},
manualAssignPPS: {
  id: "auditlisting.label.manualassignpps",
  defaultMessage: "Manually-Assign PPS"
},
startButton: {
  id: "auditlisting.label.startbutton",
  defaultMessage: "START"
},
reauditButton: {
  id: "auditlisting.label.reauditbutton",
  defaultMessage: "RE-AUDIT"
},
resolveButton: {
  id: "auditlisting.label.reolvebutton",
  defaultMessage: "RESOLVE"
}
});

 class auditListingTab extends React.Component{

   constructor(props) 
   {
    super(props);
    this._handelClick = this._handelClick.bind(this);
    this._handelResolveAudit = this._handelResolveAudit.bind(this);
    this.state={visibleMenu:false} ;
    this.state={checkedAudit:[]};
  }	

  headerCheckChange(e){
    let arr=this.props.checkedAudit;
  let a= arr.indexOf(e.currentTarget.id);
  (a==-1)?arr.push(e.currentTarget.id): arr.splice(a,1);
  this.props.setCheckedAudit(arr);
 }
 componentWillReceiveProps(nextProps){
  this.setState({'checkedAudit':nextProps.checkedAudit});
 }

 viewAuditDetails(auditId,displayId) {
  modal.add(ViewDetailsAudit, {
    title: '',
    size: 'large',
       	            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
       	            hideCloseButton: true, // (optional) if you don't wanna show the top right close button
       	            auditId:auditId,
                    displayId:displayId
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

_handelClick(field,id,displayId) {
  let auditId=id;
  if(field.target.value=='viewdetails'){
    this.viewAuditDetails(auditId,displayId);
  }else if(field.target.value=='pause'){
  this._pauseAudit(auditId,'pause');
  }else if(field.target.value=='cancel'){
    this._auditAction(auditId,CANCEL_AUDIT,displayId);
     }else if(field.target.value=='delete'){
    this._auditAction(auditId,DELETE_AUDIT,displayId);
  }else if(field.target.value=='duplicate'){
    this._duplicateAudit(auditId,'duplicate');
  }else if(field.target.value=='edit'){
    this._editAudit(auditId,'edit');
  }else if(field.target.value=='mannualassignpps'){
    this.startAudit(auditId);
  }else if(field.target.value=='autoassignpps'){
    this.startAuditAuto(auditId);
  }
}

_editAudit(auditId,param){
 modal.add(EditAudit, {
        title: '',
        size: 'large',
            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true, // (optional) if you don't wanna show the top right close button
            param:param,
            auditId:auditId
            //.. all what you put in here you will get access in the modal props ;),
        });
}
_duplicateAudit(auditId,param){
   modal.add(EditAudit, {
        title: '',
        size: 'large', // large, medium or small,
      closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: true,
      param:param,
      auditId:auditId
      });
}
_handelResolveAudit(event){
  let auditId=event.currentTarget.id;
  modal.add(ResolveAudit, {
    title: '',
    size: 'large', // large, medium or small,
    closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
    hideCloseButton: true,
    auditId: auditId,
    screenId: "APPROVE_AUDIT",
    auditType: auditId,
    auditMethod: 'pdfa'//"location or pdfa"
});
}




startAuditAuto(auditId){
  let formData={
    audit_id_list:(auditId).constructor.name!=="Array"?[auditId]:auditId,
    pps_list:[]
  }
      let auditData={
                'url':START_AUDIT_URL,
                'method':POST,
                'cause':START_AUDIT_TASK,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'formdata':formData,
                'token':sessionStorage.getItem('auth_token')
            }
      this.props.userRequest(auditData);
} 





_pauseAudit(auditId){
  let  audit_id=(auditId).constructor.name!=="Array"?auditId:auditId.toString();
      let auditData={
                'url':AUDIT_PAUSE_URL+audit_id,
                'method':PUT,
                'cause':PAUSE_AUDIT,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'token':sessionStorage.getItem('auth_token')
            }
      this.props.userRequest(auditData);
} 

 _auditAction(auditId,param,displayId){
  let data;
  let URL;
  let formdata={};
if(param==CANCEL_AUDIT){
  data=<FormattedMessage id='audit.cancel' 
                        defaultMessage="Are you sure want to cancel {auditId} audit?" description="Text for cancel"
                        values={{auditId:displayId}}/>
                      URL=CANCEL_AUDIT_URL;
                      formdata=auditId;
                      }
                      else if(param==DELETE_AUDIT)
                      {
  data=<FormattedMessage id='audit.delete' 
                        defaultMessage="Are you sure want to delete {auditId} audit?" description="Text for delete"
                        values={{auditId:displayId}}/>
                      URL=DELETE_AUDIT_URL;
                      formdata=auditId;
                      }              

      modal.add(AuditAction, {
        title: '',
        size: 'large', // large, medium or small,
      closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: false,
      data:data,
      param:param,
      formdata:formdata,  
      URL:URL
      });  
  } 

_findStatus(data)
{
 
return (Math.round(data.completed*100)/data.total);
}

_tableBodyData(itemsData){
  let alCancel = this.context.intl.formatMessage(messages.alCancel);
  let alDelete = this.context.intl.formatMessage(messages.alDelete);
  let alDuplicate = this.context.intl.formatMessage(messages.alDuplicate);
  let alResolve = this.context.intl.formatMessage(messages.alResolve);
  let alPause = this.context.intl.formatMessage(messages.alPause);
  let alEdit = this.context.intl.formatMessage(messages.alEdit);
  let alViewDetails = this.context.intl.formatMessage(messages.alViewDetails);

 
  let tableData=[];
  for(var i=0;i<itemsData.length;i++){
  let rowObject={};
  rowObject.initialName={
    'name':itemsData[i].system_created_audit==true?"":itemsData[i].system_created_audit,
    'flag':itemsData[i].system_created_audit
  }
  rowObject.auditDetails={
      "header":[itemsData[i].display_id,itemsData[i].audit_name],
      "subHeader":[itemsData[i].pps_id,itemsData[i].auditBased,itemsData[i].totalTime],
      "audit_id":itemsData[i].id
  }
  rowObject.auditProgress={
   "percentage": this._findStatus(itemsData[i].progressStatus),
   "flag":(itemsData[i].progressBarflag)?true:false,
   "status":itemsData[i].status
  }
  rowObject.resolvedState=itemsData[i].lineResolveState;
  rowObject.button={
    "startButton":itemsData[i].button['audit_start_button']=='enable'?true:false,
    "resolveButton":itemsData[i].button['audit_resolve_button']=='enable'?true:false,
    "reAudit":itemsData[i].button['audit_reaudit_button']=='enable'?true:false,
  }
  rowObject.butoonToSHow=[];
    rowObject.butoonToSHow.push({name:alViewDetails,value:'viewdetails'});
      if(itemsData[i].button['audit_cancel_button']=='enable'){
      rowObject.butoonToSHow.push({name:alCancel,value:'cancel'});
      }
      if(itemsData[i].button['audit_delete_button']=='enable'){
      rowObject.butoonToSHow.push({name:alDelete,value:'delete'});
      }
       if(itemsData[i].button['audit_duplicate_button']=='enable'){
      rowObject.butoonToSHow.push({name:alDuplicate,value:'duplicate'});
      }
      if(itemsData[i].button['audit_pause_button']=='enable'){
      rowObject.butoonToSHow.push({name:alPause,value:'pause'});
      }
      if(itemsData[i].button['audit_edit_button']=='enable'){
      rowObject.butoonToSHow.push({name:alEdit,value:'edit'});
      }
      
      

  tableData.push(rowObject);
  rowObject={};
}
return tableData;
} 


render(){
  let autoAssignPPS = this.context.intl.formatMessage(messages.autoAssignPPS);
  let manualAssignPPS = this.context.intl.formatMessage(messages.manualAssignPPS);
  let startButton = this.context.intl.formatMessage(messages.startButton);
  let reauditButton = this.context.intl.formatMessage(messages.reauditButton);
  let resolveButton = this.context.intl.formatMessage(messages.resolveButton);

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
   <GTable options={['table-bordered','table-auditListing']}>
  {tablerowdata && tablerowdata.length>=1?
   <GTableBody data={tablerowdata} >
   {tablerowdata ? tablerowdata.map(function (row, idx) {
    return (

    <GTableRow key={idx} index={idx} data={tablerowdata} >

    {Object.keys(row).map(function (text, index) {
      let visibilityStatus=tablerowdata[idx]['button'].startButton? 'visible':'hidden';
      return <div key={index} style={tableData[index].width?{flex:'1 0 '+tableData[index].width+"%",'overflow':'visible'}:{}} className="cell" >
      {index==0?<label className="container" style={{'margin-top': '15px','margin-left': '20px','visibility':visibilityStatus}}> <input type="checkbox" id={tablerowdata[idx]['auditDetails']['audit_id']} checked={(me.state.checkedAudit).indexOf(tablerowdata[idx]['auditDetails']['audit_id'])==-1?'':true}  onChange={me.headerCheckChange.bind(me)}/><span className="checkmark"></span></label> :""}
      {index==0?tablerowdata[idx][text]['flag']!==true?<NameInitial name={tablerowdata[idx][text]['name']} shape='round'/>:<div className='systemGenerated'></div>:""}
      {index==1?<DotSeparatorContent header={tablerowdata[idx][text]['header']} subHeader={tablerowdata[idx][text]['subHeader']} separator={'.'} />:""} 
      {index==2?tablerowdata[idx][text]['flag']?<div style={{'text-align':'center','margin-top':'10px','font-size':'14px','color':'#333333'}}><ProgressBar progressWidth={tablerowdata[idx][text]['percentage']}/><div style={{'padding-top':'10px'}}>{tablerowdata[idx][text]['status']}</div></div>:<div style={{'text-align':'center','padding-top':'15px'}}>{tablerowdata[idx][text]['status']}</div>:""}
      {index==3?<div style={{'text-align':'center','padding-top': '18px','font-weight':'600','color':'#333333'}}>{tablerowdata[idx][text]}</div>:""}
      {index==4 && tablerowdata[idx][text].startButton && ((me.state.checkedAudit.length<=1)||(me.state.checkedAudit.length>1 && me.state.checkedAudit.indexOf(tablerowdata[idx]['auditDetails']['audit_id'])==-1))?<div style={{'position':'relative'}}><ActionDropDown id={tablerowdata[idx]['auditDetails']['audit_id']} style={{float:'right'}} clickOptionBack={me._handelClick} data={[{name:manualAssignPPS,value:'mannualassignpps'}]}>      <button className="gor-add-btn gor-listing-button">
      {startButton}
       <div className="got-add-notch"></div>
      </button>      
      </ActionDropDown></div>:""}
       {/* {index==4 && tablerowdata[idx][text].reAudit?<button className="gor-add-btn gor-listing-button">
    {reauditButton}
      </button>:""} */}
    {index==4 && tablerowdata[idx][text].resolveButton?
      <button className="gor-add-btn gor-listing-button" id={tablerowdata[idx]['auditDetails']['audit_id']} style={{float:'right'}}   onClick={me._handelResolveAudit}>
      {resolveButton}
      </button>:""}
       {index==5?<ActionDropDown style={{right:0}} displayId = {tablerowdata[idx]['auditDetails']['header'][0]} id={tablerowdata[idx]['auditDetails']['audit_id']} clickOptionBack={me._handelClick} data={tablerowdata[idx][text]}>
      <div className='embeddedImage'></div>    
      </ActionDropDown>:""}

      </div>
    })}

    </GTableRow>
    )
  }):""}
  </GTableBody>:<div className="gor-Audit-no-data" style={{'background-color':'white'}}>
  <FormattedMessage id='audit.notfound'  defaultMessage="There are no audit to view. Create audit" description="audit not found"/>
  
  </div>}

  </GTable>
  </div>
  </div>
  )
}
}
auditListingTab.contextTypes={
  intl: React.PropTypes.object.isRequired
}
export default auditListingTab ;