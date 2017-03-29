import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {showTableFilter,filterApplied} from '../../actions/filterAction';
import { connect } from 'react-redux'; 
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {handelTokenClick, handleInputQuery} from '../../components/tableFilter/tableFilterCommonFunctions';
class AuditFilter extends React.Component{
	constructor(props) 
	{
    	super(props);
        this.state = {tokenSelected: {"AUDIT TYPE":["all"], "STATUS":["all"]}, searchQuery: {},
                      defaultToken: {"AUDIT TYPE":["all"], "STATUS":["all"]}}; 
    }

    _closeFilter() {
        var filterState = !this.props.showFilter;
        this.props.showTableFilter(filterState);
    }	

    _processAuditSearchField(){
        const filterInputFields = [{value:"AUDIT TASK ID", label:<FormattedMessage id="audit.inputField.id" defaultMessage ="AUDIT TASK ID"/>}, 
                    {value:"SPECIFIC SKU ID", label:<FormattedMessage id="audit.inputField.sku" defaultMessage ="SPECIFIC SKU ID"/>},
                    {value:"SPECIFIC LOCATION ID", label:<FormattedMessage id="audit.inputField.location" defaultMessage ="SPECIFIC LOCATION ID"/>}];
        var inputValue = this.state.searchQuery;
        var inputField = <FilterInputFieldWrap inputText={filterInputFields} handleInputText={this._handleInputQuery.bind(this)} inputValue={inputValue}/>
        return inputField;           
    }
 
    _processFilterToken() {
        var tokenAuditTypeField = {value:"AUDIT TYPE", label:<FormattedMessage id="audit.tokenfield.typeAudit" defaultMessage ="AUDIT TYPE"/>};
        var tokenStatusField = {value:"STATUS", label:<FormattedMessage id="audit.tokenfield.STATUS" defaultMessage ="STATUS"/>}; 
        const labelC1 = [
                    { value: 'all', label:<FormattedMessage id="audit.token1.all" defaultMessage ="Any"/> },
                    { value: 'sku', label:<FormattedMessage id="audit.token1.sku" defaultMessage ="SKU"/> },
                    { value: 'location', label:<FormattedMessage id="audit.token1.location" defaultMessage ="Location"/> }
                    ];
        const labelC2 = [
                    { value: 'all', label:<FormattedMessage id="audit.token2.all" defaultMessage ="Any"/> },
                    { value: 'issueFound', label:<FormattedMessage id="audit.token2.issueFound" defaultMessage ="Issue found"/>},
                    { value: 'rejected', label:<FormattedMessage id="audit.token2.rejected" defaultMessage ="Rejected"/> },
                    { value: 'resolved', label:<FormattedMessage id="audit.token2.resolved" defaultMessage ="Resolved"/> },
                    { value: 'inProgress', label:<FormattedMessage id="audit.token2.inProgress" defaultMessage ="In progress"/>},
                    { value: 'pending', label:<FormattedMessage id="audit.token2.pending" defaultMessage ="Pending"/> }
                    ];
        var selectedToken =  this.state.tokenSelected;
        var column1 = <FilterTokenWrap field={tokenStatusField} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC2} selectedToken={selectedToken}/>;
        var column2 = <FilterTokenWrap field={tokenAuditTypeField} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC1} selectedToken={selectedToken}/>;
        var columnDetail = {column1token:column1, column2token:column2};
        return columnDetail;
    }

    _handelTokenClick(field,value,state) {
        this.setState({tokenSelected:handelTokenClick(field,value,state,this.state)});
    }

    _handleInputQuery(inputQuery,queryField) {
        this.setState({searchQuery:handleInputQuery(inputQuery,queryField,this.state)});
    }

    _applyFilter() {
      this.props.refreshOption(this.state);
    }

    _clearFilter() {
        var clearState = {};
        this.setState({tokenSelected: {"AUDIT TYPE":["all"], "STATUS":["all"]}, searchQuery: {}});
        this.props.filterApplied(false);
        this.props.refreshOption(clearState)
    }

	render(){
        var noOrder = this.props.totalAudits?false:true;
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
    showFilter: state.filterInfo.filterState || false,
    auditSpinner: state.spinner.auditSpinner || false,
    totalAudits: state.recieveAuditDetail.totalAudits || 0,
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    showTableFilter: function(data){dispatch(showTableFilter(data));},
    filterApplied: function(data){dispatch(filterApplied(data));}
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(AuditFilter) ;