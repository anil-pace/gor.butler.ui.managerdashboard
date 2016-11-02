/**
 * Container for Inventory tab
 * This will be switched based on tab click
 */

 import React  from 'react';
 import Legend from '../legend/legend';
 import InventoryStacked from '../../containers/inventoryTab/inventoryStacked';
 import SnapShot from './snapShot';
 import ItemCategoryTable from './itemCategoryTable';
 import PickPutLineGraph from './PickPutLineGraph';



 class Inventory extends React.Component{
 	constructor(props) 
 	{
 		super(props);

 	}	
 	
 	render(){
 		
 		
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
 		</div>
 		</div>
 		<div className="graphCont">
 		<PickPutLineGraph inventoryData={this.props.inventoryData || {}}/>
 		</div>
 		</div>
 		<div className = "stkSnapSht">
 		<div className = "snapShtWrap">
 		<SnapShot snapshotData={this.props.snapshotData[0] || {}}/>
 		<InventoryStacked snapshotData={this.props.snapshotData[0] }/>
 		<ItemCategoryTable snapshotData={this.props.snapshotData[0] || {}}/>
 		</div>
 		</div>
 		</div>
 		</div>

 		
 		);
 	}
 };
 Inventory.propTypes={
 	data: React.PropTypes.object,
 	label: React.PropTypes.string,
 	snapshotData: React.PropTypes.array,
 	inventoryData: React.PropTypes.array
 }
 export default Inventory;

