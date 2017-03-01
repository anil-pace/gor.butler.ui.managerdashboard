/**
 * Container for Inventory tab
 * This will be switched based on tab click
 */
import React  from 'react';
import { FormattedMessage } from 'react-intl';
import {CATEGORY_COLOR_MAP } from '../../constants/frontEndConstants';



class ItemCategoryTable extends React.Component{
	constructor(props) 
	{
    	super(props);

    }

    shouldComponentUpdate(nextProps, nextState){
	    if(this.props.hasDataChanged === nextProps.hasDataChanged || !Object.keys(nextProps.snapshotData).length){
	      return false;
	    }
	      return true;
    
  	}
   
	render(){
		var structure,catData;
		if(this.props.snapshotData.category_data){
			catData = this.props.snapshotData.category_data;
			structure = catData.map(function(object, i){
        		var color = object.category_type ? CATEGORY_COLOR_MAP[i] : "";
        		return (
        			<tr key={i}>
        				<td>
        				<span className="catColor" style={{"background":color}}></span>
        				<span className="catText">{object.category_type || "--"}</span>
        				</td>
        				<td><span className="catText">{object.cbm_used || "--"}</span></td>
        				<td><span className = "catText">{object.days_on_hand || "--"}</span></td>
        			</tr>
        			)
    		})
		}
	
		return (
			<div className="gorSnapShot">
					<table width="100%">
					<thead>
					<tr>
					<th>
					<FormattedMessage id='itemTable.categoryType.category' defaultMessage="Category" description="Category Name"/>
					</th>
					<th>
					<FormattedMessage id='itemTable.cbmUsed.cbm' defaultMessage="CBM Used" description="CBM Used field"/>
					</th>
					<th>
					<FormattedMessage id='itemTable.daysInHand.count' defaultMessage="Days in Hand" description="Days in Hand"/>
					</th>
					</tr>
					</thead>
					<tbody>
						{structure}
					</tbody>
					</table>
			</div>

						
		);
	}
};
ItemCategoryTable.propTypes={
	snapshotData:React.PropTypes.object,
	hasDataChanged:React.PropTypes.bool
}
export default ItemCategoryTable;
