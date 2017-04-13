import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {showTableFilter,filterApplied} from '../../actions/filterAction';
import { connect } from 'react-redux'; 
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {handelTokenClick, handleInputQuery} from '../../components/tableFilter/tableFilterCommonFunctions';
class UserFilter extends React.Component{
	constructor(props) 
	{
    	super(props);
        this.state = {tokenSelected: {"STATUS":["all"], "ROLE":["all"], "WORK MODE":["all"],"LOCATION":["all"]}, searchQuery: {},
                      defaultToken: {"STATUS":["all"], "ROLE":["all"], "WORK MODE":["all"],"LOCATION":["all"]}}; 
    }

    _closeFilter() {
        var filterState = !this.props.showFilter;
        this.props.showTableFilter(filterState);
    }	

    _processAuditSearchField(){
        const filterInputFields = [{value:"USER NAME", label:<FormattedMessage id="user.inputField.id" defaultMessage ="USER NAME"/>}];
        var inputValue = this.state.searchQuery;
        var inputField = <FilterInputFieldWrap inputText={filterInputFields} handleInputText={this._handleInputQuery.bind(this)} inputValue={inputValue}/>
        return inputField;           
    }
 
    _processFilterToken() {
        var tokenStatus = {value:"status", label:<FormattedMessage id="user.tokenfield.status" defaultMessage ="STATUS"/>};
        var tokenRole = {value:"role", label:<FormattedMessage id="user.tokenfield.role" defaultMessage ="ROLE"/>}; 
        var tokenWorkMode = {value:"workmode", label:<FormattedMessage id="user.tokenfield.mode" defaultMessage ="WORK MODE"/>};
        var tokenLocation = {value:"location", label:<FormattedMessage id="user.tokenfield.location" defaultMessage ="LOCATION"/>}; 
        const labelC1 = [
                    { value: 'online', label:<FormattedMessage id="user.token1.all" defaultMessage ="Online"/> },
                    { value: 'offline', label:<FormattedMessage id="user.token1.sku" defaultMessage ="Offline"/> }
                    
                    ];
        const labelC2 = [
                    { value: 'all', label:<FormattedMessage id="user.role.all" defaultMessage ="Any"/> },
                    { value: 'manager', label:<FormattedMessage id="user.role.issueFound" defaultMessage ="Manager"/>},
                    { value: 'operator', label:<FormattedMessage id="user.role.rejected" defaultMessage ="Operator"/> },
                    { value: 'suprervisor', label:<FormattedMessage id="user.role.resolved" defaultMessage ="Supervisor"/> }
           
                    ];
            const labelC3 = [
                    { value: 'all', label:<FormattedMessage id="user.workmode.all" defaultMessage ="Any"/> },
                    { value: 'pickfront', label:<FormattedMessage id="user.workmode.pickfront" defaultMessage ="Pick Front"/>},
                    { value: 'pickback', label:<FormattedMessage id="user.workmode.pickback" defaultMessage ="Pick Back"/> },
                    { value: 'putfront', label:<FormattedMessage id="user.workmode.putfront" defaultMessage ="Put Front"/> },
                    { value: 'putback', label:<FormattedMessage id="user.workmode.putback" defaultMessage ="Put Back"/>},
                    { value: 'audit', label:<FormattedMessage id="user.workmode.audit" defaultMessage ="Audit"/> },
                    { value: 'management', label:<FormattedMessage id="user.workmode.management" defaultMessage ="Management"/> }
                    ];
            const labelC4 = [
                    { value: 'all', label:<FormattedMessage id="user.location.all" defaultMessage ="Any"/> },
                    { value: 'pickputstation', label:<FormattedMessage id="user.location.issueFound" defaultMessage ="Pick Put Station"/>},
                    { value: 'qcstation', label:<FormattedMessage id="user.location.rejected" defaultMessage ="QC Station"/> },
                    { value: 'headoffice', label:<FormattedMessage id="user.location.resolved" defaultMessage ="Head Office"/> }                  
                    ];          
        var selectedToken =  this.state.tokenSelected;
        var column1 = <FilterTokenWrap field={tokenStatus} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC1} selectedToken={selectedToken}/>;
        var column2 = <FilterTokenWrap field={tokenRole} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC2} selectedToken={selectedToken}/>;
        var column3 = <FilterTokenWrap field={tokenWorkMode} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC3} selectedToken={selectedToken}/>;
        var column4 = <FilterTokenWrap field={tokenLocation} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC4} selectedToken={selectedToken}/>;
        
        var columnDetail = {column1token:column1, column2token:column2,column3token:column3, column4token:column4};
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
        this.setState({tokenSelected: {"STATUS":["all"], "ROLE":["all"], "WORK MODE":["all"],"LOCATION":["all"]}, searchQuery: {}});
        this.props.filterApplied(false);
        this.props.refreshOption(clearState)
    }

	render(){
        var noOrder = this.props.totalAudits?false:true;
        var userSearchField = this._processAuditSearchField();
        var userFilterToken = this._processFilterToken();
		return (
			<div>
                 <Filter hideFilter={this._closeFilter.bind(this)} 
                         clearFilter={this._clearFilter.bind(this)}
                         searchField={userSearchField}
                         filterTokenC1={userFilterToken.column1token}
                         filterTokenC2={userFilterToken.column2token}
                         filterTokenC3={userFilterToken.column3token}
                         filterTokenC4={userFilterToken.column4token}
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
export default connect(mapStateToProps,mapDispatchToProps)(UserFilter) ;