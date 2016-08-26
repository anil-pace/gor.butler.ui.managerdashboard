import React  from 'react';
import ReactDOM  from 'react-dom';
import Tilex from './sharedComponents/tile1x/Tilex';
import Tile2x from './sharedComponents/tile2x/Tile2x';


class App extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
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
export default App;
