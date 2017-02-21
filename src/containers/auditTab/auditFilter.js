import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {showTableFilter} from '../../actions/filterAction';
import { connect } from 'react-redux'; 
import FilterInputField from '../../components/tableFilter/filterInputField';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import ReactSlider from 'react-slider'
class AuditFilter extends React.Component{
	constructor(props) 
	{
    	super(props);
        this.state = {tokenSelected: {}}; 
    }

    _closeFilter() {
        var filterState = !this.props.showFilter;
        this.props.showTableFilter(filterState);
    }	

    _processAuditSearchField(){
        var temp = "Search by SKU"
        var inputField = <FilterInputField inputText={temp}/>
        var inputFieldList =[];
        inputFieldList.push(inputField);  
        inputFieldList.push(inputField);  
        return inputFieldList;           

    }

    _processFilterToken() {
        var tempField = "STATUS", label=["Any, Any1, Any2, Any3"];
        var temp = <FilterTokenWrap field={tempField} tokenCallBack={this._handelTokenClick.bind(this)} label={label}/>;
        return temp;
    }

    _handelTokenClick(field,value) {
        console.log(field,value)
        
    }

	render(){
        var auditSearchField = this._processAuditSearchField();
        var auditFilterToken = this._processFilterToken();
		return (
			<div>
                 <Filter hideFilter={this._closeFilter.bind(this)} 
                         searchField={auditSearchField}
                         filterToken={auditFilterToken} />
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