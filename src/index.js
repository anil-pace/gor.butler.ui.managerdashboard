import React  from 'react';
import ReactDOM  from 'react-dom';
import HealthTabs from './shared.components/health/healthTabs';
import Tabs from './shared.components/tabs/tabs';
import Header from './shared.components/header/header';
import Tilex from './shared.components/tile1x/Tilex';
import Tile2x from './shared.components/tile1x/Tile2x';


class App extends React.Component{
	render(){
		return (
			<div>
			<Header/>
			<Tabs/>
			<Tilex/>
			<Tilex/>
			<Tile2x/>
			<HealthTabs />
			</div>
		);
	}
};
ReactDOM.render(<App />,document.getElementById('container'));
