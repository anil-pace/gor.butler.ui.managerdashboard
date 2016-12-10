import React  from 'react';
import ReactDOM  from 'react-dom';
import Tilex from '../components/tile1x/Tilex';
import { connect } from 'react-redux';
import { FormattedMessage,FormattedNumber } from 'react-intl';
import {AUDIT_ICON} from '../constants/frontEndConstants';

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
		value = auditData.total_audited ? auditData.total_audited : null ,
		pluralMsg;
		totalAudit=<FormattedNumber value={totalAudit}/>;
		//Setting display values based on server values/mock
		if (!value){
			value = <FormattedMessage id="widget.audit.heading.value" description='Total Items Audited' 
        				defaultMessage='None'/>;
        				
			lowStr = <FormattedMessage id="widget.audit.status.idle"  description='Audit PPS idle message' 
                defaultMessage='{count} idle PPS (Audit mode)'
                values={{
                    count: totalAudit
                }}/>;
		}
		else{
			value = <FormattedNumber value={value}/>
			auditThroughput = <FormattedNumber value={auditThroughput}/>
			
			
			lowStr = <FormattedMessage id="widget.audit.throughput" description='Throughput message' 
        					defaultMessage='{count,number} {count, plural,
                      one {PPS}
                      other {PPS}
                    } auditing {throughput} items/hr'
        					values={{
						        count: totalAudit,
						        throughput:auditThroughput
						    }}/>;
		}

		auditData.heading = <FormattedMessage id="widget.audit.heading" description='Audit Item Heading' 
        defaultMessage='Items audited'/>;
        auditData.value = value;
		auditData.low = lowStr; 
        auditData.logo = AUDIT_ICON;

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
