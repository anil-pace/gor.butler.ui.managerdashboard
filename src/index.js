import React  from 'react';
import ReactDOM  from 'react-dom';
import HealthTabs from './shared.components/health/healthTabs';
import Health from './shared.components/health/health';
import Tabs from './shared.components/tabs/tabs';
import Header from './shared.components/header/header';
import Tilex from './shared.components/tile1x/Tilex';
import Tile2x from './shared.components/tile1x/Tile2x';
import OrderStatsWidget from './shared.components/widgetContainer/orderStatsWidget'
import PerformanceWidget from './shared.components/widgetContainer/performanceWidget'


class App extends React.Component{
	render(){
		return (
			<div className ="mainContainer">
			<Header/>
			<Tabs/>
			<div className="section group">
			<div className="col span_2_of_4">
			
			<Tilex/>
			<Tilex/>
			</div>
			<Tile2x/>
			</div>
			<OrderStatsWidget/>

			
			
			<PerformanceWidget/>
			</div>
			

		);
	}
};
ReactDOM.render(<App />,document.getElementById('container'));
