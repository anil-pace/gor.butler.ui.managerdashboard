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

   constructor(props) {
    super(props);
     
  } 

render(){
  

  let me=this;
  var itemsData=me.props.items;
  var tablerowdata=[]
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

   <div className="waveListWrapper">
   <GTable options={['table-bordered','table-itemsearch']}>

{tablerowdata && tablerowdata.length>=1?
  <GTableBody data={tablerowdata}   onScrollHandler={null}>
   {tablerowdata ? tablerowdata.map(function (row, idx) {
    return (

    <GTableRow key={idx} index={idx} data={tablerowdata} >

    {Object.keys(row).map(function (text, index) {
      let visibilityStatus=tablerowdata[idx]['button'].startButton && tablerowdata[idx]['auditDetails']['subHeader'][1]!=="Wall-to-Wall"? 'visible':'hidden';
  
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

