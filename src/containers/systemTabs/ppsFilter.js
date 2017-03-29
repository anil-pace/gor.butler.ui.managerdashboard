import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {showTableFilter, filterApplied,ppsfilterState,togglePPSFilter} from '../../actions/filterAction';
import { connect } from 'react-redux'; 
import {socketDataSubscription} from '../../actions/socketActions';
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {handelTokenClick, handleInputQuery} from '../../components/tableFilter/tableFilterCommonFunctions';
import RangeSlider from '../../components/rangeSlider/rangeSlider'
import {filterMarks} from '../../constants/frontEndConstants';


class PPSFilter extends React.Component{
  constructor(props) 
  {
      super(props);
        this.state = {tokenSelected: {"STATUS":["all"], "MODE":["all"]}, searchQuery: {},
                      defaultToken: {"STATUS":["all"], "MODE":["all"]}, rangeSelected:{"minValue":["-1"],"maxValue":["500"]}}; 
    }


    _closeFilter() {
        let filterState = !this.props.showFilter;
        this.props.showTableFilter(false);
    } 

     _processPPSSearchField(){
        const filterInputFields = [{value:"PPS ID", label:<FormattedMessage id="pps.inputField.id" defaultMessage ="PPS ID"/>}, 
                    {value:"OPERATOR ASSIGNED", label:<FormattedMessage id="pps.inputField.oprator" defaultMessage ="OPERATOR ASSIGNED"/>}];
        let inputValue = this.state.searchQuery;
        let inputField = <FilterInputFieldWrap inputText={filterInputFields} handleInputText={this._handleInputQuery.bind(this)} inputValue={inputValue}/>
        return inputField;           
    }



    _processFilterToken() {
        let tokenField1 = {value:"STATUS", label:<FormattedMessage id="pps.token.status" defaultMessage ="STATUS"/>};
        let tokenField2 = {value:"MODE", label:<FormattedMessage id="pps.token.timePeriod" defaultMessage ="MODE"/>}; 
       let labelC1 = [
                    { value: 'all', label: <FormattedMessage id="pps.STATUS.all" defaultMessage ="Any"/>},
                    { value: 'on', label: <FormattedMessage id="pps.STATUS.stopped" defaultMessage ="On"/>},
                    { value: 'off', label: <FormattedMessage id="pps.STATUS.error" defaultMessage ="Off"/>}
                    ];
        let labelC2 = [
                    { value: 'all', label: <FormattedMessage id="pps.MODE.all" defaultMessage ="Any"/>},
                    { value: 'pick', label: <FormattedMessage id="pps.MODE.pick" defaultMessage ="Pick"/>},
                    { value: 'put', label: <FormattedMessage id="pps.MODE.put" defaultMessage ="Put"/>},
                    { value: 'audit', label: <FormattedMessage id="pps.MODE.audit" defaultMessage ="Audit"/>},
                    { value: 'notset', label: <FormattedMessage id="v.MODE.notset" defaultMessage ="Not set"/>}
                    ]; 
        let selectedToken =  this.state.tokenSelected;
        let column1 = <FilterTokenWrap field={tokenField1} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC1} selectedToken={selectedToken}/>;
        let column2 = <FilterTokenWrap field={tokenField2} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC2} selectedToken={selectedToken}/>;
        let columnDetail = {column1token:column1, column2token:column2};
        return columnDetail;
    }

    _handleRangeSlider(){
      return <div>
       <span className="sliderHeaderText">PERFORMANCE RANGE</span>
                             <RangeSlider.Range 
                                 min={0}
                                 max={500}
                                 step={100}
                                 marks={filterMarks}
                                 maxValue={500}
                                 defaultValue={[0,500]}
                                 allowCross={false}
                                 onChange={this._changeSLiderRange.bind(this)}
                                  />
                                  </div>
      
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
        (filterState.searchQuery["OPERATOR ASSIGNED"]?filterSubsData["operators_assigned"] = ['contains',filterState.searchQuery["OPERATOR ASSIGNED"]]:"");
        (filterState.searchQuery["PPS ID"]?filterSubsData["pps_id"] = ['=',filterState.searchQuery["PPS ID"]]:"");
      }
      if(filterState.rangeSelected){
        (filterState.rangeSelected["maxValue"]?filterSubsData["performance"]=['between',[Number(filterState.rangeSelected["minValue"]),Number(filterState.rangeSelected["maxValue"])]]:"");
      }

      
      if(filterState.tokenSelected) {
        (filterState.tokenSelected["STATUS"] && filterState.tokenSelected["STATUS"][0]!=="all"?filterSubsData["pps_status"] = ['in',filterState.tokenSelected["STATUS"]]:"");
        (filterState.tokenSelected["MODE"] && filterState.tokenSelected["MODE"][0]!=="all"?filterSubsData["current_task"] = ['in',filterState.tokenSelected["MODE"]]:"");
      }
      let updatedWsSubscription = this.props.wsSubscriptionData;
      updatedWsSubscription["pps"].data[0].details["filter_params"] = filterSubsData;
      this.props.ppsfilterState(filterState);
      this.props.socketDataSubscription(updatedWsSubscription);
      this.props.filterApplied(!this.props.isFilterApplied);
      this.props.togglePPSFilter(true);
    }

    _clearFilter() {
         let clearState = {};
        let updatedWsSubscription = this.props.wsSubscriptionData;
        updatedWsSubscription["pps"].data[0].details["filter_params"] = {};
        this.props.socketDataSubscription(updatedWsSubscription);
         this.setState({tokenSelected: {"STATUS":["all"], "MODE":["all"]}, searchQuery: {}, rangeSelected:{"minValue":["-1"],"maxValue":["500"]}});
        this.props.ppsfilterState({tokenSelected: {"STATUS":["all"], "MODE":["all"]}, searchQuery: {}, rangeSelected:{"minValue":["-1"],"maxValue":["500"]}});
        this.props.filterApplied(!this.props.isFilterApplied);
        this.props.togglePPSFilter(false);

    } 


   _changeSLiderRange(sliderVal){
      this.setState({rangeSelected:{minValue:sliderVal[0],maxValue:sliderVal[1]}});
    }

  render(){
    
        var ppsDetail = this.props.PPSDetail;
        var noOrder = ppsDetail.PPStypeDetail && ppsDetail.PPStypeDetail.length?false:true;
        let ppsSearchField = this._processPPSSearchField();
        let ppsFilterToken = this._processFilterToken();
        let rangeSlider=this._handleRangeSlider();
    return (
      <div>
                 <Filter hideFilter={this._closeFilter.bind(this)}  // hiding filter wont disturb state
                         clearFilter={this._clearFilter.bind(this)} // clearing sates of filter
                         searchField={ppsSearchField}
                         filterTokenC1={ppsFilterToken.column1token}
                         filterTokenC2={ppsFilterToken.column2token}
                         formSubmit={this._applyFilter.bind(this)} //passing function on submit
                         responseFlag={this.props.orderListSpinner} // used for spinner of button 
                         noDataFlag={noOrder} //messg to show in case of no data
                         slides={rangeSlider}
                         />        
      </div>
    );
  }
};


function mapStateToProps(state, ownProps){
  return {
    PPSDetail: state.PPSDetail || [],
    showFilter: state.filterInfo.filterState || false,
    orderData: state.getOrderDetail || {},
    wsSubscriptionData:state.recieveSocketActions.socketDataSubscriptionPacket,
    orderListSpinner: state.spinner.orderListSpinner || false,
    filterState: state.filterInfo.ppsfilterState,
    isFilterApplied: state.filterInfo.isFilterApplied || false,
    ppsFilterState:state.filterInfo.ppsFilterState || false
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    showTableFilter: function(data){dispatch(showTableFilter(data));},
    filterApplied: function(data){dispatch(filterApplied(data));},
    socketDataSubscription: function(data){dispatch(socketDataSubscription(data));},
    ppsfilterState: function(data){dispatch(ppsfilterState(data));},
    togglePPSFilter: function(data){dispatch(togglePPSFilter(data));}

  }
};
export default connect(mapStateToProps,mapDispatchToProps)(PPSFilter) ;


