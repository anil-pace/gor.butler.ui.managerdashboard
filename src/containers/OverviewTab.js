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
import SortExample from '../components/data_table/data_table';

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
		var item1={heading:'Items to Stock', value:'4,74,579', low:'4 PPS stocking 3,546 items/hr', logo:'iStock'};
        var item2={heading1:'Orders to fulfill', value1:'120', low1:'8 PPS fulfilling per/hr', status1:'On schedule', heading2:'Remaining time', value2:'68mins', low2:'Completing in 8mins', status2:'23:59'};
		return (
			<div className="gorWidgetWrap">
				<div className="section group">
					<div className="col span_2_of_4">
						<PutStatusWidget items={item1}/>
						<AuditStatusWidget items={item1}/>
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
