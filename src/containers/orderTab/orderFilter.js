import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {showTableFilter, filterApplied} from '../../actions/filterAction';
import { connect } from 'react-redux'; 
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {handelTokenClick, handleInputQuery} from '../../components/tableFilter/tableFilterCommonFunctions';
class OrderFilter extends React.Component{
	constructor(props) 
	{
    	super(props);
        this.state = {tokenSelected: {"STATUS":["all"], "TIME PERIOD":["allOrders"]}, searchQuery: {},
                      defaultToken: {"STATUS":["all"], "TIME PERIOD":["allOrders"]}}; 
    }


    _closeFilter() {
        this.props.showTableFilter(false);
    }	

    _processOrderSearchField(){
        var filterInputFields = [{value:"ORDER ID", label:<FormattedMessage id="order.inputField.id" defaultMessage ="ORDER ID"/>}];
        var inputValue = this.state.searchQuery;
        var inputField = <FilterInputFieldWrap inputText={filterInputFields} handleInputText={this._handleInputQuery.bind(this)} inputValue={inputValue}/>
        return inputField;           

    }

    _processFilterToken() {
        var tokenField1 = {value:"STATUS", label:<FormattedMessage id="order.token.status" defaultMessage ="STATUS"/>};
        var tokenField2 = {value:"TIME PERIOD", label:<FormattedMessage id="order.token.timePeriod" defaultMessage ="TIME PERIOD"/>}; 
        var labelC1 = [
                    { value: 'all', label: <FormattedMessage id="order.STATUS.all" defaultMessage ="All orders"/>},
                    { value: 'breached', label: <FormattedMessage id="order.STATUS.breach" defaultMessage ="Breached orders"/>},
                    { value: 'breached_pending', label: <FormattedMessage id="order.STATUS.pending" defaultMessage ="Pending orders"/>},
                    { value: 'completed', label: <FormattedMessage id="order.STATUS.completed" defaultMessage ="Completed orders"/>},
                    { value: 'exception', label: <FormattedMessage id="order.STATUS.exep" defaultMessage ="Exception"/>}
                    ];
        var labelC2 = [
                    { value: 'allOrders', label: <FormattedMessage id="order.timePeriod.all" defaultMessage ="All"/>},
                    { value: 'oneHourOrders', label: <FormattedMessage id="order.timePeriod.oneHr" defaultMessage ="Last 1 hours"/>},
                    { value: 'twoHourOrders', label: <FormattedMessage id="order.timePeriod.twoHR" defaultMessage ="Last 2 hours"/>},
                    { value: 'sixHourOrders', label: <FormattedMessage id="order.timePeriod.sixHr" defaultMessage ="Last 6 hours"/>},
                    { value: 'twelveHourOrders', label: <FormattedMessage id="order.timePeriod.twoHr" defaultMessage ="Last 12 hours"/>},
                    { value: 'oneDayOrders', label: <FormattedMessage id="order.timePeriod.oneday" defaultMessage ="Last 1 day"/>}
                    ];
        var selectedToken =  this.state.tokenSelected;
        var column1 = <FilterTokenWrap field={tokenField1} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC1} selectedToken={selectedToken}/>;
        var column2 = <FilterTokenWrap field={tokenField2} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC2} selectedToken={selectedToken}/>;
        var columnDetail = {column1token:column1, column2token:column2};
        return columnDetail;
    }

    _handelTokenClick(field,value,state) {
        this.setState({tokenSelected:handelTokenClick(field,value,state,this.state)});
        
    }

    _handleInputQuery(inputQuery,queryField) {
        this.setState({searchQuery:handleInputQuery(inputQuery,queryField,this.state)})
    }

    _applyFilter() {
       this.props.refreshOption(this.state);
    }

    _clearFilter() {
        var clearState = {};
        this.props.filterApplied(false)
        this.setState({tokenSelected: {"STATUS":["all"], "TIME PERIOD":["allOrders"]}, searchQuery: {}});
        this.props.refreshOption(clearState)
    } 


	render(){
        var noOrder = this.props.orderData.totalOrders?false:true;
        var orderSearchField = this._processOrderSearchField();
        var orderFilterToken = this._processFilterToken();
		return (
			<div>
                 <Filter hideFilter={this._closeFilter.bind(this)}  // hiding filter wont disturb state
                         clearFilter={this._clearFilter.bind(this)} // clearing sates of filter
                         searchField={orderSearchField}
                         filterTokenC1={orderFilterToken.column1token}
                         filterTokenC2={orderFilterToken.column2token}
                         formSubmit={this._applyFilter.bind(this)} //passing function on submit
                         responseFlag={this.props.orderListSpinner} // used for spinner of button 
                         noDataFlag={noOrder} //messg to show in case of no data
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

OrderFilter.PropTypes={
    showFilter:React.PropTypes.bool,
    orderData:React.PropTypes.object,
    orderListSpinner:React.PropTypes.bool,
    showTableFilter:React.PropTypes.func,
    filterApplied:React.PropTypes.func
};



export default connect(mapStateToProps,mapDispatchToProps)(OrderFilter) ;