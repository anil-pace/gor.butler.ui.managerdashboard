import React  from 'react';
import ReactDOM  from 'react-dom';
import Tilex from './shared.components/tile1x/Tilex';
import Tile2x from './shared.components/tile2x/Tile2x';

class App extends React.Component{
	render(){
		return (
			<div>
			<Tilex />
			<Tilex />
			<Tile2x />
			</div>
		);
	}
};
ReactDOM.render(<App />,document.getElementById('container'));
