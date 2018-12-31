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
								   
			case "SETORDERPRIORITYSUCCESS" :
				return (<FormattedMessage id="order.setpriority.generateSuccess" description='set order priority successfully'
								   defaultMessage='Order Priority has been changed'/>);

			case "SETORDERPRIORITYFAILURE" :
				return (<FormattedMessage id="order.setpriority.generateFailure" description='set order priority UNsuccessfully'
									defaultMessage='Order Priority has not been changed' values={values}/>);
									

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
			return 	(<FormattedMessage id="audit.cancelsent.status" description='Audit cancel sent status'
			defaultMessage='Audit {id} sent for cancellation' values={values}/>);
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
			case "RESOLVEFAIL":
			let resolveFailstringInfo={
                type:'WARNING',
                msg:(<FormattedMessage id="audit.resolve.fail" description='audit resolve fail' 
            defaultMessage='AUDIT RESOLVE FAIL'/>),
            desc:(<FormattedMessage id="audit.resolve.fail_desc" description='audit resolve fail all description' 
            defaultMessage='Audit resolve failed due to network issue '/>)
				  }
				  return resolveFailstringInfo;
			break;
			case "DELETEDUSER":
                return 	(<FormattedMessage id="notify.success.delete" description='Text for successfull user deletion' 
				defaultMessage='User "{first} {last}"  deleted successfully' values={{first:values.details[0]||"--",last:values.details[1]||"--"}}/>) ;
			break;
			case "EDITEDUSER":
                return 	(<FormattedMessage id="notify.successfully.edit" description='Text for successfull user edit' 
				defaultMessage='User details updated successfully'/>) ;
			break;
			
			case "EDITEDUSERFAIL":
			let editFailString={
                type:'WARNING',
                msg:(<FormattedMessage id="notify.fail.edit" description='Text for fail user edit' 
				defaultMessage='Failed to update user details'/>) ,
            desc:(<FormattedMessage id="user.delete.fail" description='Text for fail user edit' 
            defaultMessage='Failed:"{description}" ' values={{description:values.description||"--"}}/>)
				  }
				  return editFailString;
			break;
                
			case "DELETEDUSERFAIL":
			let deleteFailString={
                type:'WARNING',
                msg:(<FormattedMessage id="notify.fail.delete" description='Text for fail user deletion' 
				defaultMessage='User deleted failed'/>) ,
            desc:(<FormattedMessage id="user.delete.fail" description='Text for fail user deletion' 
            defaultMessage='Failed:"{description}" ' values={{description:values.description||"--"}}/>)
				  }
				  return deleteFailString;
					break;
				  case "NEWUSER":
				  return 	(<FormattedMessage id="notify.successfully.add" description='Text for successfull user added' 
				  defaultMessage='New user "{first} {last}" added successfully' values={{first:values.details[0]||"--",last:values.details[1]||"--"}}/>) ;
			  break;
			  
			  case "NEWUSERFAIL":
			  let addFailString={
				  type:'WARNING',
				  msg:(<FormattedMessage id="notify.fail.add" description='Text for fail user add' 
				  defaultMessage='Failed to add new user'/>) ,
			  desc:(<FormattedMessage id="user.add.fail" description='Text for fail user add' 
			  defaultMessage='Failed:"{description}" ' values={{description:values.description||"--"}}/>)
					}
					return addFailString;
			  break;	  
		
			default:
			return null;
		}
}
