import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {showTableFilter,filterApplied,butlerfilterState,toggleBotButton} from '../../actions/filterAction';
import {updateSubscriptionPacket} from '../../actions/socketActions';
import { connect } from 'react-redux'; 
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {handelTokenClick, handleInputQuery} from '../../components/tableFilter/tableFilterCommonFunctions';
import {setButlerFilterSpinner}  from '../../actions/spinnerAction';
class ButlerBotFilter extends React.Component{
	constructor(props) 
	{
    	super(props);
        this.state = {tokenSelected: {"STATUS":["any"], "MODE":["any"]}, searchQuery: {},
                      defaultToken: {"STATUS":["any"], "MODE":["any"]}}; 
    }

    componentWillMount(){
        if(this.props.filterState) {
            this.setState(this.props.filterState)
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.filterState && JSON.stringify(this.state)!==JSON.stringify(nextProps.filterState)){
            /**
             * As soon as the properties are changed from
             * the Show All list, the state will be
             * updated.
             */
            this.setState(nextProps.filterState)
        }
    }
    _closeFilter() {
        let filterState = !this.props.showFilter;
        this.props.showTableFilter(filterState);
    }	

    _processButlerSearchField(){
        const temp = [{value:"BOT ID", label:<FormattedMessage id="butletbot.inputField.id" defaultMessage ="BOT ID"/>}, 
                    {value:"SPECIFIC LOCATION/ZONE", label:<FormattedMessage id="butletbot.inputField.sku" defaultMessage ="SPECIFIC LOCATION/ZONE"/>}];
        let inputValue = this.state.searchQuery;
        let inputField = <FilterInputFieldWrap inputText={temp} handleInputText={this._handleInputQuery.bind(this)} inputValue={inputValue}/>
        return inputField;           
    }
 
    _processFilterToken() {
        let tokenFieldC1 = {value:"STATUS", label:<FormattedMessage id="butletbot.tokenfield.STATUS" defaultMessage ="STATUS"/>};
        let tokenFieldC2 = {value:"MODE", label:<FormattedMessage id="butletbot.tokenfield.MODE" defaultMessage ="MODE"/>}; 
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
                    { value: '0', label:<FormattedMessage id="butletbot.token2.pick" defaultMessage ="Pick"/>},
                    { value: '1', label:<FormattedMessage id="butletbot.token2.put" defaultMessage ="Put"/> },
                    { value: '2', label:<FormattedMessage id="butletbot.token2.audit" defaultMessage ="Audit"/> },
                    { value: '3', label:<FormattedMessage id="butletbot.token2.charging" defaultMessage ="Charging"/>},
                    { value: 'not set', label:<FormattedMessage id="butletbot.token2.notSet" defaultMessage ="Not set"/> }
                    ];
        let selectedToken =  this.state.tokenSelected;
        let column1 = <FilterTokenWrap field={tokenFieldC2} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC2} selectedToken={selectedToken}/>;
        let column2 = <FilterTokenWrap field={tokenFieldC1} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC1} selectedToken={selectedToken}/>;
        let columnDetail = {column1token:column1, column2token:column2};
        return columnDetail;
    }

    _handelTokenClick(field,value,state) {
        this.setState({tokenSelected:handelTokenClick(field,value,state,this.state)});
    }

    _handleInputQuery(inputQuery,queryField) {
        this.setState({searchQuery:handleInputQuery(inputQuery,queryField,this.state)});
    }

    _applyFilter() {
      let filterSubsData = {}, filterState = this.state,ppsMode;
      if(filterState.searchQuery) {
        (filterState.searchQuery["SPECIFIC LOCATION/ZONE"]?filterSubsData["location"] = ['contains',filterState.searchQuery["SPECIFIC LOCATION/ZONE"]]:"");
        (filterState.searchQuery["BOT ID"]?filterSubsData["butler_id"] = ['=',filterState.searchQuery["BOT ID"]]:"");
      }
      if(filterState.tokenSelected) {
        (filterState.tokenSelected["STATUS"] && filterState.tokenSelected["STATUS"][0]!=="any"?filterSubsData["state"] = ['in',filterState.tokenSelected["STATUS"]]:"");
        (filterState.tokenSelected["MODE"] && filterState.tokenSelected["MODE"][0]!=="any"?filterSubsData["current_task"] = ['in',filterState.tokenSelected["MODE"]]:"");
      }
      let updatedWsSubscription = this.props.wsSubscriptionData;
      updatedWsSubscription["butlerbots"].data[0].details["filter_params"] = filterSubsData;
      updatedWsSubscription["system"].data[0].details["filter_params"] = filterSubsData;
      this.props.butlerfilterState(filterState);
      this.props.updateSubscriptionPacket(updatedWsSubscription);
      this.props.filterApplied(!this.props.isFilterApplied);
      this.props.toggleBotButton(true);
      this.props.setButlerFilterSpinner(true);
    }

    _clearFilter() {
        let clearState = {};
        let updatedWsSubscription = this.props.wsSubscriptionData;
        updatedWsSubscription["butlerbots"].data[0].details["filter_params"] = {};
        updatedWsSubscription["system"].data[0].details["filter_params"] = {};
        this.props.updateSubscriptionPacket(updatedWsSubscription);
        this.setState({tokenSelected: {"STATUS":["any"], "MODE":["any"]}, searchQuery: {}});
        this.props.butlerfilterState({tokenSelected: {"STATUS":["any"], "MODE":["any"]}, searchQuery: {}});
        this.props.filterApplied(!this.props.isFilterApplied);
        this.props.toggleBotButton(false);
        this.props.setButlerFilterSpinner(true);
        
    }

	render(){
    let butlerDetails = this.props.butlerDetail;
         let noOrder = butlerDetails.butlerDetail && butlerDetails.butlerDetail.length?false:true;
        let butlerSearchField = this._processButlerSearchField();
        let butlerFilterToken = this._processFilterToken();
		return (
			<div>
                 <Filter hideFilter={this._closeFilter.bind(this)} 
                         clearFilter={this._clearFilter.bind(this)}
                         searchField={butlerSearchField}
                         filterTokenC1={butlerFilterToken.column1token}
                         filterTokenC2={butlerFilterToken.column2token}
                         formSubmit={this._applyFilter.bind(this)}
                         noDataFlag={noOrder}
                         responseFlag={this.props.butlerFilterSpinnerState}
                         />
            </div>
		);
	}
};


function mapStateToProps(state, ownProps){
  return {
    butlerDetail: state.butlerDetail || [],
    showFilter: state.filterInfo.filterState || false,
    wsSubscriptionData:state.recieveSocketActions.socketDataSubscriptionPacket,
    filterState: state.filterInfo.butlerFilterState,
    isFilterApplied: state.filterInfo.isFilterApplied || false,
    botFilterStatus:state.filterInfo.botFilterStatus || false,
    butlerFilter:state.spinner.butlerSpinner || false,
    butlerFilterSpinnerState:state.spinner.butlerFilterSpinnerState || false
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    showTableFilter: function(data){dispatch(showTableFilter(data));},
    filterApplied: function(data){dispatch(filterApplied(data));},
    updateSubscriptionPacket: function(data){dispatch(updateSubscriptionPacket(data));},
    butlerfilterState: function(data){dispatch(butlerfilterState(data));},
    toggleBotButton: function(data){dispatch(toggleBotButton(data));},
    setButlerFilterSpinner: function(data){dispatch(setButlerFilterSpinner(data));}
  } 
};
ButlerBotFilter.PropTypes={
  butlerDetail: React.PropTypes.array,
showFilter: React.PropTypes.bool,
wsSubscriptionData:React.PropTypes.object,
filterState: React.PropTypes.object,
isFilterApplied:React.PropTypes.bool,
botFilterStatus:React.PropTypes.bool,
showTableFilter:React.PropTypes.func,
filterApplied: React.PropTypes.func,
updateSubscriptionPacket:React.PropTypes.func,
butlerfilterState:React.PropTypes.func,
toggleBotButton:React.PropTypes.func
};

export default connect(mapStateToProps,mapDispatchToProps)(ButlerBotFilter) ;
