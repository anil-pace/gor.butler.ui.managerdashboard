/**
 * Container for Inventory tab
 * This will be switched based on tab click
 */
import React  from 'react';
import { FormattedMessage,FormattedNumber} from 'react-intl';



class SnapShotDetails extends React.Component{
	constructor(props) 
	{
    	super(props);

    }	
   
	render(){
		
		
		return (
			<div className="gorSnapShot">
				<h1><FormattedMessage id='inventory.snaphot.header' defaultMessage="Today's stock snapshot" description="Snapshot header"/> </h1>
				<div className="gorSnapShotCont">
					<table width="100%">
					<tbody>
					<tr>
						<td className="stkParam">
						<p><FormattedMessage id='inventory.snaphot.openingStock' defaultMessage="Opening Stock" description="Snapshot table header"/></p>
						<p><FormattedNumber value={this.props.snapshotTabData.opening_stock || 0}/></p>
						</td>
						<td className="stkParam">
						<p><FormattedMessage id='inventory.snaphot.itemsPut' defaultMessage="Items Put" description="Snapshot table header"/></p>
						<p><FormattedNumber value={this.props.snapshotTabData.items_put || 0}/></p>
						</td>
						<td className="stkParam">
						<p><FormattedMessage id='inventory.snaphot.itemsPick' defaultMessage="Items Pick" description="Snapshot table header"/></p>
						<p><FormattedNumber value= {this.props.snapshotTabData.items_picked || 0} /></p>
						</td>
					</tr>
					<tr>
						<td className="stkParam">
							<p><FormattedMessage id='inventory.snaphot.currentStock' defaultMessage="Current Stock" description="Snapshot table header"/></p>
						<p><FormattedNumber value={this.props.snapshotTabData.current_stock || 0}/></p>
						</td>
						<td className="stkParam">
							<p><FormattedMessage id='inventory.snaphot.sku' defaultMessage="SKUs" description="Snapshot table header"/></p>
						<p><FormattedNumber value={this.props.snapshotTabData.total_skus || 0} /></p>
						</td>
						<td className="stkParam">
							<p><FormattedMessage id='inventory.snaphot.cbmUsed' defaultMessage="CBM Used" description="Snapshot table header"/></p>
						<p><FormattedNumber value={this.props.snapshotTabData.cbm_used || 0} /></p>
						</td>
					</tr>
					</tbody>
					</table>
				</div>
			</div>

						
		);
	}
};
SnapShotDetails.propTypes={
	snapshotTabData:React.PropTypes.object
}
export default SnapShotDetails;
