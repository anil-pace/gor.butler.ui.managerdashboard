import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {auditFilterToggle,filterApplied,auditfilterState,toggleAuditFilter,setFilterApplyFlag} from '../../actions/filterAction';
import { connect } from 'react-redux'; 
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {setTextBoxStatus}  from '../../actions/auditActions';
import {handelTokenClick, handleInputQuery} from '../../components/tableFilter/tableFilterCommonFunctions';
import {REJECTED,RESOLVED,INPROGRESS,PENDING,ANY,ALL,SKU,LOCATION,ISSUE_FOUND,SPECIFIC_SKU_ID,SPECIFIC_LOCATION_ID,AUDIT_TASK_ID,AUDIT_TYPE}from '../../constants/frontEndConstants';

class AuditFilter extends React.Component{
	constructor(props) 
	{
   super(props);
   this.state = {tokenSelected: {"AUDIT TYPE":[ANY], "STATUS":[ALL]}, searchQuery: {},
   defaultToken: {"AUDIT TYPE":[ANY], "STATUS":[ALL]}}; 
 }

 _closeFilter() {
  var filterState = !this.props.auditToggleFilter;
  this.props.auditFilterToggle(filterState);
}	

componentWillMount(){
  if(this.props.auditFilterState) {
    this.setState(this.props.auditFilterState)
  }
}  



_mappingArray(selectedToken){
  var mappingArray=[];
 selectedToken.map(function(value,i) {
    if(value=="sku"){
      mappingArray.push(SPECIFIC_SKU_ID)
    }
    else if(value=="location")
    {
      mappingArray.push(SPECIFIC_LOCATION_ID)
    }
    else
    {
      mappingArray.push(SPECIFIC_SKU_ID,SPECIFIC_LOCATION_ID);
    }
    
  });
  mappingArray.push(AUDIT_TASK_ID);
  return mappingArray;
}
_processAuditSearchField(){
  const filterInputFields = [{value:AUDIT_TASK_ID, label:<FormattedMessage id="audit.inputField.id" defaultMessage ="AUDIT TASK ID"/>}, 
  {value:SPECIFIC_SKU_ID, label:<FormattedMessage id="audit.inputField.sku" defaultMessage ="SPECIFIC SKU ID"/>},
  {value:SPECIFIC_LOCATION_ID, label:<FormattedMessage id="audit.inputField.location" defaultMessage ="SPECIFIC LOCATION ID"/>}];
  var inputValue = this.state.searchQuery;
  var textboxStatus=this.props.textboxStatus||{};
  var inputField = <FilterInputFieldWrap inputText={filterInputFields} handleInputText={this._handleInputQuery.bind(this)} inputValue={inputValue} textboxStatus={textboxStatus}/>
  return inputField;           
}

_processFilterToken() {
  var tokenAuditTypeField = {value:"AUDIT TYPE", label:<FormattedMessage id="audit.tokenfield.typeAudit" defaultMessage ="AUDIT TYPE"/>};
  var tokenStatusField = {value:"STATUS", label:<FormattedMessage id="audit.tokenfield.STATUS" defaultMessage ="STATUS"/>}; 
  const labelC1 = [
  { value: ANY, label:<FormattedMessage id="audit.token1.all" defaultMessage ="Any"/> },
  { value: SKU, label:<FormattedMessage id="audit.token1.sku" defaultMessage ="SKU"/> },
  { value: LOCATION, label:<FormattedMessage id="audit.token1.location" defaultMessage ="Location"/> }
  ];
  const labelC2 = [
  { value: ALL, label:<FormattedMessage id="audit.token2.all" defaultMessage ="Any"/> },
  { value: ISSUE_FOUND, label:<FormattedMessage id="audit.token2.issueFound" defaultMessage ="Issue found"/>},
  { value: REJECTED, label:<FormattedMessage id="audit.token2.rejected" defaultMessage ="Rejected"/> },
  { value: RESOLVED, label:<FormattedMessage id="audit.token2.resolved" defaultMessage ="Resolved"/> },
  { value: INPROGRESS , label:<FormattedMessage id="audit.token2.inProgress" defaultMessage ="In progress"/>},
  { value: PENDING , label:<FormattedMessage id="audit.token2.pending" defaultMessage ="Pending"/> }
  ];
  var selectedToken =  this.state.tokenSelected;
  var column1 = <FilterTokenWrap field={tokenStatusField} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC2} selectedToken={selectedToken}/>;
  var column2 = <FilterTokenWrap field={tokenAuditTypeField} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC1} selectedToken={selectedToken}/>;
  var columnDetail = {column1token:column1, column2token:column2};
  return columnDetail;
}

_handelTokenClick(field,value,state) {
  var obj={};
  this.setState({tokenSelected:handelTokenClick(field,value,state,this.state)});
  var selectedToken=this.state.tokenSelected['AUDIT TYPE'];
  if(state!=='addDefault'){
    obj.name=this._mappingArray(selectedToken);
    this.props.setTextBoxStatus(obj);
  }
  else
  {
    this.props.setTextBoxStatus(obj);
  }
}

_handleInputQuery(inputQuery,queryField) {
  this.setState({searchQuery:handleInputQuery(inputQuery,queryField,this.state)});

}

_applyFilter() {
  var filterState = this.state
  this.props.auditfilterState(filterState);
  this.props.refreshOption(this.state);
  this.props.toggleAuditFilter(true);
  this.props.setFilterApplyFlag(true);

}

_clearFilter() {
  var clearState = {},obj={};
  this.setState({tokenSelected: {"AUDIT TYPE":[ANY], "STATUS":[ALL]}, searchQuery: {}});
  this.props.auditfilterState({tokenSelected: {"AUDIT TYPE":[ANY], "STATUS":[ALL]}, searchQuery: {}});
  this.props.filterApplied(false);
  this.props.setTextBoxStatus(obj);
  this.props.refreshOption(clearState);
  this.props.toggleAuditFilter(false);
   this.props.setFilterApplyFlag(true);
}

render(){
   var noOrder = this.props.noorderFlag;
  var auditSearchField = this._processAuditSearchField();
  var auditFilterToken = this._processFilterToken();
  return (
   <div>
   <Filter hideFilter={this._closeFilter.bind(this)} 
   clearFilter={this._clearFilter.bind(this)}
   searchField={auditSearchField}
   filterTokenC1={auditFilterToken.column1token}
   filterTokenC2={auditFilterToken.column2token}
   formSubmit={this._applyFilter.bind(this)}
   responseFlag={this.props.auditSpinner}
   noDataFlag={noOrder}
   />
   </div>
   );
}
};


function mapStateToProps(state, ownProps){
  return {
    auditToggleFilter: state.filterInfo.auditToggleFilter || false,
    auditSpinner: state.spinner.auditSpinner || false,
    totalAudits: state.recieveAuditDetail.totalAudits || 0,
    noorderFlag:state.recieveAuditDetail.emptyResponse || false,
    auditFilterState: state.filterInfo.auditFilterState,
    auditFilterStatus: state.filterInfo.auditFilterStatus,
    textboxStatus:  state.auditInfo.textBoxStatus  || {}
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    auditFilterToggle: function(data){dispatch(auditFilterToggle(data));},
    filterApplied: function(data){dispatch(filterApplied(data));},
    setTextBoxStatus: function(data){dispatch(setTextBoxStatus(data));},
    auditfilterState: function(data){dispatch(auditfilterState(data));},
    toggleAuditFilter: function(data){dispatch(toggleAuditFilter(data));},
     setFilterApplyFlag: function (data) {dispatch(setFilterApplyFlag(data));}
}
}

AuditFilter.PropTypes={
  auditToggleFilter:React.PropTypes.bool,
  auditSpinner:React.PropTypes.bool,
  totalAudits:React.PropTypes.number,
  auditFilterToggle:React.PropTypes.func,
  filterApplied:React.PropTypes.func,
  auditFilterState:React.PropTypes.object,
  auditFilterStatus:React.PropTypes.bool,
  setFilterApplyFlag:React.PropTypes.func,
  toggleAuditFilter:React.PropTypes.func,
  auditfilterState:React.PropTypes.func,
  noorderFlag:React.PropTypes.bool,
  setTextBoxStatus:React.PropTypes.func
};


export default connect(mapStateToProps,mapDispatchToProps)(AuditFilter) ;