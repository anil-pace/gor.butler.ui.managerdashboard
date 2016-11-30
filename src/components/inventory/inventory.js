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
import {LEGEND_ROUND,INV_LINE_LEGEND_IPICKED_COLOR,INV_LINE_LEGEND_DATA,INV_LINE_LEGEND_CONFIG,INV_LINE_LEGEND_IPUT_COLOR,INV_HIST_LEGEND_DATA,INV_HIST_LEGEND_COLOR,INV_HIST_LEGEND_CONFIG} from '../../constants/frontEndConstants'
import PickPutLineGraph from './PickPutLineGraph';
import { FormattedMessage ,FormattedDate} from 'react-intl';

 



 class Inventory extends React.Component{
 	constructor(props) 
 	{
 		super(props);
    }	
   
	render(){
		
		var snapShotData = this.props.isPrevDateSelected ? this.props.inventoryDataPrevious : this.props.snapshotData[0];
		
		var histogramLegend = {
			data:INV_HIST_LEGEND_DATA,
			config:INV_HIST_LEGEND_CONFIG
		}
		var lineChartLagend = {
			data:INV_LINE_LEGEND_DATA,
			config:INV_LINE_LEGEND_CONFIG
		}
		return (
			<div>
			<div className="head">
			
				<div className="labelCnt"><span><FormattedMessage id="inventory.header" description="Inventory Header Message" 
              			defaultMessage ="Inventory"/> </span></div>
				</div>
				<div >
					<div className="histCnt">
							<div>
						<div className="histLbl">
						<span>{this.props.histogramLabel}</span>
						</div>
						<div className="legendCnt">
						<Legend hasDataChanged = {this.props.hasDataChanged} legendData = {histogramLegend}/>
						</div>
						<div className="histogram">
						<InventoryHistogram  recreatedData={this.props.recreatedData} hasDataChanged = {this.props.hasDataChanged} histogramData={this.props.inventoryData}/>
						</div>
						<div className="histLbl">
						<span>{this.props.linechartLabel}</span>
						</div>
						<div className="legendCnt">
						<Legend hasDataChanged = {this.props.hasDataChanged} legendData = {lineChartLagend} legendType={LEGEND_ROUND}/>
						</div>
						<div className="lineGraph">
						<PickPutLineGraph recreatedData={this.props.recreatedData} hasDataChanged = {this.props.hasDataChanged} inventoryData={this.props.inventoryData}/>
						</div>
						
						</div>
					</div>
					<div className = "stkSnapSht">
					<div className = "snapShtWrap">
					<SnapShot hasDataChanged = {this.props.hasDataChanged} currentDate = {this.props.currentDate} snapshotTabData={snapShotData || {}}/>
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
	histogramLabel:React.PropTypes.object,
	linechartLabel:React.PropTypes.object,
	snapshotData:React.PropTypes.array,
	inventoryData: React.PropTypes.array,
	inventoryDataPrevious:React.PropTypes.array,
	isPrevDateSelected:React.PropTypes.bool,
	currentDate:React.PropTypes.number,
	hasDataChanged : React.PropTypes.number,
	recreatedData: React.PropTypes.object
}
export default Inventory;

