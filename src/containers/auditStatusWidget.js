import React  from 'react';
import Tilex from '../components/tile1x/Tilex';
import { connect } from 'react-redux';
import { FormattedMessage,FormattedNumber } from 'react-intl';
import {AUDIT_ICON,GOR_NONE} from '../constants/frontEndConstants';

class AuditStatusWidget extends React.Component{
	/**
	 * Called once before rendering of component,used to displatch fetch action
	 * @return {[type]}
	 */
	constructor(props) 
	{
    	super(props)
    }

    /**
     * [format display data coming from server/mock]
     * @return {[type]} [description]
     */
    formatContainerData() {
	 	var lowStr,valueLeftStatus='',
	 	auditData=Object.assign({},this.props.auditData),
	 	totalAudit=this.props.ppsData ? this.props.ppsData.totalAudit : 0,
		auditThroughput=this.props.throughputData ? this.props.throughputData.audit_throughput : 0,
		value=auditData.total_audited ? auditData.total_audited : 0 ,
		pluralMsg;
		totalAudit=<FormattedNumber value={totalAudit}/>;
		//Setting display values based on server values/mock
		if (!value){
			value=<FormattedMessage id="widget.audit.heading.value" description='Total Items Audited' 
        				defaultMessage='None'/>;
            valueLeftStatus=GOR_NONE;        				
			lowStr=<FormattedMessage id="widget.audit.status.idle"  description='Audit PPS idle message' 
                defaultMessage='{count} idle PPS (Audit mode)'
                values={{
                    count: totalAudit
                }}/>;
		}
		else{
			value=<FormattedNumber value={value}/>
			auditThroughput=<FormattedNumber value={auditThroughput}/>
			lowStr=<FormattedMessage id="widget.audit.throughput" description='Throughput message' 
        					defaultMessage="{pps_count} PPS auditing {throughput} items/hr"
        					values={{
						        pps_count: totalAudit,
						        throughput:auditThroughput
						    }}/>;
		}
        if(!this.props.system_status)
        {
             lowStr=<FormattedMessage id="widget.audit.offline" description='Message for system offline' 
                defaultMessage='Offline'/>;
        }
        if(this.props.systemEmergency){
             lowStr=<FormattedMessage id="widget.audit.emergency" description='Message for system in emergency state' 
                defaultMessage='--'/>;                
        }

		auditData.heading=<FormattedMessage id="widget.audit.heading" description='Audit Item Heading' 
        defaultMessage='Items audited'/>;
        auditData.value=value;
		auditData.low=lowStr; 
        auditData.logo=AUDIT_ICON;
        auditData.valueLeftStatus=valueLeftStatus;
		return auditData
    		
		
	}

    render()
    {
    	var auditData=this.formatContainerData();
    	return (
			 <Tilex items={auditData} />
    	);
    }

 }


function mapStateToProps(state, ownProps){
	return {
        auditData: state.auditInfo.auditData,
        ppsData:state.ppsInfo.ppsData,
        throughputData : state.throughputInfo.throughputData,
        system_status:state.tabsData.status||null,
        systemEmergency: state.tabsData.system_emergency||null
    }
}

 export default connect(mapStateToProps)(AuditStatusWidget);
