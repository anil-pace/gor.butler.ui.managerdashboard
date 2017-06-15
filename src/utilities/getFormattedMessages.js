import React  from 'react';
import { FormattedMessage } from 'react-intl'; 


export function getFormattedMessages(action,values){
	
		return (action === "mode") ? (<FormattedMessage id="pps.mode.reject" description='PPS mode change reject'
                                   defaultMessage='{unsuccessful}/{totalCount} mode change request rejected' values={values}/>):
									(<FormattedMessage id="pps.status.reject" description='PPS status change reject'
                                   defaultMessage='{unsuccessful}/{totalCount} status change request rejected' values={values}/>)
	

}