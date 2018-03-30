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
			
			case "DELETEAUDIT":
			return 	(<FormattedMessage id="audit.delete.success" description='Audit deletion success'
			defaultMessage='Audit {id} has been deleted' values={values}/>);
			break;

			case "DELETEAUDITFAIL":
			return 	(<FormattedMessage id="audit.delete.reject" description='Audit deletion'
			defaultMessage='Audit {id} failed to delete' values={values}/>);
			break;

		

			case "CREATEAUDIT":
			return 	(<FormattedMessage id="audit.create.success" description='Audit Creation success'
			defaultMessage='Audit {id} created successfully' values={values}/>);
			break;

			case "PAUSEAUDIT":
			return 	(<FormattedMessage id="audit.pause.success" description='Audit paused success'
			defaultMessage='Audit {id} has been paused' values={values}/>);
			break;


			case "EDITED":
			return 	(<FormattedMessage id="audit.edit.success" description='Audit edited success'
			defaultMessage='Audit {id} updated successfully' values={values}/>);
			break;
		
			case "DUPLICATED":
			return 	(<FormattedMessage id="audit.duplicate.success" description='Audit duplicate success'
			defaultMessage='Audit {id} successfully duplicated' values={values}/>);
			break;
			
			case "CANCELLED":
			return 	(<FormattedMessage id="audit.cancel.success" description='Audit cancel success'
			defaultMessage='Audit {id} successfully cancelled' values={values}/>);
			break;
			
			case "STARTFAIL":
				let startFailstringInfo;
			 startFailstringInfo={
                type:'WARNING',
                msg:(<FormattedMessage id="audit.start.fail" description='audit start fail' 
            defaultMessage='AUDIT NOT STARTED'/>),
            desc:(<FormattedMessage id="audit.start.fail_desc" description='audit start fail description' 
            defaultMessage='{fail} audit failed due to location/sku of audit currently in process' values={{fail:values.fail}}/>)
				  }
		
				return startFailstringInfo;
			break;
			
			case "STARTFAILALL":
			let startFailAllstringInfo={
                type:'WARNING',
                msg:(<FormattedMessage id="audit.start.failall" description='audit start failall' 
            defaultMessage='AUDIT NOT STARTED'/>),
            desc:(<FormattedMessage id="audit.start.failall_desc" description='audit start fail all description' 
            defaultMessage='No audit has been started due to network issue '/>)
				  }
				  return startFailAllstringInfo;
			break;


			default:
			return null;
		}
}
