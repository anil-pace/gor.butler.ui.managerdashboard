/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
 import React  from 'react';
 import {connect} from 'react-redux';
 import GTable from '../../components/gor-table-component'
 import {GTableHeader, GTableHeaderCell, GTableBody, GTableRow} from '../../components/gor-table-component'
 import {FormattedMessage,defineMessages} from 'react-intl';

 import NameInitial from '../../components/NameInitial/nameInitial';
 import DotSeparatorContent from '../../components/dotSeparatorContent/dotSeparatorContent';
 import ProgressBar from '../../components/progressBar/progressBar.js';
 import ActionDropDown from '../../components/actionDropDown/actionDropDown';
 import {modal} from 'react-redux-modal';
 import {graphql, withApollo, compose} from "react-apollo";
 import Dimensions from 'react-dimensions';


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
},
multiPPS:{
  id: "viewDetais.audit.multiPPS",
  defaultMessage: "Multi PPS"
}
});

 class ItemSearch extends React.Component{

   

render(){
  

  let me=this;
  var itemsData=me.props.items;
  var tablerowdata=[{"initialName":{"name":"admin admin","flag":"admin admin"},"auditDetails":{"header":[38,""],"subHeader":[["PPS 1"],"Single SKU","yesterday, 18:29"],"audit_id":"UmvjVRzWiP","display_id":38},"auditProgress":{"percentage":0,"flag":false,"status":"Waiting for the operator to login"},"Status":{"resolveStatus":"","reAuditStatus":"","approvedState":""},"button":{"startButton":false,"resolveButton":false,"reAudit":false},"butoonToSHow":[{"name":"View Details","value":"viewdetails"},{"name":"Cancel","value":"cancel"},{"name":"Duplicate","value":"duplicate"},{"name":"Pause","value":"pause"}]},{"initialName":{"name":"admin admin","flag":"admin admin"},"auditDetails":{"header":[37,""],"subHeader":[["PPS 5"],"Multi location","Dec 27, 15:05"],"audit_id":"SDod3kgYuY","display_id":37},"auditProgress":{"percentage":0,"flag":false,"status":"Processing audit task"},"Status":{"resolveStatus":"","reAuditStatus":"","approvedState":""},"button":{"startButton":false,"resolveButton":false,"reAudit":false},"butoonToSHow":[{"name":"View Details","value":"viewdetails"},{"name":"Cancel","value":"cancel"},{"name":"Duplicate","value":"duplicate"},{"name":"Pause","value":"pause"}]},{"initialName":{"name":"admin admin","flag":"admin admin"},"auditDetails":{"header":[36,""],"subHeader":["Multi PPS","Single SKU","Dec 27, 11:54"],"audit_id":"iGpKxPTKRw","display_id":36},"auditProgress":{"percentage":33.333333333333336,"flag":true,"status":"1 completed out of 3"},"Status":{"resolveStatus":"","reAuditStatus":"","approvedState":""},"button":{"startButton":false,"resolveButton":false,"reAudit":false},"butoonToSHow":[{"name":"View Details","value":"viewdetails"},{"name":"Cancel","value":"cancel"},{"name":"Duplicate","value":"duplicate"},{"name":"Pause","value":"pause"}]},{"initialName":{"name":"admin admin","flag":"admin admin"},"auditDetails":{"header":[35,""],"subHeader":[["PPS 4"],"Single SKU","Dec 26, 18:59 - 19:03"],"audit_id":"wzAxam7mVj","display_id":35},"auditProgress":{"percentage":100,"flag":false,"status":"Completed"},"Status":{"resolveStatus":"","reAuditStatus":"","approvedState":""},"button":{"startButton":false,"resolveButton":false,"reAudit":false},"butoonToSHow":[{"name":"View Details","value":"viewdetails"},{"name":"Duplicate","value":"duplicate"}]},{"initialName":{"name":"admin admin","flag":"admin admin"},"auditDetails":{"header":[33,""],"subHeader":[["PPS 4"],"Single location","Dec 20, 16:14"],"audit_id":"KscU3jyYFF","display_id":33},"auditProgress":{"percentage":0,"flag":false,"status":"Paused"},"Status":{"resolveStatus":"","reAuditStatus":"","approvedState":""},"button":{"startButton":true,"resolveButton":false,"reAudit":false},"butoonToSHow":[{"name":"View Details","value":"viewdetails"},{"name":"Duplicate","value":"duplicate"}]},{"initialName":{"name":"admin admin","flag":"admin admin"},"auditDetails":{"header":[32,""],"subHeader":[["PPS 4"],"Single location","Dec 20, 15:56 - 16:11"],"audit_id":"qxtjAPF4Fh","display_id":32},"auditProgress":{"percentage":100,"flag":false,"status":"Completed"},"Status":{"resolveStatus":"","reAuditStatus":"","approvedState":""},"button":{"startButton":false,"resolveButton":false,"reAudit":false},"butoonToSHow":[{"name":"View Details","value":"viewdetails"},{"name":"Duplicate","value":"duplicate"}]},{"initialName":{"name":"admin admin","flag":"admin admin"},"auditDetails":{"header":[31,""],"subHeader":[["PPS 4"],"Single location","Dec 20, 12:23 - 12:25"],"audit_id":"yG5ELy7MV3","display_id":31},"auditProgress":{"percentage":100,"flag":false,"status":"Completed"},"Status":{"resolveStatus":"","reAuditStatus":"","approvedState":""},"button":{"startButton":false,"resolveButton":false,"reAudit":false},"butoonToSHow":[{"name":"View Details","value":"viewdetails"},{"name":"Duplicate","value":"duplicate"}]},{"initialName":{"name":"admin admin","flag":"admin admin"},"auditDetails":{"header":[30,""],"subHeader":[["PPS 5"],"Single location","Dec 19, 18:12"],"audit_id":"KmC4LdEi67","display_id":30},"auditProgress":{"percentage":0,"flag":true,"status":"0 completed out of 1"},"Status":{"resolveStatus":"","reAuditStatus":"","approvedState":""},"button":{"startButton":false,"resolveButton":false,"reAudit":false},"butoonToSHow":[{"name":"View Details","value":"viewdetails"},{"name":"Cancel","value":"cancel"},{"name":"Duplicate","value":"duplicate"},{"name":"Pause","value":"pause"}]},{"initialName":{"name":"admin admin","flag":"admin admin"},"auditDetails":{"header":[29,""],"subHeader":[["PPS 4"],"Single location","Dec 19, 18:09 - 18:11"],"audit_id":"JWZoH2NXQt","display_id":29},"auditProgress":{"percentage":100,"flag":false,"status":"Completed"},"Status":{"resolveStatus":"","reAuditStatus":"","approvedState":""},"button":{"startButton":false,"resolveButton":false,"reAudit":false},"butoonToSHow":[{"name":"View Details","value":"viewdetails"},{"name":"Duplicate","value":"duplicate"}]},{"initialName":{"name":"admin admin","flag":"admin admin"},"auditDetails":{"header":[28,""],"subHeader":[["PPS 4"],"Single location","Dec 19, 18:05 - 18:08"],"audit_id":"dUxFvKiV6i","display_id":28},"auditProgress":{"percentage":100,"flag":false,"status":"Completed"},"Status":{"resolveStatus":"","reAuditStatus":"","approvedState":""},"button":{"startButton":false,"resolveButton":false,"reAudit":false},"butoonToSHow":[{"name":"View Details","value":"viewdetails"},{"name":"Duplicate","value":"duplicate"}]}];
  var tableData=[
  {class:"auditListColumn1Style"}, 
  {class:"auditListColumn2Style"}, 
  {class:"auditListColumn3Style",progressWidth:80}, 
  {class:"centerAligned auditListColumn4Style"},
  {class:"bothAligned auditListColumn4Style"},
  {class:"auditListColumn6Style"}
  ];
  return(

   <div>
               <div className="gorToolBar auditListingToolbar">
                <div className="gorToolBarWrap auditListingToolbarWrap">
                    <div className="auditHeaderContainer">
                        <label className="container">
                            <input type="checkbox" checked={true} onChange={null} />
                            <span className={"checkmark"}></span>
                        </label>
                        <span className='auditHeader'><FormattedMessage id="itemSearch.header.label"
                                description="header label for Item Search"
                                defaultMessage="Item Search" /></span>
                    </div>
                </div>

            </div>
   <div className="waveListWrapper">
   <GTable options={['table-bordered','table-itemsearch','table-auditListing']}>

{tablerowdata && tablerowdata.length>=1?
  <GTableBody data={tablerowdata}   onScrollHandler={null}>
   {tablerowdata ? tablerowdata.map(function (row, idx) {
    return (

    <GTableRow key={idx} index={idx} data={tablerowdata} >

    {Object.keys(row).map(function (text, index) {
            //let visibilityStatus=tablerowdata[idx]['button'].startButton && tablerowdata[idx]['auditDetails']['subHeader'][1]!=="Wall-to-Wall"? 'visible':'hidden';
      return <div key={index} style={null} className={"auditListColumn1Style cell"}>
      <label className="container checkBoxalign" style={{'visibility':"visible"}}> <input type="checkbox" id={"dummy"} checked={false}  onChange={null}/><span className="checkmark"></span></label> 
      <NameInitial name={"dummy"} shape='round'/>:<div title="System Generated" className='systemGenerated'></div>
      <DotSeparatorContent header={["himanshu"]} subHeader={["himanshu"]} separator={<div className="dotImage"></div>} /> 
      <div style={{'text-align':'left'}} className="fontstyleColumn"><ProgressBar progressBarWrapperWidth="150px" progressWidth={"10"}/><div style={{'padding-top':'10px'}}>{100}</div></div>:<div style={{'text-align':'left'}}>{"Dummy"}</div>
      <div className="column4Style"><div>{"Dummy"}</div> <div>{"Dummy"}</div><div>{"Dummy"}</div></div>
      <div style={{'position':'relative'}}><ActionDropDown id={"dummy"} style={{float:'right'}} clickOptionBack={null} data={[{name:"Himanshu",value:'mannualassignpps'}]}>      <button className="gor-add-btn gor-listing-button">

     
       <div className="got-add-notch"></div>
      </button>      
      </ActionDropDown></div>

      
      <button className="gor-add-btn gor-listing-button" id={"dummy"} style={{float:'right'}}   onClick={null}>
      
      </button>
       <ActionDropDown style={{right:0}} displayId = {"dummy"} id={"1"} clickOptionBack={null} data={[{name:"Himanshu",value:'mannualassignpps'}]}>
      <div className='embeddedImage'></div>    
      </ActionDropDown>

      </div>
  
    })}

    </GTableRow>
    )
  }):""}
  </GTableBody>:<div className="gor-no-data" >
  <FormattedMessage id='itemSearch.notfound'  defaultMessage="No Records Present" description="Item Search not found"/>
  
  </div>}

  </GTable>
  </div>
  </div>
  )
}
}

ItemSearch.contextTypes={
  intl: React.PropTypes.object.isRequired
}
export default ItemSearch ;

