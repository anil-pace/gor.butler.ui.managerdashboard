import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';

class UtilityTile extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
		<div className="gor-utility-tile">
			<div className="gor-utility-tile-h1">
				<div className="gor-utility-tile-heading">
					{this.props.tileHead}
				</div>
			</div>
			<div className="gor-utility-tile-body">
				<input type="file" id="BtnBrowseHidden" name="files" style={{'display': 'none'}} />
        			<label for="BtnBrowseHidden" id="LblBrowse">
            			Browse
        			</label>
			</div>
			{this.props.showFooter?<div className="gor-utility-tile-footer">
				<div className="got-utility-btn-wrap">
					<button className="gor-filterBtn-applied" >
          				<FormattedMessage id="utility.downDlabel" description="label for download" defaultMessage ="DOWNLOAD"/>
         			</button>
         		</div>
			</div>:""}
		</div> 
		);
	}
};

export default UtilityTile ;