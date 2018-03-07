import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';

class UtilityTile extends React.Component{
	
	render(){
		return (
		<div className={"gor-utility-tile "+(this.props.additionalClass || "")}>
			<div className="gor-utility-tile-h1">
				<div className="gor-utility-tile-heading">
					{this.props.tileHead}
				</div>
				{this.props.showHeaderIcon?<div className="gor-utility-tile-icon">
					<div className="gor-refresh-icon" onClick={this.props.onRefresh}/>
				</div>:""}
			</div>
			<div className="gor-utility-tile-body">
				{this.props.children}
			</div>
			{this.props.showFooter?<div className="gor-utility-tile-footer">
				<div className="got-utility-btn-wrap">
					<button className={this.props.enableButton?"gor-download-button":"gor-download-button gor-disable-content"} onClick={this.props.footerAction}>
						{this.props.loading?<div className='spinnerImage'></div>:<FormattedMessage id="utility.downDlabel" description="label for download" defaultMessage="DOWNLOAD"/>}
         			</button>
         		</div>
			</div>:""}
		</div> 
		);
	}
};

export default UtilityTile ;