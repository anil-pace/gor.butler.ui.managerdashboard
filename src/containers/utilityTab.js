/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import UtilityTile from '../components/utilityComponents/utilityTile'


class UtilityTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }

    // _renderUploadDataTile() {
    // 	var 
    // }	
	render(){
		//var uploadDataTile = this._renderUploadDataTile();
		return (
			<div >
				<div>
					<UtilityTile tileHead="Upload Data" showFooter={true}/>
					<UtilityTile tileHead="Run Scripts" showFooter={true}/>
					<UtilityTile tileHead="Download reports" showFooter={true}/>
					<UtilityTile tileHead="Download GRN" showFooter={true}/>
				</div>
			</div>
		);
	}
}

export default UtilityTab ;
