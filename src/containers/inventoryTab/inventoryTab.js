/**
 * Container for Inventory tab
 * This will be switched based on tab click
 */
import React  from 'react';
import { FormattedMessage } from 'react-intl';
import LineGraph from '../../components/graphd3/LineGraph';

class InventoryTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
			<div className = "itemCategory" >

				<LineGraph/>
			</div>
		);
	}
};

export default InventoryTab ;
