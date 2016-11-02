/**
 * Container for Inventory tab
 * This will be switched based on tab click
 */
import React  from 'react';



class SnapShotDetails extends React.Component{
	constructor(props) 
	{
    	super(props);

    }	
   
	render(){
		
		
		return (
			<div className="gorSnapShot">
				<h1>Today's stock snapshot</h1>
				<div className="gorSnapShotCont">
					<table width="100%">
					<tbody>
					<tr>
						<td>
						<p>Opening Stock</p>
						<p>{this.props.snapshotTabData.opening_stock}</p>
						</td>
						<td>
						<p>Items Put</p>
						<p>{this.props.snapshotTabData.items_put}</p>
						</td>
						<td>
						<p>Items Pick</p>
						<p>{this.props.snapshotTabData.items_picked}</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>Current Stock</p>
						<p>{this.props.snapshotTabData.current_stock}</p>
						</td>
						<td>
							<p>SKUs</p>
						<p>{this.props.snapshotTabData.total_skus}</p>
						</td>
						<td>
							<p>CBM Used</p>
						<p>{this.props.snapshotTabData.cbm_used}</p>
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
