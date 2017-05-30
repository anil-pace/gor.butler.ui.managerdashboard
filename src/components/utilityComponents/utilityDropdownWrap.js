import React  from 'react';
import { FormattedMessage } from 'react-intl';
import DropdownTable from '../dropdown/dropdownTable'

class UtilityDropDown extends React.Component{
	constructor(props)  
	{
    	super(props);
    }	
	render(){
		return (
			<div className="gor-utility-dropDown-wrap">
    			<div className="gor-utility-dropDown-h1"> {this.props.dropdownLabel}:</div>
    		    <DropdownTable styleClass={'gorDataTableDrop'} placeholder={this.props.placeHolderText} items={this.props.items} changeMode={this.props.changeMode} currentState={this.props.currentState}/>
    		</div>
		);
	}
};

export default UtilityDropDown ;