import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {showTableFilter, filterApplied} from '../../actions/filterAction';
import { connect } from 'react-redux'; 
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';

class OrderFilter extends React.Component{
	constructor(props) 
	{
    	super(props);
        this.state = {tokenSelected: {}, searchQuery: {}}; 
    }

    componentWillMount() {
        console.log("dwjwkk")
    }

    _closeFilter() {
        var filterState = !this.props.showFilter;
        this.props.showTableFilter(false);
    }	

    _processAuditSearchField(){
        var temp = ["ORDER ID"]
        var inputValue = this.state.searchQuery;
        var inputField = <FilterInputFieldWrap inputText={temp} handleInputText={this._handleInputQuery.bind(this)} inputValue={inputValue}/>
        return inputField;           

    }

    _processFilterToken() {
        var tempField1 = "STATUS",tempField2="TIME PERIOD"; 
        var labelC1 = [
                    { value: 'all', label: "All orders" },
                    { value: 'breached', label: "Breached orders" },
                    { value: 'pending', label: "Pending orders" },
                    { value: 'completed', label: "Completed orders" },
                    { value: 'exception', label: "Exception"}
                    ];
        var labelC2 = [
                    { value: 'allOrders', label: "All" },
                    { value: 'oneHourOrders', label: "Last 1 hours" },
                    { value: 'twoHourOrders', label: "Last 2 hours" },
                    { value: 'sixHourOrders', label: "Last 6 hours" },
                    { value: 'twelveHourOrders', label: "Last 12 hours" },
                    { value: 'oneDayOrders', label: "Last 1 day" }
                    ];
        var selectedToken =  this.state.tokenSelected;
        var column1 = <FilterTokenWrap field={tempField1} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC1} selectedToken={selectedToken}/>;
        var column2 = <FilterTokenWrap field={tempField2} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC2} selectedToken={selectedToken}/>;
        var columnDetail = {column1token:column1, column2token:column2};
        return columnDetail;
    }

    _handelTokenClick(field,value,state) {
        var selectedToken = this.state.tokenSelected;
        if(selectedToken[field]) {
            if(state === "add") {
                selectedToken[field].push(value);
            }
            else {
                var index = selectedToken[field].indexOf(value);
                if (index >= 0) {
                    selectedToken[field].splice( index, 1 );
                }
            }
        }

        else {
            selectedToken[field] = [];
            selectedToken[field].push(value);
        }
        this.setState({tokenSelected:selectedToken});
        
    }

    _handleInputQuery(inputQuery,queryField) {
        var currentSearchState = this.state.searchQuery;
        currentSearchState[queryField] = inputQuery;
        this.setState({searchQuery:currentSearchState})
    }

    _applyFilter() {
       console.log("applied")
       console.log(this.state)
       var temp = this.state;
       this.props.refreshOption(temp);

    }

    _clearFilter() {
        var clearState = {};
        this.props.filterApplied(false)
        this.setState({tokenSelected: {}, searchQuery: {}});
    } 


	render(){
        var noOrder = this.props.orderData.totalOrders?false:true;
        var auditSearchField = this._processAuditSearchField();
        var auditFilterToken = this._processFilterToken();
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
export default connect(mapStateToProps,mapDispatchToProps)(OrderFilter) ;