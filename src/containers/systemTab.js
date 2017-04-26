/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import SubTabs from '../components/subtab/subTabs';


class SystemTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
			<div>
				<div>
					<SubTabs/>
				</div>
        	{this.props.children}
			</div>
		);
	}
};

export default SystemTab ;
