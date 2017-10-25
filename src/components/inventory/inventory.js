/**
 * Container for Inventory tab
 * This will be switched based on tab click
 */

import React  from 'react';
import Legend from '../legend/legend';
import InventoryStacked from '../../containers/inventoryTab/inventoryStacked';
import SnapShot from './snapShot';
import InventoryHistogram from '../../containers/inventoryTab/inventoryHistogram';
import ItemCategoryTable from './itemCategoryTable';
import {LEGEND_ROUND,INV_LINE_LEGEND_IPICKED_COLOR,INV_LINE_LEGEND_CONFIG,INV_LINE_LEGEND_IPUT_COLOR,INV_HIST_LEGEND_COLOR,INV_HIST_LEGEND_CONFIG} from '../../constants/frontEndConstants'
import PickPutLineGraph from './pickPutLineGraph';
import { FormattedMessage } from 'react-intl';

 



 class Inventory extends React.Component{
 	
	render(){
		
		var snapShotData=this.props.isPrevDateSelected ? this.props.inventoryDataPrevious : this.props.snapshotData;

		
		var histogramLegend={
			data:[{
				color:INV_HIST_LEGEND_COLOR,
				name:<FormattedMessage id="inventory.histogram.legend" description="Inventory Histogram Legend" 
              			defaultMessage="Items Stocked">
              			{(message)=> <tspan>{message}</tspan>}
              			</FormattedMessage>
			}],
			config:INV_HIST_LEGEND_CONFIG
		}
		var lineChartLagend={
			data:[
				{
					color:INV_LINE_LEGEND_IPICKED_COLOR,
					name:<FormattedMessage id="inventory.linechart.legendPicked" description="Inventory Linechart Legend for picked" 
              			defaultMessage="Items Picked">
              			{(message)=> <tspan>{message}</tspan>}
              			</FormattedMessage>
				},
				{
					color:INV_LINE_LEGEND_IPUT_COLOR,
					name:<FormattedMessage id="inventory.linechart.legendPut" description="Inventory Linechart Legend for put" 
              			defaultMessage="Items Put">
              			{(message)=> <tspan>{message}</tspan>}
              			</FormattedMessage>
				}
			],
			config:INV_LINE_LEGEND_CONFIG
		}
		
		return (
			<div>
			<div className="head">
			
				<div className="labelCnt"><span><FormattedMessage id="inventory.header" description="Inventory Header Message" 
              			defaultMessage="Inventory"/> </span></div>
				</div>
				<div >
					<div className="histCnt">
							<div>
						<div className="histLbl">
						<span>{this.props.histogramLabel}</span>
						</div>
						<div className="legendCnt">
						<Legend hasDataChanged={this.props.hasDataChanged} legendData={histogramLegend}/>
						</div>
						<div className="histogram">
						<InventoryHistogram  noData={this.props.noData} recreatedData={this.props.recreatedData} hasDataChanged={this.props.hasDataChanged} />
						</div>
						<div className="histLbl">
						<span>{this.props.linechartLabel}</span>
						</div>
						<div className="legendCnt">
						<Legend hasDataChanged={this.props.hasDataChanged} legendData={lineChartLagend} legendType={LEGEND_ROUND}/>
						</div>
						<div className="lineGraph">
						<PickPutLineGraph noData={this.props.noData} recreatedData={this.props.recreatedData} hasDataChanged={this.props.hasDataChanged} />
						</div>
						
						</div>
					</div>
					<div className="stkSnapSht">
					<div className="snapShtWrap">
						<SnapShot timeOffset = {this.props.timeOffset}  hasDataChanged={this.props.hasDataChanged} currentDate={this.props.currentDate} snapshotTabData={snapShotData || {}}/>
					<InventoryStacked hasDataChanged={this.props.hasDataChanged} snapshotData={snapShotData || {}}/>
					<ItemCategoryTable hasDataChanged={this.props.hasDataChanged} snapshotData={snapShotData || {}}/>
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
	snapshotData:React.PropTypes.object,
	inventoryData: React.PropTypes.array,
	inventoryDataPrevious:React.PropTypes.object,
	isPrevDateSelected:React.PropTypes.bool,
	currentDate:React.PropTypes.number,
	hasDataChanged : React.PropTypes.bool,
	recreatedData: React.PropTypes.object,
	noData:React.PropTypes.bool,
	timeOffset:React.PropTypes.string
}
export default Inventory;

