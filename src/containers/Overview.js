/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import HealthTabs from '../components/health/healthTabs';
import Health from '../components/health/health';
import Tilex from '../components/tile1x/Tilex';
import Tile2x from '../components/tile2x/Tile2x';
import OrderStatsWidget from '../containers/orderStatsWidget'
import PerformanceWidget from '../containers/performanceWidget'

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
		var item1={heading:'Items to Stock', value:'4,74,579', low:'4 PPS stocking 3,546 items/hr'};
        var item2={heading1:'Orders to fulfill', value1:'120', low1:'8 PPS fulfilling per/hr', status1:'On schedule', heading2:'Remaining time', value2:'68mins', low2:'Completing in 8mins', status2:'23:59'};
		var items3={start:"09:10:25", name:"Krish verma gandhi sharma", post:"Manager"}
		return (
		<div className="gorWidgetWrap">
				<div className="section group">
					<div className="col span_2_of_4">
						<Tilex items={item1}/>
						<Tilex items={item1}/>
					</div>
					<div className="col span_2_of_4 gorNoML">
						<Tile2x items={item2}/>
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
