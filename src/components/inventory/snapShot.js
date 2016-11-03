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

						<p>{this.props.snapshotData.opening_stock}</p>
						</td>
						<td>
						<p>Items Put</p>
						<p>{this.props.snapshotData.items_put}</p>
						</td>
						<td>
						<p>Items Pick</p>
						<p>{this.props.snapshotData.items_picked}</p>

						</td>
					</tr>
					<tr>
						<td>
							<p>Current Stock</p>

						<p>{this.props.snapshotData.current_stock}</p>
						</td>
						<td>
							<p>SKUs</p>
						<p>{this.props.snapshotData.total_skus}</p>
						</td>
						<td>
							<p>CBM Used</p>
						<p>{this.props.snapshotData.cbm_used}</p>

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

	snapshotData:React.PropTypes.object

}
export default SnapShotDetails;
