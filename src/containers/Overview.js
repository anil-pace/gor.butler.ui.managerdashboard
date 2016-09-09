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
		var item1={heading:'Items to Stock', value:'4,74,579', low:'4 PPS stocking 3,546 items/hr', logo:'iStock'};
		var items3={start:"09:10:25", name:"Krish verma gandhi sharma", post:"Manager"};

		return (
		<div className="gorWidgetWrap">
				<div className="section group">
					<div className="col span_2_of_4">
						<PutStatusWidget items={item1}/>
						<AuditStatusWidget items={''}/>
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
