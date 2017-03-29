import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {showTableFilter,filterApplied,userfilterState,toggleUesrFilter} from '../../actions/filterAction';
import {socketDataSubscription} from '../../actions/socketActions';
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
        let filterState = !this.props.showFilter;
        this.props.showTableFilter(filterState);
    }   

    _processUserSearchField(){
        const filterInputFields = [{value:"USER NAME", label:<FormattedMessage id="user.inputField.id" defaultMessage ="USER NAME"/>}];
        let inputValue = this.state.searchQuery;
        let inputField = <FilterInputFieldWrap inputText={filterInputFields} handleInputText={this._handleInputQuery.bind(this)} inputValue={inputValue}/>
        return inputField;           
    }
 
    _processFilterToken() {
        let tokenStatus = {value:"STATUS", label:<FormattedMessage id="user.tokenfield.status" defaultMessage ="STATUS"/>};
        let tokenRole = {value:"ROLE", label:<FormattedMessage id="user.tokenfield.role" defaultMessage ="ROLE"/>}; 
        let tokenWorkMode = {value:"WORK MODE", label:<FormattedMessage id="user.tokenfield.mode" defaultMessage ="WORK MODE"/>};
        let tokenLocation = {value:"LOCATION", label:<FormattedMessage id="user.tokenfield.location" defaultMessage ="LOCATION"/>}; 
        const labelC1 = [
                    { value: 'all', label:<FormattedMessage id="user.status.all" defaultMessage ="Any"/> },
                    { value: 'online', label:<FormattedMessage id="user.status.online" defaultMessage ="Online"/> },
                    { value: 'offline', label:<FormattedMessage id="user.status.offline" defaultMessage ="Offline"/> }
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
                          
        let selectedToken =  this.state.tokenSelected;
        let column1 = <FilterTokenWrap field={tokenStatus} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC1} selectedToken={selectedToken}/>;
        let column2 = <FilterTokenWrap field={tokenRole} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC2} selectedToken={selectedToken}/>;
        let column3 = <FilterTokenWrap field={tokenWorkMode} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC3} selectedToken={selectedToken}/>;
        let column4 = <FilterTokenWrap field={tokenLocation} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC4} selectedToken={selectedToken}/>;
        
        let columnDetail = {column1token:column1, column2token:column2,column3token:column3, column4token:column4};
        return columnDetail;
    }

    _handelTokenClick(field,value,state) {
        this.setState({tokenSelected:handelTokenClick(field,value,state,this.state)});
    }

    _handleInputQuery(inputQuery,queryField) {
        this.setState({searchQuery:handleInputQuery(inputQuery,queryField,this.state)});
    }

    _applyFilter() {
        let filterSubsData = {}, filterState = this.state;
      if(filterState.searchQuery) {
        (filterState.searchQuery["USER NAME"]?filterSubsData["user_name"] = ['contains',filterState.searchQuery["USER NAME"]]:"");
      }
      if(filterState.tokenSelected) {
        (filterState.tokenSelected["STATUS"] && filterState.tokenSelected["STATUS"][0]!=="all"?filterSubsData["status"] = ['in',filterState.tokenSelected["STATUS"]]:"");
        (filterState.tokenSelected["ROLE"] && filterState.tokenSelected["ROLE"][0]!=="all"?filterSubsData["role"] = ['in',filterState.tokenSelected["ROLE"]]:"");
        (filterState.tokenSelected["WORK MODE"] && filterState.tokenSelected["WORK MODE"][0]!=="all"?filterSubsData["pps_mode"] = ['in',filterState.tokenSelected["WORK MODE"]]:"");
       // (filterState.tokenSelected["LOCATION"] && filterState.tokenSelected["LOCATION"][0]!=="all"?filterSubsData["seat_type"] = ['in',filterState.tokenSelected["LOCATION"]]:"");
      }
      let updatedWsSubscription = this.props.wsSubscriptionData;
      updatedWsSubscription["users"].data[0].details["filter_params"] = filterSubsData;
      this.props.userfilterState(filterState);
      this.props.socketDataSubscription(updatedWsSubscription);
      this.props.filterApplied(!this.props.isFilterApplied);
      this.props.toggleUesrFilter(true);

    }

    _clearFilter() {
         let clearState = {};
         let updatedWsSubscription = this.props.wsSubscriptionData;
        updatedWsSubscription["users"].data[0].details["filter_params"] = {};
        this.props.socketDataSubscription(updatedWsSubscription);
        this.setState({tokenSelected: {"STATUS":["all"], "ROLE":["all"], "WORK MODE":["all"],"LOCATION":["all"]}, searchQuery: {}});
        this.props.userfilterState({tokenSelected: {"STATUS":["all"], "ROLE":["all"], "WORK MODE":["all"],"LOCATION":["all"]}, searchQuery: {}});
        this.props.filterApplied(!this.props.isFilterApplied);
        this.props.toggleUesrFilter(false);
    }

    render(){

      let userDetail = this.props.userDetails;
         let noOrder = userDetail.userDetails && userDetail.userDetails.length?false:true;

        let userSearchField = this._processUserSearchField();
        let userFilterToken = this._processFilterToken();
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
    userDetails:state.userDetails||[],
    showFilter: state.filterInfo.filterState || false,
    auditSpinner: state.spinner.auditSpinner || false,
    totalAudits: state.recieveAuditDetail.totalAudits || 0,
    filterState: state.filterInfo.userfilterState,
    wsSubscriptionData:state.recieveSocketActions.socketDataSubscriptionPacket,
     isFilterApplied: state.filterInfo.isFilterApplied || false,
    userFilterStatus:state.filterInfo.userFilterStatus || false
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    showTableFilter: function(data){dispatch(showTableFilter(data));},
    filterApplied: function(data){dispatch(filterApplied(data));},
    userfilterState: function(data){dispatch(userfilterState(data));},
    socketDataSubscription: function(data){dispatch(socketDataSubscription(data));},
    toggleUesrFilter: function(data){dispatch(toggleUesrFilter(data));}

  }
};
export default connect(mapStateToProps,mapDispatchToProps)(UserFilter) ;