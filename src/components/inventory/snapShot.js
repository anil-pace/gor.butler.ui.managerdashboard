/**
 * Dumb component for inventory snapshot
 * 
 */
import React  from 'react';
import { FormattedMessage,FormattedNumber,FormattedDate} from 'react-intl';



class SnapShotDetails extends React.Component{
	constructor(props) 
	{
    	super(props);

    }	

  	shouldComponentUpdate(nextProps, nextState){
	    if(this.props.hasDataChanged === nextProps.hasDataChanged || !Object.keys(nextProps.snapshotTabData).length){
	      return false;
	    }
	      return true;
    
  	}
   
	render(){
		
		var isToday = this.props.currentDate === Date.parse(this.props.snapshotTabData.date) ? true :false,
		dt,currentStock,todayDate;
		if(isToday){
			dt = <FormattedMessage id='inventory.snaphot.date' defaultMessage="Today's" description="Snapshot date string"/>
			currentStock = <FormattedMessage id='inventory.snaphot.currentStock' defaultMessage="Current Stock" description="Snapshot table header"/>
		}
		else{
			todayDate = this.props.snapshotTabData.date ? this.props.snapshotTabData.date : (new Date());
			dt = <FormattedDate year='numeric' month='short' day='2-digit' value={new Date(todayDate)}/>
			currentStock = <FormattedMessage id='inventory.snaphot.closingStock' defaultMessage="Closing Stock" description="Snapshot table header"/>
		}
		return (
			<div className="gorSnapShot">
				<h1>{dt} <FormattedMessage id='inventory.snaphot.header' defaultMessage=" stock snapshot" description="Snapshot header"/> </h1>
				<div className="gorSnapShotCont">
					<table width="100%">
					<tbody>
					<tr>
						<td className="stkParam">
						<p>{currentStock}</p>
						<p><FormattedNumber value={this.props.snapshotTabData.current_stock || 0}/></p>
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
						<p><FormattedMessage id='inventory.snaphot.openingStock' defaultMessage="Opening Stock" description="Snapshot table header"/></p>
						<p><FormattedNumber value={this.props.snapshotTabData.opening_stock || 0}/></p>
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
	currentDate:React.PropTypes.number,
	snapshotData:React.PropTypes.object,
	hasDataChanged:React.PropTypes.bool

}
export default SnapShotDetails;
