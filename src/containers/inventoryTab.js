/**
 * Container for Inventory tab
 * This will be switched based on tab click
 */
import React  from 'react';
import Legend from '../components/legend/legend';
import { connect } from 'react-redux'; 


class InventoryTab extends React.Component{
	constructor(props) 
	{
    	super(props);

    }	
   
	render(){
		/**
		 * Need to remove these hardcoded variables
		 * 
		 */
		var legendData = [{"name":"Pick","color":"#C69332"},{"name":"Pick","color":"#B2B535"}]
		return (
			<div className="gorInventory wrapper">
				<div className="head">
				<div className="labelCnt"><span>Inventory</span></div>
				<div className="dwnLoadCnt"><a href="javascript:void(0)" className="gorBtn">Download</a></div>
				</div>
				<div>
					<div>
						<Legend legendData={legendData}/>
						<div></div>
					</div>
					<div></div>
				</div>
			</div>
		);
	}
};

export default InventoryTab ;
