import React  from 'react';
import { FormattedMessage,injectIntl } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {showTableFilter, filterApplied,orderfilterState,toggleOrderFilter} from '../../actions/filterAction';
import { connect } from 'react-redux'; 
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterDateTimeFieldWrap from '../../components/tableFilter/filterDateTimeFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {handelTokenClick, handleInputQuery} from '../../components/tableFilter/tableFilterCommonFunctions';
import {hashHistory} from 'react-router';
import {
    ANY,
    STATUS,
    ORDER_ID,
    PPS_ID,
    FROM_DATE,
    TO_DATE,
    FROM_TIME,
    TO_TIME,
    CREATED_STATUS,
    PROCESSING_STATUS,
    PROCESSED_STATUS,
    FAILED_STATUS, 
    CANCELLED_STATUS,
    WAITING_STATUS
}from '../../constants/frontEndConstants';
import moment from 'moment-timezone';

class OrderFilter extends React.Component{
    constructor(props) 
    {
        super(props);

       
        this.state={
          tokenSelected: {"ORDER TAGS":[ANY], "STATUS":[ANY]},
          searchQuery: {
            "FROM DATE":null,
            "FROM TIME":null,
            "TO DATE":null,
            "TO TIME":null
          },
          defaultToken: {"ORDER TAGS":[ANY], "STATUS":[ANY]}
        }; 

        this._applyFilter =  this._applyFilter.bind(this);
        this._closeFilter = this._closeFilter.bind(this);
        this._clearFilter = this._clearFilter.bind(this);
        moment.locale(props.intl.locale);

    }


    _closeFilter() {
        this.props.showTableFilter(false);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.orderFilterState && JSON.stringify(this.state)!==JSON.stringify(nextProps.orderFilterState)){
            this.setState(nextProps.orderFilterState)
        }
        if (nextProps.timeOffset !== this.props.timeOffset){
            let dtFrom = moment().tz(nextProps.timeOffset).startOf('day').format("YYYY-MM-DD");
            let dtTo = moment().tz(nextProps.timeOffset).endOf('day').format("YYYY-MM-DD");
            let timeFrom =  moment().tz(nextProps.timeOffset).startOf('day').format("HH:mm:ss");
            let timeTo =  moment().tz(nextProps.timeOffset).endOf('day').format("HH:mm:ss");
            this.setState({
                searchQuery: {
                    "FROM DATE":dtFrom,
                    "FROM TIME":timeFrom,
                    "TO DATE":dtTo,
                    "TO TIME":timeTo
                  },
            }, ()=>{this._applyFilter(true)})   
        }
    }

    _processOrderIdSearchField(){

        const filterInputFields=
        [{
            value: ORDER_ID,
            label: <FormattedMessage id="order.inputField.orderId" defaultMessage="ORDER ID"/>
        }];

        var inputValue=this.state.searchQuery;
        var textboxStatus=this.props.textboxStatus || {};
        var inputField=<FilterInputFieldWrap 
                             inputText={filterInputFields}
                             inputValue={inputValue} 
                             handleInputText={this._handleInputQuery.bind(this)}
                             textboxStatus={textboxStatus}/>  
        return inputField;       

    }

    _processPpsIdSearchField(){
      const filterInputFields=
        [{
            value: PPS_ID,
            label: <FormattedMessage id="order.inputField.ppsId" defaultMessage="PPS ID"/>
        }];

        var inputValue=this.state.searchQuery;
        var textboxStatus=this.props.textboxStatus || {};
        var inputField=<FilterInputFieldWrap 
                             inputText={filterInputFields}
                             inputValue={inputValue} 
                             handleInputText={this._handleInputQuery.bind(this)}
                             textboxStatus={textboxStatus}/>  
        return inputField;       
    }

    componentWillMount(){
        if(this.props.orderFilterState) {
            this.setState(this.props.orderFilterState)
        }
    } 

    _processFilterToken() {
        var tokenField2={value:"STATUS", label:<FormattedMessage id="order.token.status" defaultMessage="STATUS"/>}; 
        
        var labelC2=[
                      { value: ANY, label: <FormattedMessage id="order.status.any" defaultMessage="Any"/>},
                      { value: CREATED_STATUS, label: <FormattedMessage id="order.status.created" defaultMessage="Created"/>},
                      { value: PROCESSING_STATUS, label: <FormattedMessage id="order.status.processing" defaultMessage="In progress"/>},
                      { value: WAITING_STATUS, label: <FormattedMessage id="order.status.waiting" defaultMessage="On hold"/>},
                      { value: PROCESSED_STATUS, label: <FormattedMessage id="order.status.processed" defaultMessage="Completed"/>},
                      { value: CANCELLED_STATUS, label: <FormattedMessage id="order.status.cancelled" defaultMessage="Cancelled"/>},
                      { value: FAILED_STATUS, label: <FormattedMessage id="order.status.failed" defaultMessage="Not Fulfillable"/>}
                    ];

        var selectedToken= this.state.tokenSelected;
        var column2=<FilterTokenWrap field={tokenField2} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC2} selectedToken={selectedToken}/>;

        var columnDetail={column2token:column2};

        return columnDetail;
    }

    _processOrderDateField(){
        const dateColumn = [
          {
            value: "FROM DATE",
            label: <FormattedMessage id="order.inputField.fromDate" defaultMessage="FROM DATE"/>
          },
          {
            value: "TO DATE",
            label: <FormattedMessage id="order.inputField.toDate" defaultMessage="TO DATE"/>
          }
        ];

        var inputValue=this.state.searchQuery;
        var textboxStatus=this.props.textboxStatus || {};
        var inputField=<FilterDateTimeFieldWrap 
                             inputText={dateColumn}
                             inputValue={inputValue} 
                             handleInputText={this._handleInputQuery.bind(this)}
                             textboxStatus={textboxStatus}
                             inputType="date" />
        return inputField;

    }

    _processOrderTimeField(){
        const dateColumn = [
          {
            value: "FROM TIME",
            label: <FormattedMessage id="order.inputField.fromTime" defaultMessage="TIME"/>
          },
          {
            value: "TO TIME",
            label: <FormattedMessage id="order.inputField.toTime" defaultMessage="TIME"/>
          }
        ];

        var inputValue=this.state.searchQuery;
        var textboxStatus=this.props.textboxStatus || {};
        var inputField=<FilterDateTimeFieldWrap 
                             inputText={dateColumn}
                             inputValue={inputValue} 
                             handleInputText={this._handleInputQuery.bind(this)}
                             textboxStatus={textboxStatus}
                             inputType="time" />
        return inputField;
    }

    _handelTokenClick(field,value,state) {
        this.setState({tokenSelected:handelTokenClick(field,value,state,this.state)});
        
    }

    _handleInputQuery(inputQuery,queryField) {
        this.setState({searchQuery:handleInputQuery(inputQuery,queryField,this.state)})
    }

   
    _applyFilter(doNotShowFilterStatus) {
        this._closeFilter();
        var filterState=this.state, _query={};

        if (filterState.tokenSelected[STATUS] && filterState.tokenSelected[STATUS][0] !== ANY) {
            _query.status=filterState.tokenSelected[STATUS]
        }

        if (filterState.searchQuery[ORDER_ID]) {
            _query.orderId=filterState.searchQuery[ORDER_ID]
        }

        if (filterState.searchQuery[PPS_ID]) {
            _query.ppsId=filterState.searchQuery[PPS_ID]
        }

        if (filterState.searchQuery[FROM_DATE]) {
            _query.fromDate=filterState.searchQuery[FROM_DATE]
        }

        if (filterState.searchQuery[FROM_TIME]) {
            _query.fromTime=filterState.searchQuery[FROM_TIME]
        }

        
        if (filterState.searchQuery[TO_DATE]) {
            _query.toDate=filterState.searchQuery[TO_DATE]
        }

        if (filterState.searchQuery[TO_TIME]) {
            _query.toTime=filterState.searchQuery[TO_TIME]
        }
        
       hashHistory.push({pathname: "/orders", query: _query});
       // Since we do not want to display the Filtered status on the initial load.
       // hence the param doNotShowFilterStatus is used
       if (!doNotShowFilterStatus){
       this.props.filterApplied(true)}
       
    }

    _clearFilter() {
      this.props.filterApplied(false);
        this.props.orderfilterState({
          tokenSelected: {
              "ORDER TAGS": [ANY],
              "STATUS": [ANY]
          },
          searchQuery: {ORDER_ID: '', PPS_ID: ''},
        });
        hashHistory.push({pathname: "/orders", query: {}})
    }

    render(){
        var noOrder=this.props.orderData.noResultFound;
        var orderIdSearchField=this._processOrderIdSearchField();
        var ppsIdSearchField = this._processPpsIdSearchField();
        var orderFilterToken=this._processFilterToken();
        var orderDateField = this._processOrderDateField();
        var orderTimeField = this._processOrderTimeField();

        return (
            <div>
                <Filter>
                  <div className="gor-filter-header">
                      <div className="gor-filter-header-h1">
                           <FormattedMessage id="gor.filter.filterLabel" description="label for filter" defaultMessage="Filter data"/>
                      </div>
                      <div className="gor-filter-header-h2" onClick={this._closeFilter}>
                          <FormattedMessage id="gor.filter.hide" description="label for hide" defaultMessage="Hide"/>
                      </div>
                   </div>

                    <div>{noOrder?
                            <div className="gor-no-result-filter"><FormattedMessage id="gor.filter.noResult" description="label for no result" 
                            defaultMessage="No results found, please try again"/></div>:""}
                    </div>

                   <div className="gor-filter-body">
                      <div className="gor-filter-body-input-wrap"> 
                          {orderIdSearchField}
                       </div>

                       <div className="gor-filter-body-input-wrap"> 
                          {ppsIdSearchField}
                       </div>

                       <div style={{height:"10em", paddingTop: "1em"}} className="gor-filter-body-input-wrap">
                          <div className="gor-filter-body-filterToken-section2">
                              {orderDateField}
                          </div>
                          <div className="gor-filter-body-filterToken-section2">
                              {orderTimeField}
                          </div>
                       </div>

                       <div className="gor-filter-body-filterToken-wrap"> 
                          <div className="gor-filter-body-filterToken-section1">
                              {orderFilterToken.column2token}
                          </div>

                       </div>
                       
                   </div>
                   <div className="gor-filter-footer"> 
                      <span className="gor-filter-footer-h2" onClick={this._clearFilter}>
                           <FormattedMessage id="gor.filter.reset" description="label for reset" 
                              defaultMessage="Reset"/>
                      </span>
                      <div className="gor-filter-btn-wrap"> 
                          <button className='gor-add-btn' onClick={
                              ()=>{this._applyFilter(false)}
                              }>
                              {<FormattedMessage id="gor.filter.heading" description="filter heading"  defaultMessage="Apply filter"/>}
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
    orderData: state.getOrderDetail || {},
    orderListSpinner: state.spinner.orderListSpinner || false,
    timeOffset: state.authLogin.timeOffset,
    orderFilterState: state.filterInfo.orderFilterState,
  };
}

var mapDispatchToProps=function(dispatch){
  return {
    showTableFilter: function(data){dispatch(showTableFilter(data));},
    filterApplied: function(data){dispatch(filterApplied(data));},
    orderfilterState: function(data){dispatch(orderfilterState(data));},
    toggleOrderFilter: function(data){dispatch(toggleOrderFilter(data));}
  }
};

OrderFilter.PropTypes={
    showFilter:React.PropTypes.bool,
    orderData:React.PropTypes.object,
    orderListSpinner:React.PropTypes.bool,
    showTableFilter:React.PropTypes.func,
    filterApplied:React.PropTypes.func,
    orderFilterState:React.PropTypes.bool,
    toggleOrderFilter:React.PropTypes.func
};


export default connect(mapStateToProps,mapDispatchToProps)(injectIntl(OrderFilter)) ;