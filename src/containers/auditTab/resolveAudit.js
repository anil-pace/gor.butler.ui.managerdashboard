import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage,FormattedPlural } from 'react-intl'; 
import { connect } from 'react-redux';
import {getAuditOrderLines,resolveAuditLines} from '../../actions/auditActions';
import {GET,APP_JSON,AUDIT_RESOLVE_LINES,GOR_BREACHED_LINES,VIEW_AUDIT_ISSUES,APPROVE_AUDIT,GOR_USER_TABLE_HEADER_HEIGHT,GOR_AUDIT_RESOLVE_MIN_HEIGHT,GOR_AUDIT_RESOLVE_WIDTH, POST, AUDIT_RESOLVE_CONFIRMED,AUDIT_BY_PDFA} from '../../constants/frontEndConstants';
import {AUDIT_URL, PENDING_ORDERLINES, AUDIT_ANAMOLY} from '../../constants/configConstants';
import {Table, Column, Cell} from 'fixed-data-table';
import {tableRenderer,TextCell,DataListWrapper,ResolveCell} from '../../components/commonFunctionsDataTable';
import {stringConfig} from '../../constants/backEndConstants';
import Spinner from '../../components/spinner/Spinner';
import {setResolveAuditSpinner} from '../../actions/spinnerAction';
class ResolveAudit extends React.Component{
  constructor(props) 
  {
      super(props); 
      var data = this.props.auditLines.auditlines || [];
      this._dataList = new tableRenderer(data ? data.length : 0);
      this._dataList.newData=data;
      this.state = {
      auditDataList: this._dataList,
      checkedState: [],
      totalMismatch: 0,
      } 
  }

  componentWillReceiveProps(nextProps){

     var data = nextProps.auditLines.auditlines || [], processedData;
      processedData = this._processData(data,nextProps);
      this._dataList = new tableRenderer(data ? data.length : 0);
      this._dataList.newData=processedData;
      this.state = {
      auditDataList: this._dataList,
      checkedState: [],
      totalMismatch: 0,
      }
  }
  _removeThisModal() {
    this.props.removeModal();
  }

  componentDidMount() {
        let url = AUDIT_URL + "/" + this.props.auditId + PENDING_ORDERLINES; 
        let paginationData={
         'url':url,
         'method':GET,
         'cause': AUDIT_RESOLVE_LINES,
         'token': this.props.auth_token,
         'contentType':APP_JSON
        } 
        this.props.setResolveAuditSpinner(true);
       this.props.getAuditOrderLines(paginationData);  
  }
  

  _processData(auditLines,nProps) {
    var data = auditLines, processedData = [], auditData = {}, totalMismatch = 0;
    for (var i = data.length - 1; i >= 0; i--) {
      auditData.actual_quantity = data[i].actual_quantity;
      auditData.expected_quantity = data[i].expected_quantity;
      totalMismatch = (data[i].expected_quantity-data[i].actual_quantity) + totalMismatch;
      auditData.slot_id = data[i].slot_id;
      auditData.auditLineId = data[i].auditline_id;
      if(this.context.intl.formatMessage(stringConfig[data[i].status])) {
        auditData.status = this.context.intl.formatMessage(stringConfig[data[i].status]);
      } 
      else{
        auditData.status = data[i].status;
      }
      if(data[i].pdfa_audit_attributes && auditLines[0].pdfa_audit_attributes[Object.keys(auditLines[0].pdfa_audit_attributes)]) {
        auditData.attributeDetail = auditLines[0].pdfa_audit_attributes[Object.keys(auditLines[0].pdfa_audit_attributes)];  //assuming only one attributes is there as of now (kerry specific) 
      }
      processedData.push(auditData);
      auditData =  {};

    }
    this.setState({totalMismatch:totalMismatch})
    return processedData;
  } 

  _checkAuditStatus(rowIndex,state,auditLineId) {
    var newAuditLineId;
    if(this.props.auditMethod===AUDIT_BY_PDFA) {
      var newAuditLineIndex = this.actualMapping[auditLineId]; //in case of pdfa rowindex wont work so using actual index
      newAuditLineId = this.state.auditDataList.newData[newAuditLineIndex].auditLineId;
    }
    else{
      newAuditLineId = this.state.auditDataList.newData[rowIndex].auditLineId
    }
    var checkedAudit = {"response":state, "auditline_id":newAuditLineId}, auditIndexed = false;
    var tempState = this.state.checkedState.slice();
    for (var i = tempState.length - 1; i >= 0; i--) {
      if(tempState[i].auditline_id === newAuditLineId) {
        tempState[i].response = state;
        auditIndexed = true;
        break;
      }
    }
    if(!auditIndexed) {
      tempState.push(checkedAudit)
    }
    this.setState({checkedState:tempState})
  }

  _confirmIssues() {
    
    var auditConfirmDetail = {"data":this.state.checkedState};
    var url = AUDIT_URL + AUDIT_ANAMOLY;
     let paginationData={
         'url':url,
         'method':POST,
         'cause': AUDIT_RESOLVE_CONFIRMED,
         'token': this.props.auth_token,
         'contentType':APP_JSON,
         'accept':APP_JSON,
         'formdata': auditConfirmDetail
        }
        this.props.resolveAuditLines(paginationData);
     
    this._removeThisModal();
  }

  _resolveIssueByPdfa() {
    var slotIdHashMap = {};
    var auditDataLine = this.state.auditDataList.newData; 
    var slotIdGrouping={}, slotIdData={slotId:"", slotIdDataLine:[]}, actualMapping={};
    for (var i = auditDataLine.length - 1; i >= 0; i--) {
      var columnSlotId = auditDataLine[i].slot_id;
      if(slotIdHashMap[columnSlotId]>=0) {
        slotIdGrouping[columnSlotId].slotIdDataLine.push(auditDataLine[i]);
        actualMapping[auditDataLine[i].auditLineId] = i;
        //slotIdGrouping.totalLines = slotIdGrouping.totalLines + 1;
      }

      else {
        slotIdHashMap[columnSlotId] = i;
        slotIdData.slotId = auditDataLine[i].slot_id;
        slotIdData.slotIdDataLine.push(auditDataLine[i]);
        slotIdGrouping[columnSlotId] = slotIdData;
        actualMapping[auditDataLine[i].auditLineId] = i;
        //slotIdGrouping.totalLines = slotIdGrouping.totalLines + 2;
        slotIdData={slotId:"", slotIdDataLine:[]}
      }
    }
    this.actualMapping = actualMapping; //due to grouping, actual mapping is lost. hence storing here
    return slotIdGrouping;
  }

  _renderPDFAtable(data) {
    var pdfaResolveTable = [],resolveTable;
    var pdfaHeader = <Table
                      rowHeight={GOR_USER_TABLE_HEADER_HEIGHT}
                      rowsCount={0}
                      headerHeight={GOR_USER_TABLE_HEADER_HEIGHT}
                      width={GOR_AUDIT_RESOLVE_WIDTH}
                      height={GOR_USER_TABLE_HEADER_HEIGHT}
                      {...this.props}>
                      <Column header={<div className="gorAuditHeader">
                                        <FormattedMessage id="resolveAudit.table.batchID" description="batch id Column" defaultMessage ="BOX ID."/> 
                                      </div>} width={220}/>
                      <Column header={<div className="gorAuditHeader">
                                        <FormattedMessage id="resolveAudit.table.expectedItems" description="expectedItems Column" defaultMessage ="EXPECTED QUANTITY"/> 
                                     </div>} width={220}/>
                      <Column header={<div className="gorAuditHeader">
                                        <FormattedMessage id="resolveAudit.table.actualQuantity" description="actualQuantity Column" defaultMessage ="ACTUAL QUANTITY"/> 
                                      </div>} width={220}/>
                      <Column header={<div className="gorAuditHeader">
                                        <FormattedMessage id="resolveAudit.table.STATUS" description="status Column" defaultMessage ="STATUS"/> 
                                      </div>} width={220}/>
                      <Column header={<div className="gorAuditHeader">
                                        <FormattedMessage id="resolveAudit.table.resolve" description="resolve Column" defaultMessage ="RESOLVE"/> 
                                      </div>} width={220}/>
                    </Table> 

    pdfaResolveTable.push(pdfaHeader)                   
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var auditDataList = new tableRenderer(data[key].slotIdDataLine ? data[key].slotIdDataLine.length : 0);
        var inSlot = <FormattedMessage id="audit.inSlot.text" defaultMessage='In slot '/> 
        var containerHeight = (auditDataList.getSize())*GOR_USER_TABLE_HEADER_HEIGHT+2;
        auditDataList.newData=data[key].slotIdDataLine;
        resolveTable =<div> 
                      <div className="gor-auditresolve-pdfa-slot-header">
                        <span>{inSlot}</span>
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
    var resolveTable = <div/>, headerHeight=GOR_USER_TABLE_HEADER_HEIGHT,minHeight = GOR_AUDIT_RESOLVE_MIN_HEIGHT;
    var {auditDataList} = this.state 
    var missingAudit = auditDataList.getSize();
    var screenId = this.props.screenId
    var containerHeight = (((missingAudit?missingAudit:0)*headerHeight + headerHeight)>minHeight?((missingAudit?missingAudit:0)*headerHeight + headerHeight):minHeight);
    resolveTable = <div>
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
                        header={<div className="gorAuditHeader"> <FormattedMessage id="resolveAudit.table.slot" description="slot id Column" defaultMessage ="SLOT ID"/> </div>}
                        cell={  <TextCell data={auditDataList} />}
                        width={220}
                      />
                      <Column
                        columnKey="expected_quantity"
                        header={<div className="gorAuditHeader"> <FormattedMessage id="resolveAudit.table.expectedItems" description="expectedItems Column" defaultMessage ="EXPECTED QUANTITY"/> </div>}
                        cell={  <TextCell data={auditDataList} />}
                        width={220}
                      />
                      <Column
                        columnKey="actual_quantity"
                        header={<div className="gorAuditHeader"><FormattedMessage id="resolveAudit.table.actualQuantity" description="actualQuantity Column" defaultMessage ="ACTUAL QUANTITY"/> </div>
                        }
                        cell={  <TextCell data={auditDataList} setClass={GOR_BREACHED_LINES}> </TextCell>}
                        width={220}
                      />
                      <Column
                        columnKey="status"
                        header={<div className="gorAuditHeader"><FormattedMessage id="resolveAudit.table.STATUS" description="status Column" defaultMessage ="STATUS"/> </div>}
                        cell={  <TextCell data={auditDataList}> </TextCell>}
                        width={220}
                      />

                      <Column
                        columnKey="resolve"
                        header={<div className="gorAuditHeader"> <FormattedMessage id="resolveAudit.table.resolve" description="resolve Column" defaultMessage ="RESOLVE"/> </div>}
                        cell={  <ResolveCell data={auditDataList} checkStatus={this._checkAuditStatus.bind(this)} screenId={screenId}> </ResolveCell>}
                        width={220}
                      /> 
                    </Table>
                    </div>
   return resolveTable;                 

  }
  
  render()
  {
      var {auditDataList} = this.state, screenId = this.props.screenId, auditType = this.props.auditType, auditId = this.props.displayId;
      var auditbysku= (this.props.auditMethod==="pdfa"?false:true), resolveTable = <div/>;
      if(auditbysku) {
        resolveTable = this._renderSkutable();
      }
      else {
        var groupingBySlotId = this._resolveIssueByPdfa();
        resolveTable = this._renderPDFAtable(groupingBySlotId);
        
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
                  <FormattedMessage id="audit.missing.information" description='missing information for audit' 
                                    defaultMessage='{missingAudit} Items missing in Audit task #{auditId}' 
                                    values={{missingAudit: this.state.totalMismatch, auditId:auditId}}/> 
                </div>
                <div className="gor-auditResolve-h2">
                  <FormattedMessage id="audit.missing.auditType" description='missing information for audit type' 
                                    defaultMessage='For the {auditType}' 
                                    values={{auditType: auditType}}/> 
                </div>
                <div className="gor-audit-detail">
                  {resolveTable}
                  
                    {screenId===APPROVE_AUDIT?
                      <div className="gor-auditResolve-btn-wrap">
                        <div className="gor-auditresolve-btn">                    
                          <button className="gor-refresh-btn" onClick={this._removeThisModal.bind(this)}>
                            <FormattedMessage id="resolveAudit.cancelLabel" description="button label for cancel" defaultMessage ="Cancel" />
                          </button>
                        </div>
                        <div className="gor-auditresolve-btn">
                          <button className="gor-add-btn" onClick={this._confirmIssues.bind(this)}>
                            <FormattedMessage id="resolveAudit.confirmLabel" description='button label for confirm' defaultMessage='Confirm'/>
                          </button>
                        </div>   
                      </div> :
                      <div className="gor-auditIssue-btn-wrap">
                        <button className="gor-refresh-btn" onClick={this._removeThisModal.bind(this)}>
                          <FormattedMessage id="resolveAudit.closeLabel" description="button label for close" defaultMessage ="Close" />
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

  function mapStateToProps(state, ownProps){
  return {
    auth_token:state.authLogin.auth_token,
    auditLines:state.recieveAuditDetail.auditPendingLines || [],
    auditResolveSpinner:state.spinner.auditResolveSpinner || false
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    resolveAuditLines: function(data){dispatch(resolveAuditLines(data))},
    getAuditOrderLines: function(data){dispatch(getAuditOrderLines(data))},
    setResolveAuditSpinner: function(data){dispatch(setResolveAuditSpinner(data))}
  }
};

ResolveAudit.contextTypes ={
 intl:React.PropTypes.object.isRequired
}


export default connect(mapStateToProps,mapDispatchToProps)(ResolveAudit);