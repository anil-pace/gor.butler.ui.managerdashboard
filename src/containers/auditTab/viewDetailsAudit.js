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
import SearchFilter from '../../components/searchFilter/searchFilter';
import AuditStart from '../../containers/auditTab/auditStart';
 import {modal} from 'react-redux-modal';

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
      audit_id: this.state.auditId
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
    let finalstring="";
    if(list && list.length!=0){
    for(let i=0,len=list.length;i<len;i++){
       finalstring=len>i+1?finalstring+"PPS "+list[i]+", ":finalstring+"PPS "+list[i];
    }
  }
    return finalstring;
  }

  ppsChange(e){
  modal.add(AuditStart, {
    title: '',
    size: 'large',
   closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
   hideCloseButton: true, // (optional) if you don't wanna show the top right close button
   auditID: this.props.auditID
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
    let tile1Data={},tile2Data={},tile3Data={};
    tile1Data['Created By']=data.audit_created_by;
    tile1Data['Operator']=data.operator_assigned;
    if(data.audit_param_type=="sku"){
     tile1Data['Audit Type']=data.entity_list.length>1?"Multi SKU":"Single SKU";
    }else if(data.audit_param_type=="location"){
     tile1Data['Audit Type']=data.entity_list.length>1?"Multi Location":"Single Location";
    }
    tile3Data['PPS ID']=this._PPSstring(data.pps_id);
    tile3Data['Show KQ']=data.kq;
    tile3Data['Reminder']=data.reminder;

    tile2Data['Start time']=this._timeFormat(data.start_actual_time);
    tile2Data['End time']=this._timeFormat(data.completion_time);
    tile2Data['Progress']=data.progress && data.progress.total>1? data.progress.completed +" lines completed out of "+data.progress.total:"-";
    return [tile1Data,tile2Data,tile3Data];
  }

  handleChange(data) {
    var updatedList = this.props.auditDetails
    let attributeData= updatedList.entity_list;
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
  let tableData=[];
  for(var i=0;i<itemsData.length;i++){
  let rowObject={};
  rowObject.auditDetails={
      "header":[itemsData[i].id],
      "subHeader":[itemsData[i].name||""]
      };
    
      if(itemsData[i].entity_list!=0){
        rowObject.attrDetails={
      "header":[itemsData[i].attributes_list.length +" attributes selected"],
      "subHeader":itemsData[i].attributes_list
      }
    }else{
      rowObject.attrDetails={
      "header":["No attributes selected"],
      "subHeader":[]
      }
    }
    let a=itemsData[i].audit_result;
    rowObject.status= (a && a.total>=1)?a.missing+" missing out of "+a.total+" items":"";
  tableData.push(rowObject);
  rowObject={};
      
}
return tableData;
}

   render() {
    //let rawData=this.state.items;
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
                        <FormattedMessage id="audit.auditdetails" description='Heading for Order details' defaultMessage='Basic details' />
                     </div>
                     <div className="auditDetailsContent">
                        <div className="auditDetailsLeft">
                        <Tile data={tiledata[0]}/>
                        <Tile data={tiledata[1]}/>
                        <Tile className="width-auto" data={tiledata[2]}/><div className="details-changepps"    onClick={this.ppsChange.bind(this)}>| Change PPS</div>
                        </div>
                        
                     </div>
                  </div>
               </div>
              

                            <GTable options={['table-bordered','viewDetailsTable']}>
				    	
                   <GTableHeader options={['auditTable']}>
                           
                                <GTableHeaderCell key={1} header='Audit'>
                                       <span className="auditSummary">{no_of_record} {type} in this Audit task</span>
                                       <div className="auditDetailsSearchWrap"> 
                                    <SearchFilter handleChange={this.handleChange} placeHolder={'Search by SKU or PDFA'} />
                                       </div>  
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






            </div>:<div>No data to show</div>}

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
