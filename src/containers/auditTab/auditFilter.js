import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {showTableFilter} from '../../actions/filterAction';
import { connect } from 'react-redux'; 
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';

class AuditFilter extends React.Component{
	constructor(props) 
	{
    	super(props);
        this.state = {tokenSelected: {}, searchQuery: {}}; 
    }

    _closeFilter() {
        var filterState = !this.props.showFilter;
        this.props.showTableFilter(filterState);
    }	

    _processAuditSearchField(){
        var temp = ["Search by SKU", "Search by Location"]
        var inputValue = this.state.searchQuery;
        var inputField = <FilterInputFieldWrap inputText={temp} handleInputText={this._handleInputQuery.bind(this)} inputValue={inputValue}/>
        return inputField;           

    }

    _processFilterToken() {
        var tempField1 = "STATUS",tempField2="SEARCH", labelC1=["Any", "Any1", "Any2", "Any3"],labelC2=["This", "This1", "This2", "This3"];
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
    }

    _clearFilter() {
        this.setState({tokenSelected: {}, searchQuery: {}});
    }

	render(){
        var auditSearchField = this._processAuditSearchField();
        var auditFilterToken = this._processFilterToken();
		return (
			<div>
                 <Filter hideFilter={this._closeFilter.bind(this)} 
                         clearFilter={this._clearFilter.bind(this)}
                         searchField={auditSearchField}
                         filterTokenC1={auditFilterToken.column1token}
                         filterTokenC2={auditFilterToken.column2token}
                         formSubmit={this._applyFilter.bind(this)} />
            </div>
		);
	}
};


function mapStateToProps(state, ownProps){
  return {
    showFilter: state.filterInfo.filterState || false,
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    showTableFilter: function(data){dispatch(showTableFilter(data));}
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(AuditFilter) ;