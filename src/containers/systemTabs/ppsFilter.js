import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {PPSFilterToggle, filterApplied,ppsfilterState,togglePPSFilterApplied,setDefaultRange,setFilterApplyFlag} from '../../actions/filterAction';
import { connect } from 'react-redux'; 
import {updateSubscriptionPacket} from '../../actions/socketActions';
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {handelTokenClick, handleInputQuery} from '../../components/tableFilter/tableFilterCommonFunctions';
import RangeSlider from '../../components/rangeSlider/rangeSlider'
import {filterMarks} from '../../constants/frontEndConstants';
import {setPpsFilterSpinner}  from '../../actions/spinnerAction';


class PPSFilter extends React.Component{  
  constructor(props) 
  {
      super(props);
        this.state = {tokenSelected: {"STATUS":["all"], "MODE":["all"]}, searchQuery: {},
                      defaultToken: {"STATUS":["all"], "MODE":["all"]}, rangeSelected:{"minValue":["-1"],"maxValue":["500"]}}; 
    }


    _closeFilter() {
        var filterState = !this.props.ppsToggleFilter;
        this.props.PPSFilterToggle(false);
    } 

     _processPPSSearchField(){
        const filterInputFields = [{value:"PPS ID", label:<FormattedMessage id="pps.inputField.id" defaultMessage ="PPS ID"/>}, 
                    {value:"OPERATOR ASSIGNED", label:<FormattedMessage id="pps.inputField.oprator" defaultMessage ="OPERATOR ASSIGNED"/>}];
        let inputValue = this.state.searchQuery;
        let inputField = <FilterInputFieldWrap inputText={filterInputFields} handleInputText={this._handleInputQuery.bind(this)} inputValue={inputValue}/>
        return inputField;           
    }

    componentWillReceiveProps(nextProps){
        /**
         * It will update the state as soon as
         * filters are cleared.
         */
        if(nextProps.filterState && JSON.stringify(this.state)!==JSON.stringify(nextProps.filterState)){
            this.setState(nextProps.filterState)
        }
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
                                 defaultValue={this.props.deaultSliderRange}
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

          /** Gaurav Makkar:
           *  Changed query parameter for the
           *  operator assigned.
           *  Updated data to be sent to the socket:
           * if single word:
           * {operator_assigned:["=",<word>]}
           * if multiple word:
           * {operator_assigned:["=",[<1>,<2>]]}
           * {username:[<1>,<2>]}
           */
          if (filterState.searchQuery["OPERATOR ASSIGNED"]) {
              let operator_assigned_query=filterState.searchQuery["OPERATOR ASSIGNED"].split(" ")
              operator_assigned_query=operator_assigned_query.filter(function(word){ return !!word})
              filterSubsData["operators_assigned"] = operator_assigned_query.length>1?["=",operator_assigned_query]:["=",operator_assigned_query.join("").trim()];
          }
        (filterState.searchQuery["PPS ID"]?filterSubsData["pps_id"] = ['=',filterState.searchQuery["PPS ID"]]:"");
      }

      if(filterState.rangeSelected){
        (filterState.rangeSelected["maxValue"]?filterSubsData["performance"]=['between',[ (Number(filterState.rangeSelected["minValue"])==0)?-1:Number(filterState.rangeSelected["minValue"]),Number(filterState.rangeSelected["maxValue"])]]:"");
      }

      
      if(filterState.tokenSelected) {
        (filterState.tokenSelected["STATUS"] && filterState.tokenSelected["STATUS"][0]!=="all"?filterSubsData["pps_status"] = ['in',filterState.tokenSelected["STATUS"]]:"");
        (filterState.tokenSelected["MODE"] && filterState.tokenSelected["MODE"][0]!=="all"?filterSubsData["current_task"] = ['in',filterState.tokenSelected["MODE"]]:"");
      }
      let updatedWsSubscription = this.props.wsSubscriptionData;
      updatedWsSubscription["pps"].data[0].details["filter_params"] = filterSubsData;
      this.props.ppsfilterState(filterState);
      this.props.updateSubscriptionPacket(updatedWsSubscription);
      this.props.filterApplied(!this.props.isFilterApplied);
      this.props.togglePPSFilterApplied(true);
      this.props.setPpsFilterSpinner(true);
        this.props.setFilterApplyFlag(true);
    }

    _clearFilter() {
         let clearState = {};
        let updatedWsSubscription = this.props.wsSubscriptionData;
        updatedWsSubscription["pps"].data[0].details["filter_params"] = {};
        this.props.updateSubscriptionPacket(updatedWsSubscription);
        this.setState({tokenSelected: {"STATUS":["all"], "MODE":["all"]}, searchQuery: {}, rangeSelected:{"minValue":["-1"],"maxValue":["500"]}});
        this.props.ppsfilterState({tokenSelected: {"STATUS":["all"], "MODE":["all"]}, searchQuery: {}, rangeSelected:{"minValue":["-1"],"maxValue":["500"]}});
        this.props.filterApplied(!this.props.isFilterApplied);
        this.props.togglePPSFilterApplied(false);
        this.props.setPpsFilterSpinner(true);
        this.props.setDefaultRange([0,500]);
        this._handleRangeSlider();
        this.props.setFilterApplyFlag(true);

    } 

   _changeSLiderRange(sliderVal){
      this.setState({rangeSelected:{minValue:sliderVal[0],maxValue:sliderVal[1]}});
    }
  render(){
        var ppsDetail = this.props.PPSDetail;
        var noPPS = ppsDetail.emptyResponse
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
                         responseFlag={this.props.ppsFilterSpinnerState} // used for spinner of button 
                         noDataFlag={noPPS} //messg to show in case of no data
                         slides={rangeSlider}

                         />        
      </div>
    );
  }
};


function mapStateToProps(state, ownProps){
  return {
    PPSDetail: state.PPSDetail || [],
    ppsToggleFilter: state.filterInfo.ppsToggleFilter || false,
    orderData: state.getOrderDetail || {},
    wsSubscriptionData:state.recieveSocketActions.socketDataSubscriptionPacket,
    orderListSpinner: state.spinner.orderListSpinner || false,
    filterState: state.filterInfo.ppsfilterState,
    isFilterApplied: state.filterInfo.isFilterApplied || false,
    ppsFilterState:state.filterInfo.ppsFilterState || false,
    ppsFilterSpinnerState:state.spinner.ppsFilterSpinnerState || false,
    deaultSliderRange:state.filterInfo.deaultSliderRange || [0,500]
    

  };
}

var mapDispatchToProps = function(dispatch){
  return {
    PPSFilterToggle: function(data){dispatch(PPSFilterToggle(data));},
    filterApplied: function(data){dispatch(filterApplied(data));},
    updateSubscriptionPacket: function(data){dispatch(updateSubscriptionPacket(data));},
    ppsfilterState: function(data){dispatch(ppsfilterState(data));},
    togglePPSFilterApplied: function(data){dispatch(togglePPSFilterApplied(data));},
    setPpsSpinner: function(data){dispatch(setPpsSpinner(data));},
    setPpsFilterSpinner: function(data){dispatch(setPpsFilterSpinner(data));},
    setDefaultRange: function(data){dispatch(setDefaultRange(data));},
     setFilterApplyFlag: function (data) {dispatch(setFilterApplyFlag(data));}

  }
};
PPSFilter.PropTypes={
  PPSDetail:React.PropTypes.array,
 ppsToggleFilter:React.PropTypes.bool,
 orderData:React.PropTypes.object,
 wsSubscriptionData:React.PropTypes.object,
 orderListSpinner:React.PropTypes.bool,
 isFilterApplied:React.PropTypes.bool,
 ppsFilterState:React.PropTypes.bool,
 PPSFilterToggle:React.PropTypes.func,
filterApplied: React.PropTypes.func,
updateSubscriptionPacket:React.PropTypes.func,
togglePPSFilterApplied:React.PropTypes.func,
setFilterApplyFlag:React.PropTypes.func
};

export default connect(mapStateToProps,mapDispatchToProps)(PPSFilter) ;


