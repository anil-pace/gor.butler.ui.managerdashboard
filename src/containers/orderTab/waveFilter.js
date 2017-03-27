import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {showTableFilter, filterApplied} from '../../actions/filterAction';
import { connect } from 'react-redux'; 
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {handelTokenClick, handleInputQuery} from '../../components/tableFilter/tableFilterCommonFunctions';
class WaveFilter extends React.Component{
	constructor(props) 
	{
    	super(props);
        this.state = {tokenSelected: {"STATUS":["all"]}, searchQuery: {},
                      defaultToken: {"STATUS":["all"]}}; 
    }
    _closeFilter() {
        let filterState = !this.props.showFilter;
        this.props.showTableFilter(false);
    }	

    _processAuditSearchField(){
        let filterInputFields = [{value:"WAVE ID", label:<FormattedMessage id="wave.inputField.id" defaultMessage ="WAVE ID"/>}];
        let inputValue = this.state.searchQuery;
        let inputField = <FilterInputFieldWrap inputText={filterInputFields} handleInputText={this._handleInputQuery.bind(this)} inputValue={inputValue}/>
        return inputField;
    }

    _processFilterToken() {
        let tokenField1 = {value:"STATUS", label:<FormattedMessage id="wave.token.status" defaultMessage ="STATUS"/>};
        let labelC1 = [
                    { value: 'all', label: <FormattedMessage id="wave.STATUS.all" defaultMessage ="All waves"/>},
                    { value: 'breached', label: <FormattedMessage id="wave.STATUS.breach" defaultMessage ="Breached"/>},
                    { value: 'pending', label: <FormattedMessage id="wave.STATUS.pending" defaultMessage ="Pending"/>},
                    { value: 'warning', label: <FormattedMessage id="wave.STATUS.warning" defaultMessage ="Warning"/>},
                    { value: 'inprogress', label: <FormattedMessage id="wave.STATUS.inprogress" defaultMessage ="In progress"/>}
                    ];
        let selectedToken =  this.state.tokenSelected;
        let column1 = <FilterTokenWrap field={tokenField1} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC1} selectedToken={selectedToken}/>;
        
        let columnDetail = {column1token:column1};
        return columnDetail;
    }

    _handelTokenClick(field,value,state) {
        this.setState({tokenSelected:handelTokenClick(field,value,state,this.state)});
        
    }

    _handleInputQuery(inputQuery,queryField) {
        this.setState({searchQuery:handleInputQuery(inputQuery,queryField,this.state)})
    }

    _applyFilter() {
        console.log(this.state)
       //this.props.refreshOption(this.state);

    }

    _clearFilter() {
        let clearState = {};
        this.props.filterApplied(false)
        this.setState({tokenSelected: {"STATUS":["all"]}, searchQuery: {}});
        this.props.refreshOption(clearState)
    } 


	render(){
        let noOrder = this.props.orderData.totalOrders?false:true;
        let auditSearchField = this._processAuditSearchField();
        let auditFilterToken = this._processFilterToken();
		return (
			<div>
                 <Filter hideFilter={this._closeFilter.bind(this)}  // hiding filter wont disturb state
                         clearFilter={this._clearFilter.bind(this)} // clearing sates of filter
                         searchField={auditSearchField}
                         filterTokenC1={auditFilterToken.column1token}

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

let mapDispatchToProps = function(dispatch){
  return {
    showTableFilter: function(data){dispatch(showTableFilter(data));},
    filterApplied: function(data){dispatch(filterApplied(data));}
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(WaveFilter) ;