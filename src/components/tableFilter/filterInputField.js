import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
class FilterInputField extends React.Component{
	constructor(props) 
	{
    	super(props);
    }

    
	render(){
		return (
			<div>
                <div className="gor-filter-input-text"> {this.props.inputText} </div>
                <input className='gor-filter-input-wrap' type="text" />
            </div>
		);
	}
};

export default FilterInputField ;