import React  from 'react';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterDateTimeFieldWrap from '../../components/tableFilter/filterDateTimeFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
// import {showTableFilter, filterApplied,orderfilterState,toggleOrderFilter} from '../../actions/filterAction';
import { connect } from 'react-redux'; 
// import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
// import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {handelTokenClick, handleInputQuery} from '../../components/tableFilter/tableFilterCommonFunctions';
import {hashHistory} from 'react-router'
import {SINGLE} from './../../constants/frontEndConstants'
import {
    PICK_BEFORE_TIME,
    ORDER_ID,
    PPS_ID,
    SKU_ID,
    FROM_DATE,
    TO_DATE,
    FROM_TIME,
    TO_TIME
}from '../../constants/frontEndConstants';
class OrderFilter extends React.Component{
    constructor(props) 
    {
        super(props);
         this.state={
                      tokenSelected: {"ORDER TAGS":["any"], "STATUS":["any"] }, 
                      searchQuery: {},
                      defaultToken: {"STATUS":["any"], "TIME PERIOD":["any"] }
                    }; 
        this._applyFilter =  this._applyFilter.bind(this);
        this._closeFilter = this._closeFilter.bind(this);
        this._clearFilter = this._clearFilter.bind(this);
    }


    _closeFilter() {
        this.props.hideFilter(false);
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
        var tokenField1={value:"orderTags", label:<FormattedMessage id="order.token.orderTags" defaultMessage="ORDER TAGS"/>};
        var tokenField2={value:"status", label:<FormattedMessage id="order.token.status" defaultMessage="STATUS"/>}; 

        var labelC1=[
                      { value: 'any', label: <FormattedMessage id="order.orderTags.any" defaultMessage="Any"/>},
                      { value: 'urgent', label: <FormattedMessage id="order.orderTags.urgent" defaultMessage="Urgent"/>},
                      { value: 'express', label: <FormattedMessage id="order.orderTags.express" defaultMessage="Express"/>},
                    ];

        var labelC2=[
                      { value: 'any', label: <FormattedMessage id="order.status.any" defaultMessage="Any"/>},
                      { value: 'pending', label: <FormattedMessage id="order.status.pending" defaultMessage="Pending"/>},
                      { value: 'breachrisk', label: <FormattedMessage id="order.status.breachRish" defaultMessage="Braeach risk"/>},
                      { value: 'breached', label: <FormattedMessage id="order.status.breached" defaultMessage="Breached"/>},
                      { value: 'breached&completed', label: <FormattedMessage id="order.status.breached&Completed" defaultMessage="Breach&Completed"/>},
                      { value: 'productshort', label: <FormattedMessage id="order.status.productshort" defaultMessage="Product Short"/>},
                      { value: 'outofstock', label: <FormattedMessage id="order.status.outofstock" defaultMessage="Out of Stock"/>},
                      { value: 'completed', label: <FormattedMessage id="order.status.completed" defaultMessage="Completed"/>},
                      { value: 'rejecetd', label: <FormattedMessage id="order.status.rejected" defaultMessage="Rejected"/>},
                      { value: 'abandoned', label: <FormattedMessage id="order.status.abandoned" defaultMessage="Abandoned"/>},
                      { value: 'cancelled', label: <FormattedMessage id="order.status.cancelled&Completed" defaultMessage="Cancelled"/>}
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
       hashHistory.push({pathname: "/orders/orderlist", query: _query})
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

    _processOrderSearchField(){

      const filterInputFields=
        [{
            value: PICK_BEFORE_TIME,
            label: <FormattedMessage id="order.inputField.pickbeforetime" defaultMessage="PICK BEFORE TIME"/>
        },
        {
            value: ORDER_ID,
            label: <FormattedMessage id="order.inputField.orderid" defaultMessage="ORDER ID"/>
        },
        {
            value: PPS_ID,
            label: <FormattedMessage id="order.inputField.ppsid" defaultMessage="PPS ID"/>
        },
        {
            value: SKU_ID,
            label: <FormattedMessage id="order.inputField.skuid" defaultMessage="SKU ID"/>
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

    _processOrderDateField(){
        const dateColumn = [
          {
            value: FROM_DATE,
            label: <FormattedMessage id="order.inputField.fromDate" defaultMessage="FROM DATE"/>
          },
          {
            value: TO_DATE,
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
            value: FROM_TIME,
            label: <FormattedMessage id="order.inputField.fromTime" defaultMessage="TIME"/>
          },
          {
            value: TO_TIME,
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



    render(){
        //var noOrder=this.props.orderData.noResultFound;
         var orderSearchField=this._processOrderSearchField();
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
                    <div className="gor-filter-body">
                         <div className="gor-filter-body-input-wrap"> 
                            {orderSearchField}
                         </div>

                         <div className="gor-filter-body-filterToken-wrap">
                            <div className="gor-filter-body-filterToken-section1">
                                {orderDateField}
                            </div>
                            <div className="gor-filter-body-filterToken-section1">
                                {orderTimeField}
                            </div>
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
                          <FormattedMessage id="gor.filter.reset" description="label for reset" defaultMessage="Reset"/>
                        </span>
                        <div className="gor-filter-btn-wrap">
                          <button className='gor-add-btn' onClick={this._applyFilter}>
                            {!this.props.orderListSpinner? <FormattedMessage id="gor.filter.heading" description="filter heading"  defaultMessage="Apply filter"/> :<div className='spinnerImage'></div>}
                          </button>
                        </div> 
                      </div>
                    {/*<div>{noOrder?
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
                 </div>*/}
                </Filter>
            </div>
        );
    }
};


function mapStateToProps(state, ownProps){
  return {
    // showFilter: state.filterInfo.filterState || false,
    // orderData: state.getOrderDetail || {},
    // orderListSpinner: state.spinner.orderListSpinner || false,
    // orderFilterState: state.filterInfo.orderFilterState,
  };
}

var mapDispatchToProps=function(dispatch){
  return {
    // showTableFilter: function(data){dispatch(showTableFilter(data));},
    // filterApplied: function(data){dispatch(filterApplied(data));},
    //  orderfilterState: function(data){dispatch(orderfilterState(data));},
    //  toggleOrderFilter: function(data){dispatch(toggleOrderFilter(data));}
  }
};

OrderFilter.PropTypes={
    // showFilter:React.PropTypes.bool,
    // orderData:React.PropTypes.object,
    // orderListSpinner:React.PropTypes.bool,
    // showTableFilter:React.PropTypes.func,
    // filterApplied:React.PropTypes.func,
    // orderFilterState:React.PropTypes.bool,
    // toggleOrderFilter:React.PropTypes.func
};



export default connect(mapStateToProps,mapDispatchToProps)(OrderFilter) ;