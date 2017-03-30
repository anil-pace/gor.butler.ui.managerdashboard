import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {showTableFilter, filterApplied,chargingstationfilterState,toggleChargingFilter} from '../../actions/filterAction';
import {updateMainStore} from '../../actions/socketActions';
import { connect } from 'react-redux'; 
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {handelTokenClick, handleInputQuery} from '../../components/tableFilter/tableFilterCommonFunctions';
import {setCsSpinner}  from '../../actions/spinnerAction';
class ChargingStationFilter extends React.Component{
  constructor(props) 
  {
      super(props);
        this.state = {tokenSelected: {"DOCKING STATUS":["all"], "OPERATING MODE":["all"]}, searchQuery: {},
                      defaultToken: {"DOCKING STATUS":["all"], "OPERATING MODE":["all"]}}; 
    }


    _closeFilter() {
        let filterState = !this.props.showFilter;
        this.props.showTableFilter(false);
    } 

    _processChargingSearchField(){
        var filterInputFields = [{value:"CHARGING STATION ID", label:<FormattedMessage id="charging.inputField.id" defaultMessage ="CHARGING STATION ID"/>}];
        var inputValue = this.state.searchQuery;
        var inputField = <FilterInputFieldWrap inputText={filterInputFields} handleInputText={this._handleInputQuery.bind(this)} inputValue={inputValue}/>
        return inputField;           

    }

    _processFilterToken() {
        let tokenField1 = {value:"DOCKING STATUS", label:<FormattedMessage id="charging.token.status" defaultMessage ="DOCKING STATUS"/>};
        let tokenField2 = {value:"OPERATING MODE", label:<FormattedMessage id="charging.token.timePeriod" defaultMessage ="OPERATING MODE"/>}; 
       let labelC1 = [
                    { value: 'all', label: <FormattedMessage id="charging.STATUS.all" defaultMessage ="Any"/>},
                    { value: 'connected', label: <FormattedMessage id="charging.STATUS.breach" defaultMessage ="Connected"/>},
                    { value: 'disconnected', label: <FormattedMessage id="charging.STATUS.pending" defaultMessage ="Disconnected"/>}
                    ];
        let labelC2 = [
                    { value: 'all', label: <FormattedMessage id="charging.timePeriod.all" defaultMessage ="Any"/>},
                    { value: 'mannual', label: <FormattedMessage id="charging.timePeriod.oneHr" defaultMessage ="Mannual"/>},
                    { value: 'auto', label: <FormattedMessage id="charging.timePeriod.twoHR" defaultMessage ="Auto"/>}
                    ]; 
        let selectedToken =  this.state.tokenSelected;
        let column1 = <FilterTokenWrap field={tokenField1} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC1} selectedToken={selectedToken}/>;
        let column2 = <FilterTokenWrap field={tokenField2} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC2} selectedToken={selectedToken}/>;
        let columnDetail = {column1token:column1, column2token:column2};
        return columnDetail;
    }

    _handelTokenClick(field,value,state) {
        this.setState({tokenSelected:handelTokenClick(field,value,state,this.state)});
        
    }

    _handleInputQuery(inputQuery,queryField) {
        this.setState({searchQuery:handleInputQuery(inputQuery,queryField,this.state)})
    }

    _applyFilter() {
       let filterSubsData = {}, filterState = this.state;
      if(filterState.searchQuery) {
        (filterState.searchQuery["CHARGING STATION ID"]?filterSubsData["charger_id"] = ['contains',filterState.searchQuery["CHARGING STATION ID"]]:"");
        
      }
      if(filterState.tokenSelected) {
        (filterState.tokenSelected["DOCKING STATUS"] && filterState.tokenSelected["DOCKING STATUS"][0]!=="all"?filterSubsData["charger_status"] = ['in',filterState.tokenSelected["DOCKING STATUS"]]:"");
        (filterState.tokenSelected["OPERATING MODE"] && filterState.tokenSelected["OPERATING MODE"][0]!=="all"?filterSubsData["charger_mode"] = ['in',filterState.tokenSelected["OPERATING MODE"]]:"");
      }
      let updatedWsSubscription = this.props.wsSubscriptionData;
      updatedWsSubscription["chargingstation"].data[0].details["filter_params"] = filterSubsData;
      this.props.chargingstationfilterState(filterState);
      this.props.updateMainStore(updatedWsSubscription);
       this.props.filterApplied(!this.props.isFilterApplied);
      this.props.toggleChargingFilter(true);
      this.props.setCsSpinner(true);
    }

    _clearFilter() {
        let clearState = {};
         let updatedWsSubscription = this.props.wsSubscriptionData;
        updatedWsSubscription["chargingstation"].data[0].details["filter_params"] = {};
        this.props.updateMainStore(updatedWsSubscription);
        this.setState({tokenSelected: {"DOCKING STATUS":["all"], "OPERATING MODE":["all"]}, searchQuery: {}});
        this.props.chargingstationfilterState({tokenSelected: {"STATUS":["all"], "MODE":["all"]}, searchQuery: {}});
        this.props.filterApplied(!this.props.isFilterApplied);
        this.props.toggleChargingFilter(false);
        this.props.setCsSpinner(true);
    } 


  render(){
       let chargingDetails = this.props.chargerData;
         let noOrder = chargingDetails.chargersDetail && chargingDetails.chargersDetail.length?false:true;

       
        let chargingSearchField = this._processChargingSearchField();
        let chargingFilterToken = this._processFilterToken();
    return (
      <div>
                 <Filter hideFilter={this._closeFilter.bind(this)}  // hiding filter wont disturb state
                         clearFilter={this._clearFilter.bind(this)} // clearing sates of filter
                         searchField={chargingSearchField}
                         filterTokenC1={chargingFilterToken.column1token}
                         filterTokenC2={chargingFilterToken.column2token}
                         formSubmit={this._applyFilter.bind(this)} //passing function on submit
                         responseFlag={this.props.csSpinner} // used for spinner of button 
                         noDataFlag={noOrder} //messg to show in case of no data
                         />
            </div>
    );
  }
};


function mapStateToProps(state, ownProps){
  return {
    showFilter: state.filterInfo.filterState || false,
    chargerData: state.chargersDetail || [],
    wsSubscriptionData:state.recieveSocketActions.socketDataSubscriptionPacket,
    orderListSpinner: state.spinner.orderListSpinner || false,
    filterState: state.filterInfo.chargingstationfilterState,
    isFilterApplied: state.filterInfo.isFilterApplied || false,
    chargingFilterStatus:state.filterInfo.chargingFilterStatus || false,
    csSpinner:state.spinner.csSpinner || false

  };
}

var mapDispatchToProps = function(dispatch){
  return {
    showTableFilter: function(data){dispatch(showTableFilter(data));},
    filterApplied: function(data){dispatch(filterApplied(data));},
    updateMainStore: function(data){dispatch(updateMainStore(data));},
    chargingstationfilterState: function(data){dispatch(chargingstationfilterState(data));},
    toggleChargingFilter: function(data){dispatch(toggleChargingFilter(data));},
     setCsSpinner: function(data){dispatch(setCsSpinner(data));}
  }
};

ChargingStationFilter.PropTypes={
showFilter:React.PropTypes.bool,
chargerData:React.PropTypes.array,
wsSubscriptionData:React.PropTypes.object,
orderListSpinner:React.PropTypes.bool,
filterState:React.PropTypes.object,
isFilterApplied:React.PropTypes.bool,
chargingFilterStatus:React.PropTypes.bool,
showTableFilter:React.PropTypes.func,
filterApplied: React.PropTypes.func,
updateMainStore:React.PropTypes.func,
chargingstationfilterState:React.PropTypes.func,
toggleChargingFilter:React.PropTypes.func
};

export default connect(mapStateToProps,mapDispatchToProps)(ChargingStationFilter) ;


