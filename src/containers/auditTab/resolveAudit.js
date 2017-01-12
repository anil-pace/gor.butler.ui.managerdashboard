import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage,FormattedPlural } from 'react-intl'; 
import { connect } from 'react-redux';
import {getAuditOrderLines} from '../../actions/auditActions';
import {GET,APP_JSON,AUDIT_RESOLVE_LINES,GOR_BREACHED_LINES} from '../../constants/frontEndConstants';
import {AUDIT_URL, PENDING_ORDERLINES} from '../../constants/configConstants';
import {Table, Column, Cell} from 'fixed-data-table';
import {tableRenderer,TextCell,DataListWrapper,ResolveCell} from '../../components/commonFunctionsDataTable';
import {stringConfig} from '../../constants/backEndConstants';

class ResolveAudit extends React.Component{
  constructor(props) 
  {
      super(props); 
      var data = this.props.auditLines.auditlines || [];
      this._dataList = new tableRenderer(data ? data.length : 0);
      this._dataList.newData=data;
      this.state = {
      auditDataList: this._dataList,
      } 
  }

  componentWillReceiveProps(nextProps){

     var data = nextProps.auditLines.auditlines || [], processedData;
      processedData = this.processData(data,nextProps);
      this._dataList = new tableRenderer(data ? data.length : 0);
      this._dataList.newData=processedData;
      this.state = {
      auditDataList: this._dataList,
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
       this.props.getAuditOrderLines(paginationData);  
  }
  

  processData(auditLines,nProps) {
    var data = auditLines, processedData = [], auditData = {};
    for (var i = data.length - 1; i >= 0; i--) {
      auditData.actual_quantity = data[i].actual_quantity;
      auditData.expected_quantity = data[i].expected_quantity;
      auditData.slot_id = data[i].expected_quantity;
      if(this.context.intl.formatMessage(stringConfig[data[i].status])) {
        auditData.status = this.context.intl.formatMessage(stringConfig[data[i].status]);
      } 
      else{
        auditData.status = data[i].status;
      }
      //auditData.status = data[i].status;
      processedData.push(auditData);
      auditData =  {};
    }
    return processedData;

  } 
  
  render()
  {
      console.log(this.props.auditLines)
      var {auditDataList} = this.state;
      var rowsCount = 0;
    
      return (
        <div>
          <div className="gor-modal-content">
            <div className='gor-modal-head'>
              <div className='gor-usr-add'>
                <FormattedMessage id="audit.resolve.heading" description='Heading for resolve audit' defaultMessage='Resolve issues'/>
                <span className="close" onClick={this._removeThisModal.bind(this)}>×</span>
              </div>
            </div>
            <div className='gor-modal-body'>
              <div className='gor-usr-form'>
                <div className="gor-audit-detail">
                  <Table
                      rowHeight={50}
                      rowsCount={auditDataList.getSize()}
                      headerHeight={50}
                      onColumnResizeEndCallback={this._onColumnResizeEndCallback}
                      isColumnResizing={false}
                      width={1200}
                      height={500}
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
                        columnKey="status"
                        header={
                            <div className="gorAuditHeader">
                              <FormattedMessage id="resolveAudit.table.STATUS" description="status Column" defaultMessage ="STATUS"/> 
                            </div>
                        }
                        cell={  <ResolveCell > </ResolveCell>}
                        width={220}
                      />
                     
                    </Table>
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
    auditLines:state.recieveAuditDetail.auditPendingLines || []
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    getAuditOrderLines: function(data){dispatch(getAuditOrderLines(data))},
    
  }
};

ResolveAudit.contextTypes ={
 intl:React.PropTypes.object.isRequired
}


export default connect(mapStateToProps,mapDispatchToProps)(ResolveAudit);