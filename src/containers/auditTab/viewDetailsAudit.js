import React from 'react';
import { FormattedMessage,defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import Tile from '../../components/tile/tile.js';
import GTable from '../../components/gor-table-component/index'
import {GTableHeader,GTableHeaderCell} from '../../components/gor-table-component/tableHeader';
import {GTableBody} from "../../components/gor-table-component/tableBody";
import {GTableRow} from "../../components/gor-table-component/tableRow";
import {getDaysDiff} from '../../utilities/getDaysDiff';
import DotSeparatorContent from '../../components/dotSeparatorContent/dotSeparatorContent';
import SearchFilter from '../../components/searchFilter/searchFilter';
import AuditStart from '../../containers/auditTab/auditStart';
import {modal} from 'react-redux-modal';
import Spinner from '../../components/spinner/Spinner';
import {graphql, withApollo, compose} from "react-apollo";
import {ShowError} from '../../../src/utilities/ErrorResponseParser';
import gql from 'graphql-tag'
import { notifyfeedback,notifyFail } from '../../actions/validationActions';
import { setNotification } from '../../actions/notificationAction';
import {AUDIT_DETAILS_QUERY,AUDIT_DETAILS_SUBSCRIPTION_QUERY} from './query/serverQuery';
import {auditViewSpinnerState} from './query/clientQuery';

const messages = defineMessages({
  vdMultiSKU: {
      id: "viewDetais.multisku.status",
      defaultMessage: "Multi SKU"
  },
  vdSingleSKU: {
      id: "viewDetais.singlesku.status",
      defaultMessage: "Single SKU"
  },
  vdMultiLocation: {
      id: "viewDetais.multilocation.prefix",
      defaultMessage: "Multi Location"
  },
  vdSingleLocation: {
      id: "viewDetais.singlelocation.status",
      defaultMessage: "Single Location"
  },
  vdLinesCompleted: {
      id: "viewDetais.linescompleted.status",
      defaultMessage: "lines completed out of"
  },
  vdAttrSelected: {
      id: "viewDetais.attrselected.status",
      defaultMessage: "attributes selected"
  },
  vdNoAttrSelected: {
      id: "viewDetais.noattrselected.status",
      defaultMessage: "No attributes selected"
  },
  vdNoInventory: {
      id: "viewDetais.noinventory.status",
      defaultMessage: "No inventory found"
  },
  vdMissingOut: {
      id: "viewDetais.missing.status",
      defaultMessage: "missing out of"
  },
  vdExtraFound:{
    id: "viewDetais.extra.status",
    defaultMessage: "extra entitiy found"
  },
  vdItems: {
      id: "viewDetais.items.status",
      defaultMessage: "items"
  },
  vdChangePPS: {
    id: "viewDetais.changepps.status",
    defaultMessage: "Change PPS"
},
vdSearchBySKU: {
  id: "viewDetais.searchbysku.status",
  defaultMessage: "Search by SKU or PDFA"
},
pps: {
  id: "viewDetais.pps.prefix",
  defaultMessage: "PPS "
},
audit: {
  id: "viewDetais.audit.header",
  defaultMessage: "Audit"
},
auditTask: {
  id: "viewDetais.audit.audittask",
  defaultMessage: "in this Audit task"
},
vdhCreatedBy: {
  id: "viewDetais.createdby.status",
  defaultMessage: "Created By"
},
vdhOperator: {
  id: "viewDetais.operator.status",
  defaultMessage: "Operator"
},
vdhAuditType: {
  id: "viewDetais.audittype.status",
  defaultMessage: "Audit Type"
},
vdhPPSid: {
id: "viewDetais.ppsid.status",
defaultMessage: "PPS ID"
},
vdhShowKQ: {
id: "viewDetais.showkq.status",
defaultMessage: "Show KQ"
},
vdhReminder: {
id: "viewDetais.audit.Reminder",
defaultMessage: "Reminder"
},
vdhStartTime: {
id: "viewDetais.audit.starttime",
defaultMessage: "Start time"
},
vdhEndTime: {
id: "viewDetais.audit.endtime",
defaultMessage: "End time"
},
vdhProgress: {
id: "viewDetais.audit.progress",
defaultMessage: "Progress"
},
trueStatus:{
  id: "viewDetais.audit.true",
  defaultMessage: "True"
},
falseStatus:{
  id: "viewDetais.audit.false",
  defaultMessage: "False"
},
multiPPS:{
  id: "viewDetais.audit.multiPPS",
  defaultMessage: "Multi PPS"
}
});


class viewDetailsAudit extends React.Component {
   constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state={items:[],auditId:this.props.auditId};

   }
   _removeThisModal() {
      this.props.removeModal();
   }

   componentDidMount(){
  var _this=this;
     var  audit_id_list=(this.state.auditId).constructor.name!=="Array"?[this.state.auditId]:this.state.auditId
     this.props.setViewAuditSpinner(true);
    this.props.client.query({
      query: AUDIT_DETAILS_QUERY,
      variables: (function () {
        return {
            input: {
          audit_id_list:audit_id_list
            }
        }
    }()),
      fetchPolicy: 'network-only'
  }).then((data,error) => {
   this.props.setViewAuditSpinner(false);
   this.setState({attributeData:data.data.AuditDetails.list.entity_list||[]}); 
   this.setState({auditDetails:data.data.AuditDetails.list||[]})
  }).catch((errors)=>{
let code=errors.graphQLErrors[0].code;
let message=errors.graphQLErrors[0].message;
    ShowError(_this,code)
  })

  }


  ppsChange(e){
    let param="CHANGE_PPS";
  modal.add(AuditStart, {
    title: '',
    size: 'large',
   closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
   hideCloseButton: true, // (optional) if you don't wanna show the top right close button
   auditID:[this.props.auditId],
   param:param
   //.. all what you put in here you will get access in the modal props ;),
                      });
  this._removeThisModal();
  }
_timeFormat(UTCtime){
  var timeOffset=this.props.timeOffset || "";
  let time;
  if(UTCtime){
    if (getDaysDiff(UTCtime) < 2) {
                    time=this.context.intl.formatRelative(UTCtime, {
                        timeZone: timeOffset,
                        units: 'day'
                    }) +
                    ", " + this.context.intl.formatTime(UTCtime, {
                        timeZone: timeOffset,
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false
                    });
                }
                else {
                    time=this.context.intl.formatDate(UTCtime,
                    {
                        timeZone: timeOffset,
                        month: 'short',
                        day: '2-digit',
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    });
                }
              }
              else
                {
                  return time='-';
                }
                return time;
}

  _processDataTile(data){
    let vdMultiSKU = this.context.intl.formatMessage(messages.vdMultiSKU);
    let vdSingleSKU = this.context.intl.formatMessage(messages.vdSingleSKU);
    let vdMultiLocation = this.context.intl.formatMessage(messages.vdMultiLocation);
    let vdSingleLocation = this.context.intl.formatMessage(messages.vdSingleLocation);
    let vdLinesCompleted = this.context.intl.formatMessage(messages.vdLinesCompleted);
    let vdhCreatedBy = this.context.intl.formatMessage(messages.vdhCreatedBy);
    let vdhOperator = this.context.intl.formatMessage(messages.vdhOperator);
    let vdhAuditType = this.context.intl.formatMessage(messages.vdhAuditType);
    let vdhPPSid = this.context.intl.formatMessage(messages.vdhPPSid);
    let vdhShowKQ = this.context.intl.formatMessage(messages.vdhShowKQ);
    let vdhReminder = this.context.intl.formatMessage(messages.vdhReminder);
    let vdhStartTime = this.context.intl.formatMessage(messages.vdhStartTime);
    let vdhEndTime = this.context.intl.formatMessage(messages.vdhEndTime);
    let vdhProgress = this.context.intl.formatMessage(messages.vdhProgress);
    let trueStatus=this.context.intl.formatMessage(messages.trueStatus);
    let falseStatus=this.context.intl.formatMessage(messages.falseStatus);
    let multiPPS=this.context.intl.formatMessage(messages.multiPPS);
    

    let tile1Data={},tile2Data={},tile3Data={};
    var ppsList="";
    tile1Data[vdhCreatedBy]=data.audit_creator_name;
    tile1Data[vdhOperator]=data.operator_assigned;
    if(data.audit_param_type=="sku"){
     tile1Data[vdhAuditType]=data.entity_list.length>1?vdMultiSKU:vdSingleSKU;
    }else if(data.audit_param_type=="location"){
     tile1Data[vdhAuditType]=data.entity_list.length>1?vdMultiLocation:vdSingleLocation;
    }
    if(data.pps_id && data.pps_id.length>1){
     ppsList=<span><span>{multiPPS}</span><span title={data.pps_id} className="gor-view-details-info-icon"></span></span>
    }
    else
    {
      ppsList=data.pps_id||"";
    }
    tile3Data[vdhPPSid]=ppsList||"";
    tile3Data[vdhShowKQ]=data.kq?trueStatus:falseStatus;
    tile2Data[vdhStartTime]=this._timeFormat(data.start_request_time);
    tile2Data[vdhEndTime]=this._timeFormat(data.completion_time);
    tile2Data[vdhProgress]=data.progress && data.progress.total>1? data.progress.completed +" "+vdLinesCompleted+" "+data.progress.total:"-";
    return [tile1Data,tile2Data,tile3Data];
  }

  handleChange(input) {
    var updatedList = this.state.auditDetails
    let attributeData= updatedList.entity_list;
    let data=input.toLowerCase();
    var queryResult=[];
    attributeData.forEach(function(item){
            if(item.id.toLowerCase().indexOf(data)!=-1)
            {
              queryResult.push(item);
              return;
            }
            let flag=true;
            item.attributes_list.forEach(function(arritem){
              if(arritem.toLowerCase().indexOf(data)!=-1){
                if(flag){
                queryResult.push(item);
                flag=false;
                return;
              }
              }

            })
    });

    this.setState({attributeData: queryResult});
  }

  processData(itemsData){
    let vdAttrSelected = this.context.intl.formatMessage(messages.vdAttrSelected);
    let vdNoAttrSelected = this.context.intl.formatMessage(messages.vdNoAttrSelected);
    let vdNoInventory = this.context.intl.formatMessage(messages.vdNoInventory);
    let vdMissingOut = this.context.intl.formatMessage(messages.vdMissingOut);
    let vdExtraFound=  this.context.intl.formatMessage(messages.vdExtraFound);  
    let vdItems = this.context.intl.formatMessage(messages.vdItems);
  let tableData=[];
  for(var i=0;i<itemsData.length;i++){
  let rowObject={};
  rowObject.auditDetails={
      "header":[itemsData[i].id||""],
      "subHeader":[itemsData[i].description||""]
      };
    
      if(itemsData[i].attributes_list!=0){
        rowObject.attrDetails={
      "header":[itemsData[i].attributes_list.length +" "+vdAttrSelected],
      "subHeader":itemsData[i].attributes_list
      }
    }else{
      rowObject.attrDetails={
      "header":[vdNoAttrSelected],
      "subHeader":[""]
      }
    }
    if(itemsData[i].result.sku_status=='inventory_empty'){
           rowObject.status=vdNoInventory;
         }
         else{
         let items=itemsData[i].result;
         let diff =items.expected_quantity-items.actual_quantity;
         if(diff>0)
         {
          rowObject.status=diff+" "+vdMissingOut+" "+items.expected_quantity;
         }
         else
         {
          rowObject.status=(diff!==0)?Math.abs(diff)+" "+vdExtraFound:"";
         }
         }
         tableData.push(rowObject);
         rowObject={};
      
}
return tableData;
}

   render() {
     if(!this.state.auditDetails){
      return (
        <div>
            <div>
                <div className="gor-Auditlist-table">
                    {
                        <Spinner isLoading={this.props.viewAuditSpinner} setSpinner={this.props.setAuditSpinner} />
                        }
                   
                </div>
            </div>
            
        </div>
    );
      
      }
    let audit = this.context.intl.formatMessage(messages.audit);
    let vdSearchBySKU = this.context.intl.formatMessage(messages.vdSearchBySKU);
    let vdChangePPS = this.context.intl.formatMessage(messages.vdChangePPS);
    let auditTask = this.context.intl.formatMessage(messages.auditTask);
    let allData=this.state.auditDetails;
    let tiledata=this._processDataTile(allData);
    let attributeData= this.state.attributeData;
    let processedTableData=this.processData(attributeData);
    let type=allData.audit_param_type;
    let no_of_record=processedTableData.length;
      var processedData=[	
			{columnId: "1", headerText: "WaveId"},
			{columnId: "2", headerText: "ProgressBar"},
			{columnId: "3", headerText: "Cut off Time"},
			{columnId: "4", headerText: "Icon"}
		];

		var tableData=[
			{class:"centerAligned columnStyle"}, 
			{class:"centerAligned columnStyle"}, 
      {class:"centerAligned columnStyle"}

		];
      return (
         <div>
            <div className="gor-AuditDetails-modal-content">
               <div className='gor-auditDetails-modal-head'>
                  <span className='AuditIDWrapper'>
                     <FormattedMessage id="audit.audittask" description='Heading for view orderline' defaultMessage='Audit Task' />
                  </span>
                  <span className='AuditIDWrapper'>
                     - {this.props.displayId}
                  </span>
                  <span className="close" onClick={this._removeThisModal.bind(this)}>×</span>
               </div>
            
               <div className='gor-auditDetails-modal-body'>
                  <div className="AuditDetailsWrapper">
                     <div className="AuditDetailsHeader">
                        <FormattedMessage id="audit.auditdetails" description='Heading for audit details' defaultMessage='Basic details' />
                     </div>
                     <div className="auditDetailsContent">
                        <div className="auditDetailsLeft">
                        <Tile data={tiledata[0]}/>
                        <Tile data={tiledata[1]}/>
                        <Tile className="width-auto" data={tiledata[2]}/>
                        {this.state.auditDetails.change_pps_button=='enable'?<div className="details-changepps"    onClick={this.ppsChange.bind(this)}>| {vdChangePPS}</div>:""}
                        </div>
                        
                     </div>
                  </div>
               </div>
              
                            <GTable options={['table-bordered','viewDetailsTable']}>
				    	
                   <GTableHeader options={['auditTable']}>
                           
                                <GTableHeaderCell key={1} header={audit}>
                                       <span className="auditSummary">{no_of_record} {type} {auditTask}</span>
                                       <div className="auditDetailsSearchWrap"> 
                                    <SearchFilter handleChange={this.handleChange} placeHolder={vdSearchBySKU} />
                                       </div>  
                                   </GTableHeaderCell>
                          
                       </GTableHeader>
                       {processedTableData.length>0?
                       <GTableBody data={processedTableData} >
                       {processedTableData ? processedTableData.map(function (row, idx) {
                           return (
                               
                               <GTableRow key={idx} index={idx}  data={processedTableData} >
                             
                                   {Object.keys(row).map(function (text, index) {
                                       return <div key={index} style={tableData[index].style} className={tableData[index].class?tableData[index].class+" cell":""+"cell"} >  
                                          {index==0?<DotSeparatorContent header={processedTableData[idx][text]['header']} subHeader={processedTableData[idx][text]['subHeader']} separator={<div className="dotImage"></div>} subheaderClassName="subheaderName viewDetailslimitsSubHeader" />:""} 
                                          {index==1?<DotSeparatorContent header={processedTableData[idx][text]['header']} subHeader={processedTableData[idx][text]['subHeader']} headerClassName="viewDetailsSeparatorHeader" subheaderClassName="viewDetailsSeparatorSubHeader" separator={<div className="dotImage"></div>} />:""}     
                                          {index==2?<div className="missing-item">{processedTableData[idx][text]}</div>:""} 

                                       </div>
                                   })}
                                
                               </GTableRow>
                           )
                       }):""}
                   </GTableBody>:<div className="gor-Audit-no-dataview" style={{'background-color':'white'}}>
  <div>
  <FormattedMessage id='audit.nonresult'  defaultMessage="No result found." description="audit not found"/>
  </div>
  </div>}
                  
               </GTable>

            </div>

         </div>
      );
   }
}

const SET_VIEW_AUDIT_SPINNER_STATE = gql`
    mutation setviewAuditSpinner($viewAuditSpinner: String!) {
        setViewAuditSpinnerState(viewAuditSpinner: $viewAuditSpinner) @client
    }
`;
const setSpinnerState = graphql(SET_VIEW_AUDIT_SPINNER_STATE, {
  props: ({mutate, ownProps}) => ({
      setViewAuditSpinner: function (viewAuditSpinner) {
          mutate({variables: {viewAuditSpinner: viewAuditSpinner}})
      },
  }),
});
const clientviewDetailsSpinnerState = graphql(auditViewSpinnerState, {
  props: (data) => ({
    viewAuditSpinner:data.data.auditSpinnerstatus.viewAuditSpinner
  })
})
function mapStateToProps(state, ownProps){
  return {
     
      timeOffset: state.authLogin.timeOffset,
  };
}
viewDetailsAudit.contextTypes={
    intl: React.PropTypes.object.isRequired
}
viewDetailsAudit.defaultProps = {
  viewAuditSpinner:true,
};

var mapDispatchToProps=function(dispatch){
  return {
     notifyfeedback: function (data) {dispatch(notifyfeedback(data))},
     setNotification: function (data) {dispatch(setNotification(data))},
     notifyFail:function (data) {dispatch(notifyFail(data)) 
  }
}
};

export default compose(
  clientviewDetailsSpinnerState,
  setSpinnerState,
 withApollo
)(connect(mapStateToProps,mapDispatchToProps)(viewDetailsAudit));
