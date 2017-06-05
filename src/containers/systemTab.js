/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import SubTabs from '../components/subtab/subTabs';


class SystemTab extends React.Component{
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
