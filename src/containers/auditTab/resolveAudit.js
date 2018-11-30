import React  from 'react';
import { FormattedMessage } from 'react-intl'; 
import { connect } from 'react-redux';
import {GOR_BREACHED_LINES,APPROVE_AUDIT,
  GOR_USER_TABLE_HEADER_HEIGHT,GOR_AUDIT_RESOLVE_MIN_HEIGHT,GOR_AUDIT_RESOLVE_WIDTH,
   AUDIT_RESOLVE_CONFIRMED,AUDIT_BY_SKU,GOR_AUDIT_STATUS_DATA} from '../../constants/frontEndConstants';
import {Table, Column} from 'fixed-data-table';
import {tableRenderer,TextCell,ResolveCell,AuditPackingSlotIdCell,AuditPackingQuantityCell,AuditPackingStatusCell,AuditPackingResolveCell} from '../../components/commonFunctionsDataTable';
import {stringConfig} from '../../constants/backEndConstants';
import Spinner from '../../components/spinner/Spinner';
import {graphql, withApollo, compose} from "react-apollo";
import gql from 'graphql-tag'
import { resetForm,notifyfeedback,notifyFail } from '../../actions/validationActions';
import { setNotification } from '../../actions/notificationAction';
import {AuditParse} from '../../../src/utilities/auditResponseParser';
import {ShowError} from '../../../src/utilities/ErrorResponseParser';
import {auditResolveData,auditResolveSpinnerState} from './query/clientQuery';
import {AUDIT_RESOLVE_QUERY,AUDIT_RESOLVE_SUBMIT_QUERY} from './query/serverQuery';



class ResolveAudit extends React.Component{
  constructor(props) 
  {
      super(props); 
      var data=this.props.auditLines?this.props.auditLines: [];
      this._dataList=new tableRenderer(data ? data.length : 0);
      this._dataList.newData=data;
      this.state={
      auditDataList: this._dataList,
      checkedState: [],
      totalMismatch: 0,
      auditParamType:""
      } 
  }

  componentWillReceiveProps(nextProps){

     var data=nextProps.auditLines || [], processedData,auditType;
      processedData=this._processData(data,nextProps);
      auditType=nextProps.audit_param_type;
      this._dataList=new tableRenderer(data ? data.length : 0);
      this._dataList.newData=processedData;
      this.state={
      auditDataList: this._dataList,
      checkedState: [],
      totalMismatch: 0,
      auditParamType:auditType
      }
  }
  _removeThisModal() {
    this.props.removeModal();
  }

  componentDidMount() {
  var  _this=this;
  let audit_id= this._findDisplayidName(this.props.auditId);

  this.props.setResolveAuditSpinner(true);
  this.props.client.query({
    query:AUDIT_RESOLVE_QUERY,
      variables: (function () {
      return {
        input: {
          audit_id_list:[audit_id[0]]
            }
      }
  }()),
    fetchPolicy: 'network-only'
  }).then(data=>{
    _this.props.setResolveAuditSpinner(false);
    let dataSentToProps={
    audiltLine:data.data.AuditResolve.list.auditlines,
    audit_param_type:data.data.AuditResolve.list.audit_param_type
    }
    _this.props.setResolveDetails(dataSentToProps);
    
  }).catch((errors)=>{
    let code=errors.graphQLErrors[0].code;
    let message=errors.graphQLErrors[0].message;
        ShowError(_this,code)
      })    
  }
  

  _processData(auditLines,nProps) {
    var data=auditLines, processedData=[], auditData={}, totalMismatch=0;
    for (var i=data.length - 1; i >= 0; i--) {
      if(data[i].anamoly_info.length>1){ // only multiple objects are there inside anamoly_info
        var sumActualQuantity=0, sumExpectedQuantity = 0;
        for(var j=0; j< data[i].anamoly_info.length; j++){
          sumActualQuantity = sumActualQuantity + data[i].anamoly_info[j].actual_quantity;
          sumExpectedQuantity = sumExpectedQuantity + data[i].anamoly_info[j].expected_quantity;
        }
        auditData.actual_quantity=sumActualQuantity;
        auditData.expected_quantity=sumExpectedQuantity;
      }
      else{ // only one object inside anamoly_info
        auditData.actual_quantity=data[i].anamoly_info[0].actual_quantity;
        auditData.expected_quantity=data[i].anamoly_info[0].expected_quantity;
      }
      totalMismatch=(data[i].expected_quantity-data[i].actual_quantity) + totalMismatch;
      auditData.slot_id=data[i].slot_id;
      auditData.auditLineId=data[i].auditline_id;
        if(data[i].status){
            /**
             * Data from the backend for the comparison.
             */
            auditData[GOR_AUDIT_STATUS_DATA]=data[i].status
        }
      if(this.context.intl.formatMessage(stringConfig[data[i].status])) {
        auditData.status=this.context.intl.formatMessage(stringConfig[data[i].status]);
      } 
      else{
        auditData.status=data[i].status;
      }
      if(data[i].pdfa_audit_attributes && auditLines[i].pdfa_audit_attributes[Object.keys(auditLines[0].pdfa_audit_attributes)]) {
        auditData.attributeDetail=auditLines[i].pdfa_audit_attributes[Object.keys(auditLines[0].pdfa_audit_attributes)];  //assuming only one attributes is there as of now (kerry specific) 
      }
      if(data[i].anamoly_info){
            auditData.anamoly_info=data[i].anamoly_info
      }
      if(data[i].k_deep_audit){
          auditData.k_deep_audit=data[i].k_deep_audit
      }
      processedData.push(auditData);
      auditData={};

    }
    this.setState({totalMismatch:totalMismatch})
    return processedData;
  } 

  _checkAuditStatus(rowIndex,state,auditLineId) {
    var newAuditLineId;
    if(this.state.auditParamType===AUDIT_BY_SKU) {
      var newAuditLineIndex=this.actualMapping[auditLineId]; //in case of pdfa rowindex wont work so using actual index
      newAuditLineId=this.state.auditDataList.newData[newAuditLineIndex].auditLineId;
    }
    else{
      newAuditLineId=this.state.auditDataList.newData[rowIndex].auditLineId
    }
    var checkedAudit={"response":state, "auditline_id":newAuditLineId}, auditIndexed=false;
    var tempState=this.state.checkedState.slice();
    for (var i=tempState.length - 1; i >= 0; i--) {
      if(tempState[i].auditline_id=== newAuditLineId) {
        tempState[i].response=state;
        auditIndexed=true;
        break;
      }
    }
    if(!auditIndexed) {
      tempState.push(checkedAudit)
    }
    this.setState({checkedState:tempState})
  }

  _confirmIssues() {
var _this=this;
    // since we also need the username for the request generated.
    // hence getting the username from the state and then sending 
    // the same during the request.
    
    var userName=this.props.username||"admin"; 
    var auditConfirmDetail={data:{
      username: userName,
      auditlines:this.state.checkedState
    }};
       let dataToSent=JSON.stringify(auditConfirmDetail)
       this.props.client.query({
        query:AUDIT_RESOLVE_SUBMIT_QUERY,
          variables: (function () {
          return {
            input: {
              "data": dataToSent
                }
          }
      }()),
        fetchPolicy: 'network-only'
      }).then(data=>{
        var AuditResolveSubmit=data.data.AuditResolveSubmit?JSON.parse(data.data.AuditResolveSubmit.list):""
        AuditParse(AuditResolveSubmit,'AUDIT_RESOLVE_CONFIRMED',_this);
        
      }).catch((errors)=>{
        let code=errors.graphQLErrors[0].code;
        let message=errors.graphQLErrors[0].message;
            ShowError(_this,code)
          }) 

    this._removeThisModal();
  }

  _resolveIssueByPdfa() {
    var slotIdHashMap={};
    var auditDataLine=this.state.auditDataList.newData; 
    var slotIdGrouping={}, slotIdData={slotId:"", slotIdDataLine:[]}, actualMapping={};
    for (var i=auditDataLine.length - 1; i >= 0; i--) {
      var columnSlotId=auditDataLine[i].slot_id;
      if(slotIdHashMap[columnSlotId]>=0) {
        slotIdGrouping[columnSlotId].slotIdDataLine.push(auditDataLine[i]);
        actualMapping[auditDataLine[i].auditLineId]=i;
      }

      else {
        slotIdHashMap[columnSlotId]=i;
        slotIdData.slotId=auditDataLine[i].slot_id;
        slotIdData.slotIdDataLine.push(auditDataLine[i]);
        slotIdGrouping[columnSlotId]=slotIdData;
        actualMapping[auditDataLine[i].auditLineId]=i;
        slotIdData={slotId:"", slotIdDataLine:[]}
      }
    }
    this.actualMapping=actualMapping; //due to grouping, actual mapping is lost. hence storing here
    return slotIdGrouping;
  }

  _renderPDFAtable(data) {
    var pdfaResolveTable=[],resolveTable;
    var pdfaHeader=<Table
                      rowHeight={GOR_USER_TABLE_HEADER_HEIGHT}
                      rowsCount={0}
                      headerHeight={GOR_USER_TABLE_HEADER_HEIGHT}
                      width={GOR_AUDIT_RESOLVE_WIDTH}
                      height={GOR_USER_TABLE_HEADER_HEIGHT}
                      {...this.props}>
                      <Column header={<div className="gorAuditHeader">
                                        <FormattedMessage id="resolveAudit.table.batchID" description="batch id Column" defaultMessage="BOX ID."/> 
                                      </div>} width={220}/>
                      <Column header={<div className="gorAuditHeader">
                                        <FormattedMessage id="resolveAudit.table.expectedItems" description="expectedItems Column" defaultMessage="EXPECTED QUANTITY"/> 
                                     </div>} width={220}/>
                      <Column header={<div className="gorAuditHeader">
                                        <FormattedMessage id="resolveAudit.table.actualQuantity" description="actualQuantity Column" defaultMessage="ACTUAL QUANTITY"/> 
                                      </div>} width={220}/>
                      <Column header={<div className="gorAuditHeader">
                                        <FormattedMessage id="resolveAudit.table.STATUS" description="status Column" defaultMessage="STATUS"/> 
                                      </div>} width={220}/>
                      <Column header={<div className="gorAuditHeader">
                                        <FormattedMessage id="resolveAudit.table.resolve" description="resolve Column" defaultMessage="RESOLVE"/> 
                                      </div>} width={220}/>
                    </Table> 

    pdfaResolveTable.push(pdfaHeader)                   
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var auditDataList=new tableRenderer(data[key].slotIdDataLine ? data[key].slotIdDataLine.length : 0);
        var inSlot=<FormattedMessage id="audit.inSlot.text" defaultMessage='In slot '/> 
        var containerHeight=(auditDataList.getSize())*GOR_USER_TABLE_HEADER_HEIGHT+2;
        auditDataList.newData=data[key].slotIdDataLine;
        resolveTable=<div> 
                      <div className="gor-auditresolve-pdfa-slot-header">
                        <span>{inSlot} </span>
                        <span><b>{key}:</b></span>
                      </div>
                      <Table
                      rowHeight={GOR_USER_TABLE_HEADER_HEIGHT}
                      rowsCount={auditDataList.getSize()}
                      headerHeight={0}
                      width={GOR_AUDIT_RESOLVE_WIDTH}
                      height={containerHeight}
                      {...this.props}>
                      <Column  columnKey="attributeDetail" cell={<TextCell data={auditDataList}/>} width={220}/>
                      <Column  columnKey="expected_quantity" cell={  <TextCell data={auditDataList} />} width={220}/>
                      <Column  columnKey="actual_quantity" cell={  <TextCell data={auditDataList} setClass={GOR_BREACHED_LINES}> </TextCell>} width={220}/>
                      <Column  columnKey="status" cell={<TextCell data={auditDataList}> </TextCell>} width={220}/>
                      <Column  columnKey="resolve" cell={  <ResolveCell data={auditDataList} checkStatus={this._checkAuditStatus.bind(this)} screenId={this.props.screenId}> </ResolveCell>} width={220}/>
                    </Table>        
                    </div>
        pdfaResolveTable.push(resolveTable);               
        }
    }    
   return pdfaResolveTable;
          
  }

  _renderSkutable() {
    var resolveTable=<div/>, headerHeight=GOR_USER_TABLE_HEADER_HEIGHT,minHeight=GOR_AUDIT_RESOLVE_MIN_HEIGHT;
    var {auditDataList}=this.state 
    var missingAudit=auditDataList.getSize();
    var screenId=this.props.screenId
    var containerHeight=(((missingAudit?missingAudit:0)*headerHeight + headerHeight)>minHeight?((missingAudit?missingAudit:0)*headerHeight + headerHeight):minHeight);
    if(auditDataList.newData.length>0 && auditDataList.newData[0].k_deep_audit){
        containerHeight=(((missingAudit?missingAudit:0)*3*headerHeight + headerHeight)>minHeight?((missingAudit?missingAudit:0)*3*headerHeight + headerHeight):minHeight);
        resolveTable=<div>
            <Table
                rowHeight={headerHeight}
                rowsCount={auditDataList.getSize()}
                headerHeight={headerHeight}
                onColumnResizeEndCallback={this._onColumnResizeEndCallback}
                isColumnResizing={false}
                width={GOR_AUDIT_RESOLVE_WIDTH}
                height={containerHeight}
                {...this.props}>
                <Column
                    columnKey="slot_id"
                    header={<div className="gorAuditHeader"> <FormattedMessage id="resolveAudit.table.slot" description="slot id Column" defaultMessage="SLOT ID"/> </div>}
                    cell={  <TextCell data={auditDataList} />}
                    width={220}
                />
                <Column
                    columnKey="expected_quantity"
                    header={<div className="gorAuditHeader"> <FormattedMessage id="resolveAudit.table.expectedItems" description="expectedItems Column" defaultMessage="EXPECTED QUANTITY"/> </div>}
                    cell={  <TextCell data={auditDataList} />}
                    width={220}
                />
                <Column
                    columnKey="actual_quantity"
                    header={<div className="gorAuditHeader"><FormattedMessage id="resolveAudit.table.actualQuantity" description="actualQuantity Column" defaultMessage="ACTUAL QUANTITY"/> </div>
                    }
                    cell={  <TextCell data={auditDataList} setClass={GOR_BREACHED_LINES}> </TextCell>}
                    width={220}
                />
                <Column
                    columnKey="status"
                    header={<div className="gorAuditHeader"><FormattedMessage id="resolveAudit.table.STATUS" description="status Column" defaultMessage="STATUS"/> </div>}
                    cell={  <TextCell data={auditDataList}> </TextCell>}
                    width={220}
                />

                <Column
                    columnKey="resolve"
                    header={<div className="gorAuditHeader"> <FormattedMessage id="resolveAudit.table.resolve" description="resolve Column" defaultMessage="RESOLVE"/> </div>}
                    cell={  <ResolveCell data={auditDataList} checkStatus={this._checkAuditStatus.bind(this)} screenId={screenId}> </ResolveCell>}
                    width={220}
                />
            </Table>
        </div>
    }else{
        resolveTable=<div>
            <Table
                rowHeight={headerHeight}
                rowsCount={auditDataList.getSize()}
                headerHeight={headerHeight}
                onColumnResizeEndCallback={this._onColumnResizeEndCallback}
                isColumnResizing={false}
                width={GOR_AUDIT_RESOLVE_WIDTH}
                height={containerHeight}
                {...this.props}>
                <Column
                    columnKey="slot_id"
                    header={<div className="gorAuditHeader"> <FormattedMessage id="resolveAudit.table.slot" description="slot id Column" defaultMessage="SLOT ID"/> </div>}
                    cell={  <TextCell data={auditDataList} />}
                    width={220}
                />
                <Column
                    columnKey="expected_quantity"
                    header={<div className="gorAuditHeader"> <FormattedMessage id="resolveAudit.table.expectedItems" description="expectedItems Column" defaultMessage="EXPECTED QUANTITY"/> </div>}
                    cell={  <TextCell data={auditDataList} />}
                    width={220}
                />
                <Column
                    columnKey="actual_quantity"
                    header={<div className="gorAuditHeader"><FormattedMessage id="resolveAudit.table.actualQuantity" description="actualQuantity Column" defaultMessage="ACTUAL QUANTITY"/> </div>
                    }
                    cell={  <TextCell data={auditDataList} setClass={GOR_BREACHED_LINES}> </TextCell>}
                    width={220}
                />
                <Column
                    columnKey="status"
                    header={<div className="gorAuditHeader"><FormattedMessage id="resolveAudit.table.STATUS" description="status Column" defaultMessage="STATUS"/> </div>}
                    cell={  <TextCell data={auditDataList}> </TextCell>}
                    width={220}
                />

                <Column
                    columnKey="resolve"
                    header={<div className="gorAuditHeader"> <FormattedMessage id="resolveAudit.table.resolve" description="resolve Column" defaultMessage="RESOLVE"/> </div>}
                    cell={  <ResolveCell data={auditDataList} checkStatus={this._checkAuditStatus.bind(this)} screenId={screenId}> </ResolveCell>}
                    width={220}
                />
            </Table>
        </div>
    }

   return resolveTable;                 

  }
  _findDisplayidName(rawString)
  {
    return rawString.split(',');
  }
  
  render()
  {
      var {auditDataList}=this.state, screenId=this.props.screenId, auditType=this.props.auditType;
      var auditData=this._findDisplayidName(this.props.auditId);
      var auditbysku=(this.state.auditParamType===AUDIT_BY_SKU?false:true), resolveTable=<div/>;
      var totalLines=auditDataList.getSize()?auditDataList.getSize():0;
      if(auditbysku) {
        resolveTable=this._renderSkutable();
      }
      else {
        var groupingBySlotId=this._resolveIssueByPdfa();
        resolveTable=this._renderPDFAtable(groupingBySlotId);
        
      }
      
      return (
        <div>
          <div className="gor-modal-content">
            <div className='gor-modal-head'>
              <div className='gor-audit-resolve'>
                {screenId===APPROVE_AUDIT?
                  <FormattedMessage id="audit.resolve.heading" description='Heading for resolve audit' defaultMessage='Resolve issues'/> :
                  <FormattedMessage id="audit.viewIssues.heading" description='Heading for view issues audit' defaultMessage='View issues'/>
                }
                <span className="close" onClick={this._removeThisModal.bind(this)}>×</span>
              </div>
            </div>
            <div className='gor-modal-body'>
            <Spinner isLoading={this.props.auditResolveSpinner} setSpinner={this.props.setResolveAuditSpinner}/>
              <div className='gor-usr-form'>
                <div className="gor-auditResolve-h1"> 
                  <FormattedMessage id="audit.header.information" description='missing information for audit' 
                                    defaultMessage='Audit task #{auditId}' 
                                    values={{missingAudit: this.state.totalMismatch, auditId:auditData[1],auditType: auditType}}/> 
                </div>
                <div className="gor-auditResolve-h2">
                  <FormattedMessage id="audit.missing.auditType" description='missing information for audit type' 
                                    defaultMessage='Mismatch found in {totalLines} slot' 
                                    values={{totalLines: totalLines}}/> 
                </div>
                <div className="gor-audit-detail">
                  {resolveTable}
                  
                    {screenId===APPROVE_AUDIT?
                      <div className="gor-auditResolve-btn-wrap">
                        <div className="gor-auditresolve-btn">                    
                          <button className="gor-refresh-btn" onClick={this._removeThisModal.bind(this)}>
                            <FormattedMessage id="resolveAudit.cancelLabel" description="button label for cancel" defaultMessage="Cancel" />
                          </button>
                        </div>
                        <div className="gor-auditresolve-btn">
                          <button disabled={!this.state.checkedState || this.state.checkedState.length<1} className="gor-add-btn" onClick={this._confirmIssues.bind(this)}>
                            <FormattedMessage id="resolveAudit.confirmLabel" description='button label for confirm' defaultMessage='Confirm'/>
                          </button>
                        </div>   
                      </div> :
                      <div className="gor-auditIssue-btn-wrap">
                        <button className="gor-refresh-btn" onClick={this._removeThisModal.bind(this)}>
                          <FormattedMessage id="resolveAudit.closeLabel" description="button label for close" defaultMessage="Close" />
                        </button> 
                      </div> 
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  ResolveAudit.defaultProps = {
    auditLines:null,
    audit_param_type:null,
    datachange:false
    

  };


var mapDispatchToProps=function(dispatch){
  return {
    notifyfeedback: function (data) {dispatch(notifyfeedback(data))},
    setNotification: function (data) {dispatch(setNotification(data))   },
    notifyFail:function (data) {dispatch(notifyFail(data)) }
  }
};

ResolveAudit.contextTypes={
 intl:React.PropTypes.object.isRequired
}

const clientauditResolveData = graphql(auditResolveData, {
  props: (data) => ({
     auditLines: data.data.auditResolveData?JSON.parse(data.data.auditResolveData.auditLines):"",
     audit_param_type:data.data.auditResolveData.audit_param_type,
     datachange:data.data.auditResolveData.datachange
  })
})


const SET_RESOLVE_DETAILS = gql`
    mutation setResolveDetails($auditPendingLines: String!) {
        setAuditPendingLines(auditPendingLines: $auditPendingLines) @client
    }
`;
const setResolveDetails = graphql(SET_RESOLVE_DETAILS, {
  props: ({mutate, ownProps}) => ({
    setResolveDetails: function (data) {
          mutate({variables: {auditPendingLines: data}})
      },
  }),
});


const SET_RESOLVE_AUDIT_SPINNER_STATE = gql`
    mutation setviewAuditSpinner($resolveAuditSpinner: String!) {
        setViewAuditSpinnerState(resolveAuditSpinner: $resolveAuditSpinner) @client
    }
`;
const setResolveSpinnerState = graphql(SET_RESOLVE_AUDIT_SPINNER_STATE, {
  props: ({mutate, ownProps}) => ({
    setResolveAuditSpinner: function (resolveAuditSpinner) {
          mutate({variables: {resolveAuditSpinner: resolveAuditSpinner}})
      },
  }),
});
const SET_AUDIT_LIST_REFRESH_STATE = gql`
    mutation setauditListRefresh($auditRefreshFlag: String!) {
      setAuditListRefreshState(auditRefreshFlag: $auditRefreshFlag) @client
    }
`;
const setAuditListRefreshState = graphql(SET_AUDIT_LIST_REFRESH_STATE, {
  props: ({mutate, ownProps}) => ({
    setAuditListRefresh: function (auditRefreshFlag) {
          mutate({variables: {auditRefreshFlag: auditRefreshFlag}})
      },
  }),
});
const clientResolveSpinnerState = graphql(auditResolveSpinnerState, {
  props: (data) => ({
    auditResolveSpinner:data.data.auditSpinnerstatus?data.data.auditSpinnerstatus.resolveAuditSpinner:false
  })
})

ResolveAudit.defaultProps = {
  auditResolveSpinner:false,
};
export default compose(
  withApollo,
  setResolveDetails,
  clientauditResolveData,
  clientResolveSpinnerState,
  setResolveSpinnerState,
  setAuditListRefreshState
)
  (connect(null,mapDispatchToProps)(ResolveAudit));
