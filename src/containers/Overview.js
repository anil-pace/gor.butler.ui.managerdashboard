/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import HealthTabs from '../components/health/healthTabs';
import Health from '../components/health/health';
import AuditStatusWidget from '../containers/auditStatusWidget';
import PutStatusWidget from '../containers/putStatusWidget';
import PickStatusWidget from '../containers/pickStatusWidget';
import OrderStatsWidget from '../containers/orderStatsWidget';
import PerformanceWidget from '../containers/performanceWidget';

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
		 var items1={logo:'iStock'};
		 var items2={logo:'iAudit'};

		return (
		<div className="gorWidgetWrap">
				<div className="section group">
					<div className="col span_2_of_4">
						<PutStatusWidget items={items1}/>
						<AuditStatusWidget items={items2}/>
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

export default Overview ;
