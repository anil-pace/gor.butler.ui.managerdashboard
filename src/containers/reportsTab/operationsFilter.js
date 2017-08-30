import React  from 'react';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {showTableFilter, filterApplied,ppsfilterState} from '../../actions/filterAction';
import {applyOLFilterFlag} from '../../actions/operationsLogsActions';
import { connect } from 'react-redux'; 
import {updateSubscriptionPacket} from '../../actions/socketActions';
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {handelTokenClick, handleInputQuery} from '../../components/tableFilter/tableFilterCommonFunctions';
import {REPORTS_FILTER_PARAMS} from '../../constants/filterParams';
import {hashHistory} from 'react-router';
import {SINGLE} from '../../constants/frontEndConstants'




class OperationsFilter extends React.Component{  
  constructor(props) 
  {
      super(props);
      this.state={
        tokenSelected: {
          "status":["any"], 
          "timeperiod":["60"]
        }, 
        searchQuery: {
          "request_id":"",
          "sku_id":"",
          "pps_id":"",
          "user_id":""
        },
        defaultToken: {
          "status":["any"]
        },
        selection:{
          "status":"multi",
          "timeperiod":"Single"
        }
        }; 
      this._closeFilter = this._closeFilter.bind(this);
      this._clearFilter = this._clearFilter.bind(this);
      this._applyFilter = this._applyFilter.bind(this);
      this._processSearchField= this._processSearchField.bind(this);
    }


    _closeFilter() {
        this.props.showTableFilter(false);
    } 

     _processSearchField(filterInputFields){
        let inputValue=this.state.searchQuery;
        let inputField=<FilterInputFieldWrap inputText={filterInputFields} handleInputText={this._handleInputQuery.bind(this)} inputValue={inputValue}/>
        return inputField;           
    }

    componentWillReceiveProps(nextProps){
        /**
         * It will update the state as soon as
         * filters are cleared.
         */
        /*if(nextProps.filterState && JSON.stringify(this.state)!==JSON.stringify(nextProps.filterState)){
            this.setState(nextProps.filterState)
        }*/

        /**
         * Hide the filter as soon as data in the list get updated.
         */
        /*if(!nextProps.hideLayer){
            this.props.showTableFilter(false);
        }*/
    }

    _processFilterParams(){
      var filterParams = JSON.parse(JSON.stringify(REPORTS_FILTER_PARAMS));
      var filterInputFields = [],statusToken={},statusLabels=[],
      timePeriodToken={},timePeriodLabels=[];
      for(let i=0,len = filterParams.length; i < len ; i++){
          let filter = filterParams[i],textInput={},tokenInput;
          if(filter["type"] === "text"){
            textInput["value"] = filter.name;
            textInput["label"] = filter.labelText;
            filterInputFields.push(textInput)
          }
          else if(filter["type"] === "token"){
            let tokens = filter["tokens"];
            if(filter["name"] === "status"){
              statusToken["value"] = filter["name"];
              statusToken["label"] = filter["labelText"];
            }
            else if(filter["name"] === "timeperiod"){
              timePeriodToken["value"] = filter["name"];
              timePeriodToken["label"] = filter["labelText"];
            }
            for(let k in tokens){
              let token = {}
              token.value = k
              token.label = tokens[k];
              if(filter["name"] === "status"){
                statusLabels.push(token);
              }
              else if(filter["name"] === "timeperiod"){
                timePeriodLabels.push(token);
              }
              
            }
          }

      }
      return {
        filterInputFields,
        statusLabels,
        statusToken,
        timePeriodLabels,
        timePeriodToken
      }
    }

    _processFilterToken(filterParams) {
        let selectedToken= this.state.tokenSelected;
        let statusColumn=<FilterTokenWrap field={filterParams.statusToken} tokenCallBack={this._handelTokenClick.bind(this)} label={filterParams.statusLabels} selectedToken={selectedToken}/>;
        let timePeriodColumn=<FilterTokenWrap selection={SINGLE} field={filterParams.timePeriodToken} tokenCallBack={this._handelTokenClick.bind(this)} label={filterParams.timePeriodLabels} selectedToken={selectedToken}/>;
        let columnDetail={column1token:statusColumn, column2token:timePeriodColumn};
        return columnDetail;
    }




    _handelTokenClick(field,value,state) {
        var stateObject = JSON.parse(JSON.stringify(this.state))
        this.setState({tokenSelected:handelTokenClick(field,value,state,stateObject)});
        
    }

    _handleInputQuery(inputQuery,queryField) {
         var stateObject = JSON.parse(JSON.stringify(this.state))
        this.setState({searchQuery:handleInputQuery(inputQuery,queryField,stateObject)})
    }


    _applyFilter() {
        let filterState=this.state, _query={};
        if (filterState.searchQuery) {

            if ( filterState.searchQuery["request_id"]) {
                _query.request_id=filterState.searchQuery["request_id"]
            }

            if (filterState.searchQuery["pps_id"]) {
                _query.pps_id=filterState.searchQuery["pps_id"]
            }
            if (filterState.searchQuery["sku_id"]) {
                _query.sku_id=filterState.searchQuery["sku_id"]
            }
            if (filterState.searchQuery["user_id"]) {
                _query.user_id=filterState.searchQuery["user_id"]
            }

            
            if (filterState.tokenSelected["status"] && filterState.tokenSelected["status"][0] !== "any") {
                _query.status=filterState.tokenSelected["status"]
            }
            if (filterState.tokenSelected["timeperiod"]) {
                _query.time_period=filterState.tokenSelected["timeperiod"]
            }
            _query.pageSize = this.props.pageSize;
            this.props.applyOLFilterFlag(true);
            hashHistory.push({pathname: "/reports/operationsLog", query: _query})
        }
    }

    _clearFilter(){
        this.props.ppsfilterState({
            tokenSelected: {
                "status": ["any"],
                "timeperiod": ["any"]
            },
            searchQuery: {
                "request_id": "",
                "sku_id": "",
                "pps_id": "",
                "user_id": ""
            }
        })
        hashHistory.push({pathname: "/reports/operationsLog", query: {}})

    } 

   
  render(){
        
        var filterParams = this._processFilterParams();
        let ppsSearchField=this._processSearchField(filterParams.filterInputFields);
        let ppsFilterToken=this._processFilterToken(filterParams);
    return (
      <div>
                 <Filter>    
                  <div className="gor-filter-header">
                    <div className="gor-filter-header-h1">
                         <FormattedMessage id="gor.filter.filterLabel" description="label for filter" 
                            defaultMessage="Filter data"/>
                    </div>
                    <div className="gor-filter-header-h2" onClick={this._closeFilter}>
                        <FormattedMessage id="gor.filter.hide" description="label for hide" 
                            defaultMessage="Hide"/>
                    </div>
                 </div>
                    <div>{null ?
                            <div className="gor-no-result-filter">
                            <FormattedMessage id="gor.filter.noResult" description="label for no result" 
                            defaultMessage="No results found, please try again"/>
                            </div>:""}
                    </div>
                     <div className="gor-filter-body">
                         <div className="gor-filter-body-input-wrap"> 
                            {ppsSearchField}
                         </div>
                         <div className="gor-filter-body-filterToken-wrap"> 
                            <div className="gor-filter-body-filterToken-section1">
                                {ppsFilterToken.column1token}
                            </div>
                            <div className="gor-filter-body-filterToken-section1">
                                {ppsFilterToken.column2token}
                            </div>
                            

                         </div>
                         
                         
                     </div>
                 <div className="gor-filter-footer"> 
                    <span className="gor-filter-footer-h2" onClick={this._clearFilter}>
                       <FormattedMessage id="gor.filter.reset" description="label for reset" 
                            defaultMessage="Reset"/>
                    </span>
                    <div className="gor-filter-btn-wrap">
                        <button className='gor-add-btn' onClick={this._applyFilter}>
                            {true? <FormattedMessage id="gor.filter.heading" description="filter heading"  defaultMessage="Apply filter"/> :<div className='spinnerImage'></div>}
                        </button>


                    </div> 
                 </div>  
                </Filter>     
      </div>
    );
  }
};


function mapStateToProps(state, ownProps){
  return {
    
    showFilter: state.filterInfo.filterState || false,
    wsSubscriptionData:state.recieveSocketActions.socketDataSubscriptionPacket,
    isFilterApplied: state.filterInfo.isFilterApplied || false
  };
}

var mapDispatchToProps=function(dispatch){
  return {
    showTableFilter: function(data){dispatch(showTableFilter(data));},
    filterApplied: function(data){dispatch(filterApplied(data));},
    updateSubscriptionPacket: function(data){dispatch(updateSubscriptionPacket(data));},
    applyOLFilterFlag:function(data){dispatch(applyOLFilterFlag(data))}

  }
};
/*OperationsFilter.PropTypes={
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
};*/

export default connect(mapStateToProps,mapDispatchToProps)(OperationsFilter) ;


