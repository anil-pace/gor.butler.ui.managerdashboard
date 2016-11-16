/**
 * Container for Inventory tab
 * This will be switched based on tab click
 */

import React  from 'react';
import Legend from '../legend/legend';
import InventoryStacked from '../../containers/inventoryTab/inventoryStacked';
import SnapShot from './snapShot';
import InventoryHistogram from '../../containers/inventoryTab/inventoryHistogram';
import ItemCategoryTable from './ItemCategoryTable';
import PickPutLineGraph from './PickPutLineGraph';
import { FormattedMessage ,FormattedDate} from 'react-intl';

 



 class Inventory extends React.Component{
 	constructor(props) 
 	{
 		super(props);
    }	
   
	render(){
		
		var snapShotData = this.props.isPrevDateSelected ? this.props.inventoryDataPrevious[0] : this.props.snapshotData[0];
		var legendData = {
			data:[{
				color:"#498BD8",
				name:"Items stocked"
			}],
			config:{
				xpos:20,
				xIncrement:20,
				ypos:30
			}
			

		}
		return (
			<div>
			<div className="head">
			
				<div className="labelCnt"><span><FormattedMessage id="inventory.header" description="Inventory Header Message" 
              			defaultMessage ="Inventory"/> </span></div>
				<div className="dwnLoadCnt"><a href="javascript:void(0)" className="gorBtn">Download</a></div>
				</div>
				<div >
					<div className="histCnt">
							<div>
						<div className="histLbl">
						<span>{this.props.label}</span>
						</div>
						<div className="legendCnt">
						<Legend legendData = {legendData}/>
						</div>
						<div className="histogram">
						<InventoryHistogram  hasDataChanged = {this.props.hasDataChanged} histogramData={this.props.inventoryData}/>
						</div>
						<div className="lineGraph">
						<PickPutLineGraph hasDataChanged = {this.props.hasDataChanged} inventoryData={this.props.inventoryData}/>
						</div>
						
						</div>
					</div>
					<div className = "stkSnapSht">
					<div className = "snapShtWrap">
					<SnapShot hasDataChanged = {this.props.hasDataChanged} snapshotTabData={snapShotData || {}}/>
					<InventoryStacked hasDataChanged = {this.props.hasDataChanged} snapshotData={snapShotData }/>
					<ItemCategoryTable hasDataChanged = {this.props.hasDataChanged} snapshotData={snapShotData || {}}/>
					</div>
					</div>
				</div>
				</div>

						
		);
	}
};
Inventory.propTypes={
	data:React.PropTypes.array,
	label:React.PropTypes.string,
	snapshotData:React.PropTypes.array,
	inventoryData: React.PropTypes.array,
	inventoryDataPrevious:React.PropTypes.array,
	isPrevDateSelected:React.PropTypes.bool,
	currentDate:React.PropTypes.number,
	hasDataChanged : React.PropTypes.number
}
export default Inventory;

