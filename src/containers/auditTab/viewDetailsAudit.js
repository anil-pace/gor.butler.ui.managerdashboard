import React from 'react';
import { FormattedMessage } from 'react-intl';
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

class ViewDetailsAudit extends React.Component {
   constructor(props) {
      super(props);
   }
   _removeThisModal() {
      this.props.removeModal();
   }
   //   componentWillReceiveProps(nextProps){
   //     if(!nextProps.auth_token)
   //     {
   //       this._removeThisModal();
   //     }
   //   }

     componentDidMount(){
        let userData={
                'url':AUDITDETAIL_URL,
                'method':GET,
                'cause':GET_AUDIT_DETAILS,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'token':sessionStorage.getItem('auth_token')
            }
        this.props.userRequest(userData);
  }
  _PPSstring(list){
    let finalstring="";
    if(list && list.length!=0){
    for(let i=0,len=list.length;i<len;i++){
       finalstring=len>i+1?finalstring+"PPS "+list[i]+", ":finalstring+"PPS "+list[i];
    }
  }
    return finalstring;
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
    let tile1Data={},tile2Data={},tile3Data={};
    tile1Data['Created By']=data.audit_created_by;
    tile1Data['Operator']=data.operator_name;
    if(data.audit_param_type=="sku"){
     tile1Data['Audit Type']=data.audit_param_value.attributes_list.length>1?"Multi SKU":"Single SKU";
    }else if(data.audit_param_value=="location"){
     tile1Data['Audit Type']=data.audit_param_value.attributes_list.length>1?"Multi Location":"Single Location";
    }
    tile3Data['PPS ID']=this._PPSstring(data.pps_id);
    tile3Data['Show KQ']=data.kq;
    tile3Data['Reminder']=data.reminder;

    tile2Data['Start time']=this._timeFormat(data.start_actual_time);
    tile2Data['End time']=this._timeFormat(data.completion_time);
    tile2Data['Progress']=data.audit_progress && data.audit_progress.total>1? data.audit_progress.completed +" lines completed out of "+data.audit_progress.total:"-";
    return [tile1Data,tile2Data,tile3Data];
  }
  processData(itemsData){
  let attributeData= itemsData.audit_param_value?itemsData.audit_param_value.attributes_list:[];
  let tableData=[];
  for(var i=0;i<attributeData.length;i++){
  let rowObject={};
  rowObject.auditDetails={
      "header":[attributeData[i].sku],
      "subHeader":[attributeData[i].name]
      };
    
      if(attributeData[i].attributes_sets!=0){
        rowObject.attrDetails={
      "header":[attributeData[i].attributes_sets.length +" attributes selected"],
      "subHeader":attributeData[i].attributes_sets
      }
    }else{
      rowObject.attrDetails={
      "header":["No attributes selected"],
      "subHeader":[]
      }
    }
    let a=attributeData[i].audit_result;
    rowObject.status= (a && a.total>=1)?a.missing+" missing out of "+a.total+" items":"";
  tableData.push(rowObject);
  rowObject={};
      
}
return tableData;
}

   render() {
    let rawData=this.props.auditDetails;
    let tiledata=this._processDataTile(rawData);
    let processedTableData=this.processData(rawData);
    let type=rawData.audit_param_type;
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
                     - {rawData.audit_id}
                  </span>
                  <span className="close" onClick={this._removeThisModal.bind(this)}>×</span>
               </div>

               <div className='gor-auditDetails-modal-body'>
                  <div className="AuditDetailsWrapper">
                     <div className="AuditDetailsHeader">
                        <FormattedMessage id="audit.auditdetails" description='Heading for Order details' defaultMessage='Basic details' />
                     </div>
                     <div className="auditDetailsContent">
                        <div className="auditDetailsLeft">
                        <Tile data={tiledata[0]}/>
                        <Tile data={tiledata[1]}/>
                        <Tile data={tiledata[2]}/>
                        </div>
                     </div>
                  </div>
               </div>
              

                            <GTable options={['table-bordered','viewDetailsTable']}>
				    	
                   <GTableHeader options={['auditTable']}>
                           
                                <GTableHeaderCell key={1} header='Audit'>
                                       <span>{no_of_record} {type} in this Audit task</span>
                                         
                                   </GTableHeaderCell>
                          
                       </GTableHeader>

                       <GTableBody data={processedTableData} >
                       {processedTableData ? processedTableData.map(function (row, idx) {
                           return (
                               
                               <GTableRow key={idx} index={idx} offset={tableData.offset} max={tableData.max} data={tableData} >
                             
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






            </div>

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
    // resetAuditType: function(data){ dispatch(resetAuditType(data)); },    


  }
};

export default connect(mapStateToProps,mapDispatchToProps)(ViewDetailsAudit);
