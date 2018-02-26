import React  from 'react';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {showTableFilter, filterApplied,orderfilterState,toggleOrderFilter} from '../../actions/filterAction';
import { connect } from 'react-redux'; 
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {handelTokenClick, handleInputQuery} from '../../components/tableFilter/tableFilterCommonFunctions';
import {hashHistory} from 'react-router'
import {SINGLE,ORDER_INPROGRESS,ORDER_BREACHED,ORDER_COMPLETED,ORDER_EXCEPTION,ORDER_UNFULFILLABLE,ORDER_ONHOLD,ORDER_CANCELLED,ALL} from './../../constants/frontEndConstants'
class OrderFilter extends React.Component{
    constructor(props) 
    {
        super(props);
        this.state={tokenSelected: {"STATUS":["all"], "TIME PERIOD":["allOrders"]}, searchQuery: {},
                      defaultToken: {"STATUS":["all"], "TIME PERIOD":["allOrders"]}}; 
        this._applyFilter =  this._applyFilter.bind(this);
        this._closeFilter = this._closeFilter.bind(this);
        this._clearFilter = this._clearFilter.bind(this);
    }


    _closeFilter() {
        this.props.showTableFilter(false);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.orderFilterState && JSON.stringify(this.state)!==JSON.stringify(nextProps.orderFilterState)){
            this.setState(nextProps.orderFilterState)
        }

        /**
         * Hide the filter as soon as data in the list get updated.
         */
        if(nextProps.ordersDetail.length>0 && JSON.stringify(nextProps.ordersDetail)!==JSON.stringify(this.props.ordersDetail)){
            this.props.showTableFilter(false);
        }
    }

    _processOrderSearchField(){
        var filterInputFields=[{value:"ORDER ID", label:<FormattedMessage id="order.inputField.id" defaultMessage="ORDER ID"/>}];
        var inputValue=this.state.searchQuery;
        var inputField=<FilterInputFieldWrap inputText={filterInputFields} handleInputText={this._handleInputQuery.bind(this)} inputValue={inputValue}/>
        return inputField;           

    }

  componentWillMount(){
        if(this.props.orderFilterState) {
            this.setState(this.props.orderFilterState)
        }
    }  
    _processFilterToken() {
        var tokenField1={value:"STATUS", label:<FormattedMessage id="order.token.status" defaultMessage="STATUS"/>};
        var tokenField2={value:"TIME PERIOD", label:<FormattedMessage id="order.token.timePeriod" defaultMessage="TIME PERIOD"/>}; 
        var labelC1=[
                    { value: ALL, label: <FormattedMessage id="order.STATUS.all" defaultMessage="All orders"/>},
                    { value: ORDER_BREACHED, label: <FormattedMessage id="order.STATUS.breach" defaultMessage="Breached orders"/>},
                    { value: ORDER_COMPLETED, label: <FormattedMessage id="order.STATUS.completed" defaultMessage="Completed orders"/>},
                    { value: ORDER_EXCEPTION, label: <FormattedMessage id="order.STATUS.exep" defaultMessage="Exception"/>},
                    { value: ORDER_UNFULFILLABLE, label: <FormattedMessage id="order.STATUS.unfulfillable" defaultMessage="Unfulfillable"/>},
                    { value: ORDER_ONHOLD, label: <FormattedMessage id="order.STATUS.onhold" defaultMessage="On hold"/>},
                    { value: ORDER_CANCELLED, label: <FormattedMessage id="order.STATUS.cancelled" defaultMessage="Cancelled"/>},  
                    { value: ORDER_INPROGRESS, label: <FormattedMessage id="order.STATUS.inprogress" defaultMessage="In Progress"/>}

                    ];
        var labelC2=[
                    { value: 'allOrders', label: <FormattedMessage id="order.timePeriod.all" defaultMessage="All"/>},
                    { value: 'oneHourOrders', label: <FormattedMessage id="order.timePeriod.oneHr" defaultMessage="Last 1 hours"/>},
                    { value: 'twoHourOrders', label: <FormattedMessage id="order.timePeriod.twoHR" defaultMessage="Last 2 hours"/>},
                    { value: 'sixHourOrders', label: <FormattedMessage id="order.timePeriod.sixHr" defaultMessage="Last 6 hours"/>},
                    { value: 'twelveHourOrders', label: <FormattedMessage id="order.timePeriod.twoHr" defaultMessage="Last 12 hours"/>},
                    { value: 'oneDayOrders', label: <FormattedMessage id="order.timePeriod.oneday" defaultMessage="Last 1 day"/>}
                    ];
        var selectedToken= this.state.tokenSelected;
        var column1=<FilterTokenWrap field={tokenField1} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC1} selectedToken={selectedToken}/>;
        var column2=<FilterTokenWrap field={tokenField2} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC2} selectedToken={selectedToken} selection={SINGLE}/>;
        var columnDetail={column1token:column1, column2token:column2};
        return columnDetail;
    }

    _handelTokenClick(field,value,state) {
        this.setState({tokenSelected:handelTokenClick(field,value,state,this.state)});
        
    }

    _handleInputQuery(inputQuery,queryField) {
        this.setState({searchQuery:handleInputQuery(inputQuery,queryField,this.state)})
    }

    _applyFilter() {
        var filterState=this.state, _query={}
        if (filterState.tokenSelected["STATUS"] && filterState.tokenSelected["STATUS"][0] !== 'all') {
            _query.status=filterState.tokenSelected["STATUS"]
        }
        if (filterState.tokenSelected["TIME PERIOD"] && filterState.tokenSelected["TIME PERIOD"][0] !== 'allOrders') {
            _query.period=filterState.tokenSelected["TIME PERIOD"]
        }

        if (filterState.searchQuery["ORDER ID"]) {
            _query.orderId=filterState.searchQuery["ORDER ID"]
        }
       hashHistory.push({pathname: "/orders/orderlist", query: _query});
       this.props.callBack();
    }

    _clearFilter() {
        this.props.orderfilterState({
            tokenSelected: {
                "STATUS": ['all'],
                "TIME PERIOD": ['allOrders']
            },
            searchQuery: {"ORDER ID":  ''},
        });
        hashHistory.push({pathname: "/orders/orderlist", query: {}})
    }



    render(){
        var noOrder=this.props.orderData.noResultFound;
        var orderSearchField=this._processOrderSearchField();
        var orderFilterToken=this._processFilterToken();
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
                    <div>{noOrder?
                            <div className="gor-no-result-filter"><FormattedMessage id="gor.filter.noResult" description="label for no result" 
                            defaultMessage="No results found, please try again"/></div>:""}
                    </div>
                     <div className="gor-filter-body">
                         <div className="gor-filter-body-input-wrap"> 
                            {orderSearchField}
                         </div>
                         <div className="gor-filter-body-filterToken-wrap"> 
                            <div className="gor-filter-body-filterToken-section1">
                                {orderFilterToken.column1token}
                            </div>
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
                        <button className='gor-add-btn' onClick={this._applyFilter}>
                            {!this.props.orderListSpinner? <FormattedMessage id="gor.filter.heading" description="filter heading"  defaultMessage="Apply filter"/> :<div className='spinnerImage'></div>}
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



export default connect(mapStateToProps,mapDispatchToProps)(OrderFilter) ;