import React from 'react';
import { FormattedMessage,defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import Tile from '../../components/tile/tile.js';
import {GTable} from '../../components/gor-table-component/index'
import {userRequest} from '../../actions/userActions';
import { AUDITDETAIL_URL } from '../../constants/configConstants';
import { GET_AUDIT_DETAILS,GET,APP_JSON,POST } from '../../constants/frontEndConstants';
import {GTableHeader,GTableHeaderCell} from '../../components/gor-table-component/tableHeader';
import {GTableBody} from "../../components/gor-table-component/tableBody";
import {GTableRow} from "../../components/gor-table-component/tableRow";
import {getDaysDiff} from '../../utilities/getDaysDiff';
import DotSeparatorContent from '../../components/dotSeparatorContent/dotSeparatorContent';
import SearchFilter from '../../components/searchFilter/searchFilter';
import AuditStart from '../../containers/auditTab/auditStart';
import {modal} from 'react-redux-modal';

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
      defaultMessage: " lines completed out of "
  },
  vdAttrSelected: {
      id: "viewDetais.attrselected.status",
      defaultMessage: " attributes selected"
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
      defaultMessage: " missing out of "
  },
  vdExtraFound:{
    id: "viewDetais.extra.status",
    defaultMessage: " extra entitiy found"
  },
  vdItems: {
      id: "viewDetais.items.status",
      defaultMessage: " items"
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
noDataToShow: {
  id: "viewDetais.audit.nodatashow",
  defaultMessage: "No data to show"
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
}
});

class ViewDetailsAudit extends React.Component {
   constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state={items:[],auditId:this.props.auditId};
   }
   _removeThisModal() {
      this.props.removeModal();
   }
     componentWillReceiveProps(nextProps){
       if(!nextProps.auth_token)
       {
         this._removeThisModal();
       }
     }


  componentWillReceiveProps(nextProps){
    if(JSON.stringify(this.props.auditDetails)!== JSON.stringify(nextProps.auditDetails)){
    let attributeData= nextProps.auditDetails.entity_list?nextProps.auditDetails.entity_list:[];
   this.setState({items: attributeData});
 }
  }
     componentDidMount(){
    let formdata={
      audit_id_list:(this.state.auditId).constructor.name!=="Array"?[this.state.auditId]:this.state.auditId
    }
        let userData={
                'url':AUDITDETAIL_URL,
                'method':POST,
                'cause':GET_AUDIT_DETAILS,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'token':sessionStorage.getItem('auth_token'),
                'formdata':formdata
            }
        this.props.userRequest(userData);
  let attributeData= this.props.auditDetails.entity_list?this.props.auditDetails.entity_list:[];
   this.setState({items: attributeData});
  }
  _PPSstring(list){
    let pps = this.context.intl.formatMessage(messages.pps);
    
    let finalstring="";
    if(list && list.length!=0){
    for(let i=0,len=list.length;i<len;i++){
       finalstring=len>i+1?finalstring+pps+list[i]+", ":finalstring+pps+list[i];
    }
  }
    return finalstring!==""?finalstring:"-";
  }

  ppsChange(e){
    let param="CHANGE_PPS";
  modal.add(AuditStart, {
    title: '',
    size: 'large',
   closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
   hideCloseButton: true, // (optional) if you don't wanna show the top right close button
   auditID: this.props.auditId,
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

    let tile1Data={},tile2Data={},tile3Data={};
    tile1Data[vdhCreatedBy]=data.audit_creator_name;
    tile1Data[vdhOperator]=data.operator_assigned;
    if(data.audit_param_type=="sku"){
     tile1Data[vdhAuditType]=data.entity_list.length>1?vdMultiSKU:vdSingleSKU;
    }else if(data.audit_param_type=="location"){
     tile1Data[vdhAuditType]=data.entity_list.length>1?vdMultiLocation:vdSingleLocation;
    }
    tile3Data[vdhPPSid]=this._PPSstring(data.pps_id);
    tile3Data[vdhShowKQ]=data.kq;
    tile3Data[vdhReminder]=data.reminder!==""?data.reminder:'-';

    tile2Data[vdhStartTime]=this._timeFormat(data.start_request_time);
    tile2Data[vdhEndTime]=this._timeFormat(data.completion_time);
    tile2Data[vdhProgress]=data.progress && data.progress.total>1? data.progress.completed +vdLinesCompleted+data.progress.total:"-";
    return [tile1Data,tile2Data,tile3Data];
  }

  handleChange(input) {
    var updatedList = this.props.auditDetails
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

    this.setState({items: queryResult});
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
      "header":[itemsData[i].id],
      "subHeader":[itemsData[i].name||""]
      };
    
      if(itemsData[i].entity_list!=0){
        rowObject.attrDetails={
      "header":[itemsData[i].attributes_list.length +vdAttrSelected],
      "subHeader":itemsData[i].attributes_list
      }
    }else{
      rowObject.attrDetails={
      "header":[vdNoAttrSelected],
      "subHeader":[]
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
          rowObject.status=diff+vdMissingOut+items.expected_quantity;
         }
         else
         {
          rowObject.status=(diff!==0)?Math.abs(diff)+vdExtraFound:"";
         }
         }
         tableData.push(rowObject);
         rowObject={};
      
}
return tableData;
}

   render() {
    let audit = this.context.intl.formatMessage(messages.audit);
    let vdSearchBySKU = this.context.intl.formatMessage(messages.vdSearchBySKU);
    let vdChangePPS = this.context.intl.formatMessage(messages.vdChangePPS);
    let auditTask = this.context.intl.formatMessage(messages.auditTask);
    let noDataToShow = this.context.intl.formatMessage(messages.noDataToShow);
    let allData=this.props.auditDetails;
    let tiledata=this._processDataTile(allData);
    let attributeData= this.state.items;
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
			{id:1,text: "SKU CODE", sortable: true, width:30}, 
			{id:2, text: "NAME",sortable: true,  width:30}, 
      {id:3,text: "OPENING STOCK", searchable: false, width:30}

		];
      return (
         <div>
            <div className="gor-AuditDetails-modal-content">
               <div className='gor-auditDetails-modal-head'>
                  <span className='AuditIDWrapper'>
                     <FormattedMessage id="audit.audittask" description='Heading for view orderline' defaultMessage='Audit Task' />
                  </span>
                  <span className='AuditIDWrapper'>
                     - {allData.audit_id}
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
                        {tiledata[2]["PPS ID"]!=='-'?<div className="details-changepps"    onClick={this.ppsChange.bind(this)}>| {vdChangePPS}</div>:""}
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

                       <GTableBody data={processedTableData} >
                       {processedTableData ? processedTableData.map(function (row, idx) {
                           return (
                               
                               <GTableRow key={idx} index={idx}  data={processedTableData} >
                             
                                   {Object.keys(row).map(function (text, index) {
                                       return <div key={index} style={tableData[index].width?{flex:'1 0 '+tableData[index].width+"%"}:{}} className="cell" >  
                                          {index==0?<DotSeparatorContent header={processedTableData[idx][text]['header']} subHeader={processedTableData[idx][text]['subHeader']} separator={'.'} />:""} 
                                          {index==1?<DotSeparatorContent header={processedTableData[idx][text]['header']} subHeader={processedTableData[idx][text]['subHeader']} separator={'.'} />:""}     
                                          {index==2?<div className="missing-item">{processedTableData[idx][text]}</div>:""} 

                                       </div>
                                   })}
                                
                               </GTableRow>
                           )
                       }):""}
                   </GTableBody>
                  
               </GTable>






            </div>:<div>{noDataToShow}</div>}

         </div>
      );
   }
}
function mapStateToProps(state, ownProps){
  return {
      auditType:  state.auditInfo.auditType  || {},
      auditDetails: state.auditInfo.auditDetails  || {},
      auth_token:state.authLogin.auth_token,
      timeOffset: state.authLogin.timeOffset,
  };
}
ViewDetailsAudit.contextTypes={
    intl: React.PropTypes.object.isRequired
}

var mapDispatchToProps=function(dispatch){
  return {
     userRequest: function(data){ dispatch(userRequest(data)); },


  }
};

export default connect(mapStateToProps,mapDispatchToProps)(ViewDetailsAudit);
