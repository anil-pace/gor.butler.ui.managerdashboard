import React  from 'react';
import ReactDOM  from 'react-dom';
import HealthTabs from './components/health/healthTabs';
import Health from './components/health/health';
import Tabs from './components/tabs/tabs';
import Header from './components/header/header';
import Tilex from './components/tile1x/Tilex';
import Tile2x from './components/tile2x/Tile2x';
import OrderStatsWidget from './components/widgetContainer/orderStatsWidget'
import PerformanceWidget from './components/widgetContainer/performanceWidget'


class App extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		var item={heading:'Items to Stock', value:'4,74,579', status:'4 PPS stocking 3,546 items/hr'};
		return (
			<div className="mainContainer">
				<Header/>
				<Tabs/>
				<div className="section group">
					<div className="col span_2_of_4">
						<Tilex items={item}/>
						<Tilex items={item}/>
					</div>
					<div className="col span_2_of_4 gorNoML">
						<Tile2x/>
					</div>
				</div>
				<OrderStatsWidget/>

			
			
				<PerformanceWidget/>
			</div>
		);
	}
};
export default App;
