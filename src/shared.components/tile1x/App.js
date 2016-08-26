import React from 'react';
import ReactDOM from 'react-dom';
import Tilex from './Tilex';
import Tile2x from './Tile2x';

class App extends React.Component{
	render(){
		return (
			<Tilex />
			<Tile2x />
		);
	}
};
ReactDOM.render(<App />,document.getElementById('container'));