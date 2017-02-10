import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage,FormattedPlural } from 'react-intl'; 
import { connect } from 'react-redux';
import {getAuditOrderLines,resolveAuditLines} from '../../actions/auditActions';
import {GET,APP_JSON,AUDIT_RESOLVE_LINES,GOR_BREACHED_LINES,VIEW_AUDIT_ISSUES,APPROVE_AUDIT,GOR_USER_TABLE_HEADER_HEIGHT,GOR_AUDIT_RESOLVE_MIN_HEIGHT,GOR_AUDIT_RESOLVE_WIDTH, POST, AUDIT_RESOLVE_CONFIRMED} from '../../constants/frontEndConstants';
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
      processedData.push(auditData);
      auditData =  {};
    }
    this.setState({totalMismatch:totalMismatch})
    return processedData;
  } 

  _checkAuditStatus(rowIndex,state) {
    var newAuditLineId = this.state.auditDataList.newData[rowIndex].auditLineId
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
  
  render()
  {
      var {auditDataList} = this.state;
      var rowsCount = 0, minHeight = GOR_AUDIT_RESOLVE_MIN_HEIGHT;
      var screenId = this.props.screenId, auditType = this.props.auditType;
      var missingAudit = auditDataList.getSize(), auditId = this.props.displayId, headerHeight=GOR_USER_TABLE_HEADER_HEIGHT;
      var containerHeight = (((missingAudit?missingAudit:0)*headerHeight + headerHeight)>minHeight?((missingAudit?missingAudit:0)*headerHeight + headerHeight):minHeight);
     
      
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
                        header={
                            <div className="gorAuditHeader">
                              <FormattedMessage id="resolveAudit.table.slot" description="slot id Column" defaultMessage ="SLOT ID"/> 
                            </div>
                        }
                        cell={  <TextCell data={auditDataList} />}
                        width={220}
                      />
                      <Column
                        columnKey="expected_quantity"
                        header={
                            <div className="gorAuditHeader">
                              <FormattedMessage id="resolveAudit.table.expectedItems" description="expectedItems Column" defaultMessage ="EXPECTED QUANTITY"/> 
                            </div>
                        }
                        cell={  <TextCell data={auditDataList} />}
                        width={220}
                      />
                      <Column
                        columnKey="actual_quantity"
                        header={
                            <div className="gorAuditHeader">
                              <FormattedMessage id="resolveAudit.table.actualQuantity" description="actualQuantity Column" defaultMessage ="ACTUAL QUANTITY"/> 
                            </div>
                        }
                        cell={  <TextCell data={auditDataList} setClass={GOR_BREACHED_LINES}> </TextCell>}
                        width={220}
                      />
                      <Column
                        columnKey="status"
                        header={
                            <div className="gorAuditHeader">
                              <FormattedMessage id="resolveAudit.table.STATUS" description="status Column" defaultMessage ="STATUS"/> 
                            </div>
                        }
                        cell={  <TextCell data={auditDataList}> </TextCell>}
                        width={220}
                      />

                      <Column
                        columnKey="resolve"
                        header={
                            <div className="gorAuditHeader">
                              <FormattedMessage id="resolveAudit.table.resolve" description="resolve Column" defaultMessage ="RESOLVE"/> 
                            </div>
                        }
                        cell={  <ResolveCell data={auditDataList} checkStatus={this._checkAuditStatus.bind(this)} screenId={screenId}> </ResolveCell>}
                        width={220}
                      />
                     
                    </Table>
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