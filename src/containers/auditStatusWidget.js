import React  from 'react';
import ReactDOM  from 'react-dom';
import Tilex from '../components/tile1x/Tilex';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

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
	 	var lowStr,
	 	auditData = Object.assign({},this.props.auditData),
	 	totalAudit = this.props.ppsData ? this.props.ppsData.totalAudit : null,
		auditThroughput = this.props.throughputData ? this.props.throughputData.audit_throughput : null,
		value = auditData.total_audited ? auditData.total_audited : null ;

		//Setting display values based on server values/mock
		if (!value){
			value = <FormattedMessage id="widget.audit.heading.value" description='Total Items Audited' 
        				defaultMessage='None'/>;
			lowStr = <FormattedMessage id="widget.audit.status.offline" description='Offline Status' 
        				defaultMessage='Offline'/>;
		}
		else if(!totalAudit){
			lowStr = <FormattedMessage id="widget.audit.status.starting" description='Awaiting throughput data' 
        					defaultMessage='Starting...'/>;
		}
		else{
			lowStr = <FormattedMessage id="widget.audit.throughput" description='Throughput message' 
        					defaultMessage='{count} PPS auditing {throughput} items/hr'
        					values={{
						        count: totalAudit,
						        throughput:auditThroughput
						    }}/>;
		}

		auditData.heading = <FormattedMessage id="widget.audit.heading" description='Audit Item Heading' 
        defaultMessage='Items to Audit'/>;
        auditData.value = value;
		auditData.low = lowStr; 
        auditData.logo = "iAudit";

		return auditData
    		
		
	}

    render()
    {
    	var auditData = this.formatContainerData();
    	return (
			 <Tilex items={auditData} />
    	);
    }

 }


function mapStateToProps(state, ownProps){
	return {
        auditData: state.auditInfo.auditData,
        ppsData:state.ppsInfo.ppsData,
        throughputData : state.throughputInfo.throughputData
    }
}

 export default connect(mapStateToProps)(AuditStatusWidget);
