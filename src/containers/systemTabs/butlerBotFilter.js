import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {showTableFilter,filterApplied} from '../../actions/filterAction';
import { connect } from 'react-redux'; 
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {handelTokenClick, handleInputQuery} from '../../components/tableFilter/tableFilterCommonFunctions';
import {socketDataSubscription} from '../../actions/socketActions';
class ButlerBotFilter extends React.Component{
	constructor(props) 
	{
    	super(props);
        this.state = {tokenSelected: {"STATUS":["any"], "MODE":["any"]}, searchQuery: {},
                      defaultToken: {"STATUS":["any"], "MODE":["any"]}}; 
    }

    _closeFilter() {
        var filterState = !this.props.showFilter;
        this.props.showTableFilter(filterState);
    }	

    _processAuditSearchField(){
        const temp = [{value:"BOT ID", label:<FormattedMessage id="butletbot.inputField.id" defaultMessage ="BOT ID"/>}, 
                    {value:"SPECIFIC LOCATION/ZONE", label:<FormattedMessage id="butletbot.inputField.sku" defaultMessage ="SPECIFIC LOCATION/ZONE"/>}];
        var inputValue = this.state.searchQuery;
        var inputField = <FilterInputFieldWrap inputText={temp} handleInputText={this._handleInputQuery.bind(this)} inputValue={inputValue}/>
        return inputField;           
    }
 
    _processFilterToken() {
        var tokenFieldC1 = {value:"STATUS", label:<FormattedMessage id="butletbot.tokenfield.STATUS" defaultMessage ="STATUS"/>};
        var tokenFieldC2 = {value:"MODE", label:<FormattedMessage id="butletbot.tokenfield.MODE" defaultMessage ="MODE"/>}; 
        const labelC1 = [
                    { value: 'any', label:<FormattedMessage id="butletbot.token1.all" defaultMessage ="Any"/> },
                    { value: 'stopped', label:<FormattedMessage id="butletbot.token1.stopped" defaultMessage ="Stopped"/> },
                    { value: 'error', label:<FormattedMessage id="butletbot.token1.error" defaultMessage ="Error"/> },
                    { value: 'warning', label:<FormattedMessage id="butletbot.token1.warning" defaultMessage ="Warning"/> },
                    { value: 'online', label:<FormattedMessage id="butletbot.token1.Online" defaultMessage ="Online"/> },
                    { value: 'offline', label:<FormattedMessage id="butletbot.token1.Offline" defaultMessage ="Offline"/> }
                    ];
        const labelC2 = [
                    { value: 'any', label:<FormattedMessage id="butletbot.token2.any" defaultMessage ="Any"/> },
                    { value: 'pick', label:<FormattedMessage id="butletbot.token2.pick" defaultMessage ="Pick"/>},
                    { value: 'put', label:<FormattedMessage id="butletbot.token2.put" defaultMessage ="Put"/> },
                    { value: 'audit', label:<FormattedMessage id="butletbot.token2.audit" defaultMessage ="Audit"/> },
                    { value: 'charging', label:<FormattedMessage id="butletbot.token2.charging" defaultMessage ="Charging"/>},
                    { value: 'not set', label:<FormattedMessage id="butletbot.token2.notSet" defaultMessage ="Not set"/> }
                    ];
        var selectedToken =  this.state.tokenSelected;
        var column1 = <FilterTokenWrap field={tokenFieldC2} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC2} selectedToken={selectedToken}/>;
        var column2 = <FilterTokenWrap field={tokenFieldC1} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC1} selectedToken={selectedToken}/>;
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
      var filterSubsData = {}, filterState = this.state;
      if(filterState.searchQuery) {
        (filterState.searchQuery["SPECIFIC LOCATION/ZONE"]?filterSubsData["location"] = ['contains',filterState.searchQuery["SPECIFIC LOCATION/ZONE"]]:"");
        (filterState.searchQuery["BOT ID"]?filterSubsData["butler_id"] = ['=',filterState.searchQuery["BOT ID"]]:"");
      }
      if(filterState.tokenSelected) {
        (filterState.tokenSelected["STATUS"] && filterState.tokenSelected["STATUS"][0]!=="any"?filterSubsData["state"] = ['in',filterState.tokenSelected["STATUS"]]:"");
        (filterState.tokenSelected["MODE"] && filterState.tokenSelected["MODE"][0]!=="any"?filterSubsData["current_task"] = ['in',filterState.tokenSelected["MODE"]]:"");
      }
      var updatedWsSubscription = this.props.wsSubscriptionData;
      updatedWsSubscription["system"].data[0].details["filter_params"] = filterSubsData;
      this.props.socketDataSubscription(updatedWsSubscription);
      this.props.filterApplied(true);
    }
    _clearFilter() {
        var clearState = {};
        this.setState({tokenSelected: {"STATUS":["any"], "MODE":["any"]}, searchQuery: {}});
        this.props.filterApplied(false);
        
    }

	render(){
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
                         noDataFlag={false}
                         />
            </div>
		);
	}
};


function mapStateToProps(state, ownProps){
    console.log(state)
  return {
    showFilter: state.filterInfo.filterState || false,
    wsSubscriptionData:state.recieveSocketActions.socketDataSubscriptionPacket
    
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    showTableFilter: function(data){dispatch(showTableFilter(data));},
    filterApplied: function(data){dispatch(filterApplied(data));},
    socketDataSubscription: function(data){dispatch(socketDataSubscription(data));}
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(ButlerBotFilter) ;
