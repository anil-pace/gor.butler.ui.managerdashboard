import React  from 'react';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {showTableFilter, filterApplied,ppsfilterState,togglePPSFilter,setDefaultRange} from '../../actions/filterAction';
import { connect } from 'react-redux'; 
import {updateSubscriptionPacket} from '../../actions/socketActions';
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {handelTokenClick, handleInputQuery} from '../../components/tableFilter/tableFilterCommonFunctions';
import RangeSlider from '../../components/rangeSlider/RangeSlider'
import {filterMarks} from '../../constants/frontEndConstants';
import {setPpsFilterSpinner}  from '../../actions/spinnerAction';
import {hashHistory} from 'react-router'


class PPSFilter extends React.Component{  
  constructor(props) 
  {
      super(props);
        this.state={tokenSelected: {"STATUS":["all"], "MODE":["all"]}, searchQuery: {},
                      defaultToken: {"STATUS":["all"], "MODE":["all"]}, rangeSelected:{"minValue":["-1"],"maxValue":["500"]}}; 
    }


    _closeFilter() {
        this.props.showTableFilter(false);
    } 

     _processPPSSearchField(){
        const filterInputFields=[{value:"PPS ID", label:<FormattedMessage id="pps.inputField.id" defaultMessage="PPS ID"/>}, 
                    {value:"OPERATOR ASSIGNED", label:<FormattedMessage id="pps.inputField.oprator" defaultMessage="OPERATOR ASSIGNED"/>}];
        let inputValue=this.state.searchQuery;
        let inputField=<FilterInputFieldWrap inputText={filterInputFields} handleInputText={this._handleInputQuery.bind(this)} inputValue={inputValue}/>
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

        /**
         * Hide the filter as soon as data in the list get updated.
         */
        if(nextProps.data.length>0 && JSON.stringify(nextProps.data)!==JSON.stringify(this.props.data)){
            this.props.showTableFilter(false);
        }
    }



    _processFilterToken() {
        let tokenField1={value:"STATUS", label:<FormattedMessage id="pps.token.status" defaultMessage="STATUS"/>};
        let tokenField2={value:"MODE", label:<FormattedMessage id="pps.token.timePeriod" defaultMessage="MODE"/>}; 
       let labelC1=[
                    { value: 'all', label: <FormattedMessage id="pps.STATUS.all" defaultMessage="Any"/>},
                    { value: 'open', label: <FormattedMessage id="pps.STATUS.stopped" defaultMessage="Open"/>},
                    { value: 'close', label: <FormattedMessage id="pps.STATUS.error" defaultMessage="Close"/>},
                    { value: 'force_close', label: <FormattedMessage id="pps.STATUS.fclose" defaultMessage="Force Close"/>}
                    ];
        let labelC2=[
                    { value: 'all', label: <FormattedMessage id="pps.MODE.all" defaultMessage="Any"/>},
                    { value: 'pick', label: <FormattedMessage id="pps.MODE.pick" defaultMessage="Pick"/>},
                    { value: 'put', label: <FormattedMessage id="pps.MODE.put" defaultMessage="Put"/>},
                    { value: 'audit', label: <FormattedMessage id="pps.MODE.audit" defaultMessage="Audit"/>},
                    { value: 'notset', label: <FormattedMessage id="v.MODE.notset" defaultMessage="Not set"/>}
                    ]; 
        let selectedToken= this.state.tokenSelected;
        let column1=<FilterTokenWrap field={tokenField1} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC1} selectedToken={selectedToken}/>;
        let column2=<FilterTokenWrap field={tokenField2} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC2} selectedToken={selectedToken}/>;
        let columnDetail={column1token:column1, column2token:column2};
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
                                 onChange={this._changeSliderRange.bind(this)}
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
        let filterState=this.state, _query={};
        if (filterState.searchQuery) {

            if (filterState.searchQuery && filterState.searchQuery["OPERATOR ASSIGNED"]) {
                _query.operator=filterState.searchQuery["OPERATOR ASSIGNED"]
            }

            if (filterState.searchQuery && filterState.searchQuery["PPS ID"]) {
                _query.pps_id=filterState.searchQuery["PPS ID"]
            }

            if (filterState.rangeSelected && (filterState.rangeSelected["maxValue"] || filterState.rangeSelected["minValue"])) {
                _query.minRange=filterState.rangeSelected["minValue"] || 0
                _query.maxRange=filterState.rangeSelected["maxValue"]
            }
            if (filterState.tokenSelected["STATUS"] && filterState.tokenSelected["STATUS"][0] !== "all") {
                _query.status=filterState.tokenSelected["STATUS"]
            }
            if (filterState.tokenSelected["MODE"] && filterState.tokenSelected["MODE"][0] !== "all") {
                _query.mode=filterState.tokenSelected["MODE"]
            }
            hashHistory.push({pathname: "/system/pps", query: _query})
        }
    }

    _clearFilter(){
        this.props.ppsfilterState({
            tokenSelected: {
                "STATUS": ["all"],
                "MODE": ["all"]
            },
            searchQuery: {
                "PPS ID": '',
                "OPERATOR ASSIGNED": ""
            },
            rangeSelected: {"minValue": ["-1"], "maxValue": ["500"]}
        })
        hashHistory.push({pathname: "/system/pps", query: {}})

    } 

   _changeSliderRange(sliderVal){
      this.setState({rangeSelected:{minValue:(sliderVal[0] ? sliderVal[0] : -1),maxValue:sliderVal[1]}});
    }
  render(){
    
        var ppsDetail=this.props.PPSDetail;
        var noOrder=ppsDetail.PPStypeDetail && ppsDetail.PPStypeDetail.length?false:true;
        let ppsSearchField=this._processPPSSearchField();
        let ppsFilterToken=this._processFilterToken();
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
    ppsFilterState:state.filterInfo.ppsFilterState || false,
    ppsFilterSpinnerState:state.spinner.ppsFilterSpinnerState || false,
    deaultSliderRange:state.filterInfo.deaultSliderRange || [0,500]
    

  };
}

var mapDispatchToProps=function(dispatch){
  return {
    showTableFilter: function(data){dispatch(showTableFilter(data));},
    filterApplied: function(data){dispatch(filterApplied(data));},
    updateSubscriptionPacket: function(data){dispatch(updateSubscriptionPacket(data));},
    ppsfilterState: function(data){dispatch(ppsfilterState(data));},
    togglePPSFilter: function(data){dispatch(togglePPSFilter(data));},
    setPpsFilterSpinner: function(data){dispatch(setPpsFilterSpinner(data));},
    setDefaultRange: function(data){dispatch(setDefaultRange(data));}

  }
};
PPSFilter.PropTypes={
  PPSDetail:React.PropTypes.array,
 showFilter:React.PropTypes.bool,
 orderData:React.PropTypes.object,
 wsSubscriptionData:React.PropTypes.object,
 orderListSpinner:React.PropTypes.bool,
 isFilterApplied:React.PropTypes.bool,
 ppsFilterState:React.PropTypes.bool,
 showTableFilter:React.PropTypes.func,
filterApplied: React.PropTypes.func,
updateSubscriptionPacket:React.PropTypes.func,
togglePPSFilter:React.PropTypes.func
};

export default connect(mapStateToProps,mapDispatchToProps)(PPSFilter) ;


