import React  from 'react';
import { FormattedMessage } from 'react-intl'; 


export function getFormattedMessages(action,values){
		let retValue=null;


		switch (action) {
			case "mode":
			if(values.unsuccessful){
			 return (<FormattedMessage id="pps.mode.reject" description='PPS mode change reject'
			                                defaultMessage='{unsuccessful}/{totalCount} mode change request rejected' values={values}/>);					  
			}
			else{
				return 	(<FormattedMessage id="pps.mode.success" description='PPS mode change success'
                                   defaultMessage='Mode change request successful' />);
			}
			case "BulkAudit":
			return (<FormattedMessage id="utility.bulkaudit.successMessage" description='Bulk Audit successMessage'
                                   defaultMessage='{successful}/{totalCount} audits started successfully' values={values}/>);
			case "status":
			if(values.unsuccessful){
				return 	(<FormattedMessage id="pps.status.reject" description='PPS status change reject'
                                   defaultMessage='{unsuccessful}/{totalCount} status change request rejected' values={values}/>);
			}
			else{
				return 	(<FormattedMessage id="pps.status.success" description='PPS status change success'
                                   defaultMessage='Status change request successfull' />);
			}
									
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
			
								   case "EDITED":
			return 	(<FormattedMessage id="audit.edit.success" description='Audit edited success'
			defaultMessage='Audit {id} updated successfully' values={values}/>);
			break;
		
			case "DUPLICATED":
			return 	(<FormattedMessage id="audit.duplicate.success" description='Audit duplicate success'
			defaultMessage='Audit {id} successfully duplicated' values={values}/>);
			break;
			
			default:
			return null;
		}
}
