import React  from 'react';
import { FormattedMessage } from 'react-intl'; 


export function getFormattedMessages(action,values){
		let retValue=null;


		switch (action) {
			case "mode":
			return (<FormattedMessage id="pps.mode.reject" description='PPS mode change reject'
			                                defaultMessage='{unsuccessful}/{totalCount} mode change request rejected' values={values}/>);
			case "status":
			return 	(<FormattedMessage id="pps.status.reject" description='PPS status change reject'
                                   defaultMessage='{unsuccessful}/{totalCount} status change request rejected' values={values}/>);
			case "grnGenerated" :
			return (<FormattedMessage id="utility.downloadGRN.generateSuccess" description='GRN Request submitted successfully'
                                   defaultMessage='GRN Request submitted successfully'/>);
			case "invntryRptGenerated" :
			return (<FormattedMessage id="utility.downloadInventory.generateSuccess" description='Inventory Report Request submitted successfully'
                                   defaultMessage='Inventory Report Request submitted successfully' />);
			case "grnRefreshed":
			return (<FormattedMessage id="utility.downloadGRN.refreshed" description='GRN History Refreshed!'
                                   defaultMessage='GRN History Refreshed!' />);
			case "reprtsRefreshed":
			return (<FormattedMessage id="utility.downloadReprt.refreshed" description='Reports History Refreshed!'
                                   defaultMessage='Reports History Refreshed!' />);
			
			default:
			return null;
		}
}
