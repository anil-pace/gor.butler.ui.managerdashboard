/**
 * Container for Inventory tab
 * This will be switched based on tab click
 */
import React  from 'react';
import Legend from '../legend/legend';
import Chart from '../graphd3/graphd3';
import InventoryStacked from '../../containers/inventoryTab/inventoryStacked';
import { connect } from 'react-redux'; 
import StackedChartHorizontal from '../graphd3/stackedChartHorizontal'
import { resTypeHistogram } from '../../../mock/mockDBData'; 


class Inventory extends React.Component{
	constructor(props) 
	{
    	super(props);

    }	
   
	render(){
		var tableData={};
		tableData["histData"] = resTypeHistogram.aggregate_data;
		
		return (
			<div>
			<div className="head">
				<div className="labelCnt"><span>Inventory</span></div>
				<div className="dwnLoadCnt"><a href="javascript:void(0)" className="gorBtn">Download</a></div>
				</div>
				<div >
					<div className="histCnt">
							<div>
						<div className="histLbl">
						<span>{this.props.label}</span>
						</div>
						<div className="legendCnt">
						<Legend legendData={this.props.data || null}/>
						</div>
						
						</div>
					</div>
					<div className = "stkSnapSht">
					<div className = "snapShtWrap">
						<InventoryStacked stackData={this.props.stackData}/>
					</div>
					</div>
				</div>
				</div>

						
		);
	}
};
Inventory.propTypes={
	data:React.PropTypes.object,
	label:React.PropTypes.string,
	stackData:React.PropTypes.array
}
export default Inventory;
