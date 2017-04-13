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
				{this.props.tileBody}
			</div>
			{this.props.showFooter?<div className="gor-utility-tile-footer">
				<div className="got-utility-btn-wrap">
					<button className="gor-filterBtn-applied" onClick={this.props.footerAction}>
          				<FormattedMessage id="utility.downDlabel" description="label for download" defaultMessage ="DOWNLOAD"/>
         			</button>
         		</div>
			</div>:""}
		</div> 
		);
	}
};

export default UtilityTile ;