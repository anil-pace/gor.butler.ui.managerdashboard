import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {showTableFilter, filterApplied} from '../../actions/filterAction';
import { connect } from 'react-redux'; 
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
                      defaultToken: {"DSTATUS":["all"], "MODE":["all"]}, rangeSelected:{"minValue":["0"],"maxValue":["500"]}}; 
    }


    _closeFilter() {
        var filterState = !this.props.showFilter;
        this.props.showTableFilter(false);
    } 

     _processAuditSearchField(){
        const filterInputFields = [{value:"PPS ID", label:<FormattedMessage id="pps.inputField.id" defaultMessage ="PPS ID"/>}, 
                    {value:"OPERATOR ASSIGNED", label:<FormattedMessage id="pps.inputField.oprator" defaultMessage ="OPERATOR ASSIGNED"/>}];
        var inputValue = this.state.searchQuery;
        var inputField = <FilterInputFieldWrap inputText={filterInputFields} handleInputText={this._handleInputQuery.bind(this)} inputValue={inputValue}/>
        return inputField;           
    }

    _processFilterToken() {
        let tokenField1 = {value:"STATUS", label:<FormattedMessage id="pps.token.status" defaultMessage ="STATUS"/>};
        let tokenField2 = {value:"MODE", label:<FormattedMessage id="pps.token.timePeriod" defaultMessage ="MODE"/>}; 
       let labelC1 = [
                    { value: 'all', label: <FormattedMessage id="pps.STATUS.all" defaultMessage ="All"/>},
                    { value: 'stopped', label: <FormattedMessage id="pps.STATUS.stopped" defaultMessage ="Stopped"/>},
                    { value: 'error', label: <FormattedMessage id="pps.STATUS.error" defaultMessage ="Error"/>},
                    { value: 'warning', label: <FormattedMessage id="pps.STATUS.warning" defaultMessage ="Warning"/>},
                    { value: 'connected', label: <FormattedMessage id="pps.STATUS.connected" defaultMessage ="Connected"/>},
                    { value: 'disconnected', label: <FormattedMessage id="pps.STATUS.disconnected" defaultMessage ="Disconnected"/>},
                    ];
        let labelC2 = [
                    { value: 'all', label: <FormattedMessage id="pps.MODE.all" defaultMessage ="All"/>},
                    { value: 'pick', label: <FormattedMessage id="pps.MODE.pick" defaultMessage ="Pick"/>},
                    { value: 'put', label: <FormattedMessage id="pps.MODE.put" defaultMessage ="Put"/>},
                    { value: 'audit', label: <FormattedMessage id="pps.MODE.auditudit" defaultMessage ="Audit"/>},
                    { value: 'notset', label: <FormattedMessage id="v.MODE.notset" defaultMessage ="Not set"/>}
                    ]; 
        var selectedToken =  this.state.tokenSelected;
        var column1 = <FilterTokenWrap field={tokenField1} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC1} selectedToken={selectedToken}/>;
        var column2 = <FilterTokenWrap field={tokenField2} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC2} selectedToken={selectedToken}/>;
        var columnDetail = {column1token:column1, column2token:column2};
        return columnDetail;
    }

    _processSlider() {
      var ppsSlider = <div><span className="sliderHeaderText">PERFORMANCE RANGE</span>
                             <RangeSlider.Range 
                                 min={0}
                                 max={500}
                                 step={100}
                                 marks={filterMarks}
                                 maxValue={500}
                                 defaultValue={[200,400]}
                                 allowCross={false}
                                 onChange={this._onRangeChange}
                                  /> </div>

                                  return ppsSlider;
    }

    _handelTokenClick(field,value,state) {
        this.setState({tokenSelected:handelTokenClick(field,value,state,this.state)});
        
    }

    _handleInputQuery(inputQuery,queryField) {
        this.setState({searchQuery:handleInputQuery(inputQuery,queryField,this.state)})
    }

    _applyFilter() {
        console.log(this.state)
       this.props.refreshOption(this.state);

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
      this.props.butlerfilterState(filterState);
      this.props.socketDataSubscription(updatedWsSubscription);
      this.props.filterApplied(true);

    }

    _clearFilter() {
        var clearState = {};
        this.props.filterApplied(false)
        this.setState({tokenSelected: {"STATUS":["all"], "MODE":["all"]}, searchQuery: {}});
        this.props.refreshOption(clearState)
    } 
   _onRangeChange(e){
       var range = {max:e[1],min:e[0]};
      this.setState({rangeSelected:{minValue:range.min},rangeSelected:{maxValue:range.max}});
    }
  render(){
    
        var noOrder = this.props.orderData.totalOrders?false:true;
        var auditSearchField = this._processAuditSearchField();
        var auditFilterToken = this._processFilterToken();
        var ppsSlider = this._processSlider();
    return (
      <div>
                 <Filter hideFilter={this._closeFilter.bind(this)}  // hiding filter wont disturb state
                         clearFilter={this._clearFilter.bind(this)} // clearing sates of filter
                         searchField={auditSearchField}
                         filterTokenC1={auditFilterToken.column1token}
                         filterTokenC2={auditFilterToken.column2token}
                         formSubmit={this._applyFilter.bind(this)} //passing function on submit
                         responseFlag={this.props.orderListSpinner} // used for spinner of button 
                         noDataFlag={noOrder} //messg to show in case of no data
                         rangechange={this._onRangeChange.bind(this)}
                         slider={ppsSlider}
                         />        
      </div>
    );
  }
};


function mapStateToProps(state, ownProps){
  return {
    showFilter: state.filterInfo.filterState || false,
    orderData: state.getOrderDetail || {},
    orderListSpinner: state.spinner.orderListSpinner || false,
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    showTableFilter: function(data){dispatch(showTableFilter(data));},
    filterApplied: function(data){dispatch(filterApplied(data));}
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(PPSFilter) ;


