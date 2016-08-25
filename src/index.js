import React  from 'react';
import ReactDOM  from 'react-dom';
import Tilex from './shared.components/tile1x/Tilex';
import Tile2x from './shared.components/tile1x/Tile2x';

class App extends React.Component{
	render(){
		return (
			<div className="mainContainer">
			<div className="section group">
			<div className="col span_2_of_4">
			<Tilex />
			<Tilex />
			</div>
			<Tile2x />
			</div>
			</div>

		);
	}
};
ReactDOM.render(<App />,document.getElementById('container'));
