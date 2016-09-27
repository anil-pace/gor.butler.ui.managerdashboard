/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import HealthTabs from '../components/health/healthTabs';
import Health from '../components/health/health';
import OrderStatsWidget from '../containers/orderStatsWidget'
import PerformanceWidget from '../containers/performanceWidget'
import AuditStatusWidget from '../containers/auditStatusWidget'
import PutStatusWidget from '../containers/putStatusWidget'
import PickStatusWidget from '../containers/pickStatusWidget'
import { connect } from 'react-redux';


class Overview extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	



	render(){
		/**
		 * Need to remove these hardcoded variables
		 * 
		 */

		
		//this.formatContainerData('put');
		//this.formatContainerData('audit');
		//var putData=this.props.putData ;
        //var auditData=this.props.auditData;//{heading:'Items to Audit', value:'3,74,519', low:'4 PPS auditing 1,546 items/hr', logo:'iAudit'};;

		return (
			<div className="gorWidgetWrap">
				<div className="section group">
					<div className="col span_2_of_4">

						<PutStatusWidget />
						<AuditStatusWidget />

					</div>
					<div className="col span_2_of_4 gorNoML">
						<PickStatusWidget />
					</div>
				</div>
				<div>
					<OrderStatsWidget/>
        			<PerformanceWidget/>
				</div>
			</div>
		);
	}
};
 
 

// function mapStateToProps(state, ownProps){
// 	return {
//         putData: state.putInfo.putData,
//         ppsData:state.ppsInfo.ppsData,
//         throughputData : state.throughputInfo.throughputData,
//         auditData: state.auditInfo.auditData
//     };
// }

export 	default Overview;
