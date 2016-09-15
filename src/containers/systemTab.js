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
import SubTabs from '../components/subtab/SubTabs';


class SystemTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		var item1=[{tabContent:"Notification"}]
		var item2=[{tabContent:"Butler Bots"}]
		var item3=[{tabContent:"PPS"}]
		var item4=[{tabContent:"Charging Station"}]
		/**
		 * Need to remove these hardcoded variables
		 * 
		 */
     var itemNumber = 6;
		 var temp_data=[{
  "id": "bot 1001",
  "status": "Stopped",
  "current": "pick moving",
  "msu": "msu007",
  "location": "002.00",
  "direction": "up"
}, {
  "id": "bot 1002",
  "status": "Error",
  "current": "put moving",
  "msu": "msu008",
  "location": "004.00",
  "direction": "down"
}, {
  "id": "bot 1003",
  "status": "Warning",
  "current": "audit moving",
  "msu": "msu005",
  "location": "044.00",
  "direction": "right"
}, {
  "id": "bot 1009",
  "status": "On",
  "current": "put moving",
  "msu": "msu008",
  "location": "004.00",
  "direction": "down"
}, {
  "id": "bot 1001",
  "status": "Off",
  "current": "put moving",
  "msu": "msu008",
  "location": "004.00",
  "direction": "down"
}];
		
		return (
			<div>
				<div>
					<SubTabs/>
				</div>
        {this.props.children}
			</div>
		);
	}
};

export default SystemTab ;
