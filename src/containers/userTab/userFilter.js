import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {showTableFilter,filterApplied,userfilterState,toggleUserFilter} from '../../actions/filterAction';
import {updateSubscriptionPacket} from '../../actions/socketActions';
import { connect } from 'react-redux'; 
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {handelTokenClick, handleInputQuery} from '../../components/tableFilter/tableFilterCommonFunctions';
import {stringConfig} from '../../constants/backEndConstants';
import {userFilterApplySpinner}  from '../../actions/spinnerAction';
import {hashHistory} from 'react-router'

class UserFilter extends React.Component{
  constructor(props) 
  {
      super(props);
    this.state = {tokenSelected: {"STATUS":["all"], "ROLE":["all"], "WORK MODE":["all"],"LOCATION":["all"]}, searchQuery: {},
    defaultToken: {"STATUS":["all"], "ROLE":["all"], "WORK MODE":["all"],"LOCATION":["all"]}}; 
  }

  componentWillReceiveProps(nextProps){
      if(nextProps.filterState && JSON.stringify(this.state)!==JSON.stringify(nextProps.filterState)){
          this.setState(nextProps.filterState)
      }
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
  _isMapped(config,item){
           if(config.hasOwnProperty(item)){
            return true;
           }
           return false;
    }
_processUserRoll(){
  let objRole=[{ value: 'all', label:<FormattedMessage id="user.role.all" defaultMessage ="Any"/> }],roleData={},currentRole;
  for(let i=0,len = this.props.roleInfo.length; i<len; i++){
           currentRole = this.props.roleInfo[i];
           if(!this._isMapped(stringConfig,currentRole.name)){
                continue;
           }    
           roleData ={
            value: currentRole.name, 
            label: this.context.intl.formatMessage(stringConfig[currentRole.name])  
           }
           objRole.push(roleData);
        }
        return objRole;
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

        const labelC2=this._processUserRoll();
        const labelC3 = [
        { value: 'all', label:<FormattedMessage id="user.workmode.all" defaultMessage ="Any"/> },
        { value: 'pick__front', label:<FormattedMessage id="user.workmode.pickfront" defaultMessage ="Pick Front"/>},
        { value: 'pick__back', label:<FormattedMessage id="user.workmode.pickback" defaultMessage ="Pick Back"/> },
        { value: 'put__front', label:<FormattedMessage id="user.workmode.putfront" defaultMessage ="Put Front"/> },
        { value: 'put__back', label:<FormattedMessage id="user.workmode.putback" defaultMessage ="Put Back"/>},
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
        let filterSubsData = {}, filterState = this.state, _query = {};
        /** Gaurav Makkar:
         * Changed query parameters for username filter
         * Updated data to be sent to the socket
         * if single word:
         * {username:<word>}
         * if multiple word:
         * {username:[<1>,<2>]}
         */
        if (filterState.searchQuery && filterState.searchQuery["USER NAME"]) {
            _query.username = filterState.searchQuery["USER NAME"]
            let name_query = filterState.searchQuery["USER NAME"].split(" ")
            name_query = name_query.filter(function (word) {
                return !!word
            })
            filterSubsData["username"] = name_query.length > 1 ? name_query : name_query.join("").trim();
        }
        if (filterState.tokenSelected) {
            (filterState.tokenSelected["STATUS"] && filterState.tokenSelected["STATUS"][0] !== "all" && filterState.tokenSelected["STATUS"].length !== 2 ? filterSubsData["logged_in"] = ['is', (filterState.tokenSelected["STATUS"] === "online") ? "true" : "false"] : "");
            (filterState.tokenSelected["ROLE"] && filterState.tokenSelected["ROLE"][0] !== "all" ? filterSubsData["role"] = ['in', filterState.tokenSelected["ROLE"]] : "");
            /** Gaurav Makkar:
             * Added double underscore as a separator for the pps mode
             * and seat type of the Work Mode filter.
             * Data format to be sent to the socket is
             * {pps:["in",[{pps_mode:"put",seat_type:"front"}]]}
             */
            if (filterState.tokenSelected["WORK MODE"] && filterState.tokenSelected["WORK MODE"][0] !== "all") {
                let pps_list = []
                filterState.tokenSelected["WORK MODE"].forEach(function (mode) {
                    pps_list.push(mode.split("__").length > 1 ? {
                        pps_mode: mode.split("__")[0],
                        seat_type: mode.split("__")[1]
                    } : {pps_mode: mode.split("__")[0]})
                })
                filterSubsData["pps"] = ['in', pps_list]
            }

            // (filterState.tokenSelected["LOCATION"] && filterState.tokenSelected["LOCATION"][0]!=="all"?filterSubsData["seat_type"] = ['in',filterState.tokenSelected["LOCATION"]]:"");


            /**
             * for query generation
             */
            if (filterState.tokenSelected["STATUS"] && filterState.tokenSelected["STATUS"][0] !== 'all') {
                _query.status = filterState.tokenSelected["STATUS"]
            }
            if (filterState.tokenSelected["ROLE"] && filterState.tokenSelected["ROLE"][0] !== 'all') {
                _query.role = filterState.tokenSelected["ROLE"]
            }
            if (filterState.tokenSelected["WORK MODE"] && filterState.tokenSelected["WORK MODE"][0] !== 'all') {
                _query.mode = filterState.tokenSelected["WORK MODE"]
            }
        }
       this.props.toggleUserFilter(true);
       this.props.userFilterApplySpinner(true);
       hashHistory.push({pathname: "/users", query: _query})
    }

    _clearFilter() {
        this.props.toggleUserFilter(false);
        this.props.userFilterApplySpinner(true);
        hashHistory.push({pathname: "/users", query: {}})
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
      responseFlag={this.props.isLoading}
      noDataFlag={noOrder}
      />
      </div>
      );
  }
};

UserFilter.contextTypes = {
    intl: React.PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps){
  return {
    userDetails:state.userDetails||[],
    showFilter: state.filterInfo.filterState || false,
    auditSpinner: state.spinner.auditSpinner || false,
    totalAudits: state.recieveAuditDetail.totalAudits || 0,
    filterState: state.filterInfo.userfilterState,
    wsSubscriptionData:state.recieveSocketActions.socketDataSubscriptionPacket,
    isFilterApplied: state.filterInfo.isFilterApplied || false,
    userFilterStatus:state.filterInfo.userFilterStatus || false,
    roleInfo: state.appInfo.roleInfo || [],
    isLoading:state.spinner.isLoading || false
    
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    showTableFilter: function(data){dispatch(showTableFilter(data));},
    filterApplied: function(data){dispatch(filterApplied(data));},
    userfilterState: function(data){dispatch(userfilterState(data));},
    updateSubscriptionPacket: function(data){dispatch(updateSubscriptionPacket(data));},
    toggleUserFilter: function(data){dispatch(toggleUserFilter(data));},
userFilterApplySpinner: function(data){dispatch(userFilterApplySpinner(data));}
  }
};
UserFilter.PropTypes={
userDetails:React.PropTypes.array,
showFilter: React.PropTypes.bool,
auditSpinner:React.PropTypes.bool,
totalAudits:React.PropTypes.number,
filterState:React.PropTypes.object,
wsSubscriptionData:React.PropTypes.object,
isFilterApplied:React.PropTypes.bool,
userFilterStatus:React.PropTypes.bool,
roleInfo:React.PropTypes.object,
showTableFilter: React.PropTypes.func,
filterApplied: React.PropTypes.func,
userfilterState: React.PropTypes.func,
updateSubscriptionPacket: React.PropTypes.func,
toggleUserFilter:React.PropTypes.func
};

export default connect(mapStateToProps,mapDispatchToProps)(UserFilter) ;