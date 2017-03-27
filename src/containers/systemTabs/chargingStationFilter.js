import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {showTableFilter, filterApplied} from '../../actions/filterAction';
import { connect } from 'react-redux'; 
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {handelTokenClick, handleInputQuery} from '../../components/tableFilter/tableFilterCommonFunctions';
class ChargingStationFilter extends React.Component{
  constructor(props) 
  {
      super(props);
        this.state = {tokenSelected: {"DOCKING STATUS":["all"], "OPERATING MODE":["allBot"]}, searchQuery: {},
                      defaultToken: {"DOCKING STATUS":["all"], "OPERATING MODE":["allBot"]}}; 
    }


    _closeFilter() {
        var filterState = !this.props.showFilter;
        this.props.showTableFilter(false);
    } 

    _processAuditSearchField(){
        var filterInputFields = [{value:"CHARGING STATION ID", label:<FormattedMessage id="charging.inputField.id" defaultMessage ="CHARGING STATION ID"/>}];
        var inputValue = this.state.searchQuery;
        var inputField = <FilterInputFieldWrap inputText={filterInputFields} handleInputText={this._handleInputQuery.bind(this)} inputValue={inputValue}/>
        return inputField;           

    }

    _processFilterToken() {
        let tokenField1 = {value:"DOCKING STATUS", label:<FormattedMessage id="charging.token.status" defaultMessage ="DOCKING STATUS"/>};
        let tokenField2 = {value:"OPERATING MODE", label:<FormattedMessage id="charging.token.timePeriod" defaultMessage ="OPERATING MODE"/>}; 
       let labelC1 = [
                    { value: 'all', label: <FormattedMessage id="charging.STATUS.all" defaultMessage ="All"/>},
                    { value: 'connected', label: <FormattedMessage id="charging.STATUS.breach" defaultMessage ="Connected"/>},
                    { value: 'disconnectec', label: <FormattedMessage id="charging.STATUS.pending" defaultMessage ="Disconnected"/>}
                    ];
        let labelC2 = [
                    { value: 'allBot', label: <FormattedMessage id="charging.timePeriod.all" defaultMessage ="All"/>},
                    { value: 'mannual', label: <FormattedMessage id="charging.timePeriod.oneHr" defaultMessage ="Mannual"/>},
                    { value: 'auto', label: <FormattedMessage id="charging.timePeriod.twoHR" defaultMessage ="Auto"/>}
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
        console.log(this.state)
       this.props.refreshOption(this.state);
    }

    _clearFilter() {
        var clearState = {};
        this.props.filterApplied(false)
        this.setState({tokenSelected: {"DOCKING STATUS":["all"], "TOPERATING MODE":["allBot"]}, searchQuery: {}});
        this.props.refreshOption(clearState)
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
export default connect(mapStateToProps,mapDispatchToProps)(ChargingStationFilter) ;


